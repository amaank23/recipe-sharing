import { useNavigate } from "react-router-dom";

const CompanyLogo = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2
        className="text-primary font-bold text-lg cursor-pointer"
        onClick={() => navigate("/")}
      >
        RECIPE SHARING
      </h2>
    </div>
  );
};

export default CompanyLogo;
