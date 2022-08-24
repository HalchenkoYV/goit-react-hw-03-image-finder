import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Container from './Container/Cotainer';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";



class App extends Component  {
  state = {
    searchTarget: '',
  };
  
handleFormSubmit = searchTarget => {
    this.setState({ searchTarget })
  };

 

  render() {
    const { searchTarget } = this.state;

    return (
      <Container>
        
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchTarget={searchTarget} />
        
      </Container>

    )
  }
};

export default App;