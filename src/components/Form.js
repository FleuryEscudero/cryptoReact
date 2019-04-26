import React, { Component } from 'react';
import axios from 'axios';
import Cryptocoin from './Cryptocoin';
import Error from './Error';

class Form extends Component {

    state = {
        cryptocoins: [],
        currency: '',
        cryptocoin: '',
        error: false

    }


    async componentWillMount() {

        const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;

        await axios.get(url)

            .then(response => {
                this.setState({
                    cryptocoins: response.data.Data
                })
            })

    }


    //Se ejecuta cada que ele usuario elige una opcion del select
    getValue = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })


    }

    sendCoins = e => {
        e.preventDefault();

        const { currency, cryptocoin } = this.state;

        if (currency === '' || cryptocoin === '') {
            this.setState({
                error: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        error: false
                    })
                }, 2000);
            });

            return;
        }

        //Crear objeto

        const coins = {
            currency,
            cryptocoin
        }

        //Enviar datos al app.js
        this.props.getSelected(coins);



    }




    render() {

        const message = (this.state.error) ? <Error message="Ambos campos son Obligatorios" /> : '';

        return (
            <form onSubmit={this.sendCoins}>
                {message}
                <div className="row">
                    <label>Elige tu Moneda</label>
                    <select name="currency" onChange={this.getValue}
                        className="u-full-width">
                        <option value="">Elige tu moneda</option>
                        <option value="MXN">Peso Mexicano</option>
                        <option value="USD">Dolar Estadounidense</option>
                        <option value="GBP">Libras</option>
                        <option value="EUR">Euros</option>
                    </select>
                </div>

                <div className="row">
                    <div>
                        <label>Elige tu Criptomoneda</label>
                        <select className="u-full-width" onChange={this.getValue}
                            name="cryptocoin">
                            <option value="">Elige tu Criptomoneda</option>
                            {Object.keys(this.state.cryptocoins).map(key => (
                                <Cryptocoin
                                    key={key}
                                    cryptocoin={this.state.cryptocoins[key]}
                                />
                            ))}
                        </select>
                    </div>
                </div>
                <input className="button-primary u-full-width" type="submit" value="Cotizar" />
            </form>
        );
    }
}

export default Form;