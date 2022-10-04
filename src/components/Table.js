import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removExpense } from '../redux/actions';

class Table extends Component {
  valueCalc = (ask) => {
    const resultado = Number(ask);
    return Number(resultado).toFixed(2);
  };

  valueCalc2 = (value, ask) => {
    const resultado = Number(ask) * Number(value);
    return Number(resultado).toFixed(2);
  };

  handleClick = (id) => {
    const { expenses, dispatch } = this.props;
    const removeItem = expenses.filter((expense) => (
      expense.id !== id
    ));
    dispatch(removExpense(removeItem));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>

        <tbody>
          {
            expenses.map((e) => (
              <tr key={ e.id }>
                <td>{e.description}</td>
                <td>{e.tag}</td>
                <td>{e.method}</td>
                <td>{Number(e.value).toFixed(2)}</td>
                <td>{e.exchangeRates[e.currency].name}</td>
                <td>{this.valueCalc(e.exchangeRates[e.currency].ask)}</td>
                <td>{this.valueCalc2(e.value, e.exchangeRates[e.currency].ask)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => this.handleClick(e.id) }
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array),
}.isRequired;

export default connect(mapStateToProps)(Table);
