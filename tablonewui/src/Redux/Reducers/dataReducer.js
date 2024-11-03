import { endOfWeek, startOfWeek } from "date-fns";
import toast from "react-hot-toast";
import Hours from "../../Datas/Hours";

const departmentsInitialState = {
  data: [],
  loading: false,
  error: null,
};
const classroomsInitialState = {
  data: [],
  loading: false,
  error: null,
};
const teachersInitialState = {
  data: [],
  loading: false,
  error: null,
};
const facultiesInitialState = {
  data: [],
  loading: false,
  error: null,
};

const hoursInitialState = Hours;

const coursesInitialState = {
  data: [],
  loading: false,
  error: null,
};
const courseProgramAndProgramsInitialState = {
  courseProgram: {
    data: [],
    loading: false,
    error: null,
  },
  programsToBeAdded: [],
  programsToBeRemoved: [],
  programsToBeEdited: [],
};

const draggingLesson = {};

const weekInitialState = {
  formal: {
    firstDay: startOfWeek(new Date(), { weekStartsOn: 1 }),
    lastDay: endOfWeek(new Date(), { weekStartsOn: 1 }),
  },
  readable: "",
};

const creatingModeInitialState = false;
const modalInitialState = {
  content: null,
  title: null,
  isOpen: false,
};

const historyInitialState = [];

const filtersInitialState = {
  teachers: [],
  departments: [],
  courses: [],
  hours: [],
  classrooms: [],
  num: 0,
};

const facultyInitialState = {
  id: null,
  name: null,
};

export const hoursReducer = (state = hoursInitialState, action) => {
  return state;
};

export const facultyReducer = (state = facultyInitialState, action) => {
  if (action.type === "SET_FACULTY") return action.payload;
  else if (action.type === "RESET_FACULTY") return null;
  else return state;
};

export const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case "ADD_TEACHER_TO_FILTERS":
      return updateStateWithNum({
        ...state,
        teachers: [...state.teachers, action.payload],
      });
    case "REMOVE_TEACHER_FROM_FILTERS":
      return updateStateWithNum({
        ...state,
        teachers: state.teachers.filter((e) => e !== action.payload),
      });
    case "ADD_DEPARTMENT_TO_FILTERS":
      return updateStateWithNum({
        ...state,
        departments: [...state.departments, action.payload],
      });
    case "REMOVE_DEPARTMENT_FROM_FILTERS":
      return updateStateWithNum({
        ...state,
        departments: state.departments.filter((e) => e !== action.payload),
      });
    case "ADD_COURSE_TO_FILTERS":
      return updateStateWithNum({
        ...state,
        courses: [...state.courses, action.payload],
      });
    case "REMOVE_COURSE_FROM_FILTERS":
      return updateStateWithNum({
        ...state,
        courses: state.courses.filter((e) => e !== action.payload),
      });
    case "ADD_HOUR_TO_FILTERS":
      return updateStateWithNum({
        ...state,
        hours: [...state.hours, action.payload],
      });
    case "REMOVE_HOUR_FROM_FILTERS":
      return updateStateWithNum({
        ...state,
        hours: state.hours.filter((e) => e !== action.payload),
      });
    case "ADD_CLASSROOM_TO_FILTERS":
      return updateStateWithNum({
        ...state,
        classrooms: [...state.classrooms, action.payload],
      });
    case "REMOVE_CLASSROOM_FROM_FILTERS":
      return updateStateWithNum({
        ...state,
        classrooms: state.classrooms.filter((e) => e !== action.payload),
      });
    case "RESET_FILTERS":
      return updateStateWithNum({
        teachers: [],
        departments: [],
        courses: [],
        hours: [],
        classrooms: [],
      });
    default:
      return state;
  }
};

const updateStateWithNum = (state) => {
  const num = [
    state.teachers.length,
    state.departments.length,
    state.courses.length,
    state.hours.length,
    state.classrooms.length,
  ].filter((count) => count > 0).length;

  return {
    ...state,
    num,
  };
};

export const departmentsReducer = (state = departmentsInitialState, action) => {
  switch (action.type) {
    case "FETCH_DEPARTMENTS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_DEPARTMENTS_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_DEPARTMENTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const facultiesReducer = (state = facultiesInitialState, action) => {
  switch (action.type) {
    case "FETCH_FACULTIES_REQUEST":
      return { ...state, loading: true };
    case "FETCH_FACULTIES_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_FACULTIES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const coursesReducer = (state = coursesInitialState, action) => {
  switch (action.type) {
    case "FETCH_COURSES_REQUEST":
      return { ...state, loading: true };
    case "FETCH_COURSES_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_COURSES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const teacherReducer = (state = teachersInitialState, action) => {
  switch (action.type) {
    case "FETCH_TEACHERS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_TEACHERS_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_TEACHERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const classroomsReducer = (state = classroomsInitialState, action) => {
  switch (action.type) {
    case "FETCH_CLASSROOMS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_CLASSROOMS_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_CLASSROOMS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const courseProgramAndToBeProgramsReducer = (
  state = courseProgramAndProgramsInitialState,
  action,
) => {
  switch (action.type) {
    // Course Program actions
    case "FETCH_COURSEPROGRAM_REQUEST":
      return {
        ...state,
        courseProgram: {
          ...state.courseProgram,
          loading: true,
        },
      };
    case "FETCH_COURSEPROGRAM_SUCCESS":
      return {
        ...state,
        courseProgram: {
          ...state.courseProgram,
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case "FETCH_COURSEPROGRAM_FAILURE":
      return {
        ...state,
        courseProgram: {
          ...state.courseProgram,
          data: { coursePositions: [] },
          loading: false,
          error: action.payload,
        },
      };
    case "REMOVE_PROGRAM_FROM_PROGRAMS":
      return {
        ...state,
        courseProgram: {
          ...state.courseProgram,
          data: {
            coursePositions: state.courseProgram.data.coursePositions.filter(
              (e) => JSON.stringify(e) !== JSON.stringify(action.payload),
            ),
          },
          loading: false,
          error: null,
        },
      };
    case "ADD_PROGRAM_TO_PROGRAMS":
      return {
        ...state,
        courseProgram: {
          ...state.courseProgram,
          data: {
            coursePositions: !action.payload.shouldAddProgram
              ? [...state.courseProgram.data.coursePositions]
              : [
                  ...state.courseProgram.data.coursePositions,
                  action.payload.program,
                ],
          },
          loading: false,
          error: null,
        },
      };

    case "CLEAR_TABLE":
      return {
        ...state,
        courseProgram: {
          data: [],
          loading: false,
          error: null,
        },
        programsToBeAdded: [],
        programsToBeRemoved: [],
        programsToBeEdited: [],
      };

    // Programs to be Added actions
    case "ADD_PROGRAM_TO_PROGRAMS_TO_BE_ADDED":
      return {
        ...state,
        programsToBeAdded: !action.payload.shouldAddProgram
          ? [...state.programsToBeAdded]
          : [...state.programsToBeAdded, action.payload.program],
      };
    case "REMOVE_PROGRAM_FROM_PROGRAMS_TO_BE_ADDED":
      return {
        ...state,
        programsToBeAdded: state.programsToBeAdded.filter(
          (e) => JSON.stringify(e) !== JSON.stringify(action.payload.program),
        ),
      };
    case "RESET_PROGRAMS_TO_BE_ADDED":
      return {
        ...state,
        programsToBeAdded: [],
      };

    // Programs to be Edited actions
    case "ADD_PROGRAM_TO_PROGRAMS_TO_BE_EDITED":
      return {
        ...state,
        programsToBeEdited: !action.payload.shouldAddProgram
          ? [...state.programsToBeEdited]
          : [...state.programsToBeEdited, action.payload.newEdit],
      };
    case "REMOVE_PROGRAM_FROM_PROGRAMS_TO_BE_EDITED":
      return {
        ...state,
        programsToBeEdited: state.programsToBeEdited.filter(
          (e) => JSON.stringify(e) !== JSON.stringify(action.payload),
        ),
      };
    case "RESET_PROGRAMS_TO_BE_EDITED":
      return {
        ...state,
        programsToBeEdited: [],
      };

    // Programs to be Removed actions
    case "ADD_PROGRAM_TO_PROGRAMS_TO_BE_REMOVED":
      return {
        ...state,
        programsToBeRemoved: [...state.programsToBeRemoved, action.payload],
      };
    case "REMOVE_PROGRAM_FROM_PROGRAMS_TO_BE_REMOVED":
      return {
        ...state,
        programsToBeRemoved: state.programsToBeRemoved.filter(
          (e) => e.id !== action.payload.id,
        ),
      };
    case "RESET_PROGRAMS_TO_BE_REMOVED":
      return {
        ...state,
        programsToBeRemoved: [],
      };

    default:
      return state;
  }
};

export const weekReducer = (state = weekInitialState, action) => {
  switch (action.type) {
    case "SET_WEEK":
      return {
        formal: action.payload,
        readable: `${String(
          new Date(action.payload.firstDay).getDate(),
        ).padStart(2, "0")}.${String(
          new Date(action.payload.firstDay).getMonth() + 1,
        ).padStart(2, "0")}.${new Date(action.payload.firstDay).getFullYear()}`,
      };
    case "SET_WEEK_READABLE":
      return {
        formal: state.formal,
        readable: action.payload,
      };
    default:
      return state;
  }
};

export const creatingModeReducer = (
  state = creatingModeInitialState,
  action,
) => {
  switch (action.type) {
    case "ENABLE_CREATING_MODE":
      return true;
    case "DISABLE_CREATING_MODE":
      return false;

    default:
      return state;
  }
};

export const modalReducer = (state = modalInitialState, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        isOpen: true,
        content: action.content,
        title: action.title,
      };
    case "UNSHOW_MODAL":
      return {
        isOpen: false,
        title: null,
        content: null,
      };
    default:
      return state;
  }
};

export const draggingLessonReducer = (state = draggingLesson, action) => {
  switch (action.type) {
    case "SET_DRAGGING_LESSON":
      return action.payload;
    case "UNSET_DRAGGING_LESSON":
      return {};

    default:
      return state;
  }
};

export const historyReducer = (state = historyInitialState, action) => {
  switch (action.type) {
    case "ADD_PROCESS_TO_HISTORY":
      if (
        !state.some((e) => JSON.stringify(e) === JSON.stringify(action.payload))
      )
        return [...state, action.payload];
      else return state;
    case "REMOVE_PROCESS_FROM_HISTORY":
      return state.filter(
        (e) => JSON.stringify(e) !== JSON.stringify(action.payload),
      );
    case "CLEAR_TABLE":
      return [];
    default:
      return state;
  }
};
