'use client';

import { socket } from '@/components/hooks/socket';
import { Task } from '@/types/types';
import { createContext, useEffect, useState } from 'react';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    text: 'Research Project',
    status: 'TODO',
  },
  {
    id: '2',
    text: 'Design System',
    status: 'TODO',
  },
  {
    id: '3',
    text: 'API Integration',
    status: 'IN_PROGRESS',
  },
  {
    id: '4',
    text: 'Testing',
    status: 'DONE',
  },
];

export const Context = createContext<{
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}>({
  tasks: INITIAL_TASKS,
  setTasks: () => [],
});

export const ContextProvider = ({ children }: { children : React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  useEffect(() => {
    const handleInitialTasks = (initialTasks: Task[]) => {
      setTasks(initialTasks);
    };

    const handleConnect = () => {
      console.log('Connected to socket:', socket.id);
    };

    const handleConnectError = (err: any) => {
      console.error('Socket connection error:', err);
    };

    socket.on('initialTasks', handleInitialTasks);
    socket.on('connect', handleConnect);
    socket.on('connect_error', handleConnectError);

    // Cleanup listeners on unmount
    return () => {
      socket.off('initialTasks', handleInitialTasks);
      socket.off('connect', handleConnect);
      socket.off('connect_error', handleConnectError);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        tasks,
        setTasks
      }}
    >
      {children}
    </Context.Provider>
  );
};