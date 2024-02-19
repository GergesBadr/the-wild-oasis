import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-gray-100 dark:bg-dark-bg">
      <h1 className="heading-1">Sorry, this page does not exist!</h1>
      <p className="sec-text-color text-xl font-medium">
        Stop hanging around and get back to homepage:
      </p>
      <Button onClick={() => navigate("/")}>Back to homepage</Button>
    </div>
  );
}

export default PageNotFound;
