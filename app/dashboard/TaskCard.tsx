import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'; // Import the ExclamationCircleIcon from Heroicons

const TaskCard = ({
  task,
  onTakeButtonClick,
  onSendForDetailsClick,
  onFinishClick,
  onSendDoneMessageClick
}: {
  task: any;
  onTakeButtonClick: (id: string) => void;
  onSendForDetailsClick: (id: string) => void;
  onFinishClick: (id: string) => void;
  onSendDoneMessageClick: (id: string, autor: string) => void;
}) => {
  const colorClasses = {
    todo: 'bg-blue-400 text-white',
    inProgress: 'bg-pink-500 text-white',
    done: 'bg-yellow-400 text-gray-900'
  };

  const getColorClass = (stage: string) => {
    const colorClasses: { [key: string]: string } = {
      todo: 'bg-blue-400 text-white',
      inProgress: 'bg-pink-500 text-white',
      done: 'bg-yellow-400 text-gray-900'
    };

    return colorClasses[stage] || ''; // Default to no specific color
  };

  const getColorPriority = (priority: string) => {
    const colorClasses: { [key: string]: string } = {
      Low: 'text-white',
      Medium: 'text-white',
      High: 'text-red-600 font-bold'
    };
    return colorClasses[priority] || ''; // Default to no specific color
  };

  const renderButtonBasedOnStage = () => {
    switch (task.stage) {
      case 'todo':
        return (
          <button
            className='bg-green-500 text-white rounded-md px-2 py-1'
            onClick={() => onTakeButtonClick(task.id)}>
            Take
          </button>
        );
      case 'inProgress':
        return (
          <>
            <button
              className='bg-pink-500 text-white rounded-md px-2 py-1 mr-2'
              onClick={() => onSendForDetailsClick(task.id)}>
              Send for Details
            </button>
            <button
              className='bg-green-500 text-white rounded-md px-2 py-1'
              onClick={() => onFinishClick(task.id)}>
              Finish
            </button>
          </>
        );
      case 'done':
        return (
          <button
            className='bg-blue-400 text-white rounded-md px-2 py-1'
            onClick={() => onSendDoneMessageClick(task.id, task.autor)}>
            Send Done Message
          </button>
        );
      default:
        return null;
    }
  };

  const renderPriorityIcon = () => {
    if (task.priority === 'High') {
      return (
        <>
          <span className='absolute top-2 right-2 text-red-600'>
            <ExclamationCircleIcon className='h-11 w-11' />
          </span>
        </>
      );
    }
    return null;
  };

  return (
    <div
      className={`task-card m-4 p-4 ml-0 rounded-lg shadow-xl relative ${getColorClass(
        task.stage
      )}`}>
      {renderPriorityIcon()} {/* Render priority icon */}
      <h2 className='text-lg font-semibold'>{task.title}</h2>
      <p className='text-gray-700'>{task.message}</p>
      <div className='flex flex-col pt-5'>
        <p className={`text-sm ${getColorPriority(task.priority)}`}>
          Priority: {task.priority}
        </p>
        <div className='flex justify-between'>
          <p className='text-sm'>Author: {task.autor}</p>
          <p className='text-sm'>Assigned to: {task.whoTake}</p>
        </div>
      </div>
      <div className='mt-4'>{renderButtonBasedOnStage()}</div>
    </div>
  );
};

export default TaskCard;
