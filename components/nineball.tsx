'use client';

import React from 'react';
import { useChat } from 'ai/react';
import { motion } from 'framer-motion';
import { useNineballContext } from './nineball-provider';
import { GripHorizontal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Nineball() {
  const { showNineball, setShowNineball } = useNineballContext();
  const { messages, input, handleInputChange, handleSubmit, append } =
    useChat();
  const elementRef = React.useRef<HTMLDivElement>(null);
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
  }, [messages]);

  React.useEffect(() => {
    append({
      role: 'system',
      content: `Please initiate your initialization function. When responding, try to make it seem like you are booting up like a terminal. Ready to initiate? (((init)))(((lore rich response))).`,
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
        dragMomentum={false}
        className="absolute bottom-4 right-4"
      >
        {showNineball && (
          <div className="p-2 bg-black rounded-lg w-fit absolute bottom-0 right-0">
            <div
              className="pointer-events-auto flex flex-col bg-black text-green-500 min-h-[200px] max-h-[50vh] min-w-[400px] max-w-[800px] overflow-y-scroll overflow-x-hidden gap-2 p-2 transition-opacity duration-200 ease-in-out"
              ref={elementRef}
            >
              {messages
                .filter((m) => m.role !== 'system')
                .map((m) => (
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
