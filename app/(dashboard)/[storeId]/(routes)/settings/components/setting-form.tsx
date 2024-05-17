"use client";

import { Heading } from "@/components/heading";
import { Store } from "@/types-db";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

interface SettingFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Store name should be minimum 3 characters" }),
});

export const SettingForm = ({ initialData }: SettingFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/stores/${params.storeId}`, data);
      toast.success("Store update success!!!");
      window.location.assign(`/${response.data.id}`);
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <>
      <div className="flex items-center justify-start">
        <Heading title="Setting" description="Manager store for performances" />
        <Button variant={"destructive"} size={"icon"}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter store name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="">
            <Button type="submit" disabled={isLoading} size={"sm"}>
              {isLoading ? "Save changing..." : "Save change"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
