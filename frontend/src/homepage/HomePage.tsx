import { useParams } from "react-router-dom";
const HomePage: React.FC = () => {
  const params = useParams();
  return (
    <>
      <div>Hello {params.user_uid}</div>
    </>
  );
};
export default HomePage;
