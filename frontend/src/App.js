import logo from './logo.svg';
import './App.css';
import PizzaOrderRouteTable from "./components/PizzaOrderRouteTable";
import {Container} from "react-bootstrap";

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
