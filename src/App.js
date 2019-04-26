import React, { Component } from 'react';
import image from './assets/cryptomonedas.png'
import Form from './components/Form';
import axios from 'axios';
import Result from './components/Result';
import Spinner from './components/Spinner';




class App extends Component {

  state = {
    result: {},
    coinSelected: '',
    cryptoSelected: '',
    loading: false
  }


  getSelected = async (sendCoins) => {

    //valores)
    const { currency, cryptocoin } = sendCoins;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocoin}&tsyms=${currency}`



    //axios

    await axios.get(url)
      .then(response => {

        this.setState({
          result: response.data.DISPLAY[cryptocoin][currency],
          loading: true
        }, () => {
          setTimeout(() => {
            this.setState({
              loading: false
            })
          }, 3000)
        })
      });




  }


  render() {


    const result = (this.state.loading)
      ? <Spinner />
      : <Result
        result={this.state.result} />;

    return (
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <img src={image} alt="imagen" className="logotipo" />
          </div>
          <div className="one-half column">
            <h1>Cotiza Criptomonedas al Instante</h1>
            <Form
              getSelected={this.getSelected} />
            {result}
          </div>
        </div>
      </div>
    );

  }
}

export default App;
