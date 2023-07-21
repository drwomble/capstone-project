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
        <div className="px-40 bg-gray-100">
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-6" >
                <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type='text' name='name' value={formik.values.name} onChange={formik.handleChange} />
                {formik.errors.name}
                </div>
                <div className="mb-6" >
                <label className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type='text' name='location' value={formik.values.location} onChange={formik.handleChange} />
                {formik.errors.location}
                </div>
                <div className="mb-6" >
                <label className="block mb-2 text-sm font-medium text-gray-900">Picture</label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type='text' name='image' value={formik.values.image} onChange={formik.handleChange} />
                {formik.errors.image}
                </div>
                <div className="mb-6" >
                <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type='text' name='description' value={formik.values.description} onChange={formik.handleChange} />
                {formik.errors.description}
                </div>
                <input className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' type='submit' />
            </form>
        </div>
    )
    
}

export default NewSpot