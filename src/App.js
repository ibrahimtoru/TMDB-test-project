import logo from './logo.svg';
import BaseComponent from "./components/BaseComponent";
import {useState, useEffect} from "react";
import {Button, Select} from "antd";
import 'antd/dist/antd.css';
import './App.css'

const {Option} = Select;


function App() {
  const [name, setName] = useState('asd');
  const [rating, setRating] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
      getMovies();
  }, [rating])
  const getMovies = () => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=03a9e07a710931bd64d020697b9cea4d&language=en-US&sort_by=popularity.desc${rating != '0' ? '&vote_average.gte=' + rating: ''}&include_adult=false&include_video=false`;
      console.log({url})
      fetch(url)
          .then(async (responce) => {
              if(responce.ok) {
                  const body = await responce.json();
                  console.log(body.results);
                  setMovies(body.results);
              }
              console.log(responce);
          })
  }
  const handleChange = (e) => {
      setRating(e);
  }
  return (
      <div className="App">
          <header className="App-header">
              <Select value={rating} defaultValue={rating} style={{ width: 120 }} onChange={handleChange}>
                  <Option value={0}>Select option</Option>
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                  <Option value={4}>4</Option>
                  <Option value={5}>5</Option>
                  <Option value={6}>6</Option>
                  <Option value={7}>7</Option>
                  <Option value={8}>8</Option>
                  <Option value={9}>9</Option>
                  <Option value={10}>10</Option>
              </Select>
        <BaseComponent movies={movies} name={name} age={29} />
          </header>
      </div>
  );
}

export default App;
