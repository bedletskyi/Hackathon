import React from 'react';
import { Provider } from 'react-redux';
import ExampleComponent from './ExampleComponent/ExampleComponent';
import store from './root/store';

export default class App extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <ExampleComponent />
      </Provider>
    );
  }
}