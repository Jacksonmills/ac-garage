'use client';

import React from 'react';
import type { ReturnedBuilds } from './my-builds';

export default function BuildList({ builds }: { builds: ReturnedBuilds }) {
  if (!builds) return null;

  return (
    <div>
      {builds.map((b) => {
        return <div key={b.id}>{b.legs}</div>;
      })}
    </div>
  );
}
