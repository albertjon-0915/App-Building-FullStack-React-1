import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AppNavBar from "./components/AppNavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Workouts from "./pages/AllWorkouts";
import Logout from "./pages/Logout";

import "./App.css";
import Particles from "./config/ParticleBackground";

import { UserProvider } from "./UserContext";

function App() {
     const [user, setUser] = useState({
          id: null,
     });

     useEffect(() => {
          fetch(`${process.env.REACT_APP_API_URL}/users/getUser`, {
               method: "POST",
               headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);

                    if (typeof data.user !== "undefined") {
                         setUser(data.acess);
                    } else {
                         setUser({
                              id: null,
                         });
                    }
               });
     }, []);

     const unsetUser = () => {
          localStorage.clear();
     };

     return (
          <UserProvider value={{ user, setUser, unsetUser }}>
               <Router>
                    <Particles id="particles" />
                    <AppNavBar />
                    <Container>
                         <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/register" element={<Register />} />
                              <Route path="/login" element={<Login />} />
                              <Route path="/logout" element={<Logout />} />
                              <Route path="/workouts" element={<Workouts />} />
                         </Routes>
                    </Container>
               </Router>
          </UserProvider>
     );
}

export default App;
