'use client';

import React, { createContext, useContext } from 'react';

const NineballContext = createContext({
  showNineball: true,
  setShowNineball: (_showNineball: boolean) => {},
});

export function useNineballContext() {
  return useContext(NineballContext);
}

export default function NineballProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showNineball, setShowNineball] = React.useState(true);

  return (
    <NineballContext.Provider
      value={{
        showNineball,
        setShowNineball,
      }}
    >
      {children}
    </NineballContext.Provider>
  );
}
