import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function AddWorkout({ fetchData }) {
     const [name, setName] = useState("");
     const [duration, setDuration] = useState(0);
     const [modalShow, setModalShow] = useState(false);

     const addWorkoutFunc = () => {
          setModalShow(false);

          let token = localStorage.getItem("token");

          fetch(`${process.env.REACT_APP_API_URL}/workouts/addWorkout`, {
               method: "POST",
               body: JSON.stringify({
                    name,
                    duration,
               }),
               headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if(data.message === 'Added new workout workout'){
                         Swal.fire({
                              title: "Success",
                              icon: "success",
                              text: 'Added new workout',
                         });
                    }
               });
     };

     return (
          <>
               <div className="py-5" id="addWorkoutBtn">
                    <Button id="addBtnWorkout" className="btnWorkout" onClick={() => setModalShow(true)}>
                         + Add workout
                    </Button>
               </div>
               <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
               >
                    <Modal.Header closeButton>
                         <Modal.Title id="contained-modal-title-vcenter">Add Workout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form>
                              <Form.Group controlId="formWorkoutName">
                                   <Form.Label>Workout Name</Form.Label>
                                   <Form.Control
                                        type="text"
                                        placeholder="Enter workout name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                   />
                              </Form.Group>
                              <Form.Group controlId="formWorkoutDuration">
                                   <Form.Label>Duration</Form.Label>
                                   <Form.Control
                                        type="string"
                                        placeholder="Enter duration"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                   />
                              </Form.Group>
                         </Form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button onClick={addWorkoutFunc}>Add</Button>
                         <Button onClick={() => setModalShow(false)}>Close</Button>
                    </Modal.Footer>
               </Modal>
          </>
     );
}
