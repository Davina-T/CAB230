import React from "react"

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap"

const Cards = () => {
  const cardsData = [
    {
      title: "Stocks",
      subtitle: "See available companies",
      img: { src: "../img/stocks_img.png", alt: "Stocks image" },
      link: "/stocks",
    },
    {
      title: "Quote",
      subtitle: "Get latest price information",
      img: { src: "../img/quote_image.png", alt: "Quote image" },
      link: "/quote",
    },
    {
      title: "Price History",
      subtitle: "Sample most recent information",
      img: {
        src: "../img/price_history_img.png",
        alt: "Price History image",
      },
      link: "/price_history",
    },
  ]

  return (
    <Container className="cards__wrapper">
      <Row>
        {cardsData.map((card) => (
          <Col xs="12" sm="4">
            <CardOption card={card} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

const CardOption = ({ card }) => (
  <Card>
    <div text-center>
      <CardImg top src={card.img.src} alt={card.img.alt} />
    </div>
    <CardBody>
      <CardTitle>{card.title}</CardTitle>
      <CardSubtitle>{card.subtitle}</CardSubtitle>
      <Button href={card.link}>Continue</Button>
    </CardBody>
  </Card>
)

export default Cards
