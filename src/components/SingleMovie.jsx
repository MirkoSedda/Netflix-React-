import { Component } from "react";
import { Col } from "react-bootstrap";

class SingleMovie extends Component {
  render() {
    return (
      <Col className="mb-2" key={this.props.data.imdbID}>
        <img
          className="img-fluid"
          src={this.props.data.Poster}
          alt="movie"
          onClick={() => {
            this.props.changeSelectedMovie(this.props.data.imdbID);
          }}
        />
      </Col>
    );
  }
}

export default SingleMovie;
