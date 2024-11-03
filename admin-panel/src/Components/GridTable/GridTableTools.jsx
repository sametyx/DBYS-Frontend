import React, { useEffect, useRef } from "react";
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function GridTableTools({
  dataLength,
  pagination,
  setPage,
  searchText,
  setSearchText,
}) {
  const pageInput = useRef(null);

  const pageSetter = () => {
    pageInput.current.value = pagination.CurrentPage;
    setPage(pageInput.current.value);
  };

  useEffect(() => {
    pageSetter();
  }, [pagination]);
  return (
    <>
      <span className="info">
        {dataLength === pagination.TotalCount
          ? "Tüm sonuçlar gösteriliyor"
          : `${pagination.TotalCount} sonuçtan ${dataLength} sonuç gösteriliyor.`}
      </span>
      <div className="page-switch">
        <div
          className="left-arrow arrow"
          onClick={() =>
            pagination.Previous && setPage(pagination.CurrentPage - 1)
          }
          style={{ backgroundColor: !pagination.Previous && "#a4a4a4" }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <input
          ref={pageInput}
          type="number"
          className="page-shower"
          placeholder={pagination.CurrentPage}
          onChange={pageSetter}
          value={pagination.CurrentPage}
        />
        <div
          className="right-arrow arrow"
          onClick={() => pagination.Next && setPage(pagination.CurrentPage + 1)}
          style={{ backgroundColor: !pagination.Next && "#a4a4a4" }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <div className="search">
        <input
          type="text"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          value={searchText}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
      </div>
    </>
  );
}

export default GridTableTools;
