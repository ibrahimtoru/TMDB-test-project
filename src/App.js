import { Route,  Routes } from "react-router";
import Home from "./Home";
import Movie from "./Movie";
import 'antd/dist/antd.css';
import './App.css'

function App() {
  return (
      <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
      </Routes>
  );
}

export default App;
