// api/join.js

import { prisma } from '@/lib/prisma' // Import your MongoDB connection utility

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { telegramId, username } = req.body;

    if (!telegramId || !username) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    try {
      const { db } = await connectToDatabase();
      await db.collection('joinedUsers').insertOne({ telegramId, username, joinedAt: new Date() });

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
