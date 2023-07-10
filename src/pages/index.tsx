import { styled } from "../styles"

export const Button = styled('button', {
  backgroundColor: '$rocketseat',
  borderRadius: 4,
  border: 0,
  padding: '4px 8px',
  transition: 'filter 0.1s',

  '&:hover': {
    filter: 'brightness(0.8)',
    transition: 'filter 0.2s',
  }
})

export default function Home() {
  return (
    <Button>Enviar!</Button>
  )
}
