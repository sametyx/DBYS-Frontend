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

function FilterClassroom() {
  const { data: classrooms } = useSelector((state) => state.classrooms);
  const { classrooms: filterClassrooms } = useSelector(
    (state) => state.filters,
  );
  const dispatch = useDispatch();
  const [selecteds, setSelecteds] = useState([]);
  const [unselecteds, setUnselecteds] = useState([]);

  const [searchText, setSearchText] = useState("");

  const filteredDepartments = useMemo(() => {
    return classrooms.filter((e) =>
      e.Name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [classrooms, searchText]);

  const unselectedDepartments = useMemo(() => {
    return filteredDepartments.filter((e) => filterClassrooms.includes(e.Id));
  }, [filteredDepartments, filterClassrooms]);

  const selectedDepartments = useMemo(() => {
    return filteredDepartments.filter((e) => !filterClassrooms.includes(e.Id));
  }, [filteredDepartments, filterClassrooms]);

  const handleCheckboxChange = (event, list, setList) => {
    const { name } = event.target;
    if (!list.includes(Number(name))) {
      setList([...list, Number(name)]);
    } else {
      setList(list.filter((e) => e !== Number(name)));
    }
    console.log(list);
  };

  const updateFilters = (ids, action) => {
    ids.forEach((id) => {
      dispatch(setFilters.classroom[action](id));
    });
  };

  return (
    <>
      <h1 className="head">Derslik</h1>
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
            {unselectedDepartments.map((e) => (
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
                toast.error("Herhangi bir derslik seçili değil!");
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
              updateFilters(
                classrooms
                  .map((e) => e.Id)
                  .filter((id) => filterClassrooms.includes(id)),
                "remove",
              );
            }}
          >
            <FontAwesomeIcon icon={faAnglesRight} className="icon" />
          </button>
          <button
            onClick={() => {
              if (!selecteds.length) {
                toast.error("Herhangi bir derslik seçili değil!");
              } else {
                if (
                  selecteds.length ===
                  classrooms.filter((e) => !filterClassrooms.includes(e.Id))
                    .length
                ) {
                  toast.error("En az bir derslik seçili olmak zorunda!");
                } else {
                  updateFilters(selecteds, "add");
                  setSelecteds([]);
                }
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
            {selectedDepartments.map((e) => (
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

export default FilterClassroom;
