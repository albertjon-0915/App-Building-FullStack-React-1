import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function DeleteWorkout({ fetchData, Id }) {
     const deleteWorkoutFunc = () => {
          let token = localStorage.getItem("token");
          fetch(`${process.env.REACT_APP_API_URL}/workouts/deleteWorkout/${Id}`, {
               method: "DELETE",
               headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.message === "Workout deleted successfully") {
                         Swal.fire({
                              title: "Success",
                              icon: "success",
                              text: data.message,
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

     return (
          <Button id="deleteBtnWorkout" className="btnWorkout mx-1 btn-dark" onClick={deleteWorkoutFunc}>
               Delete
          </Button>
     );
}
