import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function EditWorkout({ fetchData, Id }) {
     const [name, setName] = useState("");
     const [duration, setDuration] = useState("");
     const [modalShow, setModalShow] = useState(false);

     let token = localStorage.getItem("token");

     const editWorkoutFunc = () => {
          setModalShow(false);

          fetch(`${process.env.REACT_APP_API_URL}/workouts/updatedWorkout/${Id}`, {
               method: "PATCH",
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

                    if (data.message === "Workout updated successfully") {
                         Swal.fire({
                              title: "Success",
                              icon: "success",
                              text: data.message || data.error,
                         });
                    } else {
                         Swal.fire({
                              title: "Failed to delete",
                              icon: "error",
                              text: data.message || data.error,
                         });
                    }
               });
     };
     const showWorkoutFunc = () => {
          setModalShow(true);

          fetch(`${process.env.REACT_APP_API_URL}/workouts/getMyWorkouts/${Id}`, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data.error) {
                         console.log(data.error);
                    }
                    setName(data.name);
                    setDuration(data.duration);
               });
     };

     useEffect(() => {
          fetchData();
     }, []);

     return (
          <>
               <Button id="editBtnWorkout" className="btnWorkout mx-1" onClick={showWorkoutFunc}>
                    Edit
               </Button>
               <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
               >
                    <Modal.Header closeButton>
                         <Modal.Title id="contained-modal-title-vcenter">Edit Workout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form>
                              <Form.Group controlId="formWorkoutName">
                                   <Form.Label>Workout Name</Form.Label>
                                   <Form.Control
                                        type="text"
                                        placeholder={name}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                   />
                              </Form.Group>
                              <Form.Group controlId="formWorkoutDuration">
                                   <Form.Label>Duration</Form.Label>
                                   <Form.Control
                                        type="string"
                                        placeholder={duration}
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                   />
                              </Form.Group>
                         </Form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button onClick={editWorkoutFunc}>Update</Button>
                         <Button onClick={() => setModalShow(false)}>Close</Button>
                    </Modal.Footer>
               </Modal>
          </>
     );
}
