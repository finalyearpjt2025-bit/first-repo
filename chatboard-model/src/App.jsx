import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatInterface from './components/ChatInterface.jsx'; // Import chat view

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Navbar />

      <div className="d-flex w-100 position-relative" style={{ backgroundColor: '#0b0f19' }}>
        
        {/* 1. Main Chat Area handles the left side layout */}
        <ChatInterface />

        {/* Floating button to open sidebar from the right */}
        {!isSidebarOpen && (
          <button 
            className="btn btn-dark position-absolute top-0 end-0 z-3 shadow rounded-0 m-0"
            onClick={() => setIsSidebarOpen(true)}
            style={{ backgroundColor: '#13192e', border: 'none', height: 'calc(100vh - 56px)', width: '45px' }}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
        )}

        {/* 2. Sidebar rests on the right side */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
    </>
  );
}

export default App;
