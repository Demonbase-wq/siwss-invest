import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { users } from '@/lib/airtable'

// Configure Airtable

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    // Find user with the given reset token
    const foundUser = await users.select({
      filterByFormula: `{resetToken} = '${token}'`,
    }).firstPage()

    if (foundUser.length === 0) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 200 })
    }

    const user = foundUser[0]

    // Check if the token has expired
    const resetTokenExpiry = user.get('resetTokenExpiry') as number
    if (Date.now() > resetTokenExpiry) {
      return NextResponse.json({ error: 'Reset token has expired' }, { status: 200 })
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update user record with new password and clear reset token fields
    await users.update(user.id, {
      password: hashedPassword,
      resetToken: '',
      resetTokenExpiry: undefined,
    })

    return NextResponse.json({ message: 'Password reset successful' }, {status: 200})
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 200 })
  }
}

