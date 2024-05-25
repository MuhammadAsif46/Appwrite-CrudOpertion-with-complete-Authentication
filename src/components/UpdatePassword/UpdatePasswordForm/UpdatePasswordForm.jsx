import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../../../appwrite/appwriteConfig";

const UpdatePasswordForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);

    const { newPassword, oldPassword } = values;

    try {
      // Attempt to update the password
      const response = await account.updatePassword(newPassword, oldPassword);
      // console.log("Password updated successfully:", response);
      Swal.fire({
        icon: "success",
        title: "your password updated successfully ",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/profile");
    } catch (error) {
      // Handle any errors that occur during the password update
      console.error("Failed to update password:", error.message);
      setError(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {error && <div className="text-red-600">{error}</div>}
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please input your newPassword!",
            },
          ]}
        >
          <Input.Password className="w-96" placeholder="New Password" />
        </Form.Item>

        <Form.Item
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Please input your oldpassword!",
            },
          ]}
        >
          <Input.Password
            className="w-96"
            placeholder="Oldpassword"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default UpdatePasswordForm;
