"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellImage } from "./cell-image"

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
    cell: ({row}) => {
      const {imageUrl} = row.original
      return <CellImage imageUrl={imageUrl} />
    }
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
