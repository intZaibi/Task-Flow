import { useState } from 'react';
import type { Task, Column as ColumnType } from '@/types/types.ts';
import { Column } from './Columns';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { socket } from '@/socket';

const COLUMNS: ColumnType[] = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
];

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

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ));

    socket.emit('updated', tasks)
  }

  return (
    <div className="p-4 w-full">
      <div className="flex gap-8 w-full justify-center">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
}
