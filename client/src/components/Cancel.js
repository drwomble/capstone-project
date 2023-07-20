import { Link } from "react-router-dom/cjs/react-router-dom.min"

const CancelPage = () => {

    return (
        <div className="flex justify-center">
            <h5 className="mb-2 mr-4 text-2xl font-bold text-gray-900">Something went wrong processing your purchase.</h5>
            <div className="mb-6">
            <ul>
                <li>
                    <Link className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' to='/'>Return Home</Link>
                </li>
            </ul>
            </div>
        </div>
    )
}

export default CancelPage