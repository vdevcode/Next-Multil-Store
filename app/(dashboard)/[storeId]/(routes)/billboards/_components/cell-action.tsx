"use client";

import { useParams, useRouter } from "next/navigation";
import { BillboardColumns } from "./columns";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreVertical, Trash } from "lucide-react";
import toast from "react-hot-toast";

interface CellActionProps {
  data: BillboardColumns;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard id copied to clipboard");
  };

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuRadioItem value="left" onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            Coppy Id
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="left"
            onClick={() =>
              router.push(`/${params.storeId}/billboards/${data.id}`)
            }
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Id
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="left" onClick={() => {}}>
            <Trash className="h-4 w-4 mr-2" />
            Trash Id
          </DropdownMenuRadioItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
