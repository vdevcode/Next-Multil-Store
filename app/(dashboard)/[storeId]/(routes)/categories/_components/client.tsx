"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {CategoriesColumns, columns} from "./columns"

interface CategoryClientPops{
  data: CategoriesColumns[]
}

export const CategoryClient = ({data}: CategoryClientPops) => {
  const router = useRouter();
  const params = useParams();
  return (
   <div className="">
     <div className="flex items-center justify-between">
      <Heading
        title={`Categories (${data.length})`}
        description="Manager categories for your store"
      />
      <Button className="" onClick={() => router.push(`/${params.storeId}/categories/create`)}>
        <Plus className="h-4 w-4 mr-2" />
        New Category
      </Button>
    </div>
    <Separator className="my-4" />
      <DataTable searchKey="label" data={data} columns={columns} />
   </div>
  );
};
