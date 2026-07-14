import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Store users from the API
  const [users, setUsers] = useState([]);

  // Store search input
  const [search, setSearch] = useState("");

  // Store form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users when the page loads
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add a new user
  function addUser(event) {
    event.preventDefault();

    if (name.trim() === "" || email.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      company: {
        name: "New Company",
      },
    };

    setUsers([newUser, ...users]);

    setName("");
    setEmail("");
  }

  return (
    <div className="container">
      <h1>User Directory</h1>

      {/* Add User Form */}
      <form className="form" onSubmit={addUser}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button type="submit">Add User</button>
      </form>

      {/* Search */}
      <input
        className="search"
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {/* User List */}
      {filteredUsers.length === 0 ? (
        <p className="no-users">No users found.</p>
      ) : (
        filteredUsers.map((user) => (
          <div className="card" key={user.id}>
            <h2>{user.name}</h2>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Company:</strong> {user.company.name}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;