import { useContext } from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// Components
import SwitchTheme from "./SwitchTheme";

// Contexts
import { TodoContext } from "../context/TodoContext";

export default function TopBar() {
  const { addRemoveTodo, addChecked } = useContext(TodoContext);

  const wipeLists = () => {
    addRemoveTodo({ type: "WIPE_LIST", payload: null });
    addChecked({ type: "WIPE_LIST", payload: null });
  };

  return (
    <Navbar bg="primary" variant="dark" expand="sm">
      <Container fluid>
        <Navbar.Brand href="#">MyDo List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link onClick={wipeLists} className="nav-text" bsPrefix="" href="#">
            New List
          </Nav.Link>
          {/* <Nav.Link className="nav-text" href="#">Settings</Nav.Link> */}
        </Navbar.Collapse>
        <SwitchTheme />
      </Container>
    </Navbar>
  );
}