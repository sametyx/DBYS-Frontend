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

function FilterHour() {
  const hours = useSelector((state) => state.hours);
  const { hours: filterHours } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [selecteds, setSelecteds] = useState([]);
  const [unselecteds, setUnselecteds] = useState([]);

  const [searchText, setSearchText] = useState("");

  const filteredHours = useMemo(() => {
    return hours.filter((e) =>
      e.fullHour.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [hours, searchText]);

  const unselectedHours = useMemo(() => {
    return filteredHours.filter((e) => filterHours.includes(e.id));
  }, [filteredHours, filterHours]);

  const selectedHours = useMemo(() => {
    return filteredHours.filter((e) => !filterHours.includes(e.id));
  }, [filteredHours, filterHours]);

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
      dispatch(setFilters.hour[action](id));
    });
  };

  return (
    <>
      <h1 className="head">Saat</h1>
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
            {unselectedHours.map((e) => (
              <li className="list-item">
                <input
                  type="checkbox"
                  name={e.id}
                  value={e.fullHour}
                  checked={unselecteds.includes(e.id)}
                  onChange={(event) =>
                    handleCheckboxChange(event, unselecteds, setUnselecteds)
                  }
                />
                <label htmlFor={e.id}>{e.fullHour}</label>
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
                hours.map((e) => e.id).filter((id) => filterHours.includes(id)),
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
                  hours.filter((e) => !filterHours.includes(e.id)).length
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
            {selectedHours.map((e) => (
              <li className="list-item">
                <input
                  type="checkbox"
                  name={e.id}
                  value={e.fullHour}
                  checked={selecteds.includes(e.id)}
                  onChange={(event) =>
                    handleCheckboxChange(event, selecteds, setSelecteds)
                  }
                />
                <label htmlFor={e.id}>{e.fullHour}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default FilterHour;
