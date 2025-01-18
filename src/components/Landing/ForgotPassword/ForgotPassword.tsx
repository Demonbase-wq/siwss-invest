"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { useTranslation } from "@/translations/provider";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPasswordForm() {
    const { translations } = useTranslation();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Sending reset link...");
    try {
      const response = await axios.post(`/api/request-reset`, values);
      const error = await response?.data.error;
      const message = await response?.data.message;
      if (message) {
        toast.dismiss(toastId);
        toast.success(message);
        form.reset();
      }
      if (error) {
        toast.dismiss(toastId);
        toast.error(error);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
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
          <CardTitle>{translations?.forgotPassword?.text1}</CardTitle>
          <CardDescription>
          {translations?.forgotPassword?.text2}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations?.forgotPassword?.text3}</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent">
              {translations?.forgotPassword?.text4}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
