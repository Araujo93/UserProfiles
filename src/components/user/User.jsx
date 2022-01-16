import React, { useState } from "react";
import Mapresults from "../../containers/mapresults/Mapresults";
import useFetch from "../../api/apiFetch";
import "./user.css";

const User = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectResults, setSelectResults] = useState([]);
  const { users, error } = useFetch(
    "http://jsonplaceholder.typicode.com/users"
  );

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

  const handleSelect = (e) => {
    setSelectResults([]);
    let select = e.target.value;

    const selectResults = users.sort((a, b) =>
      a[select] > b[select] ? 1 : -1
    );
    setSearchResults(selectResults);
  };

  return (
    <div className="user__container">
      <div className="user__inputs">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearch(e)}
        />
        <div>
          <label className="user__label" htmlFor="users">
            Sort By:{" "}
          </label>
          <select name="users" onChange={(e) => handleSelect(e)}>
            <option value="name">Name</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      {searchTerm.length < 1 && selectResults.length < 1 && (
        <Mapresults results={users} />
      )}
      {searchResults && <Mapresults results={searchResults} />}
    </div>
  );
};

export default User;
