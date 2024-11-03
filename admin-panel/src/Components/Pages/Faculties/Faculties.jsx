import React, { useState } from "react";
import GridTable from "../../GridTable/GridTable";
import axios from "axios";
import api from "../../../apiURL";
import { pageSize } from "../../constDatas";
import components from "../../GridTable/ComponentIDs";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

function Faculties({ selector, setSelected }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { isLoading, data, error } = useQuery({
    queryKey: ["faculties", page, pageSize, searchText, flag],
    queryFn: async () => {
      const response = await axios.get(api.faculty.getAll, {
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
    <div className="faculties page-container">
      <h1 className="title title-xlg">
        Fakülteler
        <hr />
      </h1>
      <div className="faculties-wrapper">
        <GridTable
          data={data.data}
          component={components.faculties}
          loading={isLoading}
          pagination={data.pagination}
          setPage={setPage}
          searchText={searchText}
          setSearchText={setSearchText}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          setSelected={setSelected}
          selector={selector}
          setFlag={setFlag}
        />
      </div>
    </div>
  );
}

export default Faculties;
