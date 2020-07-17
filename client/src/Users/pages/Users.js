import React, { useState } from 'react';
import UsersList from '../components/UsersList';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import './Users.css';

const Users = () => {
    const [showIntroductionModal, setIntroductionModal] = useState(true);
    const closeIntroductionHandler = () => setIntroductionModal(false);
    const USERS = [
        {
            id: '420',
            name: 'Jimmy Hendrix',
            image: 'https://images.pexels.com/photos/2529174/pexels-photo-2529174.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            items: 6
        }
    ];

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
            <UsersList items={USERS} />;
        </>
    )
};

export default Users;
