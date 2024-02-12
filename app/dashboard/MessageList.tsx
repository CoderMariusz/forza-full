// components/MessageList.js

import React from 'react';
import MessageItem from './Message'; // Import the MessageItem component

const dummyMessages: any = [
  // {
  //   from: 'John Doe',
  //   to: 'Jane Smith',
  //   title: 'Meeting Tomorrow',
  //   text: `Don't forget about our meeting tomorrow at 10 AM.`,
  //   priority: 'High',
  //   isRead: false
  // },
  // {
  //   from: 'Alice Johnson',
  //   to: 'Bob Brown',
  //   title: 'Project Update',
  //   text: `Here's the latest update on the project progress.`,
  //   priority: 'Medium',
  //   isRead: true
  // },
  // {
  //   from: 'Charlie Davis',
  //   to: 'Emma Evans',
  //   title: 'Lunch Invitation',
  //   text: `Would you like to have lunch together next week?`,
  //   priority: 'Low',
  //   isRead: true
  // },
  // {
  //   from: 'Grace Garcia',
  //   to: 'Henry Harris',
  //   title: 'Urgent: Report Due',
  //   text: 'Please submit the quarterly report by Friday.',
  //   priority: 'High',
  //   isRead: false
  // }
];

const MessageList = () => {
  return (
    <div>
      {dummyMessages.map((message: any, index: number) => (
        <MessageItem
          key={index}
          message={message}
        />
      ))}
    </div>
  );
};

export default MessageList;
