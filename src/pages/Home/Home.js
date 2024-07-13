import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import ChooseSection from '../../components/ChooseSection/ChooseSection';
import StartCoursesImg from '../../utils/images/start-courses-img.jpg';
import FaqAccordion from '../../components/FaqAccordion/FaqAccordion';
import { Card } from 'react-bootstrap';
import Blog1Img from '../../utils/images/blog1-img.jpg';
import Blog2Img from '../../utils/images/blog2-img.jpg';
import Blog3Img from '../../utils/images/blog3-img.jpg';
import YoutubeEmbed from "./YoutubeEmbed";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import VideoSlider from "./VideoSlider";



const blogs = [
    {
        id: 1,
        img: [Blog1Img],
        title: 'News 1',
        description: 'News IETPF'
    },
    {
        id: 2,
        img: [Blog2Img],
        title: 'News 2',
        description: 'News IETPF'
    },
    {
        id: 3,
        img: [Blog3Img],
        title: 'News 3',
        description: 'News IETPF'
    }
];
const videoIds = ['i5xMLoouD2w?si=9DKjKCz9v_wjC2Zw', 'hsF4OeH0e0A?si=0QJPBMhYT3B3SsmK', 'psYjHiXt774?si=je3J9OIHg7_c1mB2'];


function Home() {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const headerImages = [StartCoursesImg, Blog1Img, Blog2Img, Blog3Img]; // Add more images as needed



    return (
    <div className='home-page'>
        <Slider {...sliderSettings} className='header-slider'>
            {headerImages.map((img, index) => (
                <img key={index} className='header-slide' src={img} style={{ backgroundImage: `url("${img}")`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
                    {/*<header className='h-100 min-vh-100 d-flex align-items-center text-light'>*/}

                    {/*    <div className='container d-flex flex-column align-items-center'>*/}
                    {/*        <h1 className='new text-center fw-semibold'>IETP Course Platform</h1>*/}
                    {/*        <p> Integrated Engineering Team Project is a course given to Addis Ababa Science and Technology University students 1 year before their graduation </p>       <div className='d-flex flex-column flex-sm-row align-items-center'>*/}
                    {/*        <h3>*/}
                    {/*            Are you that stake ?*/}
                    {/*        </h3>*/}
                    {/*        <Link to="/login">*/}
                    {/*            <button type='button' className='btn btn-outline-light btn-lg mx-0 mx-sm-2 my-2 my-sm-0'>Login</button>*/}
                    {/*        </Link>*/}

                    {/*    </div></div>*/}
                    {/*</header>*/}
                </img>
            ))}
        </Slider>


        <div className="py-5">
            <ChooseSection />
        </div>
        <div className='video-page'>
            <VideoSlider videos={videoIds} />

        </div>
        <div className='py-5 bg-light'>
            <div className="container">
                <div className='row d-flex align-items-center justify-content-around'>
                    <div className='col-lg-5'>
                        <h2 className='text-capitalize'>2024 IETP course </h2>
                        <p>
                            Things that you should know before starting
                        </p>
                        <Link to="/courses">
                            <button type='button' className='btn btn-danger btn-lg mx-0 mx-sm-2 my-2 my-sm-0'>Learn More</button>
                        </Link>
                    </div>
                    <div className='col-lg-5 mt-5 mt-lg-0'>
                        <img src={StartCoursesImg} className='img-fluid' alt="" />
                    </div>
                </div>
            </div>
        </div>

        <div className="py-5">
            <FaqAccordion />
        </div>

        <div className='blog-section text-light py-5'>
            <div className='container d-flex flex-column align-items-center'>
                <h2 className='text-center text-capitalize mb-5'>Latest on the blog</h2>
                <div className='row g-4'>
                    {blogs.map((blog) => (
                        <div key={blog.id} className='col-md-6 col-lg-4'>
                            <Link to="/blog" className='text-decoration-none'>
                                <Card className='h-100 shadow scale-hover-effect'>
                                    <Card.Img variant="top" src={blog.img} />
                                    <Card.Body className='p-md-5'>
                                        <Card.Title>{blog.title}</Card.Title>
                                        <Card.Text>{blog.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
                <Link to="/blog">
                    <button type='button' className='btn btn-danger btn-lg mt-5'>Read More Blogs</button>
                </Link>
            </div>
        </div>
    </div>
  )
}
Home.propTypes = {
    videoIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Home;