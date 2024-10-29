import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Subject from '@/lib/models/Subject';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const subjects = await Subject.find({ userId });
    return NextResponse.json(subjects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, description, userId } = body;

    if (!name || !userId) {
      return NextResponse.json({ error: 'Name and userId are required' }, { status: 400 });
    }

    const subject = await Subject.create({
      name,
      description,
      userId,
    });

    return NextResponse.json(subject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create subject' }, { status: 500 });
  }
}