import Showcase from './components/showcase';
import { Route } from 'react-router-dom';
import Login from './components/loginForm';

function App() {
  return (
    // <div className="main">
    <div className="wrapper">
      <Route path="/login" component={Login} />
      <Route path="/" exact={true} component={Showcase} />
      {/* <Showcase /> */}
    </div>
    // </div>
  );
}

export default App;
