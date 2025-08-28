import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleGetDetails = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:8000/api/user/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <div>
      {isLoggedIn ? (
        handleGetDetails(),
        <div>
          {Object.keys(userDetails).length > 0 && <div>
            <h2>User Detials</h2>
            <p>Name: {userDetails.username}</p>
            <p>Email: {userDetails.email}</p>
            <p>Role: {userDetails.role}</p>
            <button onClick={handleLogout}>Logout</button>
            </div>}
        </div>
      ) : (
        <p>You are logged out</p>
      )}
    </div>
  );
};

export default UserProfile