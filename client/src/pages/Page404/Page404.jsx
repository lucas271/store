import { Link } from "react-router-dom"
import './styles/style.scss'

const Page404 = () => {
    return <>
        <article className="page404_container">
            <h2>404</h2>
            <p>Sorry, we couldn't find this page.<br/><Link to='/'>Click here to go back to homepage</Link></p>
        </article>
    </>
}

export default Page404