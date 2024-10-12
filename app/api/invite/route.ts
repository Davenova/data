import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST handler for adding an invited user
export async function POST(req: NextRequest) {
  try {
    const { telegramId, username } = await req.json();

    // Create a new invited user in the database
    const newUser = await prisma.invitedUser.create({
      data: {
        telegramId,
        username,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  }
}

// GET handler for retrieving all invited users
export async function GET() {
  try {
    const users = await prisma.invitedUser.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve users' }, { status: 500 });
  }
}
