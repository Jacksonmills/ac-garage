'use client';

import React, { useCallback } from 'react';
import { Button } from './ui/button';
import { BuildState, useBuild } from './build-provider';
import toast from 'react-hot-toast';

export default function LoadBuildButton(fullBuild: BuildState) {
  const { dispatch } = useBuild();

  const loadFullBuild = useCallback(
    (fullBuild: BuildState) => {
      toast.success('Build loaded!');
      dispatch({ type: 'LOAD_FULL_BUILD', fullBuild });
    },
    [dispatch]
  );

  return <Button onClick={() => loadFullBuild(fullBuild)}>Load Build</Button>;
}
