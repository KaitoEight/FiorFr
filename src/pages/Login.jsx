import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Toast from "../components/Toast"; // Import the Toast component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserInfo } = useContext(UserContext);
  const [orangeirect, setorangeirect] = useState(false);
  const [toast, setToast] = useState(null); // Manage toast state

  async function login(e) {
    e.preventDefault();
    const response = await fetch('https://fiorbe.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      corangeentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json()
        setUserInfo(data);
        setToast({
          type: 'success',
          message: 'Login successful!',
        });
        localStorage.setItem('tokens', data.token)
        setTimeout(() => setorangeirect(true), 2000); // orangeirect after 2 seconds
    } else {
      setToast({
        type: 'error',
        message: 'Login failed. Please check your corangeentials.',
      });
    }
  }

  if (orangeirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col">
      <div className="flex items-center mb-5">
                            <img src="/fiorlogo.png" alt="Logo" className="w-16 h-16"/>
                            <div className="ml-4 flex items-center text-3xl">
                                <span className="font-bold">FiorDi<span className="text-orange-500">Saigon</span></span>
                                <i className="fas fa-chevron-down ml-1 text-orange-500"></i>
                            </div>
                        </div>
        <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl hover:shadow-gray-700 shadow-gray-500 mx-7 transition-all duration-300 w-full max-w-md">
        <div className="bg-gray-100  w-full flex justify-center items-center flex-col gap-y-2 py-5 rounded-t-lg">

<h2 className="text-2xl font-bold">Login</h2>
<p className="text-orange-500 font-semibold">Enter details to login</p>
  </div>
          <form onSubmit={login} className=" p-6 ">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
              <Link
                className="inline-block underline align-baseline font-semibold text-sm text-orange-500 hover:text-orange-800"
                to="/register"
              >
                Dont have an account?
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

export default Login;
