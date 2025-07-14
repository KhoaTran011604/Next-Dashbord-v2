'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Task } from 'types/MainType';

type MainContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  getAllTasks: () => Task[];
  getCompletedTasks: () => Task[];
  handleAddTask: (data: Task) => void;
  handleDeleteTask: (data: Task) => void;
  handleUpdateTask: (data: Task) => void;
  handleCompletedTask: (index: number) => void;
};

export const MainContext = createContext<MainContextType | undefined>(
  undefined
);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem('#todoList');

    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse tasks from localStorage');
      }
    }
  }, []);
  const getAllTasks: () => Task[] = () => {
    return tasks;
  };
  const getCompletedTasks: () => Task[] = () => {
    return tasks.filter((task) => task.completed);
  };
  const handleAddTask: (data: Task) => void = (data: Task) => {
    const updateTasks = [...tasks, { ...data, id: Math.random().toString() }];
    localStorage.setItem('#todoList', JSON.stringify(updateTasks));
    setTasks(updateTasks);
  };
  const handleUpdateTask: (data: Task) => void = (data: Task) => {
    const updatedList = [...tasks].map((item) =>
      item._id === data._id ? { ...item, ...data } : item
    );

    setTasks(updatedList);
  };
  const handleCompletedTask: (index: number) => void = (index: number) => {
    let updateTasks = [...tasks];
    updateTasks[index].completed = true;

    localStorage.setItem('#todoList', JSON.stringify(updateTasks));
    setTasks(updateTasks);
  };

  const handleDeleteTask: (dataDelete: Task) => void = (dataDelete: Task) => {
    const index = tasks.indexOf(dataDelete);

    if (index === -1) {
      alert('Không tìm thấy task cần xóa');
    } else {
      let updateTasks = [...tasks];
      updateTasks.splice(index, 1);
      localStorage.setItem('#todoList', JSON.stringify(updateTasks));
      setTasks(updateTasks);
    }
  };
  return (
    <MainContext.Provider
      value={{
        tasks,
        setTasks,
        getAllTasks,
        getCompletedTasks,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
        handleCompletedTask,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context)
    throw new Error('useMainContext must be used within MainProvider');
  return context;
};
