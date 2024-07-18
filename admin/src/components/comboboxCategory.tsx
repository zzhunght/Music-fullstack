"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useGetCategoriesQuery } from "@/api/categoriesApi";



export function ComboboxCategory({
    categoryId,
    valueArt,
}: {
    categoryId: number;
    valueArt: React.Dispatch<React.SetStateAction<any>>;
}) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<number>(categoryId);
    const {data: categories} = useGetCategoriesQuery()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {value
                        ? categories?.find((category) => category.id === Number(value))
                              ?.name
                        : "Chọn danh mục..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search artist..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup className="max-h-[300px] overflow-y-auto">
                        {categories?.map((category) => {
                            // console.log(artist);
                            return (
                                <CommandItem
                                    key={category.id}
                                    value={category.name}
                                    onSelect={() => {
                                        setValue(
                                            category.id === value ? 0 : category.id
                                        );
                                        setOpen(false);
                                        valueArt(category.id);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            Number(value) === category.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {category.name}
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
