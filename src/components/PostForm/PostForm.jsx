import React, { useState } from "react";
import profileImg from "../../assets/user.svg";
import { v4 as uuidv4 } from "uuid";
import { databases } from "../../appwrite/appwriteConfig";
import Post from "../Post/Post";

const PostForm = () => {
  const [post, setPost] = useState();
  const [posts, setPosts] = useState([]);

  const formSubmitHandle = (e) => {
    e.preventDefault();

    const promise = databases.createDocument(
      "6648c89f00135cfcab19",
      "6648c8b6001e2ac3de30",
      uuidv4(),
      {
        post,
      }
    );
    promise.then(
      function (response) {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Your post has been created successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        setPosts([...posts, response]); 
      },
      function (error) {
        console.log(error);
      }
    );

    e.target.reset();
  };
  return (
    <>
      <div className="flex justify-center items-center py-3">
        <form
          action=""
          onSubmit={formSubmitHandle}
          className="bg-white rounded-xl shadow-lg w-1/2 p-2"
        >
          <div className="flex p-2 items-center gap-3">
            <div
              className="rounded-full flex justify-center items-center"
              style={{
                border: "1px solid black",
                width: "50px",
                height: "50px",
              }}
            >
              <img src={profileImg} className="" alt="profile-img" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg">Muhammad Asif</span>
              <span className="text-sm text-gray-500">
                19-06-2024<strong> 12 : 45</strong>
              </span>
            </div>
          </div>
          <div className="p-2">
            <textarea
              rows={5}
              className="border px-2 w-full"
              placeholder="Enter your post"
              onChange={(e) => setPost(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="p-2">
            <button
              type="submit"
              className="focus:outline-none w-full text-white bg-purple-500 hover:bg-purple-700 focus:ring-1 focus:ring-purple-300 font-medium rounded-lg px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Post
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-wrap gap-4">
        <Post posts={posts} setPosts={setPosts} />
      </div>
    </>
  );
};

export default PostForm;
