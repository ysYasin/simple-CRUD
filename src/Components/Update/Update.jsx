import React from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Update = () => {
  const user = useLoaderData();

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const updated = { name, email };
    console.log(updated);

    fetch(`http://localhost:5300/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updated }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success(`user is deleted from User`, {
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
      <h3>Update Details OF {user.name}</h3>
      <form style={{ margin: "20px" }} onSubmit={handleUpdate}>
        <input type="text" defaultValue={user.name} name="name" />
        <br /> <br />
        <input type="email" defaultValue={user.email} name="email" />
        <br />
        <button type="submit">Update</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Update;
