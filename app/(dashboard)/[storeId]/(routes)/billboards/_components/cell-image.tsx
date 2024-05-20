"use client"

import { BillboardColumns } from "./columns"
import Image from "next/image"


interface CellImageProps{
    imageUrl: string
}

export const CellImage = ({imageUrl}: CellImageProps) => {
    return (
        <div className="w-32 min-h-16 overflow-hidden min-w-32 relative rounded-sm shadow-md cursor-pointer">
            <Image fill alt="Billboard image" className="object-cover" src={imageUrl} />
        </div>
    )
}


