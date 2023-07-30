import React from 'react';
import { Link } from 'react-router-dom';


const CategoryCard = ({ category }) => {
    const { name, img, bg, catID } = category
    return (
        <button>
            <Link to={`/category/${catID}`} className={`card card-side ${bg} flex items-center p-4 shadow-xl`}>
                <figure><img src={img} alt="stuff" style={{ height: '130px', width: '165px' }} /></figure>
                <div className="card-body">
                    <h2 className="text-4xl">{name}</h2>
                </div>
            </Link>
        </button>
    );
};

export default CategoryCard;