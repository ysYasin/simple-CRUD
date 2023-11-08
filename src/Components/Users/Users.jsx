import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5300/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDelet = (id, name) => {
    fetch(`http://localhost:5300/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.success(`${name} is deleted from User`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.warning(`${name} not deleted from User`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  return (
    <div>
      <Link to="/">Form</Link>
      <h3>Our Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} : {user.email} {user._id} {"  "}
            <button onClick={() => handleDelet(user._id, user.name)}>X</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Users;
