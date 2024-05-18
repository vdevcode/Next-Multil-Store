"use client";

import { BadgeProps, Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Copy, Server } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const TextMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const VariantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert = ({
  title,
  description,
  variant = "public",
}: ApiAlertProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Api route coppied to clipboard");
  };

  return (
    <Alert className="">
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        {title} <Badge variant={VariantMap[variant]}>{TextMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <code className="relattive rounded-md">{description}</code>
        <Button variant={"outline"} size={"icon"} onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
