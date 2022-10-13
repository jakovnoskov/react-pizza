import { Link } from 'react-router-dom'
import cartEmptyImg from '../../assets/img/empty-cart.png'

export default function InfoBox({
  title = 'Корзина пустая',
  description = 'Вероятней всего, вы не заказывали ещё пиццу.<br />Для того, чтобы заказать пиццу, перейди на главную страницу.',
  buttonTitle = 'Вернуться назад',
  icon = null,
  img = '../../assets/img/empty-cart.png',
  alt = 'Empty cart'
}) {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>{title}</h2>
          <p>{description}</p>
          {/* {icon ?
            <p className="cart--icon">{icon}</p> :
            <img src='../../assets/img/empty-cart.png' alt={alt} />
          } */}
          <img src={cartEmptyImg} alt={alt} />
          <Link to={`/`}>
            <button className="button button--black">
              <span>{buttonTitle}</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}