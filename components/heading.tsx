"use client"

interface HeadingProps{
    title: string
    description: string
}


export const Heading = ({title, description}: HeadingProps) => {
    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground hover:text-primary mt-1">{description}</p>
        </div>
    )
}