// pages/TaskList.js

import React from 'react';
import TaskCard from './TaskCard';

const tasks = [
  {
    id: 1,
    title: 'Complete Project A',
    message: 'Finish all the remaining tasks for Project A',
    whoTake: 'John Doe',
    priority: 'High',
    stage: 'todo',
    autor: 'John Doe'
  },
  {
    id: 2,
    title: 'Review Design Mockups',
    message: 'Review and provide feedback on the design mockups',
    whoTake: '',
    priority: 'Medium',
    stage: 'inProgress',
    autor: 'John Doe'
  },
  {
    id: 3,
    title: 'Update Documentation',
    message: 'Update project documentation based on recent changes',
    whoTake: '', // Empty means unassigned
    priority: 'Low',
    stage: 'done',
    autor: 'John Doe'
  },
  {
    id: 4,
    title: 'Update Documentation',
    message: 'Update project documentation based on recent changes',
    whoTake: '', // Empty means unassigned
    priority: 'Low',
    stage: 'todo',
    autor: 'John Doe'
  }
  // Add more task objects here
];

// Assuming you have user information available
const loggedInUser = 'John Doe'; // Replace this with your actual logged-in user

const TaskList = () => {
  // Filter tasks based on the logged-in user or unassigned tasks
  const filteredTasks = tasks.filter(
    (task) => task.whoTake === loggedInUser || task.whoTake === ''
  );

  return (
    <div className='task-list flex space-x-4'>
      {/* To Do Column */}
      <div className='w-1/3'>
        <h1 className='text-lg font-semibold mb-4'>To Do</h1>
        {filteredTasks
          .filter((task) => task.stage === 'todo')
          .map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onTakeButtonClick={(id) => {
                console.log('Take button clicked for task with id: ', id);
              }}
              onSendForDetailsClick={(id) => {
                console.log(
                  'Send for details button clicked for task with id: ',
                  id
                );
              }}
              onFinishClick={(id) => {
                console.log('Finish button clicked for task with id: ', id);
              }}
              onSendDoneMessageClick={(id, autor) => {
                console.log(
                  'Send done message button clicked for task with id: ',
                  id,
                  ' and autor: ',
                  autor
                );
              }}
            />
          ))}
      </div>

      {/* In Progress Column */}
      <div className='w-1/3'>
        <h1 className='text-lg font-semibold mb-4'>In Progress</h1>
        {filteredTasks
          .filter((task) => task.stage === 'inProgress')
          .map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onTakeButtonClick={(id) => {
                console.log('Take button clicked for task with id: ', id);
              }}
              onSendForDetailsClick={(id) => {
                console.log(
                  'Send for details button clicked for task with id: ',
                  id
                );
              }}
              onFinishClick={(id) => {
                console.log('Finish button clicked for task with id: ', id);
              }}
              onSendDoneMessageClick={(id, autor) => {
                console.log(
                  'Send done message button clicked for task with id: ',
                  id,
                  ' and autor: ',
                  autor
                );
              }}
            />
          ))}
      </div>

      {/* Done Column */}
      <div className='w-1/3'>
        <h1 className='text-lg font-semibold mb-4'>Done</h1>
        {filteredTasks
          .filter((task) => task.stage === 'done')
          .map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onTakeButtonClick={(id) => {
                console.log('Take button clicked for task with id: ', id);
              }}
              onSendForDetailsClick={(id) => {
                console.log(
                  'Send for details button clicked for task with id: ',
                  id
                );
              }}
              onFinishClick={(id) => {
                console.log('Finish button clicked for task with id: ', id);
              }}
              onSendDoneMessageClick={(id, autor) => {
                console.log(
                  'Send done message button clicked for task with id: ',
                  id,
                  ' and autor: ',
                  autor
                );
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default TaskList;
