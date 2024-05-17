"use client";

import { Store } from "@/types-db";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type PopoverTriggerPops = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerPops {
  items: Store[];
}

export const StoreSwitcher = ({ items }: StoreSwitcherProps) => {
  const params = useParams();
  const router = useRouter();

  const formatedStore = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formatedStore.find(
    (item) => item.value === params.storeId
  );
  const [open, setOpen] = useState(false);
  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`${store.value}`);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {currentStore?.value
              ? formatedStore.find(
                  (framework) => framework.value === currentStore.value
                )?.label
              : "Select store..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No Store found.</CommandEmpty>
            <CommandGroup>
              {formatedStore.map((store) => (
                <CommandItem
                  key={store.value}
                  value={store.value}
                  onSelect={(currentValue) => {
                    // setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {store.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
