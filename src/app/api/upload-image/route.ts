import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  const token = process.env.BLOB_READ_WRITE_TOKEN; // Ensure this environment variable is set

  if (!token) {
    return NextResponse.json({ error: 'BLOB_READ_WRITE_TOKEN is not set' }, { status: 500 });
  }

  if (!request.body) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Convert the request body to a ReadableStream if necessary
  const fileStream = request.body as ReadableStream<Uint8Array>;

  try {
    // Upload the file to Vercel Blob
    const blob = await put(filename as string, fileStream, {
      access: 'public',
      token, // Pass the token here
  
    });

    return NextResponse.json(blob);
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
