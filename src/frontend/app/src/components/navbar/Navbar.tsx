import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BsNavbar from 'react-bootstrap/Navbar';
import styles from './Navbar.module.scss';


const Navbar: React.FC = () => {


  return (
    <BsNavbar sticky="top" bg="white" className="border-bottom" expand="lg">
      <Container fluid className="mx-md-3">
        <BsNavbar.Brand>
          <Link className={styles["link"]} to="/"><strong>Finances</strong></Link>
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="navbarDropdown" />
        <BsNavbar.Collapse id="navbarDropdown">
          <Nav>
            <Nav.Link>
              <Link className={styles["link"]} to="/accounts">Accounts</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className={styles["link"]} to="/paychecks">Paychecks</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className={styles["link"]} to="/transactions">Transactions</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className={styles["link"]} to="/categories">Categories</Link>
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>

      </Container>
    </BsNavbar>
  );
};

export default Navbar;
