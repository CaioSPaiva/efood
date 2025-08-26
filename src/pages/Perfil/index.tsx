import { useEffect, useState } from 'react'
import FoodList from '../../components/FoodList'
import Footer from '../../components/Footer'
import HeaderPerfil from '../../components/HeaderPerfil'
import { useParams } from 'react-router-dom'
import Cart from '../../components/Cart'
import type { CardapioItem, Restaurants } from '../../pages/Home'

const Perfil = () => {
  const [restaurante, setRestaurante] = useState<Restaurants | null>(null)
  const { id } = useParams()

  useEffect(() => {
    fetch(`https://fake-api-tau.vercel.app/api/efood/${id}`)
      .then((resposta) => resposta.json())
      .then((resposta) => {
        const cardapioCorrigido: CardapioItem[] = resposta.cardapio.map(
          (item: CardapioItem) => ({
            ...item,
            preco: Number(item.preco)
          })
        )
        setRestaurante({
          ...resposta,
          cardapio: cardapioCorrigido
        } as Restaurants)
      })
  }, [id])

  return (
    <>
      {restaurante && <HeaderPerfil tipo={''} titulo={''} capa={''} />}
      <FoodList />
      <Cart />
      <Footer />
    </>
  )
}

export default Perfil
