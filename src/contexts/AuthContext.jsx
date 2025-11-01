import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${server}/api/v1/users`
})

export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);

     const [userData, setUserData] = useState(authContext);

     const handleRegister = async(name, username, password) => {
        try{
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })
            if(request.status === httpStatus.CREATED){
                return request.data.message;
            }
        }catch(err){
            throw err;
        }
     }
         const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            console.log(username, password)
            console.log(request.data)

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                router("/home")
            }
        } catch (err) {
            throw err;
        }
    }
     const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }
     const router = useNavigate();

      const data = {
        userData, setUserData,handleRegister,handleLogin,addToUserHistory, getHistoryOfUser
    }
        return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
// import axios from "axios";
// import httpStatus from "http-status";
// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import jwtDecode from "jwt-decode"; // ✅ to read token info
// import server from "../environment";

// export const AuthContext = createContext({});

// const client = axios.create({
//   baseURL: `${server}/api/v1/users`
// });

// export const AuthProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null); // ✅ stores logged-in user
//   const [loading, setLoading] = useState(true); // ✅ helps delay rendering until token check
//   const router = useNavigate();

//   // ✅ Check token from localStorage when app loads
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUserData(decoded);
//       } catch (err) {
//         console.error("Invalid token", err);
//         localStorage.removeItem("token");
//       }
//     }
//     setLoading(false);
//   }, []);

//   // ✅ REGISTER
//   const handleRegister = async (name, username, password) => {
//     try {
//       const request = await client.post("/register", {
//         name,
//         username,
//         password,
//       });

//       if (request.status === httpStatus.CREATED) {
//         return request.data.message;
//       }
//     } catch (err) {
//       throw err;
//     }
//   };

//   // ✅ LOGIN
//   const handleLogin = async (username, password) => {
//     try {
//       const request = await client.post("/login", {
//         username,
//         password,
//       });

//       if (request.status === httpStatus.OK) {
//         localStorage.setItem("token", request.data.token);
//         const decoded = jwtDecode(request.data.token);
//         setUserData(decoded); // ✅ store decoded user info
//         router("/home");
//       }
//     } catch (err) {
//       throw err;
//     }
//   };

//   // ✅ HISTORY
//   const getHistoryOfUser = async () => {
//     try {
//       const request = await client.get("/get_all_activity", {
//         params: { token: localStorage.getItem("token") },
//       });
//       return request.data;
//     } catch (err) {
//       throw err;
//     }
//   };

//   // ✅ ADD TO HISTORY
//   const addToUserHistory = async (meetingCode) => {
//     try {
//       const request = await client.post("/add_to_activity", {
//         token: localStorage.getItem("token"),
//         meeting_code: meetingCode,
//       });
//       return request;
//     } catch (e) {
//       throw e;
//     }
//   };

//   const data = {
//     user: userData, // ✅ exported as "user"
//     setUserData,
//     handleRegister,
//     handleLogin,
//     addToUserHistory,
//     getHistoryOfUser,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={data}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
