import axios from "axios";
import api from "../../Datas/APIs";
import {
  checkEditIntersection,
  checkIntersection,
} from "../Checking/checkIntersection";
import toast from "react-hot-toast";

export const setFilters = {
  teacher: {
    add: (teacher) => {
      return {
        type: "ADD_TEACHER_TO_FILTERS",
        payload: teacher,
      };
    },
    remove: (teacher) => {
      return {
        type: "REMOVE_TEACHER_FROM_FILTERS",
        payload: teacher,
      };
    },
  },
  department: {
    add: (department) => {
      return {
        type: "ADD_DEPARTMENT_TO_FILTERS",
        payload: department,
      };
    },
    remove: (department) => {
      return {
        type: "REMOVE_DEPARTMENT_FROM_FILTERS",
        payload: department,
      };
    },
  },
  course: {
    add: (course) => {
      return {
        type: "ADD_COURSE_TO_FILTERS",
        payload: course,
      };
    },
    remove: (course) => {
      return {
        type: "REMOVE_COURSE_FROM_FILTERS",
        payload: course,
      };
    },
  },
  hour: {
    add: (hour) => {
      return {
        type: "ADD_HOUR_TO_FILTERS",
        payload: hour,
      };
    },
    remove: (hour) => {
      return {
        type: "REMOVE_HOUR_FROM_FILTERS",
        payload: hour,
      };
    },
  },
  classroom: {
    add: (classroom) => {
      return {
        type: "ADD_CLASSROOM_TO_FILTERS",
        payload: classroom,
      };
    },
    remove: (classroom) => {
      return {
        type: "REMOVE_CLASSROOM_FROM_FILTERS",
        payload: classroom,
      };
    },
  },
  reset: () => {
    return {
      type: "RESET_FILTERS",
    };
  },
};

export const fetchClassrooms = () => async (dispatch) => {
  dispatch({ type: "FETCH_CLASSROOMS_REQUEST" });
  try {
    const response = await axios.get(api.classroom.getAll);
    dispatch({ type: "FETCH_CLASSROOMS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_CLASSROOMS_FAILURE", payload: error.message });
  }
};

export const setFaculty = {
  set: (faculty) => {
    const facultyData = { faculty: faculty.id };
    sessionStorage.setItem("faculty", JSON.stringify(facultyData));
    return { type: "SET_FACULTY", payload: faculty };
  },
  reset: () => {
    sessionStorage.removeItem("faculty");
    return { type: "RESET_FACULTY" };
  },
};

export const fetchTeachers = () => async (dispatch) => {
  dispatch({ type: "FETCH_TEACHERS_REQUEST" });
  try {
    const response = await axios.get(api.teacher.getAll);
    dispatch({ type: "FETCH_TEACHERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_TEACHERS_FAILURE", payload: error.message });
  }
};

export const fetchCourses = () => async (dispatch) => {
  dispatch({ type: "FETCH_COURSES_REQUEST" });
  try {
    const response = await axios.get(api.course.getAll);
    dispatch({ type: "FETCH_COURSES_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_COURSES_FAILURE", payload: error.message });
  }
};

export const fetchDepartments = () => async (dispatch) => {
  dispatch({ type: "FETCH_DEPARTMENTS_REQUEST" });
  try {
    const response = await axios.get(api.department.getAll);
    dispatch({ type: "FETCH_DEPARTMENTS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_DEPARTMENTS_FAILURE", payload: error.message });
  }
};
export const fetchFaculties = () => async (dispatch) => {
  dispatch({ type: "FETCH_FACULTIES_REQUEST" });
  try {
    const response = await axios.get(api.faculty.getAll);
    dispatch({ type: "FETCH_FACULTIES_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_FACULTIES_FAILURE", payload: error.message });
  }
};
export const fetchCourseProgram = (week) => async (dispatch) => {
  dispatch({ type: "FETCH_COURSEPROGRAM_REQUEST" });
  try {
    const response = await axios.get(api.courseProgram.get, {
      params: {
        Date: week,
      },
    });
    dispatch({ type: "FETCH_COURSEPROGRAM_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_COURSEPROGRAM_FAILURE", payload: error.message });
  }
};

export const fetchCourseProgramById = (id) => async (dispatch) => {
  dispatch({ type: "FETCH_COURSEPROGRAM_REQUEST" });
  try {
    const response = await axios.get(api.courseProgram.get, {
      params: {
        Id: id,
      },
    });
    dispatch({ type: "FETCH_COURSEPROGRAM_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_COURSEPROGRAM_FAILURE", payload: error.message });
  }
};

export const addProgramToPrograms = (program) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      try {
        const state = getState().courseProgramAndToBePrograms;
        const intersection = checkIntersection(program, state);
        const isDuplicate = state.courseProgram.data.coursePositions.some(
          (e) => JSON.stringify(e) === JSON.stringify(program),
        );

        const shouldAddProgram = !isDuplicate && !intersection;

        dispatch({
          type: "ADD_PROGRAM_TO_PROGRAMS",
          payload: { program, shouldAddProgram },
        });

        if (shouldAddProgram) {
          dispatch({
            type: "REMOVE_PROCESS_FROM_HISTORY",
            payload: { ...program, operation: 0, type: 0 },
          });
        }

        resolve(intersection);
      } catch (error) {
        reject(error);
      }
    });
  };
};

export const set_week = (week) => ({
  type: "SET_WEEK",
  payload: week,
});
export const set_week_readable = (week_readable) => ({
  type: "SET_WEEK_READABLE",
  payload: week_readable,
});

export const creatingMode = {
  enable: () => {
    return {
      type: "ENABLE_CREATING_MODE",
    };
  },
  disable: () => {
    return {
      type: "DISABLE_CREATING_MODE",
    };
  },
};
export const modal = {
  show: (content, title) => {
    return {
      type: "SHOW_MODAL",
      content: content,
      title: title,
    };
  },
  unshow: () => {
    return {
      type: "UNSHOW_MODAL",
    };
  },
};

export const setProgramsToBeAdded = {
  add: (program) => {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        try {
          const state = getState().courseProgramAndToBePrograms;
          const intersection = checkIntersection(program, state);
          const isDuplicate = state.programsToBeAdded.some(
            (e) => JSON.stringify(e) === JSON.stringify(program),
          );

          const shouldAddProgram = !isDuplicate && !intersection;

          dispatch({
            type: "ADD_PROGRAM_TO_PROGRAMS_TO_BE_ADDED",
            payload: { program, shouldAddProgram },
          });
          if (shouldAddProgram) {
            dispatch({
              type: "ADD_PROCESS_TO_HISTORY",
              payload: { ...program, operation: 1, type: 1 },
            });
          }

          resolve(intersection); // Resolve the promise with the intersection value
        } catch (error) {
          reject(error);
        }
      });
    };
  },
  remove: (program, position) => {
    return (dispatch) => {
      dispatch({
        type: "REMOVE_PROGRAM_FROM_PROGRAMS_TO_BE_ADDED",
        payload: { program, position },
      });
      dispatch({
        type: "REMOVE_PROCESS_FROM_HISTORY",
        payload: { ...program, operation: 1, type: 1 },
      });
    };
  },
  reset: () => {
    return {
      type: "RESET_PROGRAMS_TO_BE_ADDED",
    };
  },
};

export const setProgramsToBeEdited = {
  add: (prev, next) => {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        try {
          const newEdit = { prev: prev, next: next };
          const state = getState().courseProgramAndToBePrograms;
          const intersection = checkEditIntersection(newEdit, state);
          const isDuplicate = state.programsToBeEdited.some(
            (e) => JSON.stringify(e) === JSON.stringify(newEdit),
          );

          const shouldAddProgram = !isDuplicate && !intersection;
          dispatch({
            type: "ADD_PROGRAM_TO_PROGRAMS_TO_BE_EDITED",
            payload: { newEdit, shouldAddProgram },
          });
          if (shouldAddProgram) {
            dispatch({
              type: "ADD_PROCESS_TO_HISTORY",
              payload: { ...newEdit, operation: 2, type: 2 },
            });
            dispatch({
              type: "REMOVE_PROGRAM_FROM_PROGRAMS",
              payload: prev,
            });
          }

          resolve(intersection); // Resolve the promise with the intersection value
        } catch (error) {
          reject(error);
        }
      });
    };
  },
  remove: (program) => {
    return (dispatch, getState) => {
      const state = getState().courseProgramAndToBePrograms;
      const intersection = !checkEditIntersection(program, state);
      const prev = program.prev;

      if (intersection) {
        dispatch({
          type: "ADD_PROGRAM_TO_PROGRAMS",
          payload: { program: prev, shouldAddProgram: intersection },
        });
        dispatch({
          type: "REMOVE_PROGRAM_FROM_PROGRAMS_TO_BE_EDITED",
          payload: program,
        });
        dispatch({
          type: "REMOVE_PROCESS_FROM_HISTORY",
          payload: { ...program, operation: 2, type: 2 },
        });
      } else {
        toast.error("Hata! Dersler çakışıyor!");
      }
    };
  },
  reset: () => {
    return {
      type: "RESET_PROGRAMS_TO_BE_EDITED",
    };
  },
};

export const setProgramsToBeRemoved = {
  add: (program) => {
    return (dispatch) => {
      dispatch({
        type: "ADD_PROGRAM_TO_PROGRAMS_TO_BE_REMOVED",
        payload: program,
      });
      dispatch({
        type: "REMOVE_PROGRAM_FROM_PROGRAMS",
        payload: program,
      });
      dispatch({
        type: "ADD_PROCESS_TO_HISTORY",
        payload: { ...program, operation: 0, type: 0 },
      });
    };
  },
  remove: (program, position) => {
    return {
      type: "REMOVE_PROGRAM_FROM_PROGRAMS_TO_BE_REMOVED",
      payload: program,
    };
  },
  reset: () => {
    return {
      type: "RESET_PROGRAMS_TO_BE_REMOVED",
    };
  },
};

export const setDraggingLesson = {
  set: (lesson) => {
    return {
      type: "SET_DRAGGING_LESSON",
      payload: lesson,
    };
  },
  unset: () => {
    return {
      type: "UNSET_DRAGGING_LESSON",
    };
  },
};

export const clearTable = () => ({
  type: "CLEAR_TABLE",
});

export const history = {
  add: (process) => {
    return {
      type: "ADD_PROCESS_TO_HISTORY",
      payload: process,
    };
  },
  remove: (process) => {
    return {
      type: "REMOVE_PROCESS_FROM_HISTORY",
      payload: process,
    };
  },
};

export const createNewProgram = (date) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      try {
        let allKindOfPrograms = getState().courseProgramAndToBePrograms;
        let programs = allKindOfPrograms.courseProgram.data.coursePositions.map(
          (e) => ({
            day: e.day,
            hour: e.hour,
            count: e.count,
            courseId: e.courseId,
            classRoomId: e.classRoomId,
          }),
        );
        let programsToBeAdded = allKindOfPrograms.programsToBeAdded.map(
          (e) => ({
            day: e.position.day,
            hour: e.position.hour,
            count: e.count,
            courseId: e.Id,
            classRoomId: e.position.classroom,
          }),
        );
        let programsToBeEdited = allKindOfPrograms.programsToBeEdited.map(
          (e) => ({
            day: e.next.position.day,
            hour: e.next.position.hour,
            count: e.next.count,
            courseId: e.next.Id,
            classRoomId: e.next.position.classroom,
          }),
        );
        let finalState = {
          date: date,
          semesterId: 1,
          coursePositions: [
            ...programs,
            ...programsToBeAdded,
            ...programsToBeEdited,
          ],
        };

        axios.post(api.courseProgram.create, finalState);
        toast.success("Program başarıyla oluşturuldu");
        dispatch(creatingMode.disable());
        resolve(true);
      } catch (e) {
        toast.error("Hata gerçekleşti:" + e);
        reject("hata");
      }
    });
  };
};
