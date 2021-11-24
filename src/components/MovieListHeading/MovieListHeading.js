import React from "react";
import { Col } from "react-bootstrap";
const MovieListHeading = (props) => {
  return (
    <Col>
      <h1>{props.heading}</h1>
    </Col>
  );
};

export default MovieListHeading;
