import React, { useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [enterPassword, setEnterPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [college, setCollege] = useState<string>("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSignUpSubmit = async (): Promise<void> => {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
        email,
        confirmPassword,
        firstName,
        lastName,
      });
      if (response.data.success) {
        setMessage("Signup successful");
      } else {
        setMessage(response.data.message || "Sign-up failed");
      }
    } catch (error: any) {
      setMessage("An error ocured during sign-up");
    }
  };
  return (
    <div className="">
      <div className="m-4 flex justify-center items-center">
        <div className="mr-4">First Name</div>
        <Input
          type="text"
          id="firstName"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="m-4 flex justify-center items-center">
        <div className="mr-4">Last Name</div>
        <Input
          type="email"
          id="email"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="m-4 flex justify-center items-center">
        <div className="mr-4">Email</div>
        <Input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="m-4 flex justify-center items-center">
        <div className="mr-4">Enter Password</div>
        <Input
          type="password"
          id="password"
          onChange={(e) => setEnterPassword(e.target.value)}
        />
      </div>
      <div className="m-4 flex justify-center items-center">
        <div className="mr-4">Confirm Password</div>
        <Input
          type="password"
          id="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <Button className="ml-4" onClick={handleSignUpSubmit}>
        SignUp
      </Button>
    </div>
  );
};

export default SignUp;
