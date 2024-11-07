import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate("/initial_signup")}>
        Create an Account
      </Button>
    </>
  );
};

export default LandingPage;
