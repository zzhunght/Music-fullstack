import { useAddSongToPlaylistMutation } from '@/api/playlistApi'
import { Song } from '@/interface/song'
import React, { useEffect } from 'react'

function SongItem({ song , onAdd}: { song: Song, onAdd: (song_id :number) => void}) {
   
    return (
        <div className='flex justify-between
         w-full h-[60px] py-[5px] items-center 
         flex-1 hover:bg-[#ebeae8] pe-10 ps-2 rounded-sm'>
            <div className='flex gap-[10px] '>
                <img src={song.thumbnail} alt="song" className='h-[40px] w-[40px] rounded-sm' />
                <div>
                    <p className='text-base font-semibold'>{song.name}</p>
                    <p className='text-sm'>{song.artist_name}</p>
                </div>

            </div>
            <p className='text-base font-semibold'>{song.name}</p>
            <button className='border-[1px] border-solid px-2 rounded-full  py-1'
                onClick={()=>onAdd(song.id)}
            >
                <p>Thêm</p>
            </button>
        </div>
    )
}

export default SongItem