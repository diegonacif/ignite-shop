import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product";
import Image from "next/image";
import { useRouter } from "next/router"

export default function Product() {
  const { query } = useRouter();
  
  return (
    <ProductContainer>
      <ImageContainer>
        <Image 
          src="https://files.stripe.com/links/MDB8YWNjdF8xTlRXQW9FUGFuenFpZ09CfGZsX3Rlc3RfTHlua2NoRFBCS1pia1htV1VqeFhhUmpy00ezPtbnQL" 
          alt="" 
          width={400}
          height={400}
          // layout="fill"
          // objectFit="contain"
          // style={{ width: '100%', height: 'auto' }} 
        />
      </ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi voluptates nulla obcaecati enim mollitia rem corporis tempora asperiores quo eius nostrum inventore, ipsam aliquid perspiciatis odit nam reprehenderit ex officia?</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}