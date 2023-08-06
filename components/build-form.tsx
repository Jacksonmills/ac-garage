'use client';

import React, { useCallback, useEffect } from 'react';
import { PartMenu } from './part-menu';
import toast from 'react-hot-toast';
import { createBuild } from '@/app/actions';
import { Button } from './ui/button';
import { parts } from '@/db/parts';
import { BuildState, useBuild } from './build-provider';

interface PartMenuData {
  part: string;
  partType: keyof BuildState;
  label: string;
}

const partMenuData: PartMenuData[] = [
  { part: 'heads', partType: 'head', label: 'HEAD' },
  { part: 'cores', partType: 'core', label: 'CORE' },
  { part: 'arms', partType: 'arms', label: 'ARMS' },
  { part: 'legs', partType: 'legs', label: 'LEGS' },
  { part: 'generators', partType: 'generator', label: 'GENERATOR' },
  { part: 'boosters', partType: 'boosters', label: 'BOOSTERS' },
  { part: 'firingControlSystems', partType: 'fcs', label: 'FCS' },
  { part: 'backWeapons', partType: 'backWeaponL', label: 'BACK WEAPON L' },
  { part: 'backWeapons', partType: 'backWeaponR', label: 'BACK WEAPON R' },
  { part: 'armWeaponsL', partType: 'armWeaponL', label: 'ARM WEAPON L' },
  { part: 'armWeaponsR', partType: 'armWeaponR', label: 'ARM WEAPON R' },
];

export default function BuildForm() {
  const { state: build, dispatch } = useBuild();

  const [buildComplete, setBuildComplete] = React.useState(false);

  const handleSelectPart = useCallback(
    (part: keyof BuildState, value: string) => {
      dispatch({ type: 'SET_PART', part, value });
    },
    [dispatch]
  );

  const handleSubmit = () => {
    if (!buildComplete) {
      toast.error('Build is not complete!');
      return;
    }

    createBuild(
      build.head,
      build.core,
      build.arms,
      build.legs,
      build.generator,
      build.boosters,
      build.fcs,
      build.backWeaponL,
      build.backWeaponR,
      build.armWeaponL,
      build.armWeaponR
    )
      .then(() => {
        toast.success('Build created!');
      })
      .catch(() => {
        toast.error('Slow down!');
      });
  };

  useEffect(() => {
    if (
      build.head &&
      build.core &&
      build.arms &&
      build.legs &&
      build.generator &&
      build.boosters &&
      build.fcs &&
      build.backWeaponL &&
      build.backWeaponR &&
      build.armWeaponL &&
      build.armWeaponR
    ) {
      setBuildComplete(true);
    } else {
      setBuildComplete(false);
    }
  }, [build]);

  return (
    <div className="w-full h-full gap-2 flex flex-col">
      <div className="flex flex-col gap-2 w-full p-2 border">
        {partMenuData.map((data) => (
          <PartMenu
            key={data.partType}
            part={data.part}
            partType={data.partType}
            label={data.label}
            setSelectedPart={handleSelectPart}
            selectedValue={build[data.partType] || undefined}
          />
        ))}
      </div>
      <form action={handleSubmit}>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
