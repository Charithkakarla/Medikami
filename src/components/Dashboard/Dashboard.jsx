import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ChatInterface from '../ChatInterface/ChatInterface';
import HealthMetrics from '../HealthMetrics/HealthMetrics';
import DietPlan from '../DietPlan/DietPlan';
import AuthModal from './AuthModal';
import ProfileEditModal from './ProfileEditModal';
import ShinyText from '../ShinyText.jsx';

const Dashboard = () => {
  const [healthData, setHealthData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('chat'); // 'chat', 'analysis', 'diet'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [profileImage, setProfileImage] = useState('/3.jpg');

  useEffect(() => {
    // Apply premium dark theme to body
    document.body.className = 'premium-dark-theme';
    
    // Check for existing user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }

    // Load profile image
    const savedProfileImage = localStorage.getItem('profile_image');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    } else {
      // Set default profile image if none is saved
      setProfileImage('/3.jpg');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.user-profile')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const closeProfileDropdown = () => {
    setShowProfileDropdown(false);
  };

  const handleContactClick = () => {
            // Show Medikami support email
        alert('Contact Medikami support at: medikamisupport@gmail.com');
    closeProfileDropdown();
  };

  const handleHistoryClick = () => {
    // You can implement history functionality here
    alert('Chat history feature coming soon!');
    closeProfileDropdown();
  };

  const handleProfileEdit = () => {
    setShowProfileEditModal(true);
    closeProfileDropdown();
  };

  const handleDeleteHistory = () => {
    if (window.confirm('Are you sure you want to delete all chat history? This action cannot be undone.')) {
      // Clear chat history from localStorage
      localStorage.removeItem('chat_history');
      alert('Chat history has been deleted successfully!');
      closeProfileDropdown();
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        localStorage.setItem('profile_image', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (newName) => {
    setUser(prev => ({ ...prev, name: newName }));
    localStorage.setItem('user', JSON.stringify({ ...user, name: newName }));
  };

  const handleEmailChange = (newEmail) => {
    setUser(prev => ({ ...prev, email: newEmail }));
    localStorage.setItem('user', JSON.stringify({ ...user, email: newEmail }));
  };

  return (
    <div className="dashboard premium-dark">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className="logo">
            <h1 
              className="logo-clickable"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Also scroll the chat container if it exists
                const chatContainer = document.querySelector('.chat-messages');
                if (chatContainer) {
                  chatContainer.scrollTop = 0;
                }
              }}
              style={{ cursor: 'pointer' }}
            >
                              Medikami
            </h1>
          </div>
        </div>
        <div className="header-right">
          {isAuthenticated ? (
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name-display">{user?.name || user?.email}</span>
              </div>
              <div className="profile-icon-container" onClick={toggleProfileDropdown}>
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="profile-icon"
                  onError={(e) => {
                    e.target.src = '/3.jpg';
                  }}
                />
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className={`dropdown-arrow ${showProfileDropdown ? 'rotated' : ''}`}
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
              
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-section">
                    <h4>Profile</h4>
                    <div className="dropdown-item">
                      <img src={profileImage} alt="Profile" className="dropdown-profile-icon" />
                      <div className="user-details">
                        <span className="user-name">{user?.name || user?.email}</span>
                        <span className="user-email">{user?.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="dropdown-section">
                    <h4>Settings</h4>
                    <button className="dropdown-item" onClick={handleProfileEdit}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      <span>Edit Profile</span>
                    </button>
                    <button className="dropdown-item" onClick={handleHistoryClick}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Chat History</span>
                    </button>
                    <button className="dropdown-item" onClick={handleContactClick}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>Contact Support</span>
                    </button>
                  </div>
                  
                  <div className="dropdown-section">
                    <h4>Data</h4>
                    <button className="dropdown-item danger-item" onClick={handleDeleteHistory}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      <span>Delete History</span>
                    </button>
                  </div>
                  
                  <div className="dropdown-section">
                    <button className="dropdown-item logout-item" onClick={handleLogout}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16,17 21,12 16,7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button className="auth-btn" onClick={() => setShowAuthModal(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10,17 15,12 10,7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <ShinyText text="Sign In" speed={4} className="font-semibold" color="#ffffff" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-content">
            {healthData && (
              <>
                <div className="sidebar-section">
                  <h3>Quick Actions</h3>
                  <div className="action-buttons">
                    <button 
                      className={`action-btn ${activeView === 'chat' ? 'active' : ''}`}
                      onClick={() => setActiveView('chat')}
                    >
                      💬 Chat Assistant
                    </button>
                    <button 
                      className={`action-btn ${activeView === 'analysis' ? 'active' : ''}`}
                      onClick={() => setActiveView('analysis')}
                    >
                      📊 Health Analysis
                    </button>
                    <button 
                      className={`action-btn ${activeView === 'diet' ? 'active' : ''}`}
                      onClick={() => setActiveView('diet')}
                    >
                      🥗 Diet Plan
                    </button>
                  </div>
                </div>

                <div className="sidebar-section">
                  <h3>Detected Conditions</h3>
                  <div className="conditions-list">
                    {healthData.conditions.map((condition, index) => (
                      <div key={index} className="condition-tag">
                        {condition}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          {activeView === 'chat' && (
            <ChatInterface 
              healthData={healthData}
              isAuthenticated={isAuthenticated}
              onLoginRequest={() => setShowAuthModal(true)}
            />
          )}
          
          {activeView === 'analysis' && healthData && (
            <div className="analysis-view">
              <HealthMetrics 
                data={healthData} 
              />
            </div>
          )}
          
          {activeView === 'diet' && healthData && (
            <div className="diet-view">
              <DietPlan 
                conditions={healthData.conditions}
              />
            </div>
          )}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <AuthModal 
          onLogin={handleLogin}
          onSignup={handleSignup}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* Profile Edit Modal */}
      {showProfileEditModal && (
        <ProfileEditModal 
          user={user}
          profileImage={profileImage}
          onImageChange={handleProfileImageChange}
          onNameChange={handleNameChange}
          onEmailChange={handleEmailChange}
          onClose={() => setShowProfileEditModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard; 