import { Heading } from "@/components/heading"
import { Store } from "@/types-db"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

interface SettingFormProps{
    initialData: Store
}


export const SettingForm = ({initialData}: SettingFormProps) => {
    return (
        <div className="flex items-center justify-start">
            <Heading title="Setting" description="Manager store for performances" />
            <Button variant={"destructive"} size={"icon"} onClick={() => {}} className="">
                <Trash className="h-4 w-4"/>
            </Button>
        </div>
    )
}