import { useState, useEffect } from "react"
import { Row, Spinner } from "react-bootstrap"
import SingleMovie from "./SingleMovie"

const MovieList = ({ searchString, data, title, loading, movies, changeSelectedMovie }) => {

  const OMDB_URL = "http://www.omdbapi.com/?apikey=24ad60e9"

  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState(false)

  const fetchSearchResult = async () => {
    try {
      const response = await fetch(
        OMDB_URL + "&s=" + searchString
      )
      if (response.ok) {
        const data = await response.json()
        if (data.Response === "True") {
          setSearchResults(data.Search)
          setError(false)
        } else {
          setError(true)
        }
      } else {
        setError(true)
        console.log("an error occurred")
      }
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }

  useEffect(() => {

    searchString === "" ? setSearchResults(data.Search) && setError(true) : fetchSearchResult()

    // eslint-disable-next-line 
  }, [searchString])

  return (
    <>
      <h4>{title}</h4>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4 text-center">
        {loading
          ? [...Array(6).keys()].map((movie) => (
            <div className="spinner-container" key={movie}>
              <Spinner animation="border" variant="light" />
            </div>
          ))
          : movies &&
          movies.map((movie) => (
            <SingleMovie
              data={movie}
              key={movie.imdbID}
              changeSelectedMovie={(movieId) =>
                changeSelectedMovie(movieId)
              }
            />
          ))}
        {searchResults.map((movie) => (
          <SingleMovie
            data={movie}
            key={movie.imdbID}
            changeSelectedMovie={(movieId) =>
              changeSelectedMovie(movieId)
            }
          />
        ))}
      </Row>
    </>
  )
}


export default MovieList
