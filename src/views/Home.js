import React from 'react';
import {withRouter} from "react-router-dom";
import api from "../api";
import ConversionResultCard from "../componets/ConversionResultCard";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            amount: '',
            currencyFrom: '',
            currencyTo: '',
            resultStatus: false,
            resultData: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getCurrencies()
    }

    getCurrencies() {
        api.get(`symbols`)
            .then(res => {
                const currencies = []
                Object.entries(res.data.symbols).map(([, value]) => {
                    return currencies.push(value);
                });

                this.setState({currencies});
            })
    }

    convertCurrency() {
        api.get(`convert?from=` + this.state.currencyFrom + `&to=` + this.state.currencyTo + `&amount=` + this.state.amount + `&places=2`)
            .then(res => {
                const resultData = res.data;
                const resultStatus = true;
                this.setState({resultData, resultStatus});
            })
    }

    handleChange(event) {
        if (event.target.name === 'amount') {
            const amountValue = event.target.value;
            const re = /^[0-9\b]+$/;
            if (amountValue === '' || re.test(amountValue)) {
                this.setState({[event.target.name]: event.target.value});
            }
        } else {
            this.setState({[event.target.name]: event.target.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.convertCurrency();
    }

    inputText(label, type, name) {
        return (
            <div className="w-full lg:w-1/3">
                <div className="flex flex-wrap mx-6  py-4">
                    <div className="mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="currency-amount">
                            {label}
                        </label>
                        <div className="inline-block relative">
                            <input
                                className="block appearance-none  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                id="currency-amount" type={type} name={name} onChange={this.handleChange} required/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    currencySelect(label, name) {
        return (
            <div className="w-full md:w-1/2 lg:w-1/2">
                <div className="flex flex-wrap mx-6  py-4">
                    <div className="w-full mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="currency-from">
                            {label}
                        </label>
                        <div className="inline-block relative">
                            <select
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                id="currency-from" name={name} onChange={this.handleChange} required>
                                <option value="" disabled selected>Select Currency</option>
                                {
                                    this.state.currencies.map(currency =>
                                        <option value={currency.code}>
                                            {currency.code} - {currency.description}
                                        </option>)
                                }
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4"
                                     xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    conversionResult() {
        if (this.state.resultStatus) {
            return <ConversionResultCard resultData={this.state.resultData}/>
        }
    }

    render() {
        return (
            <div>
                {this.conversionResult()}
                <form className="w-full" onSubmit={this.handleSubmit}>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/4">
                            {this.inputText('Amount', 'text', 'amount')}
                        </div>
                        <div className="w-full md:w-3/4">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-3/4">
                                    <div className="flex flex-wrap">
                                        {this.currencySelect('From', 'currencyFrom')}
                                        {this.currencySelect('To', 'currencyTo')}
                                    </div>
                                </div>
                                <div className="w-full md:w-1/4">
                                    <div className="flex flex-wrap">
                                        <div className="w-full ml-6 mr-6 flex items-center md:mt-10 ">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:px-12">
                                                Convert
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(Home)