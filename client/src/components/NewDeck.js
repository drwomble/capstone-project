import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ErrorMessage, useFormik } from 'formik';
import * as yup from 'yup';

const NewDeck = ({ addDeck }) => {
    const [errors, setErrors] = useState([])
    const history = useHistory()

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
                <label>Brand</label>
                <input type='text' name='brand' value={formik.values.brand} onChange={formik.handleChange} />
                {formik.errors.brand}
                <label>Deck Name</label>
                <input type='text' name='deck_name' value={formik.values.deck_name} onChange={formik.handleChange} />
                {formik.errors.deck_name}
                <label>Price</label>
                <input type='text' name='price' value={formik.values.price} onChange={formik.handleChange} />
                {formik.errors.price}
                <label>Picture</label>
                <input type='text' name='image' value={formik.values.image} onChange={formik.handleChange} />
                {formik.errors.image}
                <input type='submit' />
            </form>
        </div>
    )
}

export default NewDeck