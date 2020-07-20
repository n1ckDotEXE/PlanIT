import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GardenList from '../components/GardenList';
import Axios from 'axios';

const UserGarden = () => {
    const [gardens, setGardens] = useState([])
    const userId = useParams().userId;
    useEffect(() => {
        Axios.get(`/users/${userId}`)
        .then((res) => {
            console.log(res.data)
            setGardens(res.data.Gardens)
        })
        
    }, [])
    return <GardenList items={gardens} />
};

export default UserGarden;