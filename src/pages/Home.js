import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

export default function Home() {
     const { user } = useContext(UserContext);
     return (
          <Row id="homeContainer">
               <Col className="p-4 text-center">
                    <h1>
                         Welcome To our <span className="text-primary">Fitness Tracker</span>
                    </h1>
                    <p>
                         <span className="text-primary">Create</span>, <span className="text-primary">Update</span>,{" "}
                         <span className="text-primary">Delete</span> and <span className="text-primary">View</span>{" "}
                         your workout
                    </p>
                    <Link className="btn btn-primary" to={user.id ? "/workouts" : "login"}>
                         Check your workouts
                    </Link>
               </Col>
          </Row>
     );
}
