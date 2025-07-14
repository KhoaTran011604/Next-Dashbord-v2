'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task } from 'types/MainType';

type StoreState = {
  user: string | null;
  isDarkMode: boolean;
  tasks: Task[];
};

type StoreContextType = {
  state: StoreState;
  setState: React.Dispatch<React.SetStateAction<StoreState>>;
};

const defaultState: StoreState = {
  user: null,
  isDarkMode: false,
  tasks: [],
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<StoreState>(defaultState);

  return (
    <StoreContext.Provider value={{ state, setState }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
