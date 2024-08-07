import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from './ui/calendar'
import { cn } from '@/lib/utils'
import moment from 'moment'

interface DatePickerProps {
    label: string
    value: string
    setValue: (value: Date ) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ label, setValue, value }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] pl-3 text-left font-normal"
                    )}
                >
                    <span>{value || label || 'Chọn ngày'}</span>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto p-0"
                align="start"
            >
                <Calendar
                    selected={new Date(value)}
                    mode="single"
                    onSelect={(v) => {
                        v &&  setValue(v)
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker