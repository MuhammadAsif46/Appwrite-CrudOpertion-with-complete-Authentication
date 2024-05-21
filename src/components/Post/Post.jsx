import { useEffect, useState } from "react";
import { databases } from "../../appwrite/appwriteConfig";

const Post = ({ posts, setPosts }) => {
  // console.log(posts);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [editPost, setEditPost] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoader(true);
      const response = await databases.listDocuments(
        "6648c89f00135cfcab19",
        "6648c8b6001e2ac3de30"
      );
      console.log(response.documents);
      setPosts(response.documents);
      setLoader(false);
    } catch (error) {
      console.error("Failed to fetch posts:", error.message);
      setLoader(false);
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const startEditing = (id, content) => {
    setDropdownOpen(false);
    setEditPost(id);
    setEditContent(content);
  };

  const editPostHandler = async (id) => {
    setDropdownOpen(false)
    try {
      Swal.fire({
        title: "Do you want to save the changes?",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Save",
        confirmButtonColor: "#3085d6",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const updatedPost = { post: editContent };
          const response = await databases.updateDocument(
            "6648c89f00135cfcab19",
            "6648c8b6001e2ac3de30",
            id,
            updatedPost
          );
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.$id === id ? { ...post, post: response.post } : post
            )
          );
          setEditPost(null);
          Swal.fire("Saved!", "", "success");
        }
      });
    } catch (error) {
      console.error("Failed to delete post:", error.message);
    }
  };

  const deletePost = (id) => {
    setDropdownOpen(false);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          await databases.deleteDocument(
            "6648c89f00135cfcab19",
            "6648c8b6001e2ac3de30",
            id
          );
          setPosts(posts.filter((post) => post.$id !== id));
        }
      });
    } catch (error) {
      console.error("Failed to delete post:", error.message);
    }
  };

  return (
    <>
      {loader ? (
        <p>Loading...</p>
      ) : (
        <>
          {posts &&
            posts.map((item) => (
              <div
                key={item.$id}
                className="w-full max-w-sm bg-gray-500 border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex flex-col gap-2 items-end px-4 pt-4 relative">
                  <button
                    id="dropdownButton"
                    onClick={() => toggleDropdown(item.$id)}
                    className="inline-block text-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                    type="button"
                  >
                    <span className="sr-only">Open dropdown</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                  </button>
                  {/* <!-- Dropdown menu --> */}
                  <div
                    id="dropdown"
                    className={`absolute top-14 right-1 z-10 ${
                      dropdownOpen[item.$id] ? "block" : "hidden"
                    } text-start text-base list-none bg-gray-500 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                  >
                    <ul className="py-2" aria-labelledby="dropdownButton">
                      <li>
                        <a
                          onClick={() => startEditing(item.$id, item.post)}
                          className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Export Data
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => deletePost(item.$id)}
                          className="block px-4 py-2 text-sm cursor-pointer text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-center pb-10 ">
                  {editPost === item.$id ? (
                    <>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="mb-2 bg-slate-400 text-xl px-10 font-medium text-gray-900 dark:text-gray-800"
                      />
                      <button
                        onClick={() => editPostHandler(item.$id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <h5 className="mb-1 text-xl text-center px-10 font-medium text-gray-900 dark:text-white">
                        {item.post}
                      </h5>
                      <div className="flex mt-4 md:mt-6">
                        <a
                          href="#"
                          className="inline-flex items-center px-10 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Like
                        </a>
                        <a
                          href="#"
                          className="py-2 px-8 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-gray-900 dark:hover:bg-gray-700"
                        >
                          Share
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default Post;
