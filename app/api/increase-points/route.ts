import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const { telegramId, pointsToAdd, button } = await req.json() // Include the button in the request

        if (!telegramId || !pointsToAdd || !button) {
            return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
        }

        let updateData: any = { points: { increment: pointsToAdd } } // Initialize points increment

        // Add claimed button update based on which button was pressed
        if (button === 'button1') {
            updateData.button1Claimed = true // Set button1Claimed to true
        } else if (button === 'button2') {
            updateData.button2Claimed = true // Set button2Claimed to true
        } else {
            return NextResponse.json({ error: 'Invalid button' }, { status: 400 })
        }

        const updatedUser = await prisma.user.update({
            where: { telegramId },
            data: updateData // Update points and claimed state
        })

        return NextResponse.json({ success: true, points: updatedUser.points })
    } catch (error) {
        console.error('Error increasing points:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
