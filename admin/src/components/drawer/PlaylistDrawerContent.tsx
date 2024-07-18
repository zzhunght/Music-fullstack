import { useAddSongToPlaylistMutation, useGetPlaylistDetailQuery, useGetSongNotInplaylistQuery, useRemoveSongFromPlaylistMutation } from '@/api/playlistApi'
import { Playlist } from '@/interface/playlist'
import React, { useEffect } from 'react'
import { SongTable } from '../table/SongTable'
import SongItem from '../song/SongItem'
import { useToast } from '../ui/use-toast'

function PlaylistDrawerContent({ playlist }: { playlist: Playlist }) {
    const { data: song } = useGetPlaylistDetailQuery(playlist.id)
    const { data: songNotIn } = useGetSongNotInplaylistQuery(playlist.id)
    const [add, result] = useAddSongToPlaylistMutation()
    const [remove, resultRemove] = useRemoveSongFromPlaylistMutation()

    const { toast } = useToast()
    const handleAddSong = (song_id: number) => {
        add({ playlist_id: playlist.id, song_id: song_id })

    }
    const handleRemoveSong = (song_id: number) => {
        remove({ playlist_id: playlist.id, song_id: song_id })

    }

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

    return (
        <div className="w-full max-w-sm">
            <div className="h-[95vh] overflow-y-auto w-[100vw]">
                <div className='px-[50px]'>
                    <div className='h-[30vh] p-[20px] flex items-end gap-5 mt-10'>
                        <div className='w-[250px] h-[250px] shadow-custom
                                    rounded-md flex justify-center items-center'
                        >
                            {playlist.thumbnail ? (
                                <img
                                    src={playlist.thumbnail} alt=""
                                    className='w-full'
                                />
                            ) : (
                                <img
                                    src="https://static-00.iconduck.com/assets.00/music-notes-icon-2048x2046-o5kli2nk.png" alt=""
                                    width={100}

                                />
                            )}

                        </div>
                        <div className=''>
                            <p className='text-base font-bold'>Playlist</p>
                            <h1 className='text-[72px] font-bold m-0'>{playlist.name}</h1>
                            <p className='text-base font-bold'>{song?.length} bài hát</p>
                        </div>
                    </div>

                    <div className='p-[20px]'>
                        <div className='py-10 me-10'>
                            <SongTable data={song} onRemove={handleRemoveSong}/>
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold mb-5'>Recommended</h1>

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