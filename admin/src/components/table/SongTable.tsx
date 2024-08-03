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
import { convertMinutesToHours } from "@/utils";
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
                    <TableHead className="w-[100px] text-light" >#</TableHead>
                    <TableHead className="text-light">Thông tin</TableHead>
                    <TableHead className="text-light">Tên</TableHead>
                    <TableHead className="text-right text-light">Thời gian</TableHead>
                    <TableHead className="text-right text-light"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((song, index) => (
                    <TableRow key={song.id} className="row border-none hover:bg-muted/5">
                        <TableCell className="font-medium text-light">{index}</TableCell>
                        <TableCell>
                            <div className='flex gap-[10px] '>
                                <img src={song.thumbnail} alt="song" className='h-[40px] w-[40px] rounded-sm' />
                                <div>
                                    <p className='text-base font-semibold text-light'>{song.name}</p>
                                    <p className='text-sm text-light'>{song.artist_name}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-light">{song.name}</TableCell>
                        <TableCell className="text-right text-light">{convertMinutesToHours(song.duration)}</TableCell>
                        <TableCell className="text-right text-light">
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
