import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center fixed inset-0">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
    </div>
  );
};

export default Loading;