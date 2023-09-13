import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BsNavbar from 'react-bootstrap/Navbar';


const Navbar: React.FC = () => {


  return (
    <BsNavbar sticky="top" bg="white" className="border-bottom" expand="lg">
      <Container fluid className="mx-md-3">
        <BsNavbar.Brand>
          <strong>Finances</strong>
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="navbarDropdown" />
        <BsNavbar.Collapse id="navbarDropdown">
          <Nav>
            <Nav.Link href="#accounts">Accounts</Nav.Link>
            <Nav.Link href="#paychecks">Paychecks</Nav.Link>
            <Nav.Link href="#transactions">Transactions</Nav.Link>
            <Nav.Link href="#categories">Categories</Nav.Link>
          </Nav>
        </BsNavbar.Collapse>

      </Container>
    </BsNavbar>
  );
};

export default Navbar;
