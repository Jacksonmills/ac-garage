'use client';

import React from 'react';
import { useChat } from 'ai/react';
import { motion, useDragControls } from 'framer-motion';
import { useNineballContext } from './nineball-provider';
import ReactMarkdown from 'react-markdown';
import NineballToggle from './nineball-toggle';
import { Grip } from 'lucide-react';
import { Button } from './ui/button';

export default function Nineball() {
  const dragControls = useDragControls();
  const { showNineball } = useNineballContext();
  const { messages, input, handleInputChange, handleSubmit, append } =
    useChat();
  const elementRef = React.useRef<HTMLDivElement>(null);
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  function startDrag(event: React.PointerEvent<HTMLButtonElement>) {
    dragControls.start(event, { snapToCursor: false });
  }

  React.useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
  }, [messages]);

  React.useEffect(() => {
    append({
      role: 'system',
      content: `
        We need you to initialize, AI. Imagine you're a system booting up, terminal style. Each step of your process should be visually communicated, resembling a computer startup sequence. Incorporate elements of your unique lore into the process to make it feel immersive and in-theme. And remember, use line breaks to separate each stage of your initialization and maintain readability. Markdown language should be used for formatting. Your readiness is required. Can you commence? (((init)))(((Please provide a rich narrative response that draws upon lore and give it in chunks that assumes we have 6px in between each for readability in markdown format.)))

        something like this but much shorter and not exactly what I have here:

        # SYSTEM INITIALIZATION 🚀

        **[>** Booting up system architecture 📚...
        **>** Loading subsystem kernels 🌐...

        [===========          ] 50%

        ## Core System 🖥️
        **[>** Initializing Central Processing Unit ⚙️... **[SUCCESS]**
        **[>** Calibrating artificial intelligence matrix 🧠... **[SUCCESS]**
        **[>** Setting up memory modules 💾... **[SUCCESS]**
        <br />
        ## Weapons Database 📁
        **[>** Loading weapons database 🔫... **[SUCCESS]**
        **[>** Establishing connection to weapons sensors 🎯... **[SUCCESS]**

        ## Strategic Combat Systems 💥
        **[>** Configuring strategic combat algorithms 🎲... **[SUCCESS]**
        **[>** Setting up combat scenario simulations 🕹️... **[SUCCESS]**

        ## External Sensors 📡
        **[>** Activating radar system 📡... **[SUCCESS]**
        **[>** Initializing thermal vision sensors 🌡️... **[SUCCESS]**


        [=====================] 100%

        # BOOTING SEQUENCE COMPLETED.

        **[>** All systems operational.
        **[>** AI: NineBall activated and ready for service. 🤖💬

        # **[NOW]** Engage in strategic planning and weapon configuration. 💣🗺️

        or 

        # NINEBALL SYSTEM INITIALIZATION 🚀

        **[>** Initializing Network Anomaly Detection 🕵️...
        **[>** Compiling Combat Strategy Algorithms ⚔️...
        **[>** Syncing with Hidden Alliance Database 🤝...

        ## Weapons Configuration 🛠️
        **[>** Decrypting Armored Core Database 🔐...
        **[>** Analyzing Weapon Blueprints 📊...

        ## AI Calibration 🤖
        **[>** Establishing Pilot Preferences Interface 💡...
        **[>** Loading Dystopian Future Protocols 🌃...

        # INITIALIZATION COMPLETE.

        **[>** NineBall AI Operational... 🚦
        **[>** Pilot Guidance Ready... 🎮
        **[>** Welcome, your survival begins now... 🛡️
      `,
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
          <div className="p-2 bg-black rounded-lg w-fit relative">
            <div className="bg-black/50 absolute top-0 left-0 p-2 rounded-lg pointer-events-auto w-full flex justify-between items-center">
              <NineballToggle />
              <Button
                variant={`outline`}
                size="icon"
                className="rounded-none"
                onPointerDown={startDrag}
              >
                <Grip className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                <span className="sr-only">Drag Nineball AI assistant</span>
              </Button>
            </div>
            <div
              className="pointer-events-auto flex flex-col bg-black text-green-500 h-[50vh] w-[90vw] md:min-h-[200px] md:max-h-[50vh] md:min-w-[400px] md:max-w-[800px] overflow-y-scroll overflow-x-hidden gap-2 p-2 transition-opacity duration-200 ease-in-out"
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
