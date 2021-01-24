import React from 'react';
import { Provider } from 'react-redux';
import ExampleComponent from './ExampleComponent/ExampleComponent';
import FilterComponent from './Filter/Filter';
import store from './root/store';

export default class App extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <ExampleComponent />
        <FilterComponent />
      </Provider>
    );
  }
}