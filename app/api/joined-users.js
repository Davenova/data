// api/joined-users.js

import { prisma } from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const users = await db.collection('joinedUsers').find({}).toArray();

      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
