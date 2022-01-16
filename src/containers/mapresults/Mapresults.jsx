import React from "react";
import "./mapresults.css";
import { Link } from "react-router-dom";

const Mapresults = ({ results }) => {
  return (
    <>
      {results.map((user) => (
        <Link to={`${user.id}`} key={user.id} className="mapresults__a">
          <div className="user__container-list">
            <h4>{user.name}</h4>
            <p>{user.username}</p>
            <p onClick={() => console.log("clicked")}>{user.email}</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Mapresults;
