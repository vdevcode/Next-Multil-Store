"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export const BillBoardClient = () => {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <Heading
        title={`Billboards (0)`}
        description="Manager billboards for store "
      />
      <Button onClick={() => router.push(`/${params.storeId}/billboards`)}>
        <Plus className="" />
        Add New
      </Button>
    </div>
  );
};
