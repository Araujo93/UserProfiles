import React from "react";
import "./userProfile.css";
import { useParams, Link } from "react-router-dom";

import useFetch from "../../api/apiFetch";

const UserProfile = () => {
  let params = useParams();
  const { id } = params;
  const { users: user } = useFetch(
    `http://jsonplaceholder.typicode.com/users/${id}`
  );

  const formatAddress = () => {
    if (user.address) {
      const { suite, street, city, zipcode } = user.address;
      return (
        <>
          <p className="section__margin">
            {suite} {street}, {city}, {zipcode}
          </p>
        </>
      );
    }
  };
  return (
    <div className="user__container">
      <div className="user__contact ">
        <h2 className="section__margin">Contact Info</h2>
        <h3>{user.username}</h3>
        <a href="#">{user.phone}</a>
        <p className="section__margin">
          <a href="#">{user.website}</a>
        </p>
      </div>
      <div className="user__contact">
        <h2 className="section__margin">Address</h2>
        {formatAddress()}
      </div>
      <div className="user__contact">
        <h2 className="section__margin">Company</h2>
        <p>{user.company && user.company.bs}</p>
        <p className="section__margin">
          <i>{user.company && user.company.catchPhrase}</i>
        </p>
      </div>
      <div className="section__margin user__link">
        <Link to={"/"}>Back to User List</Link>
      </div>
    </div>
  );
};

export default UserProfile;
