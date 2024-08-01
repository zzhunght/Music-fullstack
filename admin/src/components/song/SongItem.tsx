import { useAddSongToPlaylistMutation } from '@/api/playlistApi'
import { Song } from '@/interface/song'
import { Plus } from 'lucide-react'
import React, { useEffect } from 'react'

function SongItem({ song, onAdd }: { song: Song, onAdd: (song_id: number) => void }) {

    return (
        <div className='flex justify-between
         w-full h-[80px] py-[5px] items-center 
        hover:bg-muted/5 pr-20 rounded-lg pl-[20px]'>
            <div className='flex gap-[10px] '>
                <img src={song.thumbnail} alt="song" className='h-[55px] w-[55px] rounded-sm object-cover' />
                <div>
                    <p className='text-base text-light'>{song.name}</p>
                    <p className='text-sm text-light'>{song.artist_name}</p>
                </div>

            </div>
            <p className='text-base text-light'>{song.name}</p>
            <button className='border-[1px] border-solid rounded-full  py-1 border-gray-500 w-[32px] h-[32px] items-center justify-center flex'
                onClick={() => onAdd(song.id)}
            >
                <Plus color='white' />
            </button>
        </div>
    )
}

export default SongItem