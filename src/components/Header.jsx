import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Contact, Ham, ListOrdered, LogIn, LogOut, Menu, Pizza, Search, ShoppingCart, User } from "lucide-react";

const Header = () => {
  const { responseImg, setResponseImg, usernameGlb, setUsernameGlb, bioGlb, setBioGlb } = useContext(UserContext);
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`https://jsm-contest.onrender.com/getProfile/${userInfo?.email}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setResponseImg(data?.profilePic);
        setUsernameGlb(data?.username);
        setBioGlb(data?.bio);
      });
  }, [userInfo?.email, responseImg]);

  useEffect(() => {
    fetch('https://jsm-contest.onrender.com/profile', {
      credentials: 'include',
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo.email);
      });
    });
  }, []);

  function logout() {
    fetch('https://jsm-contest.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const email = userInfo?.email;

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white border-b fixed top-0 z-[999] w-full">
      <div className="flex items-center justify-between p-4">
        <Link className="flex items-center" to="/">
          <img src="/fiorlogo.png" alt="Logo" className="w-8 h-8" />
          <div className="ml-4 flex items-center">
            <span className="font-bold">
              Fior Di Saigon<span className="text-orange-500"></span>
            </span>
            <i className="fas fa-chevron-down ml-1 text-orange-500"></i>
          </div>
        </Link>
        <div className="max-md:hidden md:flex items-center space-x-6">
          <Link to="/contact" className="flex items-center gap-1">
            <Contact />
            <span>Contact</span>
          </Link>

          {!email && (
            <>
              <Link to="/login" className="flex items-center gap-1">
                <User />
                Login
              </Link>
              <Link to="/register" className="flex items-center gap-1">
                <User />
                Register
              </Link>
            </>
          )}
          <Link to="/foods" className="flex items-center gap-1">
            <Pizza />
            Foods
          </Link>
          <Link to="/restaurants" className="flex items-center gap-1">
            <Ham />
            Restaurants
          </Link>
          {email && (
            <>
              <Link to="/" className="flex items-center gap-1" onClick={logout}>
                <LogOut />
                Logout
              </Link>
              <Link to={"/cart"} className="flex items-center gap-1">
                <ShoppingCart />
                <span>Cart</span>
              </Link>
              <Link to={"/orders"} className="flex items-center gap-1">
                <ShoppingCart />
                <span>Orders</span>
              </Link>

              {responseImg && (
                <Link className="w-8 h-8" to={"/profile"}>
                  <img src={responseImg} alt="Uploaded profile" className="rounded-full  w-full object-cover h-full" />
                </Link>
              )}
            </>
          )}
        </div>
        <div className="md:hidden max-md:flex items-center">
          <button onClick={toggleMenu} className="outline-none mobile-menu-button">
            <Menu />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-start p-4 space-y-4">
            <Link to="/contact" className="flex items-center gap-1">
              <Contact />
              <span>Contact</span>
            </Link>
            {!email && (
              <>
                <Link to="/login" className="flex items-center gap-1">
                  <User />
                  Login
                </Link>
                <Link to="/register" className="flex items-center gap-1">
                  <User />
                  Register
                </Link>
              </>
            )}
            <Link to="/foods" className="flex items-center gap-1">
              <Pizza />
              Foods
            </Link>
            <Link to="/restaurants" className="flex items-center gap-1">
              <Ham />
              Restaurants
            </Link>
            {email && (
              <>
                <Link to="/" className="flex items-center gap-1" onClick={logout}>
                  <LogOut />
                  Logout
                </Link>
                <Link className="flex items-center gap-1" to={"/cart"}>
                  <ShoppingCart />
                  <span>Cart</span>
                </Link>
                <Link className="flex items-center gap-1" to={"/Orders"}>
                  <ListOrdered />
                  <span>Orders</span>
                </Link>
                {responseImg && (
                  <Link className="w-8 h-8" to="/profile">
                    <img src={responseImg} alt="Uploaded profile" className="rounded-full  w-full object-cover h-full" />
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
