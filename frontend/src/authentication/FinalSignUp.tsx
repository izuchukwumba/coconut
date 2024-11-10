import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MenuItem, FormControl, Select } from "@mui/material";

const FinalSignUp: React.FC = () => {
  const minAgeDate = dayjs().subtract(18, "year");
  const maxAgeDate = dayjs().subtract(30, "year");
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(minAgeDate);
  const [gender, setGender] = useState<string>("");
  const [race, setRace] = useState<string>("");
  const [sexualIdentity, setSexualIdentity] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [classification, setClassification] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const params = useParams();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const placeholderColor = "rgba(0, 0, 0, 0.4)";

  const handleFinalSignup = async (): Promise<void> => {
    const userData = {
      uid: params.user_uid,
      dateOfBirth: dateOfBirth?.toISOString(),
      sexualIdentity: sexualIdentity,
      gender: gender,
      race: race,
      major: major,
      classification: classification,
    };

    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/final_signup`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        navigate(`/${params.user_uid}/homepage`);
      }
    } catch (error) {
      setMessage("Error detected: " + error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-100  px-7 py-5">
        <div className="font-black text-3xl pb-5">Complete Signup</div>
        <div className="flex flex-col gap-2 justify-between mb-10 w-full">
          <div>Date of Birth</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              defaultValue={minAgeDate}
              openTo="year"
              minDate={maxAgeDate}
              maxDate={minAgeDate}
              orientation="portrait"
              views={["year", "month", "day"]}
              value={dateOfBirth}
              onChange={(date) => setDateOfBirth(date)}
            />
          </LocalizationProvider>
        </div>
        <div className="flex flex-col gap-2 justify-between mb-10 w-full">
          <div className="">Gender</div>
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              displayEmpty
              renderValue={(value) => (value ? value : "Select Gender")}
              style={{ color: gender == "" ? placeholderColor : "" }}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-col gap-2 justify-between mb-10 w-full">
          <div>Race</div>
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={race}
              onChange={(event) => setRace(event.target.value)}
              displayEmpty
              renderValue={(value) => (value ? value : "Select Race")}
              style={{ color: race == "" ? placeholderColor : "" }}
            >
              <MenuItem value={"African"}>African</MenuItem>
              <MenuItem value={"African American"}>African American</MenuItem>
              <MenuItem value={"Hispanic"}>Hispanic</MenuItem>
              <MenuItem value={"Arab"}>Arab</MenuItem>
              <MenuItem value={"Asian"}>Asian</MenuItem>
              <MenuItem value={"White"}>White</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-col gap-2 justify-between mb-10 w-full">
          <div>Sexual Identity</div>
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={sexualIdentity}
              onChange={(event) => setSexualIdentity(event.target.value)}
              displayEmpty
              renderValue={(value) =>
                value ? value : "Select Sexual Identity"
              }
              style={{ color: sexualIdentity == "" ? placeholderColor : "" }}
            >
              <MenuItem value="" disabled>
                Select Sexual Identity
              </MenuItem>
              <MenuItem value={"Straight"}>Straight</MenuItem>
              <MenuItem value={"Gay"}>Gay</MenuItem>
              <MenuItem value={"Lesbian"}>Lesbian</MenuItem>
              <MenuItem value={"Pansexual"}>Pansexual</MenuItem>
              <MenuItem value={"Asexual"}>Asexual</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-col gap-2 justify-between mb-10 w-full">
          <div>Major</div>
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={major}
              onChange={(event) => setMajor(event.target.value)}
              displayEmpty
              renderValue={(value) => (value ? value : "Select Major")}
              style={{ color: major == "" ? placeholderColor : "" }}
            >
              <MenuItem value="" disabled>
                Select Major
              </MenuItem>
              <MenuItem value={"STEM"}>STEM</MenuItem>
              <MenuItem value={"Non STEM"}>Non STEM</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-col gap-2 justify-between mb-10 w-full">
          <div>Classification</div>
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={classification}
              onChange={(event) => setClassification(event.target.value)}
              displayEmpty
              renderValue={(value) => (value ? value : "Select Classification")}
              style={{ color: classification == "" ? placeholderColor : "" }}
            >
              <MenuItem value="" disabled>
                Select Classification
              </MenuItem>
              <MenuItem value={"Freshman"}>Freshman</MenuItem>
              <MenuItem value={"Sophomore"}>Sophomore</MenuItem>
              <MenuItem value={"Junior"}>Junior</MenuItem>
              <MenuItem value={"Senior"}>Senior</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex justify-center items-center">
          <Button className="w-full py-6" onClick={handleFinalSignup}>
            Complete Signup!
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FinalSignUp;
