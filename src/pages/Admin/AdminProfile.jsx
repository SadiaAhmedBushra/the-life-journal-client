import React from 'react';
import formbg from "../../assets/formbg1.webp";
import { Link } from "react-router";
import { MdAdminPanelSettings, MdOutlineWorkspacePremium } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import LessonCard from "../Shared/LessonCard/LessonCard";

const AdminProfile = () => {
    const { user } = useAuth();


    return (
    //     <div
    //   className="max-w-6xl mx-auto my-10 p-6 lg:p-8 rounded-lg bg-cover bg-center flex justify-center items-center"

    // >
    //   <div className="flex flex-col gap-6 w-full">
    //     <h3 className="text-3xl lg:text-4xl font-extrabold my-4 mx-auto text-primary text-center">
    //       Admin Profile
    //     </h3>
    //     <div className="grid grid-cols-1 gap-6 w-full">
    //       <div className="backdrop-blur-sm bg-primary/10 w-2/4 mx-auto p-6 lg:p-8 rounded-lg shadow-lg  lg:col-span-4 flex flex-col items-center justify-between gap-4">
    //         <a href="#" className="relative block">
    //           <img
    //             alt="profile"
    //             src={user?.photoURL}
    //             className="mx-auto object-cover rounded-full h-32 w-32 lg:h-40 lg:w-40 border-2 border-white"
    //           />
    //         </a>
       

           
    //           <div className="flex items-center gap-1 btn-primary text-white ">
    //             <MdAdminPanelSettings className="text-2xl" />
    //             <span>Admin</span>
    //           </div>
        

    //         <p className="text-center text-md text-secondary">
    //           User Id: {user?.uid}
    //         </p>
    //       </div>

    //       <div className="backdrop-blur-sm rounded-lg shadow-lg bg-primary/10 w-2/4 mx-auto p-6">
    //         <div className="flex flex-col gap-13 w-full">
    //           <div className="flex flex-col lg:flex-row justify-between items-start w-full px-6 gap-10">
    //             <div className="flex flex-col justify-center items-start gap-6 w-full lg:w-1/2">
    //               <p className="flex flex-col text-muted">
    //                 Name
    //                 <span className="font-bold text-primary text-xl">
    //                   {user?.displayName}
    //                 </span>
    //               </p>
    //               <p className="flex flex-col text-muted">
    //                 Email
    //                 <span className="font-bold text-primary text-xl">
    //                   {user?.email}
    //                 </span>
    //               </p>
    //             </div>

         
    //           </div>

    //           <Link
    //             to="/dashboard/update-my-profile"
    //             className=" w-full lg:w-auto mx-auto"
    //           >
    //             <button className="btn btn-primary w-full lg:w-auto mx-auto">
    //               Update Profile
    //             </button>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>

     
    //   </div>
    // </div>
    
  
  
  <div
  className="max-w-6xl mx-auto my-12 px-4 lg:px-8 py-8 rounded-2xl bg-cover bg-center flex justify-center items-center"
>
  <div className="flex flex-col gap-10 w-full">
    <h3 className="text-3xl lg:text-4xl font-extrabold text-primary text-center">
      Admin Profile
    </h3>

    <div className="grid grid-cols-1 gap-8 w-full">
      <div className="backdrop-blur-sm bg-primary/10 w-full lg:w-2/3 mx-auto p-8 rounded-2xl shadow-lg flex flex-col items-center gap-6">
        <a href="#" className="relative block">
          <img
            alt="profile"
            src={user?.photoURL}
            className="mx-auto object-cover rounded-full h-32 w-32 lg:h-40 lg:w-40 border-4 border-white shadow-md"
          />
        </a>

        <div className="flex items-center gap-2 btn-primary text-white px-4 py-2 rounded-full">
          <MdAdminPanelSettings className="text-2xl" />
          <span className="font-semibold">Admin</span>
        </div>

        <p className="text-center text-sm text-secondary break-all">
          User ID: {user?.uid}
        </p>
      </div>

      <div className="backdrop-blur-sm rounded-2xl shadow-lg bg-secondary/10 w-full lg:w-2/3 mx-auto p-8">
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-10">
            <div className="flex flex-col mx-auto gap-6 w-full lg:w-1/2">
              <p className="text-center text-muted">
                Name: 
                <span className="font-bold text-primary text-xl">
                  {user?.displayName}
                </span>
              </p>
              <p className="text-center text-muted">
                Email: 
                <span className="font-bold text-primary text-xl break-all">
                  {user?.email}
                </span>
              </p>
            </div>
          </div>

          <Link
            to="/dashboard/update-my-profile"
            className="w-full flex justify-center"
          >
            <button className="btn btn-primary px-8">
              Update Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default AdminProfile;