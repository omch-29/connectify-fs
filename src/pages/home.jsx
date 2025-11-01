// import React, { useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import "../App.css";
// import withAuth from '../utils/withAuth';
// import { Button, IconButton, TextField, Typography, Box, Paper } from '@mui/material';
// import RestoreIcon from '@mui/icons-material/Restore';
// import { AuthContext } from '../contexts/AuthContext';

// function HomeComponent(){
//      let navigate = useNavigate();
//     const [meetingCode, setMeetingCode] = useState("");
//     const [generatedCode, setGeneratedCode] = useState("");


//     const {addToUserHistory} = useContext(AuthContext);
//     let handleJoinVideoCall = async () => {
//         if (!meetingCode.trim()) {
//       alert("Please enter a meeting code");
//       return;
//     }
//         await addToUserHistory(meetingCode)
//         navigate(`/${meetingCode}`)
//     };
//       const generateMeetingCode = () => {
//     const code = Math.random().toString(36).substring(2, 8).toUpperCase();
//     setGeneratedCode(code);
//   };

//   // 🔹 Start new meeting using generated code
//   const handleStartMeeting = async () => {
//     if (!generatedCode) {
//       alert("Please generate a code first");
//       return;
//     }
//     await addToUserHistory(generatedCode);
//     navigate(`/${generatedCode}`);
//   };



//     return(
//         <>
// <div className="navBar">
//       <div style={{ display: "flex", alignItems: "center" }}>

//                     <h2>ConnectiFy Video Call</h2>
//                 </div>

//                 <div style={{ display: "flex", alignItems: "center" }}>
//                     <IconButton onClick={
//                         () => {
//                             navigate("/history")
//                         }
//                     }>
//                         <RestoreIcon />
//                     </IconButton>
//                     <p>History</p>

//                     <Button onClick={() => {
//                         localStorage.removeItem("token")
//                         navigate("/auth")
//                     }}>
//                         Logout
//                     </Button>
//                 </div>


//             </div>


//             <div className="meetContainer">
//                 <div className="leftPanel">
//                     <div>
//                         <h2 className='h2h'>Providing Simple and Smooth Video Call</h2>

//                         <div style={{ display: 'flex', gap: "10px" }}>

//                             <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
//                             <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>

//                         </div>
//                     </div>
//                 </div>
//                 <div className='rightPanel'>
//                     <img srcSet='/logo3.png' alt="" />
//                 </div>
//             </div>
//         </>
//     )
// }


// export default withAuth(HomeComponent)
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import withAuth from '../utils/withAuth';
import { Button, IconButton, TextField, Typography, Box, Paper } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  // 🔹 Join existing meeting
  let handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) {
      alert("Please enter a meeting code");
      return;
    }
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  // 🔹 Generate random meeting code
  const generateMeetingCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(code);
  };

  // 🔹 Start new meeting using generated code
  const handleStartMeeting = async () => {
    if (!generatedCode) {
      alert("Please generate a code first");
      return;
    }
    await addToUserHistory(generatedCode);
    navigate(`/${generatedCode}`);
  };

  return (
    <>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>ConnectiFy Video Call</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate("/history")}>
            <RestoreIcon />
          </IconButton>
          <p>History</p>

          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2 className="h2h">Providing Simple and Smooth Video Call</h2>

            {/* 🔸 Join Existing Meeting */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value.toUpperCase())}
                label="Enter Meeting Code"
                variant="outlined"
              />
              <Button onClick={handleJoinVideoCall} variant="contained">
                Join
              </Button>
            </div>

            {/* 🔹 Generate and Start New Meeting */}
            <div style={{ marginTop: "30px" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={generateMeetingCode}
              >
                Generate New Meeting
              </Button>

              {generatedCode && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Your Meeting Code:
                  </Typography>

                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1,
                      mt: 1,
                      background: "#f0f0f0",
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                      display: "inline-block",
                    }}
                  >
                    {generatedCode}
                  </Paper>

                  <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                    <Button
                      variant="text"
                      color="info"
                      onClick={() => navigator.clipboard.writeText(generatedCode)}
                    >
                      Copy Code
                    </Button>

                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleStartMeeting}
                    >
                      Start Meeting
                    </Button>
                  </div>
                </Box>
              )}
            </div>
          </div>
        </div>

        <div className="rightPanel">
          <img srcSet="/logo3.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
