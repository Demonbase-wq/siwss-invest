"use server";

import { signIn } from "../../../../auth";


export async function adminAction(email: string, password: string, route: string) {
  //  Send to our api route
  const res = await signIn('credentials', { email, password, route, redirect:false, })
  console.log('response:', res)

  return res
}
