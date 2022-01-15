import React, { useState, useEffect } from "react";
import "./user.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      if (!Array.isArray(data))
        return setError("There was an error. Please try again");
      console.log(data);
      setUsers(data);
      setError("");
    } catch (err) {
      setError(err, "There was an error. Please try again");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm !== "") {
      const newUserList = users.filter((user) => {
        return Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newUserList);
    } else {
      setSearchResults(users);
    }
  };

  const handleSelect = () => {
    const selecteUsers = users.sort((user) => {
      console.log(Object.values(user));
    });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user__container">
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearch(e)}
        />
        <select name="users" onChange={handleSelect}>
          <option value="user">User</option>
          <option value="username">Username</option>
          <option value="email">Email</option>
        </select>
      </div>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      {searchTerm.length < 1
        ? users.map((user) => (
            <div key={user.id} className="user__container-list">
              <h4>{user.name}</h4>
              <p>{user.username}</p>
              <p>
                <a href="#">{user.email}</a>
              </p>
            </div>
          ))
        : searchResults.map((user) => (
            <div key={user.id} className="user__container-list">
              <h4>{user.name}</h4>
              <p>{user.username}</p>
              <p>
                <a href="#">{user.email}</a>
              </p>
            </div>
          ))}
    </div>
  );
};

export default User;
