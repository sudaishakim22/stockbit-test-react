import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import { getMoviesById } from "../../redux/action";

const MovieDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDetailMovie = async () => {
      const res = await dispatch(getMoviesById(id));
      if (res.status === 200) {
        setDetails(res.data);
        setLoading(false);
      }
    };

    fetchDetailMovie();
  }, [loading]);

  return (
    <Container fluid style={{ maxWidth: "1300px" }} className="mt-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row>
          <Col sm={4}>
            <img src={details.Poster} alt="poster" />
            <Row>
              <h5>Ratings</h5>
              {details.Ratings.map((r) => {
                return (
                  <span>
                    {r.Source} : {r.Value}
                  </span>
                );
              })}
            </Row>
          </Col>
          <Col sm={8}>
            <h4>Title : {details.Title}</h4>
            <h4>year : {details.Year}</h4>
            <h4>Genre : {details.Genre}</h4>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MovieDetails;
