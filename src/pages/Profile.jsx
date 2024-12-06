import { useContext } from "react"
import { UserContext } from "../UserContext"
import OrderHistoryPage from "./Orders";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";


const Profile = () => {
    const {responseImg, usernameGlb, bioGlb} = useContext(UserContext)
    console.log(usernameGlb);

  return (
    <div className="w-full min-h-screen">
        <div className="bg-blue-950 relative h-[50vh]">
            <div>
                <img src={responseImg} alt="" className="w-24 h-24 rounded-full absolute bottom-3 left-3"/>
                <div>
                    <h1 className="text-white text-4xl font-bold absolute bottom-16 left-32">{usernameGlb}</h1>
                    <p className="text-white text-lg absolute bottom-6 left-32">{bioGlb}</p>
                    <Link to="/onboarding" className="bg-orange-500 text-white font-bold gap-x-4 px-6 py-4 rounded-xl absolute bottom-3 right-3 flex items-center justify-center"><Pencil />Edit Profile</Link>
                </div>
            </div>
        </div>
        {/* Rest of your profile components */}
        <div>
            <OrderHistoryPage />
        </div>
    </div>
  )
}

export default Profile
