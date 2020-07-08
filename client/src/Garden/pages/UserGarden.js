import React from 'react';
import { useParams } from 'react-router-dom';
import GardenList from '../components/GardenList';


const DUMMY_GARDEN = [
    {
        id: 'p1',
        title: 'Green Thumb Greenhouse',
        description: 'Small single family run greenhouse',
        imageUrl: 'https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        address: '109 Nascar Dr, Sevierville, TN 37862',
        location: {
            lat: 35.8402608,
            lng: -83.5754894,
        },
        creator: 'Chris'
    },
    {
        id: 'p2',
        title: 'Lettuce Nation',
        description: 'Tiny greenhouse, BIG Lettuce',
        imageUrl: 'https://images.pexels.com/photos/89267/pexels-photo-89267.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        address: '109 Nascar Dr, Sevierville, TN 37862',
        location: {
            lat: 35.8402608,
            lng: -83.5754894
        },
        creator: 'u2'
    }
];

const UserGarden = () => {
    const userId = useParams().userId;
    const loadedGarden = DUMMY_GARDEN.filter(garden => garden.creator === userId);
    return <GardenList items={loadedGarden} />;
};

export default UserGarden;