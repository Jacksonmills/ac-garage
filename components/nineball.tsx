'use client';

import React from 'react';
import { useChat } from 'ai/react';
import { motion, useDragControls } from 'framer-motion';
import { useNineballContext } from './nineball-provider';
import ReactMarkdown from 'react-markdown';
import NineballToggle from './nineball-toggle';
import { Expand, GripVertical, Shrink } from 'lucide-react';
import { Button } from './ui/button';
import { initPrompt } from '@/lib/initPrompt';
import { useUser } from '@clerk/nextjs';

export default function Nineball() {
  const { user } = useUser();
  const dragControls = useDragControls();
  const { showNineball } = useNineballContext();
  const { messages, input, handleInputChange, handleSubmit, append } =
    useChat();
  const elementRef = React.useRef<HTMLDivElement>(null);
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  const [terminalExpanded, setTerminalExpanded] = React.useState(false);

  function startDrag(event: React.PointerEvent<HTMLButtonElement>) {
    dragControls.start(event, { snapToCursor: false });
  }

  React.useEffect(() => {
    console.log(messages);
    if (elementRef.current) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
  }, [messages]);

  React.useEffect(() => {
    append({
      role: 'system',
      content: initPrompt,
    });
  }, [append]);

  return (
    <motion.div
      ref={constraintsRef}
      className="w-screen h-screen absolute top-0 left-0 overflow-hidden pointer-events-none"
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        className="absolute bottom-4 right-4"
      >
        {showNineball && (
          <div className="p-2 bg-black w-fit relative">
            <div className="bg-black/50 absolute top-0 left-0 p-2 pointer-events-auto w-full flex justify-between items-center">
              <div className="flex gap-2">
                <NineballToggle />
                <Button
                  variant={`outline`}
                  size="icon"
                  className="rounded-none"
                  onClick={() => setTerminalExpanded(!terminalExpanded)}
                >
                  {terminalExpanded && <Shrink />}
                  {!terminalExpanded && <Expand />}
                </Button>
              </div>
              <Button
                variant={`secondary`}
                size="icon"
                className="rounded-none cursor-grab"
                onPointerDown={startDrag}
              >
                <GripVertical className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                <span className="sr-only">Drag Nineball AI assistant</span>
              </Button>
            </div>
            <div
              className="pointer-events-auto flex flex-col bg-black text-green-500 xs:h-[50vh] xs:w-[90vw] overflow-y-scroll overflow-x-hidden gap-2 p-2 transition-opacity duration-200 ease-in-out"
              style={{
                minWidth: terminalExpanded ? '400px' : '200px',
                maxWidth: terminalExpanded ? '600px' : '400px',
                minHeight: terminalExpanded ? '200px' : '100px',
                maxHeight: terminalExpanded ? '400px' : '200px',
              }}
              ref={elementRef}
            >
              {messages
                .filter((m) => m.role !== 'system')
                .map((m) => (
                  <span key={m.id} className="flex flex-col gap-6">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </span>
                ))}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <span className="font-bold">{`>_`}</span>
                <input
                  className="w-full bg-black text-green-500 outline-none"
                  value={input}
                  autoFocus
                  onChange={handleInputChange}
                />
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
