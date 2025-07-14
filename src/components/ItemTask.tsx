import React from 'react';
import { Task } from 'types/MainType';

type ItemTaskProps = {
  isInPageGetAll: boolean;
  task: Task;
  handleCompletedTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
};

const ItemTask: React.FC<ItemTaskProps> = ({
  isInPageGetAll = true,
  task,
  handleCompletedTask = () => {},
  handleDeleteTask = () => {},
}) => {
  return (
    <>
      <h2
        className={`text-2xl font-medium text-blue-500 ${
          isInPageGetAll && task.completed ? 'line-through' : ''
        }`}
      >
        {task.title}
      </h2>
      <div className="flex justify-between">
        <h2>{isInPageGetAll ? '_' : 'completed'}</h2>
        {isInPageGetAll && (
          <div className="flex gap-4">
            <button
              className="px-4 py-2 rounded-md bg-black text-white"
              onClick={() => handleCompletedTask(task._id)}
              disabled={task.completed}
            >
              complete
            </button>
            <button
              className="px-4 py-2 rounded-md bg-black text-white"
              onClick={() => handleDeleteTask(task._id)}
            >
              delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemTask;
