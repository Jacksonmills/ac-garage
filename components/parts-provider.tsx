'use client';

import React, { createContext, useContext } from 'react';

const PartsContext = createContext({});

export function usePartsContext() {
  return useContext(PartsContext);
}

export default function PartsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [heads, setHeads] = React.useState('');

  return (
    <PartsContext.Provider
      value={{
        heads,
      }}
    >
      {children}
    </PartsContext.Provider>
  );
}
