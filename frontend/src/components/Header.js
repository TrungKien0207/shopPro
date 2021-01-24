import React from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

Header.propTypes = {}

function Header(props) {
  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='text-uppercase font-weight-bold'>
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Form inline className='ml-auto'>
              <FormControl
                type='text'
                placeholder='Search'
                className='mr-sm-2'
              />
              <Button variant='outline-success'>Search</Button>
            </Form>
            <Nav className='ml-auto' inline>
              <LinkContainer to='/cart'>
                <Nav.Link className='text-uppercase'>
                  <i className='fas fa-shopping-cart pr-1'></i>Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link className='text-uppercase'>
                  <i className='fas fa-user pr-1'></i>Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
