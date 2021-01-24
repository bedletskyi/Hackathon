import React from 'react';
import { Provider } from 'react-redux';
import ExampleComponent from './ExampleComponent/ExampleComponent';
import FilterComponent from './Filter/Filter';
import Cards from './ProductCard/Cards';
import store from './root/store';

const cardsData=[{
  name:'mem',
  image:'https://i2.rozetka.ua/goods/20812039/asus_90mp0210_bpua00_images_20812039341.png',
  brand:'Asus',
  weight:100,
  price:50,
  site:'https://rozetka.com.ua/'
},{
  name:'mem',
  image:'https://i8.rozetka.ua/goods/20652778/asus_90mp01m0_bpua00_images_20652778701.png',
  brand:'Asus',
  weight:100,
  price:50,
  site:'https://rozetka.com.ua/'
}]
export default class App extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <ExampleComponent />
        <FilterComponent />
        <Cards cardsData={cardsData}/>
      </Provider>
    );
  }
}