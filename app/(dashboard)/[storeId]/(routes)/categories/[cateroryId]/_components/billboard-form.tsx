"use client";

import { Heading } from "@/components/heading";
import { Categories } from "@/types-db";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modal/alert-modal";
import ImageUpload from "@/components/image-upload";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/lib/firebase";
interface CategoryFormProps {
  initialData: Categories;
}

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

export const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const [open, setIsOpen] = useState(false);

  const title = initialData ? "Edit Billboards" : "Create BillBoards";
  const description = initialData ? "Edit a bill boards" : "Add a bill boards";
  const toastMessage = initialData ? "Billboard updated" : "Billboard created";
  const action = initialData ? "Save changes" : "Create Billboards";

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      toast.success(toastMessage);
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
    } catch (error: any) {
      const errorMessage = error.response?.data || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AlertModal
        isOpen={open}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {}}
        loading={isLoading}
      />
      <div className="flex items-center justify-start">
        <Heading title={title} description={description} />
        {initialData && (
          <Button variant={"destructive"} size={"icon"} disabled={isLoading}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="my-4" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-3">
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your billboard name"
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
    </div>
  );
};
