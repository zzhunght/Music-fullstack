import { useAddSongToPlaylistMutation, useDeletePlaylistMutation, useGetPlaylistByIdQuery, useGetPlaylistDetailQuery, useGetSongNotInplaylistQuery, useRemoveSongFromPlaylistMutation } from '@/api/playlistApi'
import { Playlist } from '@/interface/playlist'
import React, { useEffect, useState } from 'react'
import { SongTable } from '../table/SongTable'
import SongItem from '../song/SongItem'
import { useToast } from '../ui/use-toast'
import { DialogEditPlaylist } from '../dialog/DialogEditPlaylist'
import { getLinearColor, getPalette } from '@/utils/extractColor'
import { FaPlay } from "react-icons/fa6";
import { BsThreeDots } from 'react-icons/bs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { TiDeleteOutline } from "react-icons/ti";
import { Input } from '../ui/input'

import _ from 'lodash';
function PlaylistDrawerContent({ playlist, close }: { playlist: Playlist, close: ()=>void }) {
    const [dominantColor, setDominantColor] = React.useState<any>();
    const [search, setSearch] = useState('')


    const { data: item } = useGetPlaylistByIdQuery(playlist.id)
    const { data: song } = useGetPlaylistDetailQuery(playlist.id)
    
    const [add, result] = useAddSongToPlaylistMutation()
    const [remove, resultRemove] = useRemoveSongFromPlaylistMutation()
    const [deletePlaylist,resultDelete] = useDeletePlaylistMutation()
    
    

    const { data: songNotIn } = useGetSongNotInplaylistQuery({
        id: playlist.id,
        search: search
    })
    const { toast } = useToast()
    const handleAddSong = (song_id: number) => {
        add({ playlist_id: playlist.id, song_id: song_id })

    }
    const handleRemoveSong = (song_id: number) => {
        remove({ playlist_id: playlist.id, song_id: song_id })

    }

    const handleTextChange = _.debounce((e) => {
        setSearch(e.target.value)
    }, 500)

    useEffect(() => {
        if (result.data) {
            toast({
                title: "Thành công",
                description: "Thêm bài hát thành công",
            })
        }

        if (result.error) {
            toast({
                title: "Thất bại",
                description: "Thêm bài hát thất bại",
            })
        }
    }, [result])

    useEffect(() => {
        if (resultRemove.data) {
            toast({
                title: "Thành công",
                description: "Xoá bài hát thành công",
            })
        }

        if (resultRemove.error) {
            toast({
                title: "Thất bại",
                description: "Xoá bài hát thất bại",
            })
        }
    }, [resultRemove])


    useEffect(()=>{
        if(resultDelete.data){
            close()
        }
    },[resultDelete])

    React.useEffect(() => {
        if (playlist.thumbnail) {
            getPalette(playlist.thumbnail).then((palette) => {
                setDominantColor(palette)
            }).catch((error) => {
                console.log("get color error", error);
            })
        }
    }, [playlist]);

    return (
        <div className="w-full max-w-sm">
            <div className="h-[95vh] overflow-y-auto w-[100vw]"
                style={dominantColor?.length > 0 ? {
                    // background:  `red`
                    background: getLinearColor(dominantColor.slice(1, 2))
                } : {}}
            >
                <div className='px-[50px]'>
                    <DialogEditPlaylist playlist={item || playlist}>
                        <div className='h-[30vh] p-[20px] flex items-end gap-5 mt-10  cursor-pointer'>
                            <div className='w-[250px] h-[250px] shadow-custom
                                    rounded-md flex justify-center items-center'
                            >
                                {playlist.thumbnail ? (
                                    <img
                                        src={playlist.thumbnail} alt=""
                                        className='w-full rounded-lg object-cover h-full'
                                    />
                                ) : (
                                    <img
                                        src="https://static-00.iconduck.com/assets.00/music-notes-icon-2048x2046-o5kli2nk.png" alt=""
                                        width={100}

                                    />
                                )}

                            </div>
                            <div className=''>
                                <p className='text-base font-bold text-light'>Playlist</p>
                                <h1 className='text-[72px] font-bold m-0 text-light'>{playlist.name}</h1>
                                <p className='text-base font-bold text-light'>{song?.length} bài hát</p>
                            </div>
                        </div>
                    </DialogEditPlaylist>
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
                                    onClick={()=>deletePlaylist(playlist.id)}
                                >
                                    <TiDeleteOutline fontSize={24}/>
                                    <p>Xoá</p>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className='p-[20px]'>
                        <div className='py-5 me-10'>
                            <SongTable data={song} onRemove={handleRemoveSong} />
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold mb-5 text-light'>Gợi ý</h1>
                            <Input 
                                placeholder="Tìm kiếm bài hát" 
                                className='outline-none w-[300px] mb-10 ml-[20px]  
                                border-none bg-muted/15 text-light placeholder:text-light focus-visible:ring-offset-0 focus-visible:ring-transparent'
                                value={search}
                                onChange={handleTextChange}
                            />
                            <div className='w-full flex flex-col gap-2'>
                                {songNotIn?.map(i => (
                                    <SongItem key={i.id.toString()} song={i} onAdd={handleAddSong} />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PlaylistDrawerContent