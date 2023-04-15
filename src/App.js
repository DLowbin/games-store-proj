import Showcase from './components/Showcase';
import { Route } from 'react-router-dom';
import Login from './components/loginForm';
import Footer from './components/footer';

function App() {
  return (
    // <div className="main">
    <div className="wrapper">
      <Route path="/login" component={Login} />
      <Route path="/" exact={true} component={Showcase} />
      <Footer />
      {/* <Showcase /> */}
    </div>
    // </div>
  );
}

export default App;
