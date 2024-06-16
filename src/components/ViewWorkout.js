import { useEffect, useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";

import "../App.css";

export default function ViewWorkout({ fetchData, Id }) {
     const [name, setName] = useState("");
     const [duration, setDuration] = useState(0);
     const [modalShow, setModalShow] = useState(false);

     let token = localStorage.getItem("token");

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
                    setDuration(parseInt(data.duration));
               });
     };

     useEffect(() => {
          fetchData();
     }, []);

     return (
          <>
               <Button id="viewBtnWorkout" className="btnWorkout mx-1 bg-light text-dark" onClick={showWorkoutFunc}>
                    View
               </Button>
               <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
               >
                    <Modal.Header id="modalHeaderViewWorkout" closeButton>
                         <Modal.Title id="contained-modal-title-vcenter">{name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="modalBodyViewWorkout">
                         <Card className="d-flex" id="cardContainerViewWorkout">
                              <Card.Body className="cardBodyViewWorkout">
                                   <Card.Img
                                        variant="top"
                                        src="https://th.bing.com/th/id/OIP.ve2xVBbboc-2j-OL5Fo6MQAAAA?rs=1&pid=ImgDetMain"
                                        id="cardImgModalViewWorkout"
                                   />
                                   <Card.Title className="text-center">{name}</Card.Title>
                              </Card.Body>
                              <Card.Body className="cardBodyViewWorkout">
                                   <Card.Text className="xl_font fs-sm-3 text-center text-primary">
                                        {duration}
                                        <span className="fs-4 text-dark">mins</span>
                                   </Card.Text>
                                   <Card.Title className="text-center">Duration</Card.Title>
                              </Card.Body>
                         </Card>
                    </Modal.Body>
                    <Modal.Footer id="modalFooterViewWorkout">
                         <Button onClick={() => setModalShow(false)}>Close</Button>
                    </Modal.Footer>
               </Modal>
          </>
     );
}
