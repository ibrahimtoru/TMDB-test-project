import logo from './logo.svg';
import {useState, useEffect} from "react";
import {Button, Layout, Row, Col, Select, Menu, Input,} from "antd";
import { useParams } from "react-router-dom";

import './App.css'

function Movie() {
    const params = useParams();
    const [movie, setMovie] = useState(null);
    const [video, setVideo] = useState(null);
    useEffect(() => {
        getMovie();
        getVideo();
    }, [])
   const getVideo = () => {
       const url = `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=03a9e07a710931bd64d020697b9cea4d&language=en-US`;
       console.log({url})
       fetch(url)
           .then(async (responce) => {
               if(responce.ok) {
                   const body = await responce.json();
                   console.log(body);
                   if(body.results.length) {
                       setVideo(body.results[0]);
                   }
               }
               console.log(responce);
           })
    }
    const getMovie = () => {
        const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=03a9e07a710931bd64d020697b9cea4d&language=en-US`;
        console.log({url})
        fetch(url)
            .then(async (responce) => {
                if(responce.ok) {
                    const body = await responce.json();
                    console.log({hasVideo: body.video});
                    setMovie(body);
                }
                console.log(responce);
            })
    }

    return (
        <>
            {movie && (
             <div style={{padding: "12px 24px"}}>
                <div className="title-container" style={{display: "flex", padding: "0px 24px"}}>
                    <h1>{movie.title}</h1>
                    <div className="subtitle-container">
                        <div>Original title: {movie.original_title}</div>
                        <ul>
                            <li>{(new Date(movie.release_date)).getFullYear()}</li>
                            <li>{Math.ceil(movie.runtime / 60)}h {movie.runtime % 60}min</li>
                        </ul>
                    </div>
                </div>


                 <div >
                     <Row gutter={16} >
                         <Col className="gutter-row" span={10}>
                             <img width={290} h={420} src={"http://image.tmdb.org/t/p/w500" + movie.poster_path} />
                         </Col>
                         <Col className="gutter-row" span={14}>
                             {video && (
                                 <div className="video-responsive">
                                     <iframe
                                         width="853"
                                         height="480"
                                         src={`https://www.youtube.com/embed/${video.key}`}
                                         frameBorder="0"
                                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                         allowFullScreen
                                         title="Embedded youtube"
                                     />
                                 </div>
                             )}
                         </Col>
                     </Row>
                 </div>


             </div>
            )}

        </>
    );
}

export default Movie;
