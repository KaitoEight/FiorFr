import { useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);

  async function register(e) {
    e.preventDefault();
    const res = await fetch('https://jsm-contest.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    if (res.status === 200) {
      setToast({ type: 'success', message: 'Registration successful!' });
    } else {
      setToast({ type: 'error', message: 'Registration failed.' });
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen relative px-7">
      <Link className="flex items-center mb-5" to="/">
                            <img src="/fiorlogo.png" alt="Logo" className="w-16 h-16"/>
                            <div className="ml-4 flex items-center text-3xl">
                                <span className="font-bold">FiorDi<span className="text-orange-500">Saigon</span></span>
                                <i className="fas fa-chevron-down ml-1 text-orange-500"></i>
                            </div>
                        </Link>
        <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl hover:shadow-gray-700 shadow-gray-500  transition-all duration-300 w-full max-w-md ">
            <div className="bg-gray-100 w-full flex justify-center items-center flex-col gap-y-2 py-5 rounded-t-lg">

          <h2 className="text-2xl font-bold">Register</h2>
          <p className="text-orange-500 font-semibold">Enter details to register</p>
            </div>
          <form onSubmit={register} className="p-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-orange-400 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="your name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-orange-400 focus:shadow-outline"
                id="email"
                type="email"
                placeholder="your@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-orange-400 focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
              <Link
                className="inline-block underline align-baseline font-semibold text-sm text-orange-500 hover:text-orange-800"
                to="/login"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>

        {/* Show Toast notification */}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </>
  );
};

export default Register;
