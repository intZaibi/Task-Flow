'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '@/app/context/Context';
import { Task } from '@/types/types';
import { socket } from '@/components/hooks/socket';

type InputDialogPropsType = {
  isOpen: boolean;
  closeDialog: () => void;
  isEditting?: {bool: boolean, task?: Task}
};

export default function InputDialog({ isOpen, closeDialog, isEditting = { bool:false } }: InputDialogPropsType) {
  const { tasks, setTasks } = useContext(Context);

  const [inputText, setInputText] = useState(isEditting.bool? isEditting.task?.text : '');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddTask();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeDialog();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, inputText]);

  function handleAddTask() {
    const trimmedText = inputText?.trim();
    if (!trimmedText) return;

    const newTask: Task = {
      id: String(tasks.length + 1),
      text: trimmedText,
      status: 'TODO',
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    socket.emit('updateTasks', updatedTasks);

    setInputText('');
    closeDialog();
  };

  function handleEditTask(task:Task|undefined) {
    if (isEditting.bool && task) {
      const trimmedText = inputText?.trim();
      if (!trimmedText) return;

      const edittedTask: Task = {
        ...task,
        text: trimmedText
      };

      const updatedTasks = [...tasks.filter((task)=>task.id!==edittedTask.id), edittedTask];
      setTasks(updatedTasks);
      socket.emit('updateTasks', updatedTasks);

      setInputText('');
      closeDialog();
    }
  }

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60" onClick={closeDialog} />

      {/* Dialog Content */}
      <div className="relative bg-black border border-gray-900 rounded-lg shadow-lg w-full max-w-md mx-4 p-6 animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold leading-none tracking-tight mb-2 text-slate-50">
            Add To-Do
          </h2>
          <p className="text-sm text-slate-400">
            This will be added in the "To Do" section.
          </p>
        </div>

        {/* Content */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 grid gap-2">
            <input
              id="text"
              type="text"
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter task..."
              className="flex h-10 w-full rounded-md border border-gray-800 bg-slate-950 text-slate-50 px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={closeDialog}
            className="rounded-md cursor-pointer bg-gray-800 text-white hover:bg-gray-700 h-10 px-4 py-2 text-sm"
          >
            Close
          </button>
          {isEditting.bool ? 
            <button
              type="button"
              onClick={()=>handleEditTask(isEditting.task)}
              className="rounded-md cursor-pointer bg-gray-200 text-black hover:bg-gray-300 h-10 px-6 py-2 text-sm"
            >
              Save
            </button>
            :
            <button
              type="button"
              onClick={handleAddTask}
              className="rounded-md cursor-pointer bg-gray-200 text-black hover:bg-gray-300 h-10 px-6 py-2 text-sm"
            >
              Add
            </button>
          }
        </div>

        {/* Close (X) */}
        <button
          onClick={closeDialog}
          className="absolute cursor-pointer right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  ) : null;
}
