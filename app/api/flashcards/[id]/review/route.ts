import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import FlashCard from '@/lib/models/FlashCard';
import User from '@/lib/models/User';
import { calculateNextReview } from '@/lib/spaced-repetition';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await req.json();
    const { quality, userId } = body;
    const { id } = params;

    if (quality === undefined || !userId) {
      return NextResponse.json(
        { error: 'Quality rating and userId are required' },
        { status: 400 }
      );
    }

    const flashcard = await FlashCard.findById(id);
    if (!flashcard) {
      return NextResponse.json({ error: 'Flashcard not found' }, { status: 404 });
    }

    // Calculate next review schedule using SM2 algorithm
    const nextReview = calculateNextReview(quality, flashcard);

    // Update flashcard with new spaced repetition data
    const updatedCard = await FlashCard.findByIdAndUpdate(
      id,
      {
        ...nextReview,
        lastReviewedAt: new Date(),
      },
      { new: true }
    );

    // Update user stats
    await User.findByIdAndUpdate(userId, {
      $inc: { cardsLearned: 1 },
      lastStudyDate: new Date(),
      $set: {
        streakDays: await calculateStreak(userId),
      },
    });

    return NextResponse.json(updatedCard);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to review flashcard' }, { status: 500 });
  }
}

async function calculateStreak(userId: string): Promise<number> {
  const user = await User.findById(userId);
  if (!user.lastStudyDate) return 1;

  const lastStudy = new Date(user.lastStudyDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastStudy.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return user.streakDays + 1;
  }
  return 1;
}