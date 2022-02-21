import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// Components
import TodoList from '../components/TodoList';

function HomePage() {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="sm">
        <Container fluid>
          <Navbar.Brand href="#">MyDo List</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link className="nav-text" bsPrefix="" href="#">
              New List
            </Nav.Link>
            {/* <Nav.Link className="nav-text" href="#">Settings</Nav.Link> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="content">
        <TodoList />
      </div>
    </>
  );
}

export default HomePage;
