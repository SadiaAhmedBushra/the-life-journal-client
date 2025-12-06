import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
    return (
       <Carousel autoPlay={true} infiniteLoop={true}  showStatus={false}>
                <div>
                    {/* <img src={b1Img} /> */}
                </div>
                <div>
                    {/* <img src={b2Img} /> */}
                </div>
                <div>
                    {/* <img src={b3Img} /> */}
                </div>
            </Carousel>
    );
};

export default Banner;