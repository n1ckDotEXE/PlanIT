import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';
import Axios from 'axios';

const Auth = (props) => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    },
        false);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            const formData = {
                email: {...formState.inputs.email},
                password: {...formState.inputs.password},
            };
            setFormData(
                formData, 
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData({...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const loginHandler = () => {
        console.log(formState.inputs);
        Axios.post("/users/auth/login", {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
        })
        .then((res) => {
            if(res.status === 200){
                auth.login(res.data);
            }
        }) 
    };

    const signupHandler = () => {
        console.log(formState.inputs);
        Axios.post("/users/auth/register", {
            name_input: formState.inputs.name.value,
            email_input: formState.inputs.email.value,
            password_input: formState.inputs.password.value,
        })
        .then((res) => {
            if(res.status === 201){
                auth.login(res.data);
            }
        }) 
    };

    return (
        <Card className="authentication">
            <h2>Login / Register</h2>
            <hr />
            <form>
                {!isLoginMode &&
                    
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name."
                        onInput={inputHandler}
                    />
                }
                <Input
                    element="input"
                    id="email"
                    type="email"
                    label="E-Mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(7)]}
                    errorText="Please enter a valid password  (7 character minimum.)"
                    onInput={inputHandler}
                />
                {isLoginMode ? <Button type="button" onClick={loginHandler} disabled={!formState.isValid}>LOGIN</Button> : <Button type="button" onClick={signupHandler} disabled={!formState.isValid}>SIGNUP</Button>}
                <Button type="button" inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
                </Button>
            </form>
        </Card>
    );
};

export default Auth;
