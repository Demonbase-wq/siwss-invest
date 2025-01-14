import  bcrypt  from 'bcryptjs';
import { users } from "@/lib/airtable";

export async function POST(request: Request) {
  const { email, password } = await request.json(); // Include timezone in the request

  try {
    const existingUsers = await users
      .select({
        filterByFormula: `AND({email} = '${email}', {role} = 'admin')`,
      })
      .firstPage();

    if (existingUsers.length === 0) {
      return Response.json({ message: "User not found." }, { status: 404 });
    }

    const user = existingUsers[0];
    const hashedPassword = user.fields.password as string;
   
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return Response.json({ error: "Invalid password." }, { status: 401 });
    }

    const userField = {
      id: user?.id,
      email: user?.fields.email,
      role: user?.fields.role,
      kyc: user?.fields.kyc,
    };

    // Proceed with successful verification
    return Response.json({ user: userField }, { status: 200 });
  } catch (error) {
    console.error("Error verifying user:", error);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
