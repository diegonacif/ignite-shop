import { stripe } from "@/src/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  function handleBuyProduct() {
    console.log(product.defaultPriceId)
  }
  
  return (
    <ProductContainer>
      <ImageContainer>
        <Image 
          // src={"https://files.stripe.com/links/MDB8YWNjdF8xTlRXQW9FUGFuenFpZ09CfGZsX3Rlc3RfTHlua2NoRFBCS1pia1htV1VqeFhhUmpy00ezPtbnQL"}
          src={product.imageUrl}
          alt="" 
          width={520}
          height={480}
        />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button onClick={handleBuyProduct}>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_OG2RnVVcX1jzjC'}}
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
  const productId = params ? params.id : 'prod_OG2RnVVcX1jzjC'
  
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })
  
  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(
          price.unit_amount ? price.unit_amount / 100 : 0
        ),
        description: product.description, 
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, // 1 hours
  }
}