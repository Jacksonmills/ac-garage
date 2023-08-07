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

  const handleIsNotCompleteMessage = (build: BuildState) => {
    const missingParts = Object.keys(build).filter(
      (part) => build[part as keyof BuildState] === ''
    );
    if (missingParts.length > 0) {
      let missingPartsString = '';

      if (missingParts.length > 1) {
        const allButLastPart = missingParts.slice(0, -1);
        const lastPart = missingParts.slice(-1);
        missingPartsString = `${allButLastPart.join(', ')} and ${lastPart}`;
      } else {
        missingPartsString = missingParts[0];
      }

      toast.error(
        `Build is not complete! Please select: ${missingPartsString}.`
      );
    }
  };

  const handleSubmit = () => {
    if (!buildComplete) {
      handleIsNotCompleteMessage(build);
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
    <div className="flex flex-col gap-2 w-full min-w-[50vw] p-2 border h-[80vh] justify-between">
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

      <form action={handleSubmit}>
        <Button className="w-full" type="submit">
          Create Build
        </Button>
      </form>
    </div>
  );
}
