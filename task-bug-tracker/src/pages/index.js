import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = {
      Developer: 'Developer@123',
      Manager: 'Manager@123',
    };

    if (credentials[username] && credentials[username] === password) {
      localStorage.setItem('username', username);
      localStorage.setItem('role', username);
      if (username === 'Manager') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-2"
            required
          />
          <button
            type="submit"
            className="bg-[#955cff] text-white py-2 rounded hover:bg-purple-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}