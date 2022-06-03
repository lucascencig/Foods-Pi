import './App.css';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';
import LandingPage from './components/LandingPage';
import CardDetail from './components/CardDetail';
import Navbar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={RecipeCreate} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/recipes/:id" component={CardDetail} />
    </div>
  );
}

export default App;
