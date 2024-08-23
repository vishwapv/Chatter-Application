import { React, useState } from "react";

const SideDrower = () => {
  // create  the states
  // search , searchResult , loading , loadingChats
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChats, setLoadingChats] = useState();
  return <>sideBar</>;
};

export default SideDrower;
