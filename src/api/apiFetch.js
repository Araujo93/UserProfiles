import React, { useState, useEffect } from "react";

export default function useFetch(url) {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err, "There was an error. Please try again");
      }
    })();
  }, [url]);
  return { users, error };
}
