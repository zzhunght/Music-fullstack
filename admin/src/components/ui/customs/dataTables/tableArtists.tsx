"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import CreateAritstSheet from "@/components/sheet/artist/createArtistSheet";
import { useGetArtistQuery } from "@/api/artistApi";
import AritstSheet from "@/components/sheet/artist/artistSheet";

export type Song = {
    id: number;
    name: string;
    thumbnail: string;
    artists: Artist[];
    duration: number;
    releaseDate: string;
};

type Artist = {
    id: number;
    name: string;
    avatar_url: string;
};
export function TableArtists() {
    const {data: artist} = useGetArtistQuery()
    const [search, setSearch] = React.useState("")

    const getData = () => {
        return artist?.filter(artist => artist.name.toLocaleLowerCase().startsWith(search))|| []
    }

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <Input
                    placeholder="Tên nghệ sĩ"
                    className="w-[300px] my-[20px]"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <CreateAritstSheet />
            </div>
            
            <motion.div className="flex flex-row flex-wrap" layoutScroll layoutRoot>
                {getData().map((artist) => (
                    <motion.div key={artist.id}
                        layout="position"
                        layoutId={artist.id.toString()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: { ease: "linear" },
                            layout: { duration: 0.3 }
                        }}
                    >
                        <AritstSheet artist={artist} key={artist.id.toString()} />
                    </motion.div>

                ))}
            </motion.div>

        </div>
    );
}
