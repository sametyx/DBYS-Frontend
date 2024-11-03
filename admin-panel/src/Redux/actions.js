import axios from "axios";
import {
  FETCH_FACULTIES_SUCCESS,
  FETCH_FACULTIES_FAILURE,
  INCREMENT,
  DECREMENT,
} from "./types";
import api from "../apiURL";

// Aksiyon yaratıcıları
export const fetchFacultiesSuccess = (faculties) => ({
  type: FETCH_FACULTIES_SUCCESS,
  payload: faculties,
});

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

// Async aksiyon yaratıcısı
export const fetchFaculties = (page, pageSize) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(api.faculty.getAll, {
        params: {
          PageNumber: page,
          PageSize: pageSize,
        },
      });
      dispatch(fetchFacultiesSuccess(response.data));
    } catch (error) {}
  };
};
