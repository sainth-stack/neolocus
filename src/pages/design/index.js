import { useEffect } from "react";
import GenAi from "./genAi";
import { useNavigate } from "react-router-dom";

export const Design = () => {
  const navigate = useNavigate();
   useEffect(() => {
        const accessToken = localStorage.getItem("username")
        if (!accessToken) {
            navigate('/login')
        }
    }, []) 
  return (
    <div
      style={{
        background: "rgb(255 252 245)",
      }}
      className="d-flex justify-content-between align-items-center"
    >
      <GenAi />
    </div>
  );
};
