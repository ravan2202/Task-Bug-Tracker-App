import React from 'react';
import { useRouter } from 'next/router';
import { LogOut } from 'lucide-react'; 

export default function Navbar() {

    const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    router.push('/');
  };
  return (
    <nav className="fixed top-0 left-0 w-full bg-violet-600 text-white shadow z-50">
      <div className="px-18 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">DevTask Hub</h1>
            <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-sm font-medium hover:text-violet-200"
            >
            <LogOut size={24} />
            <span>Logout</span>
            </button>
        </div>
    </nav>
  );
}