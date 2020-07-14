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
                header="Welcome To PlanIT"
                footer={<Button onClick={closeIntroductionHandler}>CLOSE</Button>}
            >
                <p>
                    Details Here
                </p>
            </Modal>
            <UsersList items={USERS} />;
        </>
    )
};

export default Users;
