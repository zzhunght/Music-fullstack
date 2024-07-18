import React, { useEffect } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { Button } from '../ui/button'
import { BarChart, Minus, Plus } from 'lucide-react'
import { Bar, ResponsiveContainer } from 'recharts'
import SongItem from '../song/SongItem'
import { SongTable } from '../table/SongTable'
import { useGetPlaylistDetailQuery, useGetSongNotInplaylistQuery } from '@/api/playlistApi'
import { Playlist } from '@/interface/playlist'
import PlaylistDrawerContent from './PlaylistDrawerContent'

function PlaylistDrawer({ children, playlist }: { children: React.ReactNode, playlist: Playlist }) {

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button>
                    <div>{children}</div>
                </button>
            </DrawerTrigger>
            <DrawerContent >
                <PlaylistDrawerContent playlist={playlist} />
            </DrawerContent>
        </Drawer>
    )
}

export default PlaylistDrawer