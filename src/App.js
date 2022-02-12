import { connect } from 'react-redux';
import { BrowserRouter, useParams, Link } from 'react-router-dom'



import Header from './components/inc/Header';
import Menu from './components/inc/Menu';

import { contextProvider } from './UserContext/index';

import Routes from './Routes';

const App = (props) => {
  return (
    <div className="App">
        <BrowserRouter>
            <Header />
            <div id="container" className="row-fluid">
                <Menu />
                <Routes/>
            </div>
        </BrowserRouter>   
    </div>
  );
}

//export default App;
const mapStateToProps = (state) => {
  return {
     user:state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);