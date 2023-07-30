import React from 'react';
import laptop from '../../../Asset/Category/Cat-laptop.png'
import tab from '../../../Asset/Category/Cat-tab.png'
import phone from '../../../Asset/Category/Cat-Phone.png'
import CategoryCard from './CategoryCard';
const Category = () => {
    const Categories =[
        {
            id:1,
            name:'Laptop',
            img:laptop,
            bg: 'bg-yellow-400',
            catID:11
        },
        {
            id:2,
            name:'Tab',
            img:tab,
            bg: 'bg-green-500',
            catID:22
        },
        {
            id:3,
            name:'Phone',
            img:phone,
            bg: 'bg-sky-300',
            catID:33
        }
    ]
    return (
        <>
            <h1 className='text-4xl font-medium mt-10'>Categories</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-10 p-5'>
                {
                    Categories.map(category=><CategoryCard key={category.id} category={category}></CategoryCard>)
                }
            </div>
        </>
    );
};

export default Category;