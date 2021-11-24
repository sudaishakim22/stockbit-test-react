import React from "react";
import { Col } from "react-bootstrap";
const SearchBox = (props) => {
  return (
    <Col sm={4} className="d-flex justify-content-end align-items-center">
      <div>
        <input
          value={props.searchValue}
          onChange={(e) => props.onChangeSearch(e)}
          type="text"
          className="form-control mt-3"
          placeholder="Search movie..."
        />
      </div>
    </Col>
  );
};

export default SearchBox;
