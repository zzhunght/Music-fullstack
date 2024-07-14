import * as React from "react";
import { Disc3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { TableAlbumSong } from "./ui/customs/dataTables/tableAlbumSong";
import { TableAddSongAlbum } from "./ui/customs/dataTables/tableAddSongAlbum";

export function DrawerAlbum({
    data,
    open,
    setOpen,
}: {
    data: any;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}) {
    const [addSong, setAddSOng] = React.useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            {/* <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger> */}
            <DrawerContent>
                <div className="flex flex-col max-h-[90vh] overflow-y-auto">
                    <div className=" flex ">
                        <div className="p-6">
                            <div className="flex space-x-2 items-center">
                                <img
                                    className="h-[232px] w-[232px] rounded-md object-cover"
                                    alt="album"
                                    src={data.thumbnail}
                                />
                                <div className="flex flex-col space-y-4">
                                    <div>
                                        <span className="text-4xl font-semibold">
                                            {data.name}
                                        </span>
                                        <p className="text-md text-red-600">
                                            Black Pink
                                        </p>
                                    </div>
                                    <Button onClick={() => setAddSOng(true)}>
                                        <Disc3 strokeWidth={1.5} />
                                        <span className="ml-2">Add</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 p-4">
                            <TableAlbumSong albumId={data.id} />
                        </div>
                    </div>
                    <div className="max-h-[200px]">
                        {addSong && (
                            <TableAddSongAlbum
                                setOpen={setAddSOng}
                                albumId={data.id}
                            />
                        )}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
