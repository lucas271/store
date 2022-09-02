import clothesDB from '../../products'
import { useNavigate } from 'react-router-dom'

import './styles/style.scss'

const Home = () => {
    const navigate = useNavigate()

    return <>

        <main className='items_container'>
            {
                clothesDB.clothes.map(item => {
                    return <section className='item_container' key={item.cloth.id}
                    onClick={() => navigate('/'+item.cloth.id)}>
                        <img src={item.cloth.image} alt={item.cloth.name} />

                        <div>
                            <h3>{item.cloth.type}</h3>
                            <p>${(item.cloth.price.toFixed(2)).replace('.', ',')}</p>
                        </div>

                    </section>
                })
            }
        </main>
    </>
}

export default Home