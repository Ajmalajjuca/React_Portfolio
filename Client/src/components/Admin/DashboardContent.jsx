import { Bell, Settings, User, Folder, Code, LogOut } from 'lucide-react';
import React from 'react';


const stats = {
    totalProjects: 12,
    totalSkills: 8,
    recentUpdates: 5,
    profileViews: 1234
  };
  const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
    {children}
  </div>
);

const DashboardContent = () => {
  return (
    <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Total Projects</h3>
          <Folder className="h-4 w-4 text-gray-500" />
        </div>
        <div className="text-2xl font-bold">{stats.totalProjects}</div>
      </Card>
      
      <Card>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Skills</h3>
          <Code className="h-4 w-4 text-gray-500" />
        </div>
        <div className="text-2xl font-bold">{stats.totalSkills}</div>
      </Card>
      
      <Card>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Recent Updates</h3>
          <Bell className="h-4 w-4 text-gray-500" />
        </div>
        <div className="text-2xl font-bold">{stats.recentUpdates}</div>
      </Card>
      
      <Card>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Profile Views</h3>
          <User className="h-4 w-4 text-gray-500" />
        </div>
        <div className="text-2xl font-bold">{stats.profileViews}</div>
      </Card>
    </div>
    </div>
  )
}

export default DashboardContent