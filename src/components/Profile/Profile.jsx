import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { account } from "../../appwrite/appwriteConfig";
import PostForm from "../PostForm/PostForm";
import Post from "../Post/Post";

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
          <div className="p-2 bg-purple-400 flex justify-between" >
            <h1 className="text-3xl  text-white">
              Welcome, {isLoggedIn.name}
            </h1>
            <div className="flex gap-2">
              <button className="btn btn-secondary rounded-xl">Update Password</button>
              <button className="btn btn-danger rounded-xl">Logout</button>
            </div>
          </div>
          <PostForm />
          <div className="flex flex-wrap justify-between gap-5">
            <Post />
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

    // <>
    //   <h1 className="text-3xl p-2 bg-purple-500 text-white">
    //     Crud Operation with Appwrite
    //   </h1>
    //   <PostForm />
    //   <div className="flex flex-wrap justify-between gap-5">
    //     <Post />
    //   </div>
    // </>
  );
};

export default Profile;
