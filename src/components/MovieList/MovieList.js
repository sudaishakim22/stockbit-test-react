import React from "react";
import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModalPoster } from "../../redux/action";
import classes from "./MovieList.module.css";

const MovieList = (props) => {
  const AddFavComp = props.addFavouritesComp;
  const dispatch = useDispatch();

  const openModalPosterHandler = (m) => {
    dispatch(openModalPoster(m));
    props.onOpenModal(m);
  };

  return (
    <>
      {props.movies.map((m, index) => {
        return (
          <Col
            key={index}
            xs="auto"
            className={`${classes.image__container} d-flex justify-content-start m-2`}
            onClick={() => openModalPosterHandler(m)}
          >
            {m.Poster !== "N/A" ? (
              <>
                <img src={m.Poster} alt="movie" />

                <div
                  onClick={() => props.onAddFavourites(m)}
                  className={`${classes.overlay} d-flex align-items-center justify-content-center`}
                >
                  <AddFavComp />
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <h3>No Poster</h3>
              </div>
            )}
          </Col>
        );
      })}
    </>
  );
};

export default MovieList;
