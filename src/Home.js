import logo from './logo.svg';
import BaseComponent from "./components/BaseComponent";
import {useState, useEffect} from "react";
import {Button, Layout, Select, Menu, Input,} from "antd";

import './App.css'
const { Header, Content, Footer } = Layout;
const { Search } = Input;
const {Option} = Select;


function Home() {
    const [rating, setRating] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [movies, setMovies] = useState([]);
    const [filterMovies, setFilterMovies] = useState([]);
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
    useEffect(() => {
        const filtered = movies.filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase()));
        setFilterMovies(filtered);
    }, [movies, searchText])
    const handleChange = (e) => {
        setRating(e);
    }
    const onSearch = value => setSearchText(value.trim());
    return (
        <div className="App">
            <Layout style={{background: "#1f1f1f"}}>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <div className="filter-box">
                        <Search
                            placeholder="search by movie name"
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                        />
                        <div className="rating-box">
                            <p>Rating: </p>
                            <Select value={rating} defaultValue={rating} style={{ width: 160, display: "inline-block" }} onChange={handleChange}>
                                <Option value={0}>Select Rating</Option>
                                <Option value={10}>10</Option>
                                <Option value={9}>9</Option>
                                <Option value={8}>8</Option>
                                <Option value={7}>7</Option>
                                <Option value={6}>6</Option>
                                <Option value={5}>5</Option>
                                <Option value={4}>4</Option>
                                <Option value={3}>3</Option>
                                <Option value={2}>2</Option>
                                <Option value={1}>1</Option>

                            </Select>
                        </div>

                    </div>

                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <BaseComponent movies={filterMovies}  />
                    </div>
                </Content>

            </Layout>

        </div>
    );
}

export default Home;
