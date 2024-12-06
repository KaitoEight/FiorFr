import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast'; // Import custom Toast component

function OnboardingPage() {
  const { responseImg, setResponseImg, userInfo, usernameGlb, bioGlb } = useContext(UserContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState(usernameGlb || '');
  const [bio, setBio] = useState(bioGlb || '');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // State to show toast notifications
  const navigate = useNavigate(); // Hook for navigation (orangeirection)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!profilePicture) {
      setToast({
        type: 'error',
        message: 'No file selected',
      });
      setLoading(false);
      return;
    }

    try {
      // Upload image to Cloudinary
      const data = new FormData();
      data.append('file', profilePicture);
      data.append('upload_preset', 'profiles');
      data.append('cloud_name', 'deugdt4r1');

      const cloudinaryResult = await fetch('https://api.cloudinary.com/v1_1/deugdt4r1/image/upload', {
        method: 'POST',
        body: data,
      }).then(response => response.json());

      console.log('Cloudinary response:', cloudinaryResult);

      // Update the profile in the backend
      const updateResponse = await fetch(`https://jsm-contest.onrender.com/updateUser/${userInfo?.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          bio: bio,
          profilePic: cloudinaryResult.url, // Cloudinary image URL
        }),
      }).then(res => res.json());

      console.log('Profile updated:', updateResponse);

      // Show success toast
      setToast({
        type: 'success',
        message: 'Profile updated successfully!',
      });

      // Set the image in the context
      setResponseImg(cloudinaryResult);

      // orangeirect after 2 seconds
      setTimeout(() => {
        navigate('/profile'); // orangeirect to profile or any desiorange page
      }, 2000);
    } catch (error) {
      console.error('Error uploading or updating profile:', error);
      setToast({
        type: 'error',
        message: 'Failed to update profile. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (responseImg) {
      console.log('Updated responseImg:', responseImg);
    }
  }, [responseImg]);

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Customize Your Profile</h1>
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-2xl mx-auto">
        {responseImg && (
          <div className="mb-6 text-center">
            <img src={responseImg} alt="Uploaded profile" className="max-w-xs mx-auto rounded-full shadow-lg h-32 w-32 object-cover" />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profile-picture">
                Profile Picture
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="profile-picture"
                type="file"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded resize-none py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className={`${
                loading ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-700'
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />} {/* Show toast */}
    </div>
  );
}

export default OnboardingPage;
