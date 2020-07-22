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
import Axios from 'axios';
import { useHistory } from 'react-router-dom';


const UpdateItem = () => {
    const [isLoading, setIsLoading] = useState(true)
    const itemId = useParams().itemId;
    const history = useHistory();
    const [item, setItem] = useState(null)
    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        },
        false
    );

    useEffect(() => {
        Axios.get(`/gardens/list/${itemId}`)
        .then(res => {
            if(res.data) {
                setItem(res.data)
                setFormData({
                    title: {
                        value: res.data.title,
                        isValid: true
                    },
                    description: {
                        value: res.data.description,
                        isValid: true
                    },
                    address: {
                        value: res.data.address,
                        isValid: true
                    }
                },
                    true
                );    
            }
        })
        setIsLoading(false);
    }, []);


    const itemUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
        Axios.put(`/garden/list/${itemId}`, {
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            address: formState.inputs.address.value,
        })
        .then((res) => {
            console.log(res)
            history.push(`/users/${res.data.userId}/gardens`)
        })
    };

    if (!item) {
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
                id="address"
                element="input"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address."
                onInput={inputHandler}
                initialValue={formState.inputs.address.value}
                initialValid={formState.inputs.address.isValid}
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