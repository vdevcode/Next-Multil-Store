"use client";

import { Modal } from "@/components/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";


const formSchema = z.object({
  name: z.string().min(3, { message: "Should be minimum 3 characters" }),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [isLoading, setIsLoading] = useState(false);

  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", values);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create Your Store"
      description="Enter the details below to create your store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="py-4 space-y-4">
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={formMethods.control}
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
                  <FormDescription>This is your public name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-[10px]">
              <Button type="button" variant={"outline"}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} size={"sm"}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};
