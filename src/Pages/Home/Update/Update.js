import React from 'react';
import Button from '../../../Component/Button';

const Update = () => {
    return (
        <div className='bg-blue-400 text-center py-10 lg:py-20 mx-5 rounded-xl my-10'>
            <h1 className='text-4xl font-medium my-2'>Let's Stay In Touch</h1>
            <p className='my-2'>Get Updates on sales, specials and more</p>
            <input type="text" placeholder="Enter Your Email" className="input input-bordered w-full max-w-xs m-2" />
            <Button>Submit</Button>
        </div>
    );
};

export default Update;