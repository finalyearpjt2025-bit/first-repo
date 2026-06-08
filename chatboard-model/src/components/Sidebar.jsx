function Sidebar({ isOpen, setIsOpen }) {
    // If the state is set to false, do not render the sidebar
    if (!isOpen) return null;

    return (
        <div
            className="d-flex flex-column p-3 text-white"
            style={{
                width: '280px',
                height: 'calc(100vh - 56px)',
                backgroundColor: '#13192e',
                flexShrink: 0
            }}
        >
            {/* Collapse Icon Button - Added functionality */}
            <div className="text-start mb-3"> {/* Optional: Change text-end to text-start to keep icon inside */}
                <button className="btn text-white p-0" onClick={() => setIsOpen(false)}>
                    <i className="fa-solid fa-angles-right"></i> {/* Changed from fa-angles-left */}
                </button>
            </div>

            {/* New Chat Button */}
            <button
                className="btn w-100 text-white mb-3 d-flex align-items-center justify-content-center gap-2"
                style={{ backgroundColor: '#3b3bc4', borderRadius: '8px', padding: '12px' }}
            >
                <i className="fa-solid fa-plus"></i>
                <span>New Chat</span>
            </button>

            {/* Navigation Menu */}
            <ul className="nav nav-pills flex-column mb-auto gap-1 w-100">
                <li className="nav-item">
                    <a href="#search" className="nav-link text-white d-flex align-items-center gap-3 px-2 py-2 text-start">
                        <i className="fa-solid fa-magnifying-glass" style={{ width: '20px' }}></i>
                        <span>Search</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#history" className="nav-link text-white d-flex align-items-center gap-3 px-2 py-2 text-start">
                        <i className="fa-solid fa-clock-rotate-left" style={{ width: '20px' }}></i>
                        <span>Form History</span>
                    </a>
                </li>

                {/* Section Header */}
                <li
                    className="text-muted small text-uppercase mt-4 mb-2 px-2 text-start"
                    style={{ fontSize: '11px', letterSpacing: '0.5px' }}
                >
                    Previous Chats
                </li>

                {/* Previous Chat Links - Standardized with padding and left alignment */}
                <li className="nav-item">
                    <a href="#roadmap" className="nav-link text-white px-2 py-2 text-start text-truncate d-block w-100">
                        Strategic Project Roadmap 2024
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#architecture" className="nav-link text-white px-2 py-2 text-start text-truncate d-block w-100">
                        Frontend Architecture Review
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#api" className="nav-link text-white px-2 py-2 text-start text-truncate d-block w-100">
                        API Integration Guidelines
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#design" className="nav-link text-white px-2 py-2 text-start text-truncate d-block w-100">
                        Design System Visual Tokens
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
