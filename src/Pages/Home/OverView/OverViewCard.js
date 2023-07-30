import React from 'react';

const OverViewCard = ({ view }) => {
    const { title, para, img } = view
    return (
        <div className="card card-side bg-base-100 shadow-xl my-2 px-5">
            <figure><img src={img} alt="Movie"  /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{para}</p>
            </div>
        </div>
    );
};

export default OverViewCard;