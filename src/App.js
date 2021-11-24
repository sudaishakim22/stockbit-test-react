import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import MovieList from "./components/MovieList/MovieList";
import { Container, Row } from "react-bootstrap";
import MovieListHeading from "./components/MovieListHeading/MovieListHeading";
import SearchBox from "./components/SearchBox/SearchBox";
import AddFavourites from "./components/AddFavourites/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites/RemoveFavourites";
import { getMoviesBySearch } from "./redux/action";
import { useDispatch } from "react-redux";
import ModalPoster from "./components/Modal/ModalPoster";
import useMovieSearch from "./custom-hooks/useMovieSearch";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [poster, setPoster] = useState("");
  const [idMovie, setIdMovie] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // const { loading, movies, hasMore, error } = useMovieSearch(search, page);

  useEffect(() => {
    setLoading(true);
    const getMovies = async () => {
      const res = await dispatch(getMoviesBySearch(search));
      if (res.data.Response === "False") {
        setMovies([]);
      } else {
        setLoading(false);
        setMovies(res.data.Search);
      }
    };
    getMovies();
  }, [search]);

  useEffect(() => {
    const localMoviesFav = JSON.parse(localStorage.getItem("movie-favourites"));
    setFavourites(localMoviesFav);
  }, []);

  const onChangeSearchHandler = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const addFavouritesMovieHandler = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouritesMovieHandler = (movie) => {
    const newFavouriteList = favourites.filter(
      (f) => f.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("movie-favourites", JSON.stringify(items));
  };

  const onOpenModalHandler = (m) => {
    setPoster(m.Poster);
    setIdMovie(m.imdbID);
    setOpenModal(true);
  };

  return (
    <>
      <Container className="app" fluid>
        <Row className="d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Movie App" />
          <SearchBox
            searchValue={search}
            onChangeSearch={onChangeSearchHandler}
          />
        </Row>
        <Row className={classes.movie__row}>
          {/* <span>{loading && "Loading...."}</span> */}
          {loading ? (
            <span>loading...</span>
          ) : (
            <MovieList
              movies={movies}
              onAddFavourites={addFavouritesMovieHandler}
              addFavouritesComp={AddFavourites}
              onOpenModal={onOpenModalHandler}
            />
          )}
        </Row>
        <Row className="d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Favourites" />
        </Row>
        <Row>
          {favourites.length > 0 ? (
            <MovieList
              movies={favourites}
              onAddFavourites={removeFavouritesMovieHandler}
              addFavouritesComp={RemoveFavourites}
              onOpenModal={onOpenModalHandler}
            />
          ) : (
            <span>Favourites Empty</span>
          )}
        </Row>
      </Container>
      <ModalPoster
        id={idMovie}
        poster={poster}
        open={openModal}
        onCloseModal={() => setOpenModal(false)}
      />
    </>
  );
}

export default App;
