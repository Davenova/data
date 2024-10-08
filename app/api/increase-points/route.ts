import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const { telegramId, pointsToAdd } = await req.json() // Receive pointsToAdd from the request body

        if (!telegramId || !pointsToAdd) {
            return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
        }

        const updatedUser = await prisma.user.update({
            where: { telegramId },
            data: { points: { increment: pointsToAdd } } // Increment by pointsToAdd value
        })

        return NextResponse.json({ success: true, points: updatedUser.points })
    } catch (error) {
        console.error('Error increasing points:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
