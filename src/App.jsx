import react from "react";
import "./App.css";
import Users from "./Components/Users/Users";
import { Link } from "react-router-dom";

function App() {
  const handleCrud = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const newUser = { name, email };

    fetch("http://localhost:5300/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert(`${name} is Added in User`);
          form.reset();
        }
      });
  };
  return (
    <>
      <h3>
        <Link to="/users">Users</Link>
      </h3>
      <h1>Hello Dear CRUD!</h1>
      <form onSubmit={handleCrud}>
        <div>
          <input type="text" name="name" placeholder="name" />
        </div>
        <div>
          <input type="email" name="email" placeholder="email" />
        </div>
        <button style={{ marginTop: "10px" }} type="submit">
          Add user
        </button>
      </form>
    </>
  );
}

export default App;
