import { GET_MOVIES, OPEN_MODAL, GET_MOVIES_ID } from "./type";
import axios from "axios";

export const getMoviesBySearch = (search) => {
  return async (dispatch) => {
    try {
      const url = `http://www.omdbapi.com/?apikey=faf7e5bb&s=${search}`;
      const response = await axios.get(url);
      dispatch({ type: GET_MOVIES, data: response });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMoviesById = (id) => {
  return async (dispatch) => {
    try {
      const url = `http://www.omdbapi.com/?apikey=faf7e5bb&i=${id}`;
      const response = await axios.get(url);
      dispatch({ type: GET_MOVIES_ID, data: response });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const openModalPoster = (movie) => {
  console.log(movie);
  return {
    type: OPEN_MODAL,
    data: movie,
  };
};
