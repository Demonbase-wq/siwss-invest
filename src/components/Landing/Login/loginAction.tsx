"use server";

import { signIn } from "../../../../auth";


export async function loginAction(email: string, code: string) {
  //  Send to our api route
  const res = await signIn('credentials', { email, code })
  console.log('response:', res)

  return res
}
