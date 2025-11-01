import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function GuestJoin() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleJoin = () => {
    if (!name.trim() || !code.trim()) {
      alert("Please enter your name and meeting code");
      return;
    }
    localStorage.setItem("guestName", name);
    window.location.href = `/meeting/${code}`;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", marginTop: "100px" }}>
      <h2>Join Meeting as Guest</h2>
      <TextField label="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Meeting Code" value={code} onChange={(e) => setCode(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleJoin}>Join Meeting</Button>
    </div>
  );
}
