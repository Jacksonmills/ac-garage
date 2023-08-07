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
import Image from 'next/image';

export default function Nineball() {
  const { user } = useUser();
  const dragControls = useDragControls();
  const { showNineball } = useNineballContext();
  const { messages, input, handleInputChange, handleSubmit, append } =
    useChat();
  const elementRef = React.useRef<HTMLDivElement>(null);
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  const [terminalExpanded, setTerminalExpanded] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [nineBallInitPrompt, setNineBallInitPrompt] = React.useState('');
  const [ravenPilotName, setRavenPilotName] = React.useState('Null');

  const isDevelopment = process.env.NODE_ENV === 'development';

  function startDrag(event: React.PointerEvent<HTMLButtonElement>) {
    dragControls.start(event, { snapToCursor: false });
  }

  React.useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
  }, [messages]);

  React.useEffect(() => {
    if (isDevelopment) return;

    append({
      role: 'system',
      content: nineBallInitPrompt,
    });
  }, [append, isDevelopment, nineBallInitPrompt]);

  React.useEffect(() => {
    if (!user) return;

    setRavenPilotName(user?.username || user?.firstName || 'Null');
  }, [user]);

  React.useEffect(() => {
    if (window) {
      setIsMobile(window.innerWidth < 768);
    }
    setNineBallInitPrompt(`Hello, ${ravenPilotName}. ${initPrompt}`);
  }, [ravenPilotName]);

  return (
    <motion.div
      ref={constraintsRef}
      className="w-full h-screen overflow-hidden absolute top-0 left-0 pointer-events-none"
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        className="absolute"
        style={
          isMobile
            ? { bottom: 0, left: 0, width: '100vw', maxHeight: '100vh' }
            : { bottom: '4px', right: '4px' }
        }
      >
        {showNineball && (
          <div className="p-2 bg-black w-fit relative">
            <div className="bg-black/50 p-2 pointer-events-auto w-full flex justify-between items-center">
              <div className="flex gap-2">
                <NineballToggle />
                <Button
                  size="icon"
                  onClick={() => setTerminalExpanded(!terminalExpanded)}
                >
                  {terminalExpanded && <Shrink />}
                  {!terminalExpanded && <Expand />}
                </Button>
                {isDevelopment && (
                  <Button
                    variant={`outline`}
                    onClick={() =>
                      append({
                        role: 'user',
                        content: nineBallInitPrompt,
                      })
                    }
                  >
                    Start
                  </Button>
                )}
              </div>
              {!isMobile && (
                <Button
                  variant={`secondary`}
                  size="icon"
                  className="cursor-grab"
                  onPointerDown={startDrag}
                >
                  <GripVertical className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                  <span className="sr-only">Drag Nineball AI assistant</span>
                </Button>
              )}
            </div>
            <div
              className="pointer-events-auto flex flex-col bg-black text-green-500 overflow-y-auto overflow-x-hidden gap-2 p-2 transition-opacity duration-200 ease-in-out"
              style={
                isMobile
                  ? {
                      height: terminalExpanded ? '100vh' : '50vh',
                      width: '100vw',
                    }
                  : {
                      minWidth: terminalExpanded ? '800px' : '600px',
                      maxWidth: terminalExpanded ? '1200px' : '800px',
                      minHeight: terminalExpanded ? '600px' : '100px',
                      maxHeight: terminalExpanded ? '800px' : '600px',
                    }
              }
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
