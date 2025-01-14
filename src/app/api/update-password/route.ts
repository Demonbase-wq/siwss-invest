import bcrypt from "bcryptjs";
import { users } from "@/lib/airtable";
import { auth } from "../../../../auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { currentPassword, newPassword } = await request.json();

  try {
    const records = await users
      .select({
        filterByFormula: `{id} = '${session.user.id}'`,
      })
      .firstPage();

    if (records.length === 0) {
      return Response.json({ message: "User not found." }, { status: 404 });
    }

    const user = records[0];

    const hashedPassword = user.fields.password as string;

    const isMatch = await bcrypt.compare(currentPassword, hashedPassword);

    if (!isMatch) {
      return Response.json({ error: "Invalid password." }, { status: 200 });
    }

    const newhashedPassword = await bcrypt.hash(newPassword, 10);

    await users.update([
      {
        id: records[0].id,
        fields: { password: newhashedPassword },
      },
    ]);

    return Response.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: error });
  }
}
