import { users } from '@/lib/airtable';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const user = await users.find(id as string)

        if (!user) {
            return NextResponse.json({ message: 'User not found.' }, { status: 404 });
        }

        const { password, verificationCode, ...filteredUser } = user.fields

        return NextResponse.json(filteredUser, { status: 200 });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}