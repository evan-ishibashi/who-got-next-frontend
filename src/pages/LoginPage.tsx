import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "../helperFunctions/Errors.tsx";
import { LOGIN_INITIAL_FORM_DATA } from "../Utils.tsx";

/** LoginPage
 *
 * Props:
 *  - getToken()
 *
 * State:
 *  - formData: can look like { username, password}
 *  - errors: [errormessages]
 *
 * App -> RouterList -> LoginForm -> Errors
 */
function LoginPage({ login }:{ login:Function }) {
    const [formData, setFormData] = useState(LOGIN_INITIAL_FORM_DATA);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    // Handles change on form
    function handleChange(e:any) {
        const { name, value } = e.target;
        setFormData((current:any) => ({
            ...current,
            [name]: value
        }));
    }

    //handles form submit, updates token
    async function handleSubmit(e:any) {
        e.preventDefault();

        try {
            await login(formData);
            setFormData(LOGIN_INITIAL_FORM_DATA);
            navigate("/");
        } catch (errors:any) {
            setErrors(errors.map((e:any) => e.message));
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" onChange={handleChange} value={formData.username} />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" onChange={handleChange} value={formData.password} type="password" />
            <button>Submit</button>
            {errors.length > 0 && (<Errors messages={errors} />)}
        </form>
    );

}

export default LoginPage;