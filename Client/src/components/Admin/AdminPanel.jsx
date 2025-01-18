import React, { useState } from 'react';
import { Bell, Settings, User, Folder, Code, LogOut } from 'lucide-react';
import DashboardContent from './DashboardContent';
import ProjectsManagement from './ProjectsManagement ';
import SkillsManagement from './SkillsManagement';
import ProfileManagement from './ProfileManagement';

// Custom Card Component
const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      {children}
    </div>
  );

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock data for demonstration




  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Portfolio Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <LogOut className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            {['dashboard', 'projects', 'skills', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === tab
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <Card className="p-6">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'projects' && <div><ProjectsManagement/></div>}
          {activeTab === 'skills' && <div><SkillsManagement/></div>}
          {activeTab === 'profile' && <div><ProfileManagement/></div>}
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;