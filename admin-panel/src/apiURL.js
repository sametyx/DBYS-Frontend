const apiURL = "http://localhost:5117";
const api = {
  faculty: {
    getAll: `${apiURL}/api/faculties`,
    add: `${apiURL}/api/faculties/`,
    delete: (id) => `${apiURL}/api/faculties/${id}`,
    update: (id) => `${apiURL}/api/faculties/${id}`,
  },
  lesson: {
    getAll: `${apiURL}/api/courses`,
    add: `${apiURL}/api/courses/`,
    delete: (id) => `${apiURL}/api/courses/${id}`,
    update: (id) => `${apiURL}/api/courses/${id}`,
  },
  teacher: {
    getAll: `${apiURL}/api/teachers`,
    add: `${apiURL}/api/teachers/`,
    delete: (id) => `${apiURL}/api/teachers/${id}`,
    update: (id) => `${apiURL}/api/teachers/${id}`,
  },
  rank: {
    getAll: `${apiURL}/api/ranks`,
    add: `${apiURL}/api/ranks/`,
    delete: (id) => `${apiURL}/api/ranks/${id}`,
    update: (id) => `${apiURL}/api/ranks/${id}`,
  },
  department: {
    getAll: `${apiURL}/api/Departments`,
    add: `${apiURL}/api/Departments/`,
    delete: (id) => `${apiURL}/api/Departments/${id}`,
    update: (id) => `${apiURL}/api/Departments/${id}`,
  },
  classroom: {
    getAll: `${apiURL}/api/classRooms`,
    add: `${apiURL}/api/classRooms/`,
    delete: (id) => `${apiURL}/api/classRooms/${id}`,
    update: (id) => `${apiURL}/api/classRooms/${id}`,
  },
};

export default api;
