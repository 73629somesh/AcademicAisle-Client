import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import validator from 'validator'

const UpdateValidation = (values) => {
    let errors = {}

    console.log(values.name.length)
    console.log(values.city.length)
    console.log(values.phone.value)
    console.log(values.email.length)

    if (values.name.length === 0) {
        errors.name = "Name is required";
        console.log(errors.name);
        toast.error("Name cannot be empty")
    }

    if (values.city.length === 0) {
        errors.city = "City is required";
        console.log(errors.city);
        toast.error("City cannot be empty")
    }

    // if (values.phone === "") {
    //     errors.phone = "Phone number is required";
    //     console.log(errors.city);
    //     // toast.error("City is required")
    // } else if (values.phone.length != 10) {
    //     errors.phone = "please enter valid phone number";
    //     console.log(errors.phone)
    // }

    if (values.email === "") {      //npm install validator (used library) 
        errors.email = "Email is required";
        console.log(errors.email);
        toast.error("Email cannot be empty")
    } else if (!validator.isEmail(values.email)) {
        errors.email = "please enter valid email";
        toast.error("Enter valid email")
    }

    if (values.password === "") {
        errors.password = "Password is required";
        console.log(errors.password);
        toast.error("Password cannot be empty")
    } else if (!validator.isStrongPassword(values.password, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
        errors.password = "Is not Strong Password";
    }

    console.log(errors)
    return errors;

}

export default UpdateValidation;