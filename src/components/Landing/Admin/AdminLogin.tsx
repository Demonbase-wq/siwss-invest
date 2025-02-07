"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { adminAction } from "./adminAction";

const formSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email(),
  route: z.string(),
});

export default function AdminLogin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
      route: "/admin/login",
    },
  });
  const router = useRouter();

  const handleSignIn = async (
    values: z.infer<typeof formSchema>
  ) => {
    const toastId = toast.loading("Logging in, please wait...");
    const formattedEmail = values.email.toLowerCase();

    try {
      await adminAction(formattedEmail, values.password, values.route);
      toast.dismiss(toastId);
      toast.success(
        "Login succesfull!! you will be redirected to the dashboard page shortly"
      );
      router.push("/admin/dashboard");
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error("Error logging in");
    }
  };


  return (
    <div
      className="min-h-screen px-4 relative bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url(/bg4.jpg)" }}
    >
      <div className="absolute inset-0 bg-[#181254] bg-opacity-80 z-0"></div>

      <Card className="w-full max-w-md z-10">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent">
               Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
