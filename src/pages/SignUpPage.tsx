import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "../helperFunctions/Errors";
import { REGISTER_INITIAL_FORM_DATA } from "../Utils";


/** SignUpForm
 *
 * Props:
 *  - getToken()
 *
 * State:
 *  - formData: can look like { username, password, firstName, lastName, email}
 *  - errors: [errormessages]
 *
 * App -> RouterList -> SignUpForm -> Errors
 */
function SignUpForm({ register }:{ register:Function }) {
    const [formData, setFormData] = useState(REGISTER_INITIAL_FORM_DATA);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    // Handles change on form
    function handleChange(e:any) {
        const { name, value } = e.target;
        setFormData(current => ({
            ...current,
            [name]: value
        }));
    }

    //handles form submit, updates token
    async function handleSubmit(e:any) {
        e.preventDefault();
        try {
            await register(formData);
            setFormData(REGISTER_INITIAL_FORM_DATA);
            navigate("/");
        } catch (errs:any) {
            console.log("errs", errs);
            setErrors(errs.map((e:any) => e.message));
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" onChange={handleChange} value={formData.username} /><br />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" onChange={handleChange} value={formData.password} type="password" /><br />
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" onChange={handleChange} value={formData.firstName} /><br />
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" onChange={handleChange} value={formData.lastName} /><br />
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" onChange={handleChange} value={formData.email} /><br />
            <button type="submit">Submit</button>
            {errors.length >= 1 && (<Errors messages={errors} />)}
        </form>

    );

}

export default SignUpForm;