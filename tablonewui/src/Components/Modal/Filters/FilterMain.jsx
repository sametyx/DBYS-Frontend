import React from "react";
import FilterTeacher from "./FilterTeacher";
import FilterDepartment from "./FilterDepartment";
import FilterClassroom from "./FilterClassroom";
import FilterCourse from "./FilterCourse";
import FilterHour from "./FilterHour";

function FilterMain({ unit }) {
  switch (unit) {
    case 1:
      return <FilterTeacher />;
    case 2:
      return <FilterDepartment />;
    case 3:
      return <FilterClassroom />;
    case 4:
      return <FilterCourse />;
    case 5:
      return <FilterHour />;
    default:
      return <div></div>;
  }
}

export default FilterMain;
