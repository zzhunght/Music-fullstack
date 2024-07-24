import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Song } from "@/interface/song"
import { FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import './style.css'
export function SongTable({
    data, onRemove, title
}: {
    title? : string
    data?: Song[],
    onRemove: (song_id: number) => void
}) {
    return (
        <Table>
            <TableCaption>{title || 'Bài hát trong playlist'}</TableCaption>
            <TableHeader>
                <TableRow className=" border-none">
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Thông tin</TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead className="text-right">Thời gian</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((song, index) => (
                    <TableRow key={song.id} className="row border-none">
                        <TableCell className="font-medium">{index}</TableCell>
                        <TableCell>
                            <div className='flex gap-[10px] '>
                                <img src={song.thumbnail} alt="song" className='h-[40px] w-[40px] rounded-sm' />
                                <div>
                                    <p className='text-base font-semibold'>{song.name}</p>
                                    <p className='text-sm'>{song.artist_name}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{song.name}</TableCell>
                        <TableCell className="text-right">{song.duration}</TableCell>
                        <TableCell className="text-right">
                            <button onClick={() => onRemove(song.id)}>
                                <FaTrash className="trash" />
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
