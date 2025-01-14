"use server";

import { signIn } from "../../../../auth";


export async function loginAction(email: string, code: string, timezone: string) {
  //  Send to our api route
  const res = await signIn('credentials', { email, code, timezone, redirect:false, })
  console.log('response:', res)

  return res
}
