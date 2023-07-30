import React from 'react';
import shop from '../../../Asset/Icons/shopping.png'
import fast from '../../../Asset/Icons/fast-delivery.png'
import help from '../../../Asset/Icons/helpline.png'
import trust from '../../../Asset/Icons/trust.png'
import OverViewCard from './OverViewCard';
const OverView = () => {
    const views=[
        {
            id:1,
            title:"Fast Delivery",
            para:" Lightning-fast deliveries, your items at your doorstep swiftly!",
            img:fast
        },
        {
            id:2,
            title:"Helpline",
            para:" 24/7 helpline, ready to assist you anytime, anywhere!",
            img:help
        },
        {
            id:3,
            title:"Trust",
            para:" we value trust above all. We deliver on our promises, ensuring our customers' trust remains unwavering.",
            img:trust
        },
    ]
    return (
        <div className='flex gap-5 my-20 lg:flex-row flex-col px-5'>
            <img src={shop} alt="" />
            <div>
                {
                    views.map(view=><OverViewCard key={view.id} view={view}></OverViewCard>)
                }
            </div>
        </div>
    );
};

export default OverView;