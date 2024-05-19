import { useEffect, useState } from "react";
import { databases } from "../../appwrite/appwriteConfig";

const Post = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [allposts, setAllPosts] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const getAllPost = databases.listDocuments(
      "6648c89f00135cfcab19",
      "6648c8b6001e2ac3de30"
    );

    getAllPost.then(
      function (response) {
        console.log(response);
        setAllPosts(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
    setLoader(false);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const editPost = (id) => {
    const promise = databases.updateDocument(
      "6648c89f00135cfcab19",
      "6648c8b6001e2ac3de30",
      id,
      {}
    );
    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const deletePost = (id) => {
    const promise = databases.deleteDocument(
      "6648c89f00135cfcab19",
      "6648c8b6001e2ac3de30",
      id
    );
    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  return (
    <>
      {loader ? (
        <p>Loading...</p>
      ) : (
        <>
          {" "}
          {allposts &&
            allposts.map((item) => (
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col gap-2 items-end px-4 pt-4 relative">
                  <button
                    id="dropdownButton"
                    onClick={toggleDropdown}
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
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
                      dropdownOpen ? "block" : "hidden"
                    } text-start text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                  >
                    <ul className="py-2" aria-labelledby="dropdownButton">
                      <li>
                        <a
                          onClick={() => editPost(item.$id)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
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
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-center pb-10">
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
                      className="py-2 px-8 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Share
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default Post;
