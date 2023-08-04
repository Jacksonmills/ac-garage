'use client';

import React from 'react';
import { PartMenu } from './part-menu';
import toast from 'react-hot-toast';
import { createBuild } from '@/app/actions';
import { Button } from './ui/button';

export default function BuildForm() {
  const handleSubmit = () => {
    createBuild()
      .then(() => {
        toast.success('Build created!');
      })
      .catch(() => {
        toast.error('Slow down!');
      });
  };

  return (
    <div className="w-full h-full gap-2 flex flex-col">
      <div className="flex flex-col gap-2 w-full p-2 border">
        <PartMenu part="heads" label="HEAD" />
        <PartMenu part="cores" label="CORE" />
        <PartMenu part="arms" label="ARMS" />
        <PartMenu part="legs" label="LEGS" />
      </div>
      <div className="flex gap-2 w-full p-2 border">
        <PartMenu part="generators" label="GENERATOR" />
        <PartMenu part="boosters" label="BOOSTERS" />
        <PartMenu part="firingControlSystems" label="FCS" />
      </div>
      <div className="flex gap-2 w-full p-2 border">
        <PartMenu part="backWeapons" label="BACK UNIT L" />
        <PartMenu part="backWeapons" label="BACK UNIT R" />
        <PartMenu part="armWeaponsL" label="ARM WEAPON L" />
        <PartMenu part="armWeaponsR" label="ARM WEAPON R" />
      </div>
      <form action={handleSubmit}>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
