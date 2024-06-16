import { useState, useEffect, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import "../App.css";

export default function Login() {
     const { user, setUser } = useContext(UserContext);

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const [isActive, setIsActive] = useState(true);

     function authenticate(e) {
          e.preventDefault();
          fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({
                    email: email,
                    password: password,
               }),
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.message === "Email and password do not match" || data.message === "No email found") {
                         Swal.fire({
                              title: "Login Failed",
                              icon: "error",
                              text: data.message || data.error,
                         });
                    } else {
                         localStorage.setItem("token", data.access);
                         retrieveUserDetails(data.access);

                         Swal.fire({
                              title: "Login Successful",
                              icon: "success",
                              text: "Welcome to FitnessTracker!",
                         });
                    }
               });

          setEmail("");
          setPassword("");
     }

     const retrieveUserDetails = (token) => {
          fetch(`${process.env.REACT_APP_API_URL}/users/getUser`, {
               method: "POST",
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    setUser({
                         id: data._id,
                    });
               });
     };

     useEffect(() => {
          if (email !== "" && password !== "") {
               setIsActive(true);
          } else {
               setIsActive(false);
          }
     }, [email, password]);

     return user.id ? (
          <Navigate to="/workouts" />
     ) : (
          <Container id="LoginFormContainer">
               <Form onSubmit={(e) => authenticate(e)} id="LoginForm">
                    <h1 className="mb-5 text-center text-primary">Login</h1>
                    <Form.Group controlId="userEmail">
                         <Form.Label>Email address</Form.Label>
                         <Form.Control
                              type="text"
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                         />
                    </Form.Group>

                    <Form.Group controlId="password" className="mb-3">
                         <Form.Label>Password</Form.Label>
                         <Form.Control
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                         />
                    </Form.Group>

                    {isActive ? (
                         <Button variant="primary" type="submit" id="submitBtn">
                              Submit
                         </Button>
                    ) : (
                         <Button variant="secondary" type="submit" id="submitBtn" disabled>
                              Submit
                         </Button>
                    )}
               </Form>
          </Container>
     );
}
