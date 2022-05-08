import { useQuery } from "@apollo/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { GET_ITEM_BY_NAME } from "../../GraphQL/Queries/ItemQueries";
import { getSearchResults } from "../../service/itemService";

import SearchListComponent from "./SearchListComponent";

function SearchPage() {
  const { state } = useLocation();

  const { loading, error, data } = useQuery(GET_ITEM_BY_NAME, {
    variables: { searchWord: state },
  })

  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    // let isSubscribed = true;
    // if (isSubscribed) {
    //   getSearchResults(state).then((res) => {
    //     setSearchList(res.data);
    //   });
    // }
    // return () => {
    //   isSubscribed = false;
    // };
    if(data) {
      setSearchList(data.findItemByName)
    }
  }, [data]);

  return (

    <div>
      <div className="container">
        <div className="d-flex flex-column">
          <div className="p-2">
            <h3>Search Results</h3>
          </div>
          {searchList.length > 0 && (
            <div className="p-2">
              <SearchListComponent data={searchList} />
            </div>
          )}
          {searchList.length === 0 && (
            <div className="d-flex justify-content-center">
              <h3>No Items Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
