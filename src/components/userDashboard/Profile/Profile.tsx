"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import useSWR, { mutate } from "swr";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useTranslation } from "@/translations/provider";

const formSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  dob: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  address: z.string().optional(),
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProfileForm() {
  const { data } = useSWR("/api/get-user", fetcher);
  const [loading, setLoading] = useState(true);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { translations } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      dob: "",
      phone: "",
      email: "",
      country: "",
      state: "",
      address: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        dob: data.dob || "",
        phone: data.phone || "",
        email: data.email || "",
        country: data.country || "",
        state: data.state || "",
        address: data.address || "",
      });
      setLoading(false)
    }
  }, [data, form]);

  const handleImageUpload = async (): Promise<string | null> => {
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/upload-image?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = await response.json();
    return newBlob?.url ?? null;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const toastId = toast.loading("Updating profile...");
      let newImageUrl: string | null = null;

      if (inputFileRef.current?.files?.length) {
        newImageUrl = await handleImageUpload();

        if (newImageUrl && data?.img) {
          const res = await fetch(`/api/delete-image?filename=${data.img}`, {
            method: "DELETE",
          });

          if (!res.ok) {
            toast.dismiss(toastId);
            toast.error("Failed to delete old image. Please try again.");
            return;
          }
        }
      }

      // Only include changed fields in the update
      const changedFields = Object.entries(values).reduce((acc, [key, value]) => {
        if (value !== data[key]) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);

      if (newImageUrl) {
        changedFields.img = newImageUrl;
      }

      // Only send the update if there are changed fields
      if (Object.keys(changedFields).length > 0) {
        const updatedDetails = {
          ...changedFields,
          timestamp: Date.now(),
        };

        const response = await axios.post("/api/update-user", updatedDetails);
        const message = response.data.message;
        const error = response.data.error;
        if (message) {
          toast.dismiss(toastId);
          toast.success(message);
          mutate("/api/get-user"); // Refresh the user data
        }
        if (error) {
          toast.dismiss(toastId);
          toast.error(error);
        }
      } else {
        toast.dismiss(toastId);
        toast.info("No changes to update");
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (loading || !data) {
    return (
      <dialog
        id="loading-modal"
        className={`modal bg-primary ${loading ? "opacity-100" : ""}`}
      >
        <div className="flex items-center justify-center gap-3">
          <span className="loading loading-dots loading-lg bg-white"></span>
        </div>
      </dialog>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{translations?.dashboardAccount?.text2}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={data.img}
                  alt="Profile picture"
                />
                <AvatarFallback>
                  {data.first_name?.[0]}
                  {data.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <FormLabel htmlFor="picture">{translations?.dashboardAccount?.text3}</FormLabel>
                <Input
                  id="picture"
                  type="file"
                  ref={inputFileRef}
                  className="w-full max-w-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations?.dashboardAccount?.text4}</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations?.dashboardAccount?.text5}</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations?.dashboardAccount?.text6}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations?.dashboardAccount?.text7}</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations?.dashboardAccount?.text8}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations?.dashboardAccount?.text9}</FormLabel>
                  <FormControl>
                    <Input placeholder="United States" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations?.dashboardAccount?.text10}</FormLabel>
                  <FormControl>
                    <Input placeholder="California" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations?.dashboardAccount?.text11}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St, Anytown, CA 12345"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                {translations?.dashboardAccount?.text12}
              </Button>
              <Button type="submit" className="bg-accent">
              {translations?.dashboardAccount?.text13}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

