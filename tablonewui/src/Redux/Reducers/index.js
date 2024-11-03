import { combineReducers } from "redux";
import {
  departmentsReducer,
  classroomsReducer,
  courseProgramReducer,
  creatingModeReducer,
  weekReducer,
  programsToBeAddedReducer,
  draggingLessonReducer,
  clearTableReducer,
  approveModalReducer,
  modalReducer,
  programsToBeRemovedReducer,
  historyReducer,
  courseProgramAndToBeProgramsReducer,
  filtersReducer,
  teacherReducer,
  coursesReducer,
  hoursReducer,
  facultyReducer,
  facultiesReducer,
} from "./dataReducer";

const rootReducer = combineReducers({
  departments: departmentsReducer,
  classrooms: classroomsReducer,
  teachers: teacherReducer,
  courses: coursesReducer,
  hours: hoursReducer,
  courseProgramAndToBePrograms: courseProgramAndToBeProgramsReducer,
  creatingMode: creatingModeReducer,
  week: weekReducer,
  draggingLesson: draggingLessonReducer,
  history: historyReducer,
  modal: modalReducer,
  filters: filtersReducer,
  faculty: facultyReducer,
  faculties: facultiesReducer,
});

export default rootReducer;
