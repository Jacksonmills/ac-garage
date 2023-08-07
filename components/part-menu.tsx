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
import { SpecificPart, parts } from '@/db/parts';
import { BuildState } from './build-provider';

export function PartMenu({
  part,
  partType,
  label,
  setSelectedPart,
  selectedValue,
}: {
  part: string;
  partType: keyof BuildState;
  label: string;
  setSelectedPart: (part: keyof BuildState, value: string) => void;
  selectedValue?: string;
}) {
  const partsData = parts[part as keyof typeof parts];

  if (!partsData) {
    console.log('no parts data for', part);
  }

  const [selectedParts] = React.useState<SpecificPart[]>(() =>
    Object.values(partsData)
  );

  return (
    <Select
      onValueChange={(value: string) => setSelectedPart(partType, value)}
      value={selectedValue}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="sr-only">{part.toUpperCase()}</SelectLabel>
          <SelectItem value={`NO EQUIPMENT`}>NO EQUIPMENT</SelectItem>
          {selectedParts.map((option: SpecificPart) => (
            <div
              key={option.name.toLowerCase()}
              className="flex justify-between"
            >
              <SelectItem value={option.name.toLowerCase()}>
                {option.name.toUpperCase()}
              </SelectItem>
            </div>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
