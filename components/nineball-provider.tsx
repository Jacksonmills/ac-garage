'use client';

import React, { createContext, useContext } from 'react';

const NineballContext = createContext({
  showNineball: false,
  setShowNineball: (showNineball: boolean) => {},
});

export function useNineballContext() {
  return useContext(NineballContext);
}

export default function NineballProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showNineball, setShowNineball] = React.useState(false);

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
