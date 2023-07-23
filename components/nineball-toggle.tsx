'use client';

import React from 'react';
import { Button } from './ui/button';
import { Terminal } from 'lucide-react';
import { useNineballContext } from './nineball-provider';

export default function NineballToggle() {
  const { showNineball, setShowNineball } = useNineballContext();

  return (
    <div>
      <Button
        variant={`outline`}
        size="icon"
        className="rounded-none"
        onClick={() => setShowNineball(!showNineball)}
      >
        <Terminal className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span className="sr-only">Toggle Nineball AI assistant</span>
      </Button>
    </div>
  );
}
