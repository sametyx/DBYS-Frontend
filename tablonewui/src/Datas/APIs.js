import APIURL from "./APIURL";

const api = {
  department: {
    getAll: `${APIURL}/api/departments`,
  },
  classroom: {
    getAll: `${APIURL}/api/classRooms`,
  },
  teacher: {
    getAll: `${APIURL}/api/teachers`,
  },
  faculty: {
    getAll: `${APIURL}/api/faculties`,
  },
  week: {
    getAll: `${APIURL}/api/Week/GetAll`,
  },
  course: {
    getAll: `${APIURL}/api/courses`,
    getOneInfo: (id) => `${APIURL}/api/CoursePositions/${id}`,
  },
  courseProgram: {
    get: `${APIURL}/api/CourseProgram/GetCourseProgram`,
    getAll: `${APIURL}/api/CourseProgram/GetAllCoursePrograms`,
    create: `${APIURL}/api/CourseProgram/Create`,
  },
};
export default api;
