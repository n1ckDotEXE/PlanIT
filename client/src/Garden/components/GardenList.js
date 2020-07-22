import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import GardenItem from './GardenItem';
import Button from '../../shared/components/FormElements/Button';
import './GardenList.css';

const GardenList = props => {
    if (props.items.length === 0) {
        return (
            <div className="garden-list center">
                <Card>
                    <h2>No Gardens found. You should create one!</h2>
                    <Button to="/garden/new">Share Items</Button>
                </Card>
            </div>
        );
    }
    return (
        <ul className="garden-list">
            {props.items.map(garden => {
                return (
                <GardenItem
                    key={garden.id}
                    id={garden.id}
                    image='https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                    title={garden.title}
                    description={garden.description}
                    address={garden.address}
                    creatorId={garden.creator}
                />
                )
            })}
        </ul>
    );
};


export default GardenList;