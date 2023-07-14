import Image from "next/image"
import { HomeContainer, Product } from "../styles/pages/home"

import { useKeenSlider } from "keen-slider/react"

// import camiseta1 from '../assets/camisetas/1.png'
// import camiseta2 from '../assets/camisetas/2.png'
// import camiseta3 from '../assets/camisetas/3.png'

import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe"
import { GetServerSideProps } from "next"
import Stripe from "stripe"

interface HomeProps {
  products: {
    id: string;
    name: string;
    imgUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {
        products.map(product => {
          return (
            <Product key={product.id} className="keen-slider__slide">
              <Image src={
                product.imgUrl ? 
                product.imgUrl : 
                "https://files.stripe.com/links/MDB8YWNjdF8xTlRXQW9FUGFuenFpZ09CfGZsX3Rlc3RfTHlua2NoRFBCS1pia1htV1VqeFhhUmpy00ezPtbnQL"
              } alt="" width={520} height={480} />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          )
        })
      }
      
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;
    const img = product.images[0];

    return {
      id: product.id,
      name: product.name,
      imageUrl: img,
      price: price.unit_amount ? price.unit_amount / 100 : undefined,
    }
  })

  return {
    props: {
      products,
    }
  }
}