import { useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ErrorMessage, useFormik } from 'formik';
import * as yup from 'yup';
import { DeckContext } from "./context/deckContext";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'

toastr.options = {
    postionClass : 'toast-top-full-width',
    hideDuration : 300,
    timeOut : 60000
}

const EditDeck = ({ deck, handleEditToggle}) => {
    const history = useHistory()
    const [errors, setErrors] = useState([])
    const {handleDeckEdit} = useContext(DeckContext)

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
            brand: deck.brand,
            deck_name: deck.deck_name,
            price: deck.price,
            image: deck.image
        },
        validationSchema: deckSchema,
        onSubmit: (values, { resetForm }) => {
            const {brand, deck_name, price, image} = values;
            fetch(`/decks/${deck.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({brand, deck_name, price, image}),
            })
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        handleDeckEdit(data)
                        resetForm({values: ''})
                        history.push('/decks')
                        toastr.success('Your adjustments have been added to the database')
                        handleEditToggle()
                    })
                } else {
                    r.json().then((errors) => setErrors(errors.message))
                }
            })
            .catch((errors) => console.log(errors))
        }
    })
    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type='text' name='brand' value={formik.values.brand} onChange={formik.handleChange} />
                {formik.errors.brand}
                <label className="block mb-2 text-sm font-medium text-gray-900">Deck Name</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type='text' name='deck_name' value={formik.values.deck_name} onChange={formik.handleChange} />
                {formik.errors.deck_name}
                <label className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type='text' name='price' value={formik.values.price} onChange={formik.handleChange} />
                {formik.errors.price}
                <label className="block mb-2 text-sm font-medium text-gray-900">Picture</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type='text' name='image' value={formik.values.image} onChange={formik.handleChange} />
                {formik.errors.image}
                <input type='submit' className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"/>
            </form>
        </div>
    )
}
export default EditDeck