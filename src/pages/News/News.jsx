import React from 'react';
import './Blog.css';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Blog1Img from '../../utils/images/blog1-img.jpg';
import Blog2Img from '../../utils/images/blog2-img.jpg';
import Blog3Img from '../../utils/images/blog3-img.jpg';
import Blog4Img from '../../utils/images/blog4-img.jpg';
import Blog5Img from '../../utils/images/blog5-img.jpg';
import Blog6Img from '../../utils/images/blog6-img.jpg';
import Blog7Img from '../../utils/images/blog7-img.jpg';
import Blog8Img from '../../utils/images/blog8-img.jpg';
import Blog9Img from '../../utils/images/blog9-img.jpg';

const blogs = [
    {
        id: 1,
        img: [Blog1Img],
        title: 'News 1',
        description: 'News Details'
    },
    {
        id: 2,
        img: [Blog2Img],
        title: 'News 2',
        description: 'News Details'
    },
    {
        id: 3,
        img: [Blog3Img],
        title: 'News 3',
        description: 'News Details'
    },
    {
        id: 4,
        img: [Blog4Img],
        title: 'News 4',
        description: 'News Details'
    },
    {
        id: 5,
        img: [Blog5Img],
        title: 'News 5',
        description: 'News Details'
    },
    {
        id: 6,
        img: [Blog6Img],
        title: 'News 6',
        description: 'News Details'
    },
    {
        id: 7,
        img: [Blog7Img],
        title: 'News 7',
        description: 'News Details'
    },
    {
        id: 8,
        img: [Blog8Img],
        title: 'News 8',
        description: 'News Details'
    },
    {
        id: 9,
        img: [Blog9Img],
        title: 'News 9',
        description: 'News Details'
    },
];

function News() {
  return (
    <div className='blog-page'>
        <header className='height-75'>
            <div className='container h-100 d-flex flex-column align-items-center justify-content-center text-light'>
                <h1 className='text-center fw-semibold'>Notice Information</h1>
                {/*<p className='text-center w-75 mb-5'>News Details</p>*/}
            </div>
        </header>

        <div className='bg-body-tertiary py-5'>
            <div className="container">
                <div className="row g-4">
                    {blogs.map((blog) => (
                        <div key={blog.id} className='col-md-6 col-lg-4'>
                            <Link to="/blog" className='text-decoration-none'>
                                <Card className='h-100 shadow scale-hover-effect bg-dark text-light border-0'>
                                    <Card.Img variant="top" src={blog.img} />
                                    <Card.Body className='p-md-5 d-flex flex-column align-items-center'>
                                        <Card.Title className='fs-2 mb-4'>{blog.title}</Card.Title>
                                        <Card.Text className='text-center'>{blog.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default News;