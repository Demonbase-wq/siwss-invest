import bcrypt from "bcryptjs";
import { users } from "@/lib/airtable";
import { auth } from "../../../../auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { verificationCode, newPassword } = await request.json();

  try {
    const records = await users.find(session.user.id as string);

    if (!records) {
      return Response.json({ message: "User not found." }, { status: 200 });
    }

    const user = records;
    const vcode = user?.fields?.verificationCode?.toString();

    if (verificationCode !== vcode) {
      return Response.json(
        { error: "Invalid verification code." },
        { status: 200 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await users.update([
      {
        id: user?.id,
        fields: { password: hashedPassword },
      },
    ]);

    return Response.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 200 });
  }
}
