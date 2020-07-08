import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: '420',
            name: 'Jimmy Hendrix',
            image: 'https://images.pexels.com/photos/2529174/pexels-photo-2529174.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            items: 6
        }
    ];

    return <UsersList items={USERS} />;
};

export default Users;
