import { Link } from "react-router-dom/cjs/react-router-dom.min"

const HomePage = () => {

    return (
        <div>
            <div>
                <h5>Skate Exchange</h5>
                <img src="/Logo.png"/>
            </div>
            <h5>Get Started</h5>
            <nav>
                <div>
                    <ul>
                        <li>
                            <Link to='/signup'>Sign Up</Link>
                        </li>
                        <li>
                            <Link to='/signin'>Sign In</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default HomePage