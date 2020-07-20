import React, { useState, useEffect } from 'react';
import UsersList from '../components/UsersList';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import './Users.css';
import Axios from 'axios';

const Users = () => {
    const [showIntroductionModal, setIntroductionModal] = useState(true);
    const closeIntroductionHandler = () => setIntroductionModal(false);
    const [users, setUsers] = useState([])

    useEffect(() => {
        Axios.get('/users')
        .then((res) => {
            console.log(res.data)
            setUsers(res.data)
        })
        
    }, [])

    return (
        <>
            <Modal
                show={showIntroductionModal}
                onCancel={closeIntroductionHandler}
                header={<center>🌾 Welcome To PlanIT! 🌿</center>}
                footer={<Button onClick={closeIntroductionHandler}>X</Button>}
            >
                <p>
                    <center>PlanIT is where gardeners from around the world come to learn, teach, and further their gardening knowledge. Share your personal experiences while also helping others along the way.<b> Please be kind to your fellow gardeners! Welcome to PlanIT and Happy Gardening!</b> </center>
                </p>
            </Modal>
            <UsersList items={users} />;
        </>
    )
};

export default Users;
