import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "./components/Header";
import {Footer} from "./components/Footer";
import { UserContext, UserContextProvider } from "./UserContext";
import loading from './animations/loading.json';
import Lottie from "lottie-react";
import gsap from "gsap";
import OrderHistoryPage from "./pages/Orders";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Foods = lazy(() => import("./pages/Foods"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Restaurant = lazy(() => import("./pages/Restaurant"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
  const comp = useRef(null);
  const [isLoading, setIsLoading] = useState(true)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#intro-slider", {
        duration: 4,
        delay: 0.6,
      })
        .from(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "+=30",
          stagger: 0.5,
        })
        .to(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "-=30",
          delay: 0.3,
          stagger: 0.5,
        })
        .to("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
        })
        .from("#welcome", {
          opacity: 0,
          duration: 0.5,
        });
    }, comp);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        id="intro-slider"
        className="max-h-screen bg-white fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center"
      >
        <Lottie animationData={loading} loop={true} className="w-[700px]" />
      </div>
    );
  }

  return (
    <BrowserRouter>
        <div className="relative">

        <Header />
        <div className="relative" ref={comp}>
          <Suspense fallback={<div
        id="intro-slider"
        className="max-h-screen bg-white fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center"
      >
        <Lottie animationData={loading} loop={true} className="w-[700px]" />
      </div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/Orders" element={<OrderHistoryPage />} />
              <Route path="/foods" element={<Foods />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/restaurants" element={<Restaurant />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
        </div>
    </BrowserRouter>
  );
};

export default App;
