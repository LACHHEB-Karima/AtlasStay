import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const MyProfile = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user)
        return <p className="text-center mt-8 text-gray-600">User information could not be loaded.</p>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6">
            <div className="flex flex-col items-center space-y-4">
                {user.pictureUrl ? (
                    <img
                        src={user.pictureUrl}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-2 border-teal-500 object-cover"
                    />
                ) : (
                    <UserCircle className="w-24 h-24 text-teal-600" />
                )}

                <div className="text-center">
                    <h2 className="text-xl font-semibold text-teal-700">{user.name}</h2>
                </div>

                <div className="w-full mt-6 flex justify-between gap-4">
                    <button
                        onClick={() => navigate("/my-bookings")}
                        className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg shadow"
                    >
                        My Bookings
                    </button>
                    <button
                        onClick={logout}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
