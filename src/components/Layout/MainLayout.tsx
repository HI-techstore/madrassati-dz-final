import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../SubjectsPage/SideMenu';
import { useTheme } from '../../hooks/useTheme';

export default function MainLayout() {
  const { isDark } = useTheme();

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <SideMenu />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}