import React, {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
} from 'react';

// Define the state shape
export interface BuildState {
  head: string;
  core: string;
  arms: string;
  legs: string;
  generator: string;
  boosters: string;
  fcs: string;
  backWeaponL: string;
  backWeaponR: string;
  armWeaponL: string;
  armWeaponR: string;
}

// Define the actions shape
type BuildAction = {
  type: 'SET_PART' | 'LOAD_FULL_BUILD';
  part?: keyof BuildState;
  value?: string;
  fullBuild?: BuildState;
};

// Create the context
const BuildContext = createContext<
  | {
      state: BuildState;
      dispatch: Dispatch<BuildAction>;
    }
  | undefined
>(undefined);

// Create a custom hook for using your context
export const useBuild = () => {
  const context = useContext(BuildContext);
  if (context === undefined) {
    throw new Error('useBuild must be used within a BuildProvider');
  }
  return context;
};

// Create a provider
export const BuildProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(buildReducer, initialBuild);
  return (
    <BuildContext.Provider value={{ state, dispatch }}>
      {children}
    </BuildContext.Provider>
  );
};

// Reducer for your build
function buildReducer(state: BuildState, action: BuildAction): BuildState {
  switch (action.type) {
    case 'SET_PART':
      if (!action.part || !action.value) {
        throw new Error(
          'SET_PART action requires both "part" and "value" fields'
        );
      }
      return { ...state, [action.part]: action.value };
    case 'LOAD_FULL_BUILD':
      if (!action.fullBuild) {
        throw new Error('LOAD_FULL_BUILD action requires "fullBuild" field');
      }
      return { ...action.fullBuild };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Default build
const initialBuild: BuildState = {
  head: '',
  core: '',
  arms: '',
  legs: '',
  generator: '',
  boosters: '',
  fcs: '',
  backWeaponL: '',
  backWeaponR: '',
  armWeaponL: '',
  armWeaponR: '',
};
