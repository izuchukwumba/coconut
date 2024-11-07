import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import SelectT from "./SelectT";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [enterPassword, setEnterPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  // const [message, setMessage] = useState<string>("");
  const [school, setSelectedCollege] = useState<string>("");

  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSignUpSubmit = async (): Promise<void> => {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
        email,
        confirmPassword,
        firstName,
        lastName,
        school,
      });
      if (response.data.success) {
        // setMessage("Signup successful");
        navigate("/final_signup");
      } else {
        // setMessage(response.data.message || "Sign-up failed");
      }
    } catch (error: any) {
      // setMessage("An error ocured during sign-up");
    }
  };
  const handleCollegeSelect = (college: string) => {
    setSelectedCollege(college);
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
          type="text"
          id="lastName"
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
      <div className="m-4">
        <div>School</div>
        <SelectT onCollegeSelect={handleCollegeSelect} />
      </div>

      <div className="m-4 flex justify-center items-center">
        <div className="mr-4">Enter Password</div>
        <Input
          type="password"
          id="enterPassword"
          onChange={(e) => setEnterPassword(e.target.value)}
        />
      </div>
      <div className="m-4 flex justify-center items-center">
        <div className="mr-4">Confirm Password</div>
        <Input
          type="password"
          id="confirmPassword"
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
