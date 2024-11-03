import React, { useEffect, useState } from "react";
import api from "../../../Datas/APIs";
import axios from "axios";
import Lesson from "./Lesson";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get(api.course.getAll, {
        params: {
          PageNumber: page,
          PageSize: 5,
          Includes: "department,teacher",
          SearchTerm: searchText,
        },
      })
      .then((res) => {
        setLessons(res.data);
        setPagination(JSON.parse(res.headers["x-pagination"]));
      });
  }, [page, searchText]);

  return (
    <div className="lessons">
      <div className="datas">
        {lessons.map((e) => (
          <Lesson lesson={e} key={e.Id} />
        ))}
      </div>
      <div className="data-tools">
        <div className="pagination">
          <div
            className="left-arrow arrow"
            onClick={() =>
              pagination.Previous && setPage(pagination.CurrentPage - 1)
            }
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <span className="num">{page}</span>
          <div
            className="right-arrow arrow"
            onClick={() =>
              pagination.Next && setPage(pagination.CurrentPage + 1)
            }
            style={{ backgroundColor: !pagination.Next && "#a4a4a4" }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
        <div className="empty"></div>
        <div className="search">
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Lessons;
