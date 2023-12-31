import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, fetchAddGastos } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { moedasFetch } = this.props;
    moedasFetch();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { value, description, currency, method, tag } = this.state;
    const { totalExpense, id } = this.props;
    const itens = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    totalExpense(itens);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { description, value, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <input
          type="number"
          data-testid="value-input"
          value={ value }
          name="value"
          placeholder="Valor"
          onChange={ (e) => this.handleChange(e) }
        />

        <input
          type="text"
          data-testid="description-input"
          value={ description }
          name="description"
          autoComplete="off"
          onChange={ (e) => this.handleChange(e) }
        />

        <select
          data-testid="currency-input"
          value={ currency }
          name="currency"
          onChange={ (e) => this.handleChange(e) }
        >
          {
            currencies.map((moeda, i) => <option key={ i }>{moeda}</option>)
          }
        </select>

        <select
          data-testid="method-input"
          value={ method }
          name="method"
          onChange={ (e) => this.handleChange(e) }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          value={ tag }
          name="tag"
          onChange={ (e) => this.handleChange(e) }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesas
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  id: wallet.expenses?.length || 0,
});

const mapDispatchToProps = (dispatch) => ({
  moedasFetch: () => dispatch(fetchApi()),
  totalExpense: (gastos) => dispatch(fetchAddGastos(gastos)),
});

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array),
  moedasFetch: PropTypes.func,
  totalExpense: PropTypes.func,
  id: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
