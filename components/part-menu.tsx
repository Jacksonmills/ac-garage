import * as React from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export function PartMenu({
    part,
    options,
}: {
    part: string
    options: string[]
}) {
    return (
        <Select>
            <SelectTrigger className="w-[180px] rounded-none">
                <SelectValue placeholder={`Select a ${part}`} />
            </SelectTrigger>
            <SelectContent className="rounded-none">
                <SelectGroup>
                    <SelectLabel>{part}S</SelectLabel>
                    {options.map((option) => (
                        <div key={option.toLowerCase()}>
                            <SelectItem
                                className="rounded-none"
                                value={option.toLowerCase()}
                            >
                                {option.toUpperCase()}
                            </SelectItem>
                        </div>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
