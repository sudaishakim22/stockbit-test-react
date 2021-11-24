import { GET_MOVIES, OPEN_MODAL, GET_MOVIES_ID } from "./type";

const initialState = {
  movieList: [],
  openModalPoster: {},
  movieDetails: {},
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movieList: action.data,
      };
    case OPEN_MODAL:
      return {
        ...state,
        openModalPoster: action.data,
      };
    case GET_MOVIES_ID:
      return {
        ...state,
        movieDetails: action.data,
      };
    default:
      return state;
  }
};

export default movieReducer;
