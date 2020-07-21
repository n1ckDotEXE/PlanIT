import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GardenList from '../components/GardenList';
import Axios from 'axios';

const UserGarden = () => {
    const [gardens, setGardens] = useState([])
    const userId = useParams().userId;
    let gardenArray = []
    // useEffect(async () => {
    //     console.log('ffff')
    //     const data = await Axios.get(`/users/${userId}`)
    //     .then((res) => {
    //         console.log(res.data)
    //         return res.data.Gardens
    //     })
    //     // console.log(gardens)
    //     setGardens(data)
    // }, [])

    async function fetchData() {
        const res = await Axios.get(`/users/${userId}`)
        .then(res => setGardens(res.data.Gardens))
    }
    useEffect(() => {
        fetchData();
    },[]);
    return <GardenList items={gardens} />
};

export default UserGarden;