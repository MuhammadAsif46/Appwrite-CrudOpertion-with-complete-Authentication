import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { client, account } from "../../../appwrite/appwriteConfig";
import { v4 as uuidv4 } from "uuid";

const SignupForm = () => {
  const [error,setError] = useState("")
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);

    const { email, password, username } = values;

    // console.log(email, password, username);

    const promise = account.create(uuidv4(), email, password, username);

    promise.then(
      function (response) {
        console.log(response);
        navigate("/");
      },
      function (error) {
        console.log(error); // Failure
        setError(error.message);
      }
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {error && <div className="text-red-700">{error}</div>}
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
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input type="text" placeholder="Username" className="w-96" />
        </Form.Item>

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

        <div className="text-start ps-16 mt-1 mb-5">
          <p>
            Already have an acoount?{" "}
            <span className="text-blue-500 font-semibold">
              <Link to="/">Login</Link>
            </span>
          </p>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Signup
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default SignupForm;
