import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../../Redux/Actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

function FilterCourse() {
  const { data: courses } = useSelector((state) => state.courses);
  const { courses: filterCourses } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [selecteds, setSelecteds] = useState([]);
  const [unselecteds, setUnselecteds] = useState([]);

  const [searchText, setSearchText] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((e) =>
      e.Name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [courses, searchText]);

  const unselectedCourses = useMemo(() => {
    return filteredCourses.filter((e) => filterCourses.includes(e.Id));
  }, [filteredCourses, filterCourses]);

  const selectedCourses = useMemo(() => {
    return filteredCourses.filter((e) => !filterCourses.includes(e.Id));
  }, [filteredCourses, filterCourses]);

  const handleCheckboxChange = (event, list, setList) => {
    const { name } = event.target;
    if (!list.includes(Number(name))) {
      setList([...list, Number(name)]);
    } else {
      setList(list.filter((e) => e !== Number(name)));
    }
  };

  const updateFilters = (ids, action) => {
    ids.forEach((id) => {
      dispatch(setFilters.course[action](id));
    });
  };

  return (
    <>
      <h1 className="head">Ders</h1>
      <div className="search">
        <div className="input">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          <input
            type="text"
            placeholder="Arama yapmak için yazınız"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
      </div>
      <div className="lists">
        <div className="unselecteds list">
          <div className="list-head">
            <FontAwesomeIcon icon={faCircleXmark} className="icon" />
            <h2>Seçili Olmayanlar</h2>
          </div>
          <ul className="list-content">
            {unselectedCourses.map((e) => (
              <li className="list-item">
                <input
                  type="checkbox"
                  name={e.Id}
                  value={e.Name}
                  checked={unselecteds.includes(e.Id)}
                  onChange={(event) =>
                    handleCheckboxChange(event, unselecteds, setUnselecteds)
                  }
                />
                <label htmlFor={e.Id}>{e.Name}</label>
              </li>
            ))}
          </ul>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              if (!unselecteds.length) {
                toast.error("Herhangi bir ders seçili değil!");
              } else {
                updateFilters(unselecteds, "remove");
                setUnselecteds([]);
              }
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} className="icon" />
          </button>

          <button
            onClick={() => {
              if (!filterCourses.length) {
                toast.error("Seçili olmayan ders yok!");
              } else {
                updateFilters(
                  courses
                    .map((e) => e.Id)
                    .filter((id) => filterCourses.includes(id)),
                  "remove",
                );
              }
            }}
          >
            <FontAwesomeIcon icon={faAnglesRight} className="icon" />
          </button>

          <button
            onClick={() => {
              if (
                JSON.stringify(filterCourses) ===
                JSON.stringify(courses.map((e) => e.Id))
              ) {
                toast.error("Seçili olan ders yok!");
              } else {
                updateFilters(
                  courses
                    .map((e) => e.Id)
                    .filter((id) => !filterCourses.includes(id)),
                  "add",
                );
              }
            }}
          >
            <FontAwesomeIcon icon={faAnglesLeft} className="icon" />
          </button>

          <button
            onClick={() => {
              if (!selecteds.length) {
                toast.error("Herhangi bir ders seçili değil!");
              } else {
                updateFilters(selecteds, "add");
                setSelecteds([]);
              }
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="icon" />
          </button>
        </div>
        <div className="selecteds list">
          <div className="list-head">
            <FontAwesomeIcon icon={faCircleCheck} className="icon" />
            <h2>Seçili Olanlar</h2>
          </div>
          <ul className="list-content">
            {selectedCourses.map((e) => (
              <li className="list-item">
                <input
                  type="checkbox"
                  name={e.Id}
                  value={e.Name}
                  checked={selecteds.includes(e.Id)}
                  onChange={(event) =>
                    handleCheckboxChange(event, selecteds, setSelecteds)
                  }
                />
                <label htmlFor={e.Id}>{e.Name}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default FilterCourse;
