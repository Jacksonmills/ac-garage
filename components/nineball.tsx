'use client';

import React from 'react';
import { useChat } from 'ai/react';
import { motion } from 'framer-motion';
import { useNineballContext } from './nineball-provider';
import { GripHorizontal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Nineball() {
  const { showNineball, setShowNineball } = useNineballContext();
  const { messages, input, handleInputChange, handleSubmit } = useChat({});
  const elementRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
  }, [messages]);

  React.useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, []);

  return (
    <motion.div
      ref={constraintsRef}
      className="w-screen h-screen absolute top-0 left-0 overflow-hidden pointer-events-none"
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        ref={elementRef}
        className="absolute bottom-0 right-0"
      >
        {showNineball && (
          <div className="p-2 bg-white w-fit rounded-sm absolute bottom-0 right-0">
            <div className="pointer-events-auto flex flex-col bg-black text-green-500 h-[200px] w-[400px] overflow-y-scroll overflow-x-hidden gap-2 p-2 transition-opacity duration-200 ease-in-out">
              {messages.map((m) => (
                <div key={m.id}>
                  {m.role !== 'assistant' && `>_`}
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ))}

              <form onSubmit={handleSubmit} className="flex gap-2">
                <span>{`>_`}</span>
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
