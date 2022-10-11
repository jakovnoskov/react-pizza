import {Link} from 'react-router-dom'
export default function InfoBox({
  title = 'Корзина пустая',
  description = 'Вероятней всего, вы не заказывали ещё пиццу.<br />Для того, чтобы заказать пиццу, перейди на главную страницу.',
  buttonTitle = 'Вернуться назад',
  icon='😕',
  img='/img/empty-cart.png',
  alt='Empty cart'
}) {
return (
  <div className="content">
    <div className="container container--cart">
    <div className="cart cart--empty">
    <h2>{title}<icon>{icon}</icon></h2>
    <p>{description}</p>
    <img src={img} alt={alt} />
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