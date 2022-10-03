import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  somaExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const sum = expenses.reduce((acc, cur) => {
        const nomeMoeda = cur.currency;
        const aksCurrency = cur.exchangeRates[nomeMoeda].ask;
        const value = Number(aksCurrency) * Number(cur.value);
        console.log(expenses);
        return acc + (value);
      }, 0);
      return (sum.toFixed(2));
    }
    return '0.00';
  };

  render() {
    const { email } = this.props;
    const totalExpenses = this.somaExpenses();
    return (
      <section>
        <p data-testid="email-field">{email}</p>
        <p>
          Despesa total:
          <span data-testid="total-field">
            {totalExpenses}
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </p>
      </section>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.instanceOf(Array),
}.isRequired;

export default connect(mapStateToProps)(Header);
