import React, { useEffect, useState } from "react";
import boyImage from "../../assets/boy.jpg";
import { useNavigate, Link } from "react-router-dom";
import { account } from "../../appwrite/appwriteConfig";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    const getData = account.get();
    getData
      .then((res) => {
        setIsLoggedIn(res);
        // console.log(res ? userDetails : "")
      })
      .catch((err) => console.log(err));
  }, []);

  const logoutHandler = async () => {
    try {
      await account.deleteSession("current");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoggedIn && isLoggedIn ? (
        <>
          <h1 className="p-4 text-4xl text-white">Profile Page</h1>
          <div className="bg-white mx-auto gap-4 p-4 rounded-2xl w-[40%] flex flex-col justify-center items-center">
            <div className="rounded-3xl overflow-hidden">
              <img
                src={boyImage}
                className=""
                alt="boy-image"
                width="100%"
                height="100%"
              />
            </div>
            <p className="text-center w-96 text-gray-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ipsa
              iure dolor excepturi? Alias cum explicabo quae commodi, esse illum
              qui deleniti, distinctio consequuntur blanditiis incidunt nemo
              laboriosam ex nostrum.
            </p>
            <p className="text-xl">Hello {isLoggedIn.name}</p>
            <div className="flex gap-4">
              <button
                className="btn btn-secondary rounded-full"
                onClick={()=> navigate("/update-password")}
              >
                Update Password
              </button>
              <button
                className="btn btn-danger rounded-full"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white p-4">
          <p>
            Please Login To see Profile{" "}
            <Link to="/">
              <span className="bg-blue-600 p-2 cursor-pointer text-white rounded-md">
                Login
              </span>
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Profile;
