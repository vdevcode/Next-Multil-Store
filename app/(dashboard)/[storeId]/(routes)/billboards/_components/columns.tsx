"use client"

import { ColumnDef } from "@tanstack/react-table"
export interface BillboardColumns{
  id: string
  label: string
  imageUrl: string
  createAt: string
}

export const columns: ColumnDef<BillboardColumns>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
  },
  {
    accessorKey: "label",
    header: "Billboard Name",
  },
  {
    accessorKey: "createAt",
    header: "Date",
  },
]
