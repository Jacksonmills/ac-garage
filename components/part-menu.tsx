'use client';

import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Head, Parts, parts } from '@/db/parts';
import { Terminal } from 'lucide-react';
import { Button } from './ui/button';
import { useChat } from 'ai/react';

export function PartMenu({
  part,
  label,
}: {
  part: keyof typeof parts;
  label: string;
}) {
  const { append } = useChat();
  const [selectedParts, setSelectedParts] = React.useState<any>([]);

  function appendChatWithPartInfo() {
    append({
      role: 'system',
      content: 'test',
    });
  }

  React.useEffect(() => {
    const arrayOfParts = Object.values(parts[part]) as Head[];
    setSelectedParts(arrayOfParts);
  }, [part]);

  return (
    <Select>
      <SelectTrigger className="w-full rounded-none">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="rounded-none">
        <SelectGroup>
          <SelectLabel className="sr-only">{part.toUpperCase()}</SelectLabel>
          <SelectItem value={`NO EQUIPMENT`}>NO EQUIPMENT</SelectItem>
          {selectedParts.map((option: any) => (
            <div
              key={option.name.toLowerCase()}
              className="flex justify-between"
            >
              <SelectItem
                className="rounded-none"
                value={option.name.toLowerCase()}
              >
                {option.name.toUpperCase()}
              </SelectItem>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-none"
                onClick={appendChatWithPartInfo}
              >
                <Terminal />
              </Button>
            </div>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
