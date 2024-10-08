"use client";
import * as React from "react";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Album } from "@/interface/album";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "./ui/sheet";
import { getLinearColor, getPalette } from "@/utils/extractColor";
import { SongTable } from "./table/SongTable";
import { useAddSongToAlbumMutation, useDeleteAlbumMutation, useGetAlbumSongQuery, useGetSongNotInpAlbumQuery, useRemoveSongFromAlbumMutation } from "@/api/albumApi";
import SongItem from "./song/SongItem";
import { DialogEditAlbum } from "./dialog/DialogEditAlbum";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";

export function AlbumsItem({ album }: { album: Album }) {
    const [deleteAlbum, resultDelete] = useDeleteAlbumMutation()
    const [open, setOpen] = React.useState(false);
    const [dominantColor, setDominantColor] = React.useState<any>();
    const { data: songs } = useGetAlbumSongQuery(album.id, {
        skip: !open
    })
    const { data: songNotIn } = useGetSongNotInpAlbumQuery(album.id, {
        skip: !open
    })
    const [add, result] = useAddSongToAlbumMutation()
    const [remove, resultRemove] = useRemoveSongFromAlbumMutation()

    const handleAddSong = (song_id: number) => {
        add({ album_id: album.id, song_id: song_id })

    }
    const handleRemoveSong = (song_id: number) => {
        remove({ album_id: album.id, song_id: song_id })

    }
    React.useEffect(() => {
        if (album.thumbnail) {
            getPalette(album.thumbnail).then((palette) => {
                setDominantColor(palette)
            }).catch((error) => {
                console.log("get color error", error);
            })
        }
    }, [album.thumbnail]);


    React.useEffect(()=>{
        if(resultDelete.data){
            setOpen(false)
        }
    },[resultDelete])


    return (
        <Sheet open={open}>
            <SheetTrigger asChild onClick={() => setOpen(true)}>
                <Card className="w-[100%] border-none cursor-pointer">
                    <CardHeader className="p-0 rounded-lg overflow-hidden" >
                        <img
                            className="object-cover w-full h-[300px]"
                            alt="album"
                            src={album.thumbnail}
                        />
                    </CardHeader>
                    <CardContent className="p-2 flex items-center justify-between">
                        <div>
                            <span className="text-lg font-semibold">{album.name}</span>
                            <p className="text-base">{album.artist_name}</p>
                        </div>
                    </CardContent>
                </Card>
            </SheetTrigger>
            <SheetContent
                onCloseClick={() => setOpen(false)}
                onOverlayClick={() => setOpen(false)}
                className="sm:max-w-[80vw] max-w-[80vw] w-[80vw] overflow-x-hidden border-none"
                style={dominantColor?.length > 0 ? {
                    // background:  `red`
                    background: getLinearColor(dominantColor.slice(1, 2))
                } : {}}
            >
                <div className="sm:max-w-[80vw] w-[80vw]">
                    <DialogEditAlbum album={album}>
                        <div className='h-[30vh] p-[20px] flex items-end gap-5 mt-10  cursor-pointer'>
                            <div
                                className='w-[250px] h-[250px] shadow-custom rounded-md flex justify-center items-center'
                            >
                                <img
                                    src={album.thumbnail} alt=""
                                    className='w-full rounded-lg object-cover h-full'
                                />
                            </div>
                            <div className=''>
                                <p className='text-base font-bold text-light'>album</p>
                                <h1 className='text-[72px] font-bold m-0 text-light'>{album.name}</h1>
                            </div>
                        </div>
                    </DialogEditAlbum>
                    <div className='px-[20px] flex items-center'>
                        {/* <button className='rounded-full bg-[#33d166] h-[56px] w-[56px] flex items-center justify-center  mr-5'>
                            <FaPlay />
                        </button> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button>
                                    <BsThreeDots className='text-light' fontSize={36} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-[190px] p-1 ">
                                <div className="w-full flex items-center cursor-pointer hover:bg-[#cccccc] h-[35px] rounded-sm p-1 gap-2"
                                    onClick={()=>deleteAlbum(album.id)}
                                >
                                    <TiDeleteOutline fontSize={24}/>
                                    <p>Xoá</p>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='py-10 me-10'>
                        <SongTable data={songs} onRemove={handleRemoveSong} title="Bài hát trong album" />
                    </div>
                    <div>
                        <h1 className='text-3xl font-bold mb-5 text-light'>Thêm </h1>

                        <div className='w-full flex flex-col gap-2'>
                            {songNotIn?.map(i => (
                                <SongItem key={i.id.toString()} song={i} onAdd={handleAddSong} />
                            ))}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>

    );
}
