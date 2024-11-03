import React, { useState } from "react";
import GridTable from "../../GridTable/GridTable";
import axios from "axios";
import api from "../../../apiURL";
import { pageSize } from "../../constDatas";
import components from "../../GridTable/ComponentIDs";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

function Ranks({ selector, setSelected }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { isLoading, data, error } = useQuery({
    queryKey: ["ranks", page, pageSize, searchText],
    queryFn: async () => {
      const response = await axios.get(api.rank.getAll, {
        params: {
          PageNumber: page,
          PageSize: pageSize,
          SearchTerm: searchText,
        },
      });
      return {
        data: response.data,
        pagination: JSON.parse(response.headers["x-pagination"]),
      };
    },
  });

  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  return (
    <div className="ranks page-container">
      <h1 className="title title-xlg">
        Unvanlar
        <hr />
      </h1>
      <div className="ranks-wrapper page-wrapper-container">
        <GridTable
          data={data.data}
          component={components.ranks}
          loading={isLoading}
          pagination={data.pagination}
          setPage={setPage}
          searchText={searchText}
          setSearchText={setSearchText}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selector={selector}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
}

export default Ranks;
