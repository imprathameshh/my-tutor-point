import React, { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./verification.css";
import {
  useLocation,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

const Verification = () => {
  const { token } = useParams();
  console.log(token);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(`http://146.190.72.174:5006/api/verify-account/${token}`)
      .then((response) => {
        console.log(response);
        navigate("/createPassword?email=" + response.data.user.email);
      });
  });
  return (
    <div className="verification-wrap">
      <div className="container">
        <div className="verify-body">
          <h1>Verification </h1>
          <ClipLoader
            cssOverride={{
              color: "black",
            }}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    </div>
  );
};

export default Verification;
