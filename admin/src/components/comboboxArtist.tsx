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
import { useGetArtistQuery } from "@/api/artistApi";


export function ComboboxArtist({
    valueArtistId,
    valueArt,
}: {
    valueArtistId: number;
    valueArt: React.Dispatch<React.SetStateAction<any>>;
}) {
    // console.log(valueArtistId);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<number>(valueArtistId);

    const {data: artists} = useGetArtistQuery()
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? artists?.find((artist) => artist.id === Number(value))
                              ?.name
                        : "Select artist..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search artist..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup className="max-h-[300px] overflow-y-auto">
                        {artists?.map((artist) => {
                            // console.log(artist);
                            return (
                                <CommandItem
                                    key={artist.id}
                                    value={artist.name}
                                    onSelect={() => {
                                        // console.log(artist.id);
                                        setValue(
                                            artist.id === value ? 0 : artist.id
                                        );
                                        setOpen(false);
                                        valueArt(artist.id);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            Number(value) === artist.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {artist.name}
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
