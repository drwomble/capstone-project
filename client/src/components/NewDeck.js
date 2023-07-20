import { useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ErrorMessage, useFormik } from 'formik';
import * as yup from 'yup';
import { DeckContext } from "./context/deckContext";

const NewDeck = () => {
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const {addDeck} = useContext(DeckContext)

    const deckSchema = yup.object().shape({
        brand: yup
        .string()
        .min(1, 'Brand must be at least one character')
        .max(25, 'Brand cannot exceed 25 characters')
        .required('Brand is required'),
        deck_name: yup
        .string()
        .min(3, 'Deck name must have at least 3 characters')
        .max(25, 'Deck name cannot exceed 25 characters')
        .required('Deck name is required'),
        price: yup
        .number()
        .min(1, 'Price must be greater than $1.00')
        .max(500, 'Price cannot exceed $500.00')
        .required('Price is required'),
        image: yup.string().required('Picture is required')
    })

    
    const formik = useFormik({
        initialValues: {
            brand: '',
            deck_name: '',
            price: '',
            image: ''
        },
        validationSchema: deckSchema,
        onSubmit: (values, { resetForm }) => {
            const {brand, deck_name, price, image} = values;
            fetch('/decks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({brand, deck_name, price, image}),
            })
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        addDeck(data)
                        resetForm({values: ''})
                        history.push('/decks')
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
                <div className="mb-6" >
                <label className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type='text' name='brand' value={formik.values.brand} onChange={formik.handleChange} />
                {formik.errors.brand}
                </div>
                <div className="mb-6" >
                <label className="block mb-2 text-sm font-medium text-gray-900">Deck Name</label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type='text' name='deck_name' value={formik.values.deck_name} onChange={formik.handleChange} />
                {formik.errors.deck_name}
                </div>
                <div className="mb-6" >
                <label className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type='text' name='price' value={formik.values.price} onChange={formik.handleChange} />
                {formik.errors.price}
                </div>
                <div className="mb-6" >
                <label className="block mb-2 text-sm font-medium text-gray-900">Picture</label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type='text' name='image' value={formik.values.image} onChange={formik.handleChange} />
                {formik.errors.image}
                </div>
                <input className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' type='submit' />
            </form>
        </div>
    )
}

export default NewDeck