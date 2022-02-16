import { Component } from "react";
import { Container, Alert, Dropdown, Row, Col } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import MyFooter from "./MyFooter";
import MovieList from "./MovieList";
import CommentArea from "./CommentArea";

class HomePage extends Component {
  state = {
    gallery1: [],
    gallery2: [],
    gallery3: [],
    searchString: "",
    loading: true,
    error: false,
    selectedMovie: null,
  };

  OMDB_URL = "https://www.omdbapi.com/?apikey=24ad60e9";

  componentDidMount = () => {
    this.fetchMovies();
  };

  fetchMovies = () => {
    Promise.all([
      fetch(this.OMDB_URL + "&s=harry%20potter")
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === "True") {
            this.setState({ gallery1: responseObject.Search });
          } else {
            this.setState({ error: true });
          }
        }),
      fetch(this.OMDB_URL + "&s=avengers")
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === "True") {
            this.setState({ gallery2: responseObject.Search });
          } else {
            this.setState({ error: true });
          }
        }),
      fetch(this.OMDB_URL + "&s=star%20wars")
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === "True") {
            this.setState({ gallery3: responseObject.Search });
          } else {
            this.setState({ error: true });
          }
        }),
    ])
      .then(() => this.setState({ loading: false }))
      .catch((err) => {
        this.setState({ error: true });
        console.log("An error has occurred:", err);
      });
  };

  showSearchResult = async (searchString) => {
    this.setState({ searchString });
  };

  render() {
    return (
      <div>
        <MyNavbar showSearchResult={this.showSearchResult} />
        <Container fluid className="px-4">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <h2 className="mb-4">Movies</h2>
              <div className="ml-4 mt-1">
                <Dropdown>
                  <Dropdown.Toggle
                    style={{ backgroundColor: "#221f1f" }}
                    id="dropdownMenuButton"
                    className="btn-secondary btn-sm dropdown-toggle rounded-0"
                  >
                    Genres
                  </Dropdown.Toggle>
                  <Dropdown.Menu bg="dark">
                    <Dropdown.Item href="#/action-1">Comedy</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Drama</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Thriller</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div>
              <i className="fa fa-th-large icons"></i>
              <i className="fa fa-th icons"></i>
            </div>
          </div>
          <Row>
            <Col md={8}>
              {this.state.error && (
                <Alert variant="danger" className="text-center">
                  An error has occurred, please try again!
                </Alert>
              )}
              {this.state.searchString.length > 0 && (
                <MovieList
                  title="Search results"
                  searchString={this.state.searchString}
                  changeSelectedMovie={(movieId) =>
                    this.setState({
                      selectedMovie: movieId,
                    })
                  }
                />
              )}
              {!this.state.error && !this.state.searchString > 0 && (
                <>
                  <MovieList
                    title="Harry Potter"
                    loading={this.state.loading}
                    movies={this.state.gallery1.slice(0, 6)}
                    changeSelectedMovie={(movieId) =>
                      this.setState({
                        selectedMovie: movieId,
                      })
                    }
                  />
                  <MovieList
                    title="The Avengers"
                    loading={this.state.loading}
                    movies={this.state.gallery2.slice(0, 6)}
                    changeSelectedMovie={(movieId) =>
                      this.setState({
                        selectedMovie: movieId,
                      })
                    }
                  />
                  <MovieList
                    title="Star Wars"
                    loading={this.state.loading}
                    movies={this.state.gallery3.slice(0, 6)}
                    changeSelectedMovie={(movieId) =>
                      this.setState({
                        selectedMovie: movieId,
                      })
                    }
                  />
                </>
              )}
            </Col>
            <Col md={4}>
              <CommentArea movieId={this.state.selectedMovie} />
            </Col>
          </Row>
          <MyFooter />
        </Container>
      </div>
    );
  }
}

export default HomePage;
