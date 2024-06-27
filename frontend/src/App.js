import React from "react";
import { useQuery, gql } from "@apollo/client";

const FILMS_QUERY = gql`
  {
    products {id name}
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(FILMS_QUERY);

    if (loading) return <div>j{process.env.NODE_ENV}..."</div>;
  if (error) return <pre>{error.message}</pre>

  return (
    <div>
      <h1>gg</h1>
      <ul>
        {data.products.map((launch) => (
          <li key={launch.id}>{launch.native}</li>
        ))}
      </ul>
    </div>
  );
}
