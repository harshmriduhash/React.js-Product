import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import ProductList  from './productList/ProductList';
import ProductDetails from './productDetail/ProductDetail';
import ProductEdit from './productEdit/ProductEdit';

class App extends Component {
  constructor(props) {
    super(props);
  }

  

  render() {
      return (
        
          <Router>
            <div className="container">
              <Route exact path="/" component={ProductList} />
              <Route path="/details/:id" component={ProductDetails} />
              <Route path="/edit/:id" component={ProductEdit} />
            </div>
          </Router>
        
      );
  }
}

export default App;
