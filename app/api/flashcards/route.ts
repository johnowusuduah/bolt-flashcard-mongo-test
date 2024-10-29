import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import FlashCard from '@/lib/models/FlashCard';
import { calculateNextReview } from '@/lib/spaced-repetition';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get('subjectId');
    const userId = searchParams.get('userId');
    const dueOnly = searchParams.get('dueOnly') === 'true';

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    let query: any = { userId };
    if (subjectId) {
      query.subjectId = subjectId;
    }
    if (dueOnly) {
      query.dueDate = { $lte: new Date() };
    }

    const flashcards = await FlashCard.find(query).sort({ dueDate: 1 });
    return NextResponse.json(flashcards);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch flashcards' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { front, back, subjectId, userId } = body;

    if (!front || !back || !subjectId || !userId) {
      return NextResponse.json(
        { error: 'Front, back, subjectId, and userId are required' },
        { status: 400 }
      );
    }

    const flashcard = await FlashCard.create({
      front,
      back,
      subjectId,
      userId,
    });

    return NextResponse.json(flashcard, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create flashcard' }, { status: 500 });
  }
}