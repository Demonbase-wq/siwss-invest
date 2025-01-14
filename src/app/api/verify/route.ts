import { users } from "@/lib/airtable";

export async function POST(request: Request) {
  const { email, code, timezone } = await request.json(); // Include timezone in the request

  try {
    // Fetch the user record by email
    const records = await users
      .select({
        filterByFormula: `{email} = '${email}'`,
      })
      .firstPage();

    if (records.length === 0) {
      return Response.json({ message: "User not found." }, { status: 404 });
    }

    const user = records[0];
    const vcode = user.fields.verificationCode?.toString();

    if (vcode === code) {
      // Check if the timezone differs from the stored value
      const storedTimezone = user.fields.timezone;

      if (storedTimezone !== timezone) {
        // Update the user's timezone in Airtable
        await users.update(user.id, { timezone });
        console.log(
          `Updated timezone for user ${email}: ${storedTimezone} -> ${timezone}`
        );
      }

      const userField = {
        id: user?.id,
        email: user?.fields.email,
        role: user?.fields.role,
        kyc: user?.fields.kyc
      }

      // Proceed with successful verification
      return Response.json({ user: userField  }, { status: 200 });
    } else {
      return Response.json({ error: "Invalid verification code." }, { status: 401 });
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
