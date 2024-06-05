import './App.css';
import PizzaOrderRouteTable from "./components/PizzaOrderRouteTable";
import {Container} from "react-bootstrap";

/**
 * Main component representing the entire application.
 * @returns {JSX.Element} - Rendered App component.
 */
function App() {
  return (
    <div className="App">
          <Container className="fluid text-center">
              <PizzaOrderRouteTable/>
          </Container>
    </div>
  );
}

export default App;
