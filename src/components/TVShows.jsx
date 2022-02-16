import { useState, useEffect } from "react"
import { Container, Alert, Dropdown, Row, Col } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import MyFooter from "./MyFooter"
import MovieList from "./MovieList"
import CommentArea from "./CommentArea"

const TVShows = () => {

  const [gallery, setGallery] = useState([])
  const [searchString, setSearchString] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const OMDB_URL = "https://www.omdbapi.com/?apikey=24ad60e9"

  useEffect(() => {

    fetchMovies()

  }, [])

  const fetchMovies = () => {
    fetch(OMDB_URL + "&s=lost&type=series")
      .then((response) => response.json())
      .then((responseObject) => {
        if (responseObject.Response === "True") {
          setGallery(responseObject.Search)
        } else {
          setError(true)
        }
      })
      .then(() => setLoading(true))
      .catch((err) => {
        setError(true)
        console.log("An error has occurred:", err)
      })
  }

  const showSearchResult = async (searchString) => {
    setSearchString(searchString)
  }

  return (
    <div>
      <MyNavbar showSearchResult={showSearchResult} />
      <Container fluid className="px-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <h2 className="mb-4">TV Shows</h2>
            <div className="ms-4 mt-1">
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
            {error && (
              <Alert variant="danger" className="text-center">
                An error has occurred, please try again!
              </Alert>
            )}
            {searchString.length > 0 && (
              <MovieList
                title="Search results"
                searchString={searchString}
                changeSelectedMovie={(movieId) =>
                  setSelectedMovie(movieId)
                }
              />
            )}
            {!error && !searchString > 0 && (
              <>
                <MovieList
                  title="Harry Potter"
                  loading={loading}
                  movies={gallery.slice(0, 6)}
                  changeSelectedMovie={(movieId) =>
                    setSelectedMovie(movieId)
                  }
                />
              </>
            )}
          </Col>
          <Col md={4}>
            <CommentArea movieId={selectedMovie} />
          </Col>
        </Row>
        <MyFooter />
      </Container>
    </div>
  )
}


export default TVShows