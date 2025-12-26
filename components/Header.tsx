import React, { useState } from 'react';
import { ZapIcon, MenuIcon, XIcon } from './Icons';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'devices', label: 'Devices' },
  ];

  const handleMobileNavigate = (view: string) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleMobileNavigate('dashboard')}
        >
          <div className="bg-sky-600 p-1.5 rounded-lg text-white">
            <ZapIcon className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
            URJA SETU
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === item.id 
                  ? 'bg-sky-50 text-sky-700' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="h-4 w-px bg-slate-200 mx-2"></div>
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span className="text-xs font-medium text-slate-600">Gateway Connected</span>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white absolute w-full shadow-lg z-40">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMobileNavigate(item.id)}
                className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  currentView === item.id 
                    ? 'bg-sky-50 text-sky-700' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 mt-2 border-t border-slate-100 flex items-center gap-2 px-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="text-xs font-medium text-slate-600">Gateway Connected</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
