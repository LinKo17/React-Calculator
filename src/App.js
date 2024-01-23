import Digits from "./Digits";
import Character from "./Character";
import "./app.css"
import { useReducer } from "react";

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  DELETE_DIGIT: "delete_digit",
  CHOOSE_OPERATOR: "choose_operation",
  CLEAR: "clear",
  EVALUATE: "evaluate"
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:

      if (state.overwrite) {

        if (payload.digit == ".") {
          return {
            ...state,
            currentValue: "0.",
            overwrite: false
          }
        }

        // if (state.currentValue.length  > 12) {
        //   console.log("-OIO-")
        // }

        if (payload.digit == 0) {
          return {
            ...state,
            currentValue: "0",
            overwrite: false,
            zeroCheck: true,
          }
        }

        return {
          ...state,
          currentValue: payload.digit,
          overwrite: false
        }
      }

      if (state.zeroCheck) {
        return {
          ...state,
          currentValue: payload.digit,
          zeroCheck: false
        }
      }


      if ((state.currentValue == null ? 0 : state.currentValue.length) >= 16) {
        return {
          ...state
        }
      }

      if (payload.digit == "." && (state.currentValue == undefined)) return {
        ...state,
        currentValue: "0."
      }


      if (payload.digit == 0 && state.currentValue == 0) return state

      if (payload.digit == 0 && state.currentValue == undefined) return state

      if (payload.digit == "." && (state.currentValue == null ? "" : state.currentValue.includes(".")))
        return {
          ...state,
        }




      return {
        ...state,
        currentValue: `${(
          (state.currentValue === undefined)
            ? ''
            : (state.currentValue === null)
              ? ''
              : state.currentValue
        )}${payload.digit}`
      };

    case ACTIONS.CHOOSE_OPERATOR:
      if (state.previousValue == null && state.currentValue == null) return state


      if (state.currentValue == null) {
        return {
          ...state,
          operator: payload.character
        }
      }






      if (state.previousValue == null) {
        return {
          ...state,
          operator: payload.character,
          previousValue: state.currentValue,
          currentValue: null
        }
      }


      return {
        ...state,
        previousValue: previousResult(state),
        operator: payload.character,
        currentValue: null,
      }

    case ACTIONS.EVALUATE:
      if (state.operator == null || state.previousValue == null || state.currentValue == null) {
        return {
          ...state
        }
      }

      return {
        ...state,
        overwrite: true,
        previousValue: null,
        operator: null,
        currentValue: previousResult(state),
      }

    case ACTIONS.CLEAR:
      return payload;

    case ACTIONS.DELETE_DIGIT:

      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentValue: null
        }
      }

      if (state.currentValue == null) return state

      if (state.currentValue.length == 1) {
        return {
          ...state,
          currentValue: null
        }
      }

      if (state.currentValue == "0.") {
        return {
          ...state,
          currentValue: null
        }
      }
      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1)
      }
  }
}

function previousResult({ currentValue, previousValue, operator }) {
  const prev = parseFloat(previousValue)
  const current = parseFloat(currentValue)

  if (isNaN(prev) || isNaN(current)) return
  let result = ""

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current
      break
  }
  return result.toString()

}


function formatInteger(value) {
  if (value === undefined || value === null) {
    return "";
  }

  const parts = value.toString().split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.length === 1 ? integerPart : `${integerPart}.${parts[1]}`;
}

function App() {
  const [{ currentValue, previousValue, operator }, dispatch] = useReducer(reducer, {})

  return (
    <div className="grid-container">

      <div className="output">
        <div className="previous-value">{previousValue} {operator}</div>
        <div className="current-value">{formatInteger(currentValue)}</div>
      </div>

      <button className="span-2" onClick={() => {
        dispatch({ type: ACTIONS.CLEAR, payload: {} })
      }}>C</button>

      <button onClick={() => {
        dispatch({ type: ACTIONS.DELETE_DIGIT })
      }}>DEL</button>

      <Character character="/" dispatch={dispatch} />

      <Digits digit="1" dispatch={dispatch} />
      <Digits digit="2" dispatch={dispatch} />
      <Digits digit="3" dispatch={dispatch} />
      <Character character="*" dispatch={dispatch} />

      <Digits digit="4" dispatch={dispatch} />
      <Digits digit="5" dispatch={dispatch} />
      <Digits digit="6" dispatch={dispatch} />
      <Character character="+" dispatch={dispatch} />

      <Digits digit="7" dispatch={dispatch} />
      <Digits digit="8" dispatch={dispatch} />
      <Digits digit="9" dispatch={dispatch} />
      <Character character="-" dispatch={dispatch} />

      <Digits digit="." dispatch={dispatch} />
      <Digits digit="0" dispatch={dispatch} />
      <button className="span-2" onClick={() => {
        dispatch({ type: ACTIONS.EVALUATE })
      }}>=</button>
    </div>
  )
}
export default App;