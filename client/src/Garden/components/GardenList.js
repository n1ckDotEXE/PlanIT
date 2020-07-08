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
            {props.items.map(garden => (
                <GardenItem
                    key={garden.id}
                    id={garden.id}
                    image={garden.imageUrl}
                    title={garden.title}
                    description={garden.description}
                    address={garden.address}
                    creatorId={garden.creator}
                    coordinates={garden.location}
                />
            ))}
        </ul>
    );
};


export default GardenList;