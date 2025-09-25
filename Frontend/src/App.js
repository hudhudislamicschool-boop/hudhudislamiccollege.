import React from 'react';
import ChatRoom from './components/ChatRoom';
import VideoCall from './components/VideoCall';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <ChatRoom />
      <VideoCall />
    </div>
  );
}
export default App;