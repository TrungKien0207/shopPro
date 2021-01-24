import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

Footer.propTypes = {}

function Footer(props) {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copy right &copy; ProShop</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
