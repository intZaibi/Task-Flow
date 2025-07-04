import { useContext, useEffect } from 'react';
import type { Task, Column as ColumnType } from '@/types/types.ts';
import { Column } from './Columns';
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { socket } from '@/components/hooks/socket';
import { Context } from '@/app/context/Context';

const COLUMNS: ColumnType[] = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
];

export default function App() {
  const {tasks, setTasks} = useContext(Context);

  const sensors = useSensors(
  useSensor(TouchSensor, {activationConstraint: {
    delay: 200, tolerance: 5
  }
  }),

  useSensor(MouseSensor, {activationConstraint: {
    delay: 200, tolerance: 5
  }
  })
);

  const handleTasksUpdated = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };
  // setup socket logic
  useEffect(() => {

  socket.on('tasksUpdated', handleTasksUpdated);

  return () => {
    socket.off('tasksUpdated', handleTasksUpdated);
    socket.off('connect');
  };
}, []);


  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, status: newStatus }
        : task,
    );

    setTasks(updatedTasks);
    socket.emit('updateTasks', updatedTasks);
  }

  return (
    <div className="p-4 w-full">
      <div className="flex gap-8 w-full justify-center">
        <DndContext onDragStart={(e) => console.log('Drag started', e)} sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full justify-center">
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}
