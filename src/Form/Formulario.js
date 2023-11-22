import { useReducer } from 'react';
import classes from './Form.module.css';

const initialFormState = {
    enteredEmail: "",
    emailIsValid: false,
    enteredPassword: "",
    passwordIsValid: false
}

const formReducer = (state, action) => {
    if (action.type === "emailInput") {
        return {
            ...state,
            enteredEmail: action.value,
            emailIsValid: action.value.includes("@")
        };
    }
    if (action.type === "passwordInput") {
        return {
            ...state,
            enteredPassword: action.value,
            passwordIsValid: action.value.trim().length > 7
        }
    }
    return initialFormState
}

function Formulario() {
    const [formState, dispatchForm] = useReducer(formReducer, initialFormState);
    const { enteredEmail, emailIsValid, enteredPassword, passwordIsValid} = formState
    const formIsValid = emailIsValid && passwordIsValid;

    function changeEmailHandler(event) {
        const value = event.target.value;
        dispatchForm({type: "emailInput", value})
    }

    function changePasswordHandler(event) {
        const value = event.target.value;
        dispatchForm({type: "passwordInput", value})
    }

    function submitFormHandler(event) {
        event.preventDefault();
        if (!formIsValid) {
            alert('Invalid form inputs!');
            return;
        }
        console.log('Good job!');
        console.log(enteredEmail, enteredPassword);
    }

    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            <div className={classes.control}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" onChange={changeEmailHandler} />
            </div>

            <div className={classes.control}>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={changePasswordHandler} />
            </div>
            <button>Submit</button>
        </form>
    );
}

export default Formulario;