import { put, del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';

export async function DELETE(request: Request): Promise<NextResponse> {
    const session = await auth();

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    const token = process.env.BLOB_READ_WRITE_TOKEN; // Ensure this environment variable is set

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!token) {
        return NextResponse.json({ error: 'BLOB_READ_WRITE_TOKEN is not set' }, { status: 500 });
    }

    if (!filename) {
        return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }


    try {
        // Upload the file to Vercel Blob
        await del(filename as string, {
            token, // Pass the token here
        });

        return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
