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
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Sure",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Logout!",
            text: "Your session has been deleted.",
            icon: "success",
          });
          await account.deleteSession("current");
          navigate("/");
        }
      });
    } catch (error) {
      console.error("Failed to logout:", error.message);
    }
  };

  return (
    <>
      {isLoggedIn && isLoggedIn ? (
        <>
          <div className="p-2 bg-purple-400 flex justify-between">
            <h1 className="text-3xl  text-white">Welcome, {isLoggedIn.name}</h1>
            <div className="flex gap-2">
              <button className="btn btn-secondary rounded-xl">
                Update Password
              </button>
              <button
                onClick={logoutHandler}
                className="btn btn-danger rounded-xl"
              >
                Logout
              </button>
            </div>
          </div>
          <PostForm />
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
