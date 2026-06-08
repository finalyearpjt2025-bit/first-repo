import { useRef, useState, useEffect } from 'react';

function ChatInterface() {
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedModel, setSelectedModel] = useState('Set-Model');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chatStarted, setChatStarted] = useState(false); // New state to track if chat has started

  // Auto-expand textarea height based on typing text content length
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        type: file.type.split('/')[1]?.toUpperCase() || 'FILE',
        isImage: file.type.startsWith('image/')
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      console.log('Selected model:', selectedModel);
      console.log('Uploaded files:', uploadedFiles);
      setChatStarted(true); // Hide welcome header when first message is sent
      // TODO: Send to server
      setMessage('');
      setUploadedFiles([]);
    }
  };

  const handleKeyDown = (e) => {
    // Send message on Enter (without modifiers)
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      handleSendMessage();
    }
    // Add new line on Ctrl+Shift+Enter or Cmd+Shift+Enter (Mac)
    else if (e.key === 'Enter' && e.shiftKey && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newMessage = message.substring(0, start) + '\n' + message.substring(end);
      setMessage(newMessage);
      
      // Set cursor position after the new line
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  return (
    <div 
      className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-white p-4" 
      style={{ backgroundColor: '#0b0f19', minHeight: 'calc(100vh - 56px)' }}
    >
      {/* Center Welcome Header - Hidden after first message */}
      {!chatStarted && (
        <div className="text-center mb-5 position-relative" style={{ top: '-5rem' }}>
          <h1 className="fw-bold mb-2" style={{ fontSize: '2.5rem', color: '#e2e8f0' }}>
            How can Nexus help you today?
          </h1>
          <p className="text-muted fs-5" style={{ color: '#94a3b8', marginBottom: '15px' }}>
            Precision AI for high-stakes professional communication.
          </p>
        </div>
      )}

      {/* Main Input Box Wrapper */}
      <div className="w-100 mb-5 position-relative" style={{ maxWidth: '720px', top: chatStarted ? '0' : '-6rem' }}>
        
        {/* Main Box Outer Container */}
        <div 
          className="d-flex flex-column p-3 rounded-3" 
          style={{ backgroundColor: '#13192e', border: '1px solid #1e293b' }}
        >
          
          {/* TOP SECTION: File Attachments Placement Area */}
          {uploadedFiles.length > 0 && (
            <div className="d-flex flex-wrap mb-3 w-100 align-items-start" style={{ gap: '5px' }}>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="position-relative">
                  {/* Close pill action circle */}
                  <button 
                    className="btn btn-sm p-0 position-absolute d-flex align-items-center justify-content-center bg-dark text-white rounded-circle z-2"
                    style={{ width: '16px', height: '16px', right: '4px', top: '4px', fontSize: '9px', border: '1px solid #334155' }}
                    onClick={() => removeFile(index)}
                    type="button"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>

                  {file.isImage ? (
                    /* Image Preview Layout Style */
                    <div className="rounded-3 overflow-hidden border border-secondary shadow" style={{ width: '56px', height: '56px' }}>
                      <img src="https://vecteezy.com" className="w-100 h-100 object-fit-cover" alt="preview" />
                    </div>
                  ) : (
                    /* Document Box Display Row Component Layout Style */
                    <div 
                      className="d-flex align-items-center gap-2 p-2 rounded-3 text-white border pe-4" 
                      style={{ backgroundColor: '#1e293b', borderColor: '#334155', width: '220px' }}
                    >
                      <div className="d-flex align-items-center justify-content-center bg-danger rounded-2 shadow-sm flex-shrink-0" style={{ width: '36px', height: '36px' }}>
                        <i className="fa-solid fa-file-pdf text-white fs-5"></i>
                      </div>
                      <div className="overflow-hidden lh-sm pe-3">
                        <div className="text-truncate fw-medium" style={{ fontSize: '0.85rem' }}>{file.name}</div>
                        <div className="text-muted text-truncate" style={{ fontSize: '0.70rem' }}>{file.type}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* BOTTOM SECTION: Content Input Row */}
          <div className="d-flex align-items-end w-100 gap-2">
            
            {/* Left Plus Attachment Trigger Item */}
            <button 
              className="btn text-muted p-0 mb-1 border-0 flex-shrink-0 d-flex align-items-center justify-content-center" 
              onClick={handleUploadClick}
              style={{ width: '36px', height: '36px' }}
              type="button"
            >
              <i className="fa-solid fa-plus fs-5"></i>
            </button>

            {/* Hidden Reference Input Node */}
            <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} style={{ display: 'none' }} />

            {/* Center Field: Auto-expanding Textarea Element */}
            <textarea 
              ref={textareaRef}
              rows="1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message..." 
              className="form-control bg-transparent text-white border-0 shadow-none py-1 px-1 flex-grow-1 resize-none" 
              style={{ fontSize: '1rem', resize: 'none', maxHeight: '200px', overflowY: 'auto' }}
            />

            {/* Right Element Cluster Side Dock Controls */}
            <div className="d-flex align-items-center gap-2 flex-shrink-0 mb-1">
              
              {/* Dynamic Dropdown Engine */}
              <div className="dropdown">
                <button 
                  className="btn btn-sm text-white border-0 d-flex align-items-center gap-1 rounded-pill px-3 py-1.5 shadow-none" 
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{ backgroundColor: '#232a45', fontSize: '0.85rem' }}
                >
                  <span>{selectedModel}</span>
                  <i className="fa-solid fa-chevron-down ms-1" style={{ fontSize: '0.7rem', color: '#94a3b8' }}></i>
                </button>

                {dropdownOpen && (
                  <ul 
                    className="dropdown-menu dropdown-menu-dark p-2 border-0 shadow-lg show" 
                    style={{ 
                      backgroundColor: '#13192e', 
                      border: '1px solid #1e293b', 
                      maxHeight: '400px', 
                      overflowY: 'auto',
                      fontSize: '0.85rem',
                      display: 'block',
                      minWidth: '280px'
                    }}
                  >
                    {/* ...existing dropdown items... */}
                  </ul>
                )}
              </div>

              <button 
                className="btn d-flex align-items-center justify-content-center rounded-3 p-0" 
                style={{ backgroundColor: '#93c5fd', color: '#13192e', width: '36px', height: '36px' }}
                type="button"
                onClick={handleSendMessage}
              >
                <i className="fa-solid fa-arrow-right fs-5" style={{ color: '#0b0f19' }}></i>
              </button>
            </div>

          </div>

        </div>

        {/* Footer Disclaimer Text */}
        <p className="text-center text-muted small mt-3" style={{ fontSize: '0.75rem', color: '#52525b' }}>
          NexusChat can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}

export default ChatInterface;