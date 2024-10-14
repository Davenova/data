import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json()

    if (!userData || !userData.id) {
      return NextResponse.json({ error: 'Invalid user data' }, { status: 400 })
    }

    let user = await prisma.user.findUnique({
      where: { telegramId: userData.id }
    })

    const inviterId = userData.start_param ? parseInt(userData.start_param) : null

    if (!user) {
      user = await prisma.user.create({
        data: {
          telegramId: userData.id,
          username: userData.username || '',
          firstName: userData.first_name || '',
          lastName: userData.last_name || '',
          invitedBy: inviterId ? `@${inviterId}` : null // Store the "invited by" data
        }
      })

      if (inviterId) {
        await prisma.user.update({
          where: { telegramId: inviterId },
          data: {
            invitedUsers: {
              push: `@${userData.username || userData.id}`
            }
          }
        })
      }
    }

    let inviterInfo = null
    if (inviterId) {
      const inviter = await prisma.user.findUnique({
        where: { telegramId: inviterId },
        select: { username: true, firstName: true, lastName: true }
      })
      if (inviter) {
        inviterInfo = inviter
      }
    }

    return NextResponse.json({ user, inviterInfo })
  } catch (error) {
    console.error('Error processing user data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
