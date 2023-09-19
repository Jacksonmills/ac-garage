'use client';

import React, { useCallback, useEffect } from 'react';
import { PartMenu } from './part-menu';
import toast from 'react-hot-toast';
import { createBuild } from '@/app/actions';
import { Button } from './ui/button';
import { type BuildState, useBuild } from './build-provider';
import { ScrollArea } from './ui/scroll-area';

interface PartMenuData {
  part: string;
  partType: keyof BuildState;
  label: string;
}

const partMenuData: PartMenuData[][] = [
  [
    { part: 'heads', partType: 'head', label: 'HEAD' },
    { part: 'cores', partType: 'core', label: 'CORE' },
    { part: 'arms', partType: 'arms', label: 'ARMS' },
    { part: 'legs', partType: 'legs', label: 'LEGS' },
  ],
  [
    { part: 'generators', partType: 'generator', label: 'GENERATOR' },
    { part: 'boosters', partType: 'boosters', label: 'BOOSTERS' },
    { part: 'firingControlSystems', partType: 'fcs', label: 'FCS' },
  ],
  [
    { part: 'backWeapons', partType: 'backWeaponL', label: 'BACK WEAPON L' },
    { part: 'backWeapons', partType: 'backWeaponR', label: 'BACK WEAPON R' },
    { part: 'armWeaponsL', partType: 'armWeaponL', label: 'ARM WEAPON L' },
    { part: 'armWeaponsR', partType: 'armWeaponR', label: 'ARM WEAPON R' },
  ],
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
    <div className="flex flex-col gap-2 w-full min-w-[50vw] p-2 border lg:h-[80vh]">
      {partMenuData.map((data, idx) => (
        <PartMenuGroup
          key={idx}
          data={data}
          handleSelectPart={handleSelectPart}
        />
      ))}
      <div>
        <StatsDisplay />
      </div>
      <form action={handleSubmit}>
        <Button className="w-full" type="submit">
          Create Build
        </Button>
      </form>
    </div>
  );
}

function PartMenuGroup({
  data,
  handleSelectPart,
}: {
  data: PartMenuData[];
  handleSelectPart: (_part: keyof BuildState, _value: string) => void;
}) {
  const { state: build } = useBuild();

  return (
    <div className="flex gap-2 lg:flex-row flex-col">
      {data.map((part, idx) => (
        <PartMenu
          key={idx}
          part={part.part}
          partType={part.partType}
          label={part.label}
          setSelectedPart={handleSelectPart}
          selectedValue={build[part.partType] || undefined}
        />
      ))}
    </div>
  );
}

function StatsDisplay() {
  return (
    <ScrollArea className="w-full md:h-[524px] rounded-md border p-4">
      <div className="flex flex-col gap-2">
        <div>
          <div className="flex justify-between">
            <div className="font-bold">Armor Points</div>
            <div>{6327}</div>
          </div>

          <div className="flex justify-between">
            <div className="font-bold">Shell Defense</div>
            <div>{5004}</div>
          </div>

          <div className="flex justify-between">
            <div className="font-bold">Energy Defense</div>
            <div>{1831}</div>
          </div>

          <div className="flex justify-between">
            <div className="font-bold">Max Weight</div>
            <div>{8000}</div>
          </div>

          <div className="flex justify-between">
            <div className="font-bold">Total Weight</div>
            <div>{4462}</div>
          </div>

          <div className="flex justify-between">
            <div className="font-bold">Max Core Weight</div>
            <div>{2770}</div>
          </div>

          <div className="flex justify-between">
            <div className="font-bold">Arm & Weapon Weight</div>
            <div>{2177}</div>
          </div>

          <div className="flex justify-between">
            <div className="font-bold">Max Energy</div>
            <div>{4728}</div>
          </div>

          <div className="flex justify-between">
            <div className="font-bold">Energy Drain</div>
            <div>{4107}</div>
          </div>

          {/* Leg Type and associated properties */}
          <div className="flex justify-between">
            <div className="font-bold">Leg Type</div>
            <div>Tank</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Speed</div>
            <div>105</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Stability</div>
            <div>4245</div>
          </div>

          {/* Jump and Boost Power */}
          <div className="flex justify-between">
            <div className="font-bold">Jump</div>
            <div>FALSE</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Boost Power</div>
            <div>9800</div>
          </div>
        </div>

        <div>
          {/* Map Type, Noise Canceler, Bio Sensor */}
          <div className="flex justify-between">
            <div className="font-bold">Map Type</div>
            <div>No Memory</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Noise Canceler</div>
            <div>FALSE</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Bio Sensor</div>
            <div>FALSE</div>
          </div>

          {/* Radar Source and Radar Range for Head */}
          <div className="flex justify-between">
            <div className="font-bold">Head Radar Source</div>
            <div>Head</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Head Radar Range</div>
            <div>N/A</div>
          </div>

          {/* Radar Source and Radar Range for Back Unit */}
          <div className="flex justify-between">
            <div className="font-bold">Back Unit Radar Source</div>
            <div>Back Unit</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Back Unit Radar Range</div>
            <div>8650</div>
          </div>

          {/* FCS Maximum Lock and FCS Lock Type for Head */}
          <div className="flex justify-between">
            <div className="font-bold">Head FCS Maximum Lock</div>
            <div>4</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Head FCS Lock Type</div>
            <div>Standard</div>
          </div>
        </div>

        <div>
          {/* Left Arm Weapon and properties */}
          <div className="flex justify-between">
            <div className="font-bold">Left Arm Weapon - Charge Drain</div>
            <div>2050</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Left Arm Weapon - Attack Power</div>
            <div>738</div>
          </div>

          {/* Right Arm Weapon and associated properties */}
          <div className="flex justify-between">
            <div className="font-bold">Right Arm Weapon</div>
            <div>Right</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Weapon Lock</div>
            <div>Special</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Attack Power</div>
            <div>1550</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Number of Ammo</div>
            <div>50</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Ammo Type</div>
            <div>Energy</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Ammo Price</div>
            <div>0</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Range</div>
            <div>10000</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Maximum Lock</div>
            <div>1</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Reload Time</div>
            <div>8</div>
          </div>
        </div>

        <div>
          {/* Left Back Unit Weapon and associated properties */}
          <div className="flex justify-between">
            <div className="font-bold">Left Back Unit Weapon</div>
            <div>Left</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Weapon Lock</div>
            <div>None</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Attack Power</div>
            <div>2240</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Number of Ammo</div>
            <div>50</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Ammo Type</div>
            <div>Solid</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Ammo Price</div>
            <div>220</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Range</div>
            <div>14000</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Maximum Lock</div>
            <div>0</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Reload Time</div>
            <div>12</div>
          </div>

          {/* Right Back Unit Weapon and associated properties */}
          <div className="flex justify-between">
            <div className="font-bold">Right Back Unit Weapon</div>
            <div>Right</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Weapon Lock</div>
            <div>Narrow & Deep</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Attack Power</div>
            <div>770</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Number of Ammo</div>
            <div>100</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Ammo Type</div>
            <div>Energy</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Ammo Price</div>
            <div>0</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Range</div>
            <div>9000</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Maximum Lock</div>
            <div>1</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">Reload Time</div>
            <div>5</div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="font-bold">Cost</div>
          <div>
            <span className="font-bold">{16000}</span> Credits
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
