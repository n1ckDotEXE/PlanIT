import React from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './FormItem.css';
import Axios from 'axios';

const NewItem = () => {
    const [formState, inputHandler] = useForm(
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

    const itemSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); //Send to the Backend
        Axios.post("/gardens/list", {
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            address: formState.inputs.address.value,
        })
        .then((res) => {
            console.log(res)
        })
    };

    return (
        <form className="item-form" onSubmit={itemSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)."
                onInput={inputHandler}
            />
            <Input
                id="address"
                element="input"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address."
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                ADD Item
            </Button>
        </form>
    );
};

export default NewItem;

// import React, { Component } from 'react'

// import styles from './NewItem.module.css';

// export default class NewItem extends Component {
//     state = {
//         title: '',
//         description: '',
//         address: '',
//     }
//     handleFormSubmit = (e) => {
//         e.preventDefault();
//         const body = new FormData ();

//         Object.keys(this.state).forEach(key => {
//             body.append(key, this.state[key]);
//         })
        
//         fetch('http://localhost:3001/gardens/list', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset-UTF-8'
//             },
//             body: JSON.stringify(this.state),
//         })
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data);
//             })
//     }

//     handleChange = (e) => {
//         const { value, name } = e.target;
        
//         this.setState({
//             [name]: value
//         });
//     }

//     render() {
//         return (
//             <div className={styles.newItem}>
//                 <h2>Add your garden</h2>
//                 <form onSubmit={this.handleFormSubmit}>
//                     <div className={styles.formGroup}>
//                         <label htmlFor="title">Garden Title</label>
//                         <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange} />
//                     </div>
//                     <div className={styles.formGroup}>
//                         <label htmlFor="address">Garden Address</label>
//                         <input type="text" id="address" name="address" value={this.state.address} onChange={this.handleChange} />
//                     </div>
//                     <div className={styles.formGroup}>
//                         <label htmlFor="description">Garden Description</label>
//                         <textarea type="text" id="description" name="description" value={this.state.description} onChange={this.handleChange} />
//                     </div>
//                     <button className={styles.gardenButton} type="submit">ADD GARDEN</button>
//                 </form>
//             </div>
//         )
//     }
// }

