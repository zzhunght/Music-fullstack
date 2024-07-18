"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useGetArtistQuery } from "@/api/artistApi";
import AritstSheet from "@/components/sheet/artist/artistSheet";
import { DialogAddPlaylist } from "@/components/dialog/DialogAddPlaylist";
import { useGetPlaylistQuery } from "@/api/playlistApi";
import PlaylistItem from "@/components/PlaylistItem";
import PlaylistDrawer from "@/components/drawer/PlaylistDrawer";

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
export function TablePlaylist() {
    const { data: playlist } = useGetPlaylistQuery()
    const [search, setSearch] = React.useState("")

    const getData = () => {

        return playlist?.filter(playlist => playlist.name.toLocaleLowerCase().startsWith(search)) || []
    }

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <Input
                    placeholder="Tên playlist"
                    className="w-[300px] my-[20px]"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <DialogAddPlaylist />
            </div>

            <motion.div className="flex flex-row flex-wrap gap-[10px]" layoutScroll layoutRoot>
                {getData().map((playlist) => (
                    <motion.div key={playlist.id}
                        layout="position"
                        layoutId={playlist.id.toString()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: { ease: "linear" },
                            layout: { duration: 0.3 }
                        }}
                    >
                        <PlaylistDrawer playlist={playlist}>
                            <PlaylistItem playlist={playlist} />
                        </PlaylistDrawer>
                    </motion.div>

                ))}
            </motion.div>

        </div>
    );
}
