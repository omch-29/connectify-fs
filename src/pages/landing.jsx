
import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

export default function LandingPage() {
  const router = useNavigate();
  const [showGuestFields, setShowGuestFields] = useState(false);
  const [meetingCode, setMeetingCode] = useState("");
  const [guestName, setGuestName] = useState("");

  const handleGuestJoin = () => {
    if (!meetingCode.trim()) {
      alert("Please enter both name and meeting code");
      return;
    }

    // Redirect guest to meeting page
    router(`/${meetingCode}`, { state: { guestName } });
  };

  return (
    <div className="lpc">
      {/* Navbar */}
      <nav>
        <div className="navHeader">
          {/* <h2>ConnectiFy Video Call</h2> */}
           <h2>Connect with REEMA on Video Call</h2>
        </div>
        <div className="navlist">
          <p onClick={() => setShowGuestFields(!showGuestFields)}>Join as Guest</p>
          <p onClick={() => router("/auth")}>Register</p>
          <div onClick={() => router("/auth")} role="button">
            <p>Login</p>
          </div>
        </div>
      </nav>

      {/* Main landing content */}
      <div className="landingMainContainer">
        <div>
          <h1>
            {/* <span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones */}
            <span style={{ color: "#FF9839" }}>Welcome</span> to connect with REEMA 
            {/* <span style={{ color: "#FF9839" }}>Connect</span> with REEMA */}
          </h1>
          <br />
          {/* <p>Cover a distance by ConnectiFy Video Call</p> */}
          <br />
          <div role="button">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>

        <div>
          <br />
          <img src="/mobile.png" alt="Mobile illustration" />
        </div>
      </div>

      {/* Show popup only when guest clicks "Join as Guest" */}
      {showGuestFields && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            p: 4,
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            width: "300px",
            zIndex: 1000,
          }}
        >
          <h2>Join as Guest</h2>
          {/* <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            sx={{ mb: 2 }}
          /> */}
          <TextField
            label="Meeting Code"
            variant="outlined"
            fullWidth
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleGuestJoin}>
            Join Meeting
          </Button>
          <Button
            variant="text"
            color="error"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => setShowGuestFields(false)}
          >
            Cancel
          </Button>
        </Box>
      )}
    </div>
  );
}
