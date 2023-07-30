import React from 'react';
import banner from '../../../Asset/Banner.jpg'
import Button from '../../../Component/Button';
const Banner = () => {
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={banner} alt='' className="lg:w-1/2 rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">Do you Want to buy or sell any product?</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                   <Button>Get started</Button>
                </div>
            </div>
        </div>
    );
};

export default Banner;