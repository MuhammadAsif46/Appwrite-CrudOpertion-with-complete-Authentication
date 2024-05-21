import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../../../appwrite/appwriteConfig";

const AntdForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);

    const { email, password } = values;

    const promise = account.createEmailPasswordSession(email, password);

    promise.then(
      function (response) {
        console.log(response); // Success
        Swal.fire({
          icon: "success",
          title: "you are logged in successfully ",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/profile");
      },
      function (error) {
        console.log(error.message);
        setError(error.message); // Failure
      }
    );
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
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input type="email" placeholder="Email" className="w-96" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            minLength={8}
            maxLength={265}
            className="w-96"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            span: 12,
          }}
          className="my-0"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <div className="text-start ps-16 mt-1 mb-5">
          <p>
            Don`t have an acoount?{" "}
            <span className="text-blue-500 font-semibold">
              <Link to="/signup">Signup</Link>
            </span>
          </p>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            login
          </Button>
        </Form.Item>

        {/* <div>
          <Link
            to="/update-password"
            className="text-blue-800 hover:bg-slate-300 p-2 rounded-lg hover:text-b"
          >
            Forgot password
          </Link>
        </div> */}
      </Form>
    </>
  );
};
export default AntdForm;
