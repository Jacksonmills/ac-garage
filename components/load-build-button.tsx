'use client';

import React, { useCallback } from 'react';
import { Button } from './ui/button';
import { type BuildState, useBuild } from './build-provider';
import toast from 'react-hot-toast';
import useWindow from '@/hooks/use-window';
import { Save } from 'lucide-react';

export default function LoadBuildButton(fullBuild: BuildState) {
  const { isMobile } = useWindow();
  const { dispatch } = useBuild();

  const loadFullBuild = useCallback(
    (fullBuild: BuildState) => {
      toast.success('Build loaded!');
      dispatch({ type: 'LOAD_FULL_BUILD', fullBuild });
    },
    [dispatch]
  );

  return (
    <Button onClick={() => loadFullBuild(fullBuild)}>
      {isMobile ? <Save /> : 'Load Build'}
    </Button>
  );
}
