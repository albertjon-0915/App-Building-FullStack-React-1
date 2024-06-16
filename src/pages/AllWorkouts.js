import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import "../App.css";

import DeleteWorkout from "../components/DeleteWorkout";
import AddWorkout from "../components/AddWorkout";
import EditWorkout from "../components/EditWorkout";
import ViewWorkout from "../components/ViewWorkout";

export default function Workout() {
     const [data, setData] = useState([]);

     console.log(data);
     const fetchData = () => {
          let token = localStorage.getItem("token");

          fetch(`${process.env.REACT_APP_API_URL}/workouts/getMyWorkouts`, {
               method: "GET",
               headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((result) => {
                    if (result.message === "No items found.") {
                         setData(null);
                    } else {
                         setData(result.workouts);
                    }
               });
     };

     useEffect(() => {
          fetchData();
     }, [fetchData]);

     return (
          <>
               <Container>
                    <AddWorkout fetchData={fetchData} />
               </Container>
               <Table striped bordered hover size="sm" id="tableContainer">
                    <thead>
                         <tr>
                              <th>Current Workouts</th>
                         </tr>
                    </thead>
                    <tbody>
                         {!data.length <= 0 ? (
                              data.map((item) => (
                                   <tr key={item._id}>
                                        <td className="px-3 py-2" id="itemContainer">
                                             <div className="d-flex flex-column">
                                                  <span className="fs-5">{item.name}</span>
                                                  <span className="sm_font text-primary">
                                                       duration: {parseInt(item.duration)} mins
                                                  </span>
                                             </div>
                                             <div>
                                                  <ViewWorkout fetchData={fetchData} Id={item._id} />

                                                  <EditWorkout fetchData={fetchData} Id={item._id} />

                                                  <DeleteWorkout fetchData={fetchData} Id={item._id} />
                                             </div>
                                        </td>
                                   </tr>
                              ))
                         ) : (
                              <tr>
                                   <td className="px-3 py-2" id="itemContainer">
                                        Waiting for the workouts list...
                                   </td>
                              </tr>
                         )}
                    </tbody>
               </Table>
          </>
     );
}
