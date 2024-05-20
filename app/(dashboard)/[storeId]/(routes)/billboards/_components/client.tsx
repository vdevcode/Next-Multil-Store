"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumns, columns } from "./columns";

interface BillBoardClientPops{
  data: BillboardColumns[]
}

export const BillBoardClient = ({data}: BillBoardClientPops) => {
  const router = useRouter();
  const params = useParams();
  return (
   <div className="">
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
    <Separator className="my-4" />
      <DataTable searchKey="label" data={data} columns={columns} />
   </div>
  );
};
