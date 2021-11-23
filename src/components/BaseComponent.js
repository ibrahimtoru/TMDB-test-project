import React, {useState} from "react";
import logo from "../logo.svg";
import {Button, Card, Row, Col, Rate} from "antd";
import {useNavigate} from "react-router-dom";

import '../App.css'


const BaseComponent = ({ movies}) => {
    const navigate = useNavigate();

    const navigateToMovie = (id) => {
        navigate("/movie/" + id);
    }
    return (

        <Row gutter={16}>
        {movies.map(movie => (
            <Col className="gutter-row" span={6}>
            <div className="site-card-border-less-wrapper" onClick={() => navigateToMovie(movie.id)} style={{marginBottom: "10px", cursor: "pointer"}}>
                <Card title={movie.title} bordered={false} style={{ width: 300, boxShadow: 'rgb(196, 189, 189) 1px 1px' }}     cover={<img alt={movie.title} src={"http://image.tmdb.org/t/p/w500" + movie.poster_path} />}>
                    <p>rating: {movie.vote_average}</p>
                </Card>
            </div>
            </Col>
        ))}
        </Row>)
}

export default BaseComponent;