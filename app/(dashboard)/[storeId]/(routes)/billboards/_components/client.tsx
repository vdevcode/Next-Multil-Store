"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export const BillBoardClient = () => {
  const router = useRouter();
  const params = useParams();
  return (
    <div className="flex items-center justify-between">
      <Heading
        title={`Billboards (0)`}
        description="Manager billboards for your store"
      />
      <Button className="" onClick={() => router.push(`/${params.storeId}/billboards/create`)}>
        <Plus className="h-4 w-4 mr-2" />
        New Store
      </Button>
    </div>
  );
};
