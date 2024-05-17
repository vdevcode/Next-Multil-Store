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
  CommandList,
} from "./ui/command";
import { Check, ChevronsUpDown, StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { StoreListItem } from "./store-list-item";
import { CreateStoreItem } from "./create-store-item";
import { useStoreModal } from "@/hooks/use-store-modal";

type PopoverTriggerPops = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerPops {
  items: Store[];
}

export const StoreSwitcher = ({ items }: StoreSwitcherProps) => {
  const params = useParams();
  const router = useRouter();

  const formatedStore = items?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formatedStore?.find(
    (item) => item.value === params.storeId
  );
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState<{ label: string; value: string }[]>(
    []
  );

  const storeModal = useStoreModal();

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`${store.value}`);
  };

  const handleSearchTerm = (e: any) => {
    setSearchTerm(e.target.value);
    setFiltered(
      formatedStore?.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            <StoreIcon className="mr-2 w-4 h-4" />
            {currentStore?.value
              ? formatedStore?.find(
                  (framework) => framework.value === currentStore.value
                )?.label
              : "Select store..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            {/* <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No Store found.</CommandEmpty> */}
            <div className="px-2 py-2 flex items-center border rounded-md border-gray-100">
              <StoreIcon className="mr-2 w-4 h-4" />
              <input
                type="text"
                placeholder="Search store..."
                onChange={handleSearchTerm}
                className="flex-1 w-full outline-none"
              />
            </div>
            <CommandList>
              <CommandGroup heading="stores">
                {searchTerm === "" ? (
                  formatedStore?.map((item) => (
                    <StoreListItem
                      store={item}
                      key={item.value}
                      onSelect={onStoreSelect}
                      isChecked={currentStore?.value === item.value}
                    />
                  ))
                ) : filtered?.length === 0 ? (
                  filtered?.map((item) => (
                    <StoreListItem
                      store={item}
                      key={item.value}
                      onSelect={onStoreSelect}
                      isChecked={currentStore?.value === item.value}
                    />
                  ))
                ) : (
                  <CommandEmpty>No Store found.</CommandEmpty>
                )}
              </CommandGroup>
            </CommandList>
            <CommandList>
              <CommandGroup>
                <CreateStoreItem
                  onClick={() => {
                    setOpen(false);
                    storeModal.onOpen();
                  }}
                />
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
