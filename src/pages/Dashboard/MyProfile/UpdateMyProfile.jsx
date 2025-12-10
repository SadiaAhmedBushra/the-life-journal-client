import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { updateProfile } from "firebase/auth";
import { toast } from 'react-toastify';
import formbg from '../../../assets/formbg1.webp'

const UpdateMyProfile = () => {
    const { user } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile: " + error.message);
    }
};
    return (
       <div className="max-w-lg mx-auto my-10 p-8 rounded-lg bg-cover bg-center flex flex-col justify-center items-center"
             style={{ backgroundImage: `url(${formbg})` }}>
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">Update Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="font-semibold">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Photo URL</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-full">Save Changes</button>
      </form>
    </div>
    );
};

export default UpdateMyProfile;