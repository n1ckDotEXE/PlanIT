import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './FormItem.css';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Leafy Lettuce Lanes',
        description: 'The king of head lettuce!',
        imageUrl:
            'https://images.pexels.com/photos/89267/pexels-photo-89267.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Green Thumb Tom',
        description: 'Old school with Old time!',
        imageUrl:
            'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
];

const UpdateItem = () => {
    const [isLoading, setIsLoading] = useState(true)
    const itemId = useParams().itemId;
    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const identifiedItem = DUMMY_PLACES.find(p => p.id === itemId);

    useEffect(() => {
        if (identifiedItem) {
            setFormData({
                title: {
                    value: identifiedItem.title,
                    isValid: true
                },
                description: {
                    value: identifiedItem.description,
                    isValid: true
                }
            },
                true
            );
        }
        setIsLoading(false);
    }, [setFormData, identifiedItem]);


    const itemUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
    };

    if (!identifiedItem) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        );
    };

    return (
        <form className="item-form" onSubmit={itemUpdateSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min. 5 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE ITEM
            </Button>
        </form>
    );
};
export default UpdateItem;