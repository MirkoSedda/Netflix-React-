import "./App.css";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MovieDetails from "./components/MovieDetails";
import TVShows from "./components/TVShows";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tv-shows" element={<TVShows />} />
      <Route path="/details/:movieID" element={<MovieDetails />} />
    </Routes>
  </BrowserRouter>
);

export default App;
