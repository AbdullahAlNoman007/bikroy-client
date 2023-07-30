import React from 'react';
import Advertised from '../Advertised/Advertised';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import OverView from '../OverView/OverView';
import Update from '../Update/Update';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <Category></Category>
            <Advertised></Advertised>
            <Update></Update>
            <OverView></OverView>
        </>
    );
};

export default Home;