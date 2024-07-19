# This is Completly Mern Stack Portfolio Project.

1. tailwindcss.
2. npm install react-icons.
3. npm install @reduxjs/toolkit : redux.
4. npm install react-redux :: redux
5. npm i axios.
6. npm i antd :: for better UI designing.
7. npm i react-toastify

```javascript
import React from "react";
import { Form, Upload, Button } from "antd";
import { useSelector } from "react-redux";

const IntroAdmin = () => {
  const { introData } = useSelector((state) => console.log(state.intro));
  // onfinish
  const onFinish = (values, fileList) => {
    console.log(values, fileList);
  };
  return (
    <>
      <Form
        onFinish={onFinish}
        className="max-w-4xl border-2 p-7 rounded-lg"
        layout="vertical"
        initialValues={introData[0]}
      >
        <Form.Item
          name="welomeText"
          label={
            <span className="dark:text-white font-medium text-lg">
              Welcome Text
            </span>
          }
          rules={[{ required: true, message: "Please enter welcome text" }]}
        >
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter welcome text"
            name="welcomeText"
          />
        </Form.Item>

        {/* First Name and Last Name (Inline) */}
        <div className="flex flex-wrap -mx-2 text-white">
          <Form.Item
            className="w-full md:w-1/2 px-2"
            name="firstName"
            label={
              <span className="dark:text-white font-medium text-lg">
                First Name
              </span>
            }
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter first name"
              name="firstName"
            />
          </Form.Item>
          <Form.Item
            className="w-full md:w-1/2 px-2"
            name="lastName"
            label={
              <span className="dark:text-white font-medium text-lg">
                Last Name
              </span>
            }
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter last name"
            />
          </Form.Item>
        </div>

        {/* caption & designation */}
        <div className="flex flex-wrap -mx-2 text-white">
          <Form.Item
            className="w-full md:w-1/2 px-2"
            name="caption"
            label={
              <span className="dark:text-white font-medium text-lg">
                caption
              </span>
            }
            rules={[{ required: true, message: "Please enter caption" }]}
          >
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter caption"
              name="caption"
            />
          </Form.Item>
          <Form.Item
            className="w-full md:w-1/2 px-2"
            name="designation"
            label={
              <span className="dark:text-white font-medium text-lg">
                Designation
              </span>
            }
            rules={[{ required: true, message: "Please enter designation" }]}
          >
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter designation"
              name="designation"
            />
          </Form.Item>
        </div>

        {/* description */}
        <Form.Item
          name="descripton"
          label={
            <span className="dark:text-white font-medium text-lg">
              Description
            </span>
          }
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <textarea
            className="w-full rounded-md p-4"
            rows={5}
            placeholder="Enter description"
            name="description"
            autoComplete="off"
          ></textarea>
        </Form.Item>

        {/* profile */}
        <Form.Item name="ProfileImage">
          <Upload.Dragger
            name="ProfileImage"
            maxCount={1}
            fileList={[]}
            listType="picture"
            accept=".png, .jpg, .jpeg"
            beforeUpload={() => false}
          >
            <p className="dark:text-white font-medium text-lg">
              Drag File here OR <br />
            </p>
            <Button name="ProfileImage">Upload</Button>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </>
  );
};

export default IntroAdmin;
```
