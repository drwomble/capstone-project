import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const SpotCard = ({spot}) => {

    return(
        <section className="grid grid-cols-2 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
            <div>
            <img src={spot.image} alt='picture of spot' className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'/>
            <div className='flex flex-col justify-between p-4 leading-normal'>
            <label className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Known as: </label>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-green-300'>{spot.name}</h5>
            <label className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Location: </label>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-green-300'>{spot.location}</h5>
            <label className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Description: </label>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-green-300'>{spot.description}</h5>
            </div>
            </div>
        </section>
    )
}

export default SpotCard