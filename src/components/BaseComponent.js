import React, {useState} from "react";
import logo from "../logo.svg";
import {Button, Card, Row, Col, Rate} from "antd";

import '../App.css'


const BaseComponent = ({ movies}) => {
    return (

        <Row gutter={16}>
        {movies.map(movie => (
            <Col className="gutter-row" span={6}>
            <div className="site-card-border-less-wrapper" style={{marginBottom: "10px"}}>
                <Card title={movie.title} bordered={false} style={{ width: 300, boxShadow: '8px 7px 6px #c4bdbd' }}     cover={<img alt={movie.title} src={"http://image.tmdb.org/t/p/w500" + movie.poster_path} />}>
                    <p>rating: {movie.vote_average}</p>
                </Card>
            </div>
            </Col>
        ))}
        </Row>)
}

export default BaseComponent;