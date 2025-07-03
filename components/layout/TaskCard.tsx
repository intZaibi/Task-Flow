import { useDraggable } from '@dnd-kit/core';
import { Task } from '@/types/types';
import { useContext, useState } from 'react';
import { Context } from '@/app/context/Context';
import { socket } from '../hooks/socket';
import InputDialog from './InputDialog';

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const { tasks, setTasks } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  
    const openDialog = () => {console.log('clicked open edit dialog!'); setIsOpen(true)};
    const closeDialog = () => setIsOpen(false);
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });


  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        'touchAction': 'none'
      }
    : undefined;

    const handleDeleteTask = (task:Task)=>{
      const newTasks = tasks.filter((t)=>task.id!==t.id)
      setTasks(newTasks);
      socket.emit('updateTasks', newTasks)
    }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab flex justify-between rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <h3 className="font-medium text-neutral-100">{task.text}</h3>
      <div className='flex gap-2 w-10 h-5'>
        <svg onClick={openDialog} className='cursor-pointer' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path>
        </svg>
        <svg onClick={()=>handleDeleteTask(task)} className='cursor-pointer' data-slot="icon" fill="none" strokeWidth="1.5" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
        </svg>
      </div>

      <InputDialog isOpen={isOpen} isEditting={{bool:true, task}} closeDialog={closeDialog}/>
    </div>
  );
}
