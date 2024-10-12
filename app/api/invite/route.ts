import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { telegramId, username } = req.body;

    try {
      const newUser = await prisma.invitedUser.create({
        data: {
          telegramId,
          username,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save user' });
    }
  } else if (req.method === 'GET') {
    const users = await prisma.invitedUser.findMany();
    res.status(200).json(users);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
