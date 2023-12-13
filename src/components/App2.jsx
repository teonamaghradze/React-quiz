// INSTRUCTIONS / CONSIDERATIONS:

// 2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

// 3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

// 4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

// 5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

// 6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

// 7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state

import { useReducer } from "react";

const initialState2 = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount": {
      return { ...state, balance: action.payload, isActive: action.payload };
    }
    case "deposit": {
      return { ...state, balance: action.payload };
    }

    case "withdraw": {
      if (state.balance > 0) {
        return { ...state, balance: action.payload };
      }
      if (state.balance === 0) {
        return { ...state };
      }
      break;
    }
    case "requestLoan": {
      if (state.loan === 0) {
        return {
          ...state,
          balance: state.balance + action.payload,
          loan: action.payload,
        };
      }
      if (state.loan > 0) {
        return {
          ...state,
        };
      }
      break;
    }

    case "payLoan": {
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      };
    }

    case "closeAccount": {
      if (state.balance === 0 && state.loan === 0)
        return {
          ...initialState2,
          balance: 0,
          loan: 0,
        };

      if (state.balance > 0 || state.loan > 0) {
        return {
          ...state,
        };
      }
      break;
    }

    default:
      throw new Error("Action not found");
  }
}

export function App2() {
  const [state, dispatch] = useReducer(reducer, initialState2);

  return (
    <div>
      <p>Balance: {state.balance}</p>
      <p>Loan: {state.loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount", payload: 500 })}
          disabled={false}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() =>
            dispatch({ type: "deposit", payload: 150 + state.balance })
          }
          disabled={state.isActive ? false : true}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() =>
            dispatch({ type: "withdraw", payload: state.balance - 50 })
          }
          disabled={state.isActive ? false : true}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() =>
            dispatch({
              type: "requestLoan",
              payload: 5000,
            })
          }
          disabled={state.isActive ? false : true}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan", payload: 5000 })}
          disabled={state.isActive ? false : true}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() =>
            dispatch({
              type: "closeAccount",
              payload: state.isActive === false,
            })
          }
          disabled={state.isActive ? false : true}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
