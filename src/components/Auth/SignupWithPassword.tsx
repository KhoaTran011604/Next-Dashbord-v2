"use client";

import { GetAllTodo } from "api/todoService";
import { useEffect, useState } from "react";
import HyperFormWrapper from "../HyperFormWrapper";
import { registerSchema } from "shemas/registerSchema";
import HD_Input from "../common/HD_Input";
import { EmailIcon, PasswordIcon } from "assets/icons";
import { HD_Button } from "../common/HD_Button";

const initData = {
  fullName: "",
  job: "",
  email: "",
  password: "",
  password_again: "",
  remember: false,
};
export default function SignupWithPassword() {
  const [data, setData] = useState(initData);

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    //e.preventDefault();

    // You can remove this code block
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    // GetAllTodo({}).then((data) => {
    //   console.log(data);
    // });
  });

  return (
    <div>
      <HyperFormWrapper
        schema={registerSchema}
        defaultValues={initData}
        onSubmit={() => {
          handleSubmit();
        }}
        className="mx-auto max-w-md"
      >
        <HD_Input
          title="Full name"
          name="fullName"
          placeholder="Press your name"
          isItemForm={true}
          initValue={data.fullName}
          onChange={(value) =>
            setData({
              ...data,
              fullName: value,
            })
          }
        />
        <HD_Input
          title="Job"
          name="job"
          placeholder="Press your job"
          isItemForm={true}
          initValue={data.job}
          onChange={(value) =>
            setData({
              ...data,
              job: value,
            })
          }
        />
        <HD_Input
          title="Email"
          name="email"
          placeholder="Press your email"
          isItemForm={true}
          initValue={data.email}
          onChange={(value) =>
            setData({
              ...data,
              email: value,
            })
          }
          icon={<EmailIcon />}
        />
        <HD_Input
          title="Password"
          name="password"
          placeholder="Press your pasword"
          type="password"
          isItemForm={true}
          initValue={data.password}
          onChange={(value) =>
            setData({
              ...data,
              password: value,
            })
          }
          icon={<PasswordIcon />}
        />
        <HD_Input
          title="Password Again"
          name="password_again"
          placeholder="Press your pasword"
          type="password"
          isItemForm={true}
          initValue={data.password_again}
          onChange={(value) =>
            setData({
              ...data,
              password_again: value,
            })
          }
          icon={<PasswordIcon />}
        />
        <HD_Button title={"Sign Up"} loading={loading} onClick={() => {}} />
      </HyperFormWrapper>
    </div>
  );
}
