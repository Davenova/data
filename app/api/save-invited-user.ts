// api/save-invited-user.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { telegramId } = req.body;

    if (!telegramId) {
      return res.status(400).json({ error: 'Telegram ID is required' });
    }

    try {
      // Check if the user already exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { telegramId },
      });

      if (!existingUser) {
        // Save new user to the database
        await prisma.user.create({
          data: {
            telegramId,
            // Add any other user properties you want to save
          },
        });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error saving invited user:', error);
      return res.status(500).json({ error: 'Failed to save user' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
