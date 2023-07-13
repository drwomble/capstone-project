import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ErrorMessage, useFormik } from 'formik';
import * as yup from 'yup';

const NewSpot = ({ addSpot }) => {
    const [errors, setErrors] = useState([])
    const history = useHistory()

    const spotSchema = yup.object().shape({
        name: yup
        .string()
        .min(1, 'Name must be at least one character')
        .max(25, 'Name cannot exceed 25 characters')
        .required('Name is required'),
        location: yup
        .string()
        .min(3, 'Location name must have at least 3 characters')
        .max(50, 'Location name cannot exceed 50 characters'),
        image: yup.string().required('Picture is required'),
        description: yup
        .string()
        .min(10, 'Description must have at least 10 characters')
        .max(100, 'Description cannot exceed 100 characters')
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            location: '',
            image: '',
            description: ''
        },
        validationSchema: spotSchema,
        onSubmit: (values, { resetForm }) => {
            const {name, location, image, description} = values;
            fetch('/spots', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, location, image, description}),
            })
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        addSpot(data)
                        resetForm({values: ''})
                        history.push('/spots')
                    })
                } else {
                    r.json().then((errors) => setErrors(errors.message))
                }
            })
            .catch((errors) => console.log(errors))
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label>Name</label>
                <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} />
                {formik.errors.name}
                <label>Location</label>
                <input type='text' name='location' value={formik.values.location} onChange={formik.handleChange} />
                {formik.errors.location}
                <label>Picture</label>
                <input type='text' name='image' value={formik.values.image} onChange={formik.handleChange} />
                {formik.errors.image}
                <label>Description</label>
                <input type='text' name='description' value={formik.values.description} onChange={formik.handleChange} />
                {formik.errors.description}
                <input type='submit' />
            </form>
        </div>
    )
    
}

export default NewSpot