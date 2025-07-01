export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Task = {
  id: string;
  status: TaskStatus;
  text: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};
