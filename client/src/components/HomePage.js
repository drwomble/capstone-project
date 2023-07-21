import { Link } from "react-router-dom/cjs/react-router-dom.min"

const HomePage = () => {

    return (
        <div className="bg-gray-100">
            <div>
                <h5 className="flex justify-center block py-2 pl-3 pr-4 text-emerald-950 rounded">Skate Exchange</h5>
                <img src="/Logo.png" className="flex justify-end" alt='skate exchange logo' />
            </div>
            <h5 classname='block py-2 pl-3 pr-4 text-emerald-950 rounded'>Get Started</h5>
            <nav>
                <div>
                    <ul>
                        <li>
                            <Link to='/signup' className='block py-2 pl-3 pr-4 text-emerald-950 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-emerald-500'>Sign Up</Link>
                        </li>
                        <li>
                            <Link to='/signin' className='block py-2 pl-3 pr-4 text-emerald-950 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-emerald-500'>Sign In</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default HomePage