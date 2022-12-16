import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./HomePage";
import FilmLibrary from './components/FilmLibrary';
import NavBar from "./NavBar";
import NotFound from "./NotFound";

function App() {
  return (
    <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/films" element={<FilmLibrary/>}/>
            <Route path="/films/:filmId" element={<FilmLibrary/>}>
          </Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
