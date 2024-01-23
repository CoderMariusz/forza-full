import React from 'react';

const MessageItem = ({ message }: any) => {
  const priorityColor = {
    High: '#DF3062',
    Medium: '#F5B935',
    Low: '#4BAC3F'
  };

  const getColorClass = (priority: string) => {
    const priorityColor: { [key: string]: string } = {
      High: '#DF3062',
      Medium: '#F5B935',
      Low: '#4BAC3F'
    };

    return `bg-[${priorityColor[priority]}] text-white rounded-md p-2 mb-2`;
  };

  return (
    <div className='bg-white max-w-md shadow-md rounded-md mb-4'>
      <div
        className={`bg-yellow-500 rounded-none rounded-tl-md rounded-tr-md ${getColorClass(
          message.priority
        )}`}>
        <h3>{message.title}</h3>
        <p>From: {message.from}</p>
      </div>
      <p>{message.text}</p>
      <p>Priority: {message.priority}</p>
      <p>Read: {message.isRead ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default MessageItem;
