import useSWR from 'swr'

import { useRouter } from "next/router";

const url = "/data/teams.json";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Teams = () => {

  const { data, isLoading, error } = useSWR("/data/teams.json", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  console.log(data);

  return (
    <div>
      <h1>Teams</h1>
    </div>
  );
};

// get teams from api

export default Teams;

