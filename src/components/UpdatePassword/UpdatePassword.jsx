import React from "react";
import UpdatePasswordForm from "./UpdatePasswordForm/UpdatePasswordForm";

const UpdatePassword = () => {
  return (
    <div className=" row g-0 w-10/12 mx-auto" style={{ height: "90vh" }}>
      <div className="col-6 bg-[#3698FB] flex gap-6 flex-col justify-center items-center text-white">
        <h6 className="text-2xl">Nice to see you again</h6>
        <h1 className="text-5xl">WELCOME BACK</h1>
        <p className="border-2 w-14 rounded"></p>
        <p className="text-center w-full px-24 text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae illum
          numquam labore quo odio, adipisci consequatur ex fuga facere quae?
          Perspiciatis officiis.
        </p>
      </div>
      <div className="col-6 bg-white flex flex-col justify-center gap-5">
        <h1 className="text-slate-700 text-3xl font-bold">Update Password</h1>
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export default UpdatePassword;
