'use client';

import { Task } from '@/types/types';
import { createContext, useState } from 'react';

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
  
  // useLayoutEffect(() => {
  //   const storedCartItems = localStorage.getItem('cart');
  //   if (storedCartItems) {
  //     setCartItems(JSON.parse(storedCartItems));
  //   }
  // }, []);

  // useLayoutEffect(() => {
  //     localStorage.setItem('cart', JSON.stringify(cartItems));
  // }, [cartItems]);

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