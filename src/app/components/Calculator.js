import React, { Component } from 'react';
import { object } from 'prop-types';
import Helmet from 'react-helmet';
import { calculate as calculateResult } from 'app/flux/actions/calculator';
import { connect } from 'react-redux';
import Spinner from 'app/components/icons/Spinner';
import { calculate } from '../flux/actions/calculator';
import calculator from '../flux/reducers/calculator';

const LABEL = {
  clear_entry: 'CE',
  clear: 'C',
  delete: 'DEL',
  plus_minus: '+/-',
  dot: '.'
}

const BUTTON_TYPES = {
  number: 'number',
  operand: 'operand',
  function: 'function'
}

const CAL_STRUCTURE = {
  row_0: [
    {
      label: LABEL.clear_entry,
      type: BUTTON_TYPES.function
    },
    {
      label: LABEL.clear,
      type: BUTTON_TYPES.function
    },
    {
      label: LABEL.delete,
      type: BUTTON_TYPES.function
    },
    {
      label: '/',
      type: BUTTON_TYPES.operand
    }
  ],
  row_1: [
    {
      label: '7',
      type: BUTTON_TYPES.number
    },
    {
      label: '8',
      type: BUTTON_TYPES.number
    },
    {
      label: '9',
      type: BUTTON_TYPES.number
    },
    {
      label: 'X',
      type: BUTTON_TYPES.operand
    }
  ],
  row_2: [
    {
      label: '4',
      type: BUTTON_TYPES.number
    },
    {
      label: '5',
      type: BUTTON_TYPES.number
    },
    {
      label: '6',
      type: BUTTON_TYPES.number
    },
    {
      label: '-',
      type: BUTTON_TYPES.operand
    }
  ],
  row_3: [
    {
      label: '1',
      type: BUTTON_TYPES.number
    },
    {
      label: '2',
      type: BUTTON_TYPES.number
    },
    {
      label: '3',
      type: BUTTON_TYPES.number
    },
    {
      label: '+',
      type: BUTTON_TYPES.operand
    }
  ],
  row_4: [
    {
      label: LABEL.plus_minus,
      type: BUTTON_TYPES.function
    },
    {
      label: '0',
      type: BUTTON_TYPES.number
    },
    {
      label: LABEL.dot,
      type: BUTTON_TYPES.function
    },
    {
      label: '=',
      type: BUTTON_TYPES.operand
    }
  ]
}

class Calculator extends Component {
  static displayName = 'Calculator';

  constructor(props) {
    super(props);

    this.state = {
      inputField: this.props.result,
      displayField: '',
      matrix: []
    }
  }

  onInputChange(value) {
    this.setState({ inputField: value });
  }

  handleNumberChange(value) {
    const { 
      inputField: currentInputValue,
      isOperandClicked,
      storedValue,
      displayField: currentDisplayValue
    } = this.state;

    let newValue = currentInputValue + value;

    if (currentInputValue === '0') {
      if (value === '0') {
        return;
      }
      newValue = value;
    }

    if (isOperandClicked) {
      if (value === currentInputValue) {
        this.setState({ isOperandClicked: false });
        return;
      }
      newValue = value;
    }

    if (currentDisplayValue === '' && storedValue) {
      newValue = value;
    }

    this.setState({ inputField: newValue, isOperandClicked: false });
  }

  handleEqualEvent() {
    const {
      inputField: currentInputValue,
      displayField: currentDisplayValue,
      matrix: currentMatrix = [],
      storedValue = '0'
    } = this.state;

    const { calculateResult } = this.props;

    let newMatrix = currentMatrix.slice(0); // clone array

    if (currentDisplayValue === '') {
      if (currentMatrix.length === 0) {
        return;
      }

      calculateResult(currentInputValue, storedValue, currentMatrix[1]);
      this.setState({ displayField: '' });
      return;
    }

    calculateResult(currentMatrix[0], currentInputValue, currentMatrix[1]);
    this.setState({ displayField: '', storedValue: currentInputValue });
  }

  handleOperandChange(value) {
    if (value === '=') {
      this.handleEqualEvent();
      return;
    }

    const {
      inputField: currentInputValue,
      displayField: currentDisplayValue,
      matrix: currentMatrix,
      isOperandClicked,
      storedValue
    } = this.state;

    const { calculateResult } = this.props;

    let newDisplayValue = currentDisplayValue;
    let newMatrix = currentMatrix.slice(0); // clone array

    if (currentDisplayValue === '') {
      newDisplayValue = currentInputValue + ' ' + value;
      newMatrix = [currentInputValue, value];
      
    } else {
      if (isOperandClicked) {
        newDisplayValue = currentDisplayValue.slice(0, -1) + value;
        newMatrix[1] = value;
      } else {
        
        newDisplayValue += ' ' + currentInputValue + ' ' + value;
        calculateResult(currentMatrix[0], currentInputValue, currentMatrix[1]);
      }
    }

    this.setState({ displayField: newDisplayValue, matrix: newMatrix, isOperandClicked: true });
  }

  handleFunctionChange(value) {
    const currentInputValue = this.state.inputField;
    let newValue = currentInputValue;

    switch(value) {
      case LABEL.clear_entry: // clear entry
        this.setState({ inputField: '0' });
        break;

      case LABEL.clear: // clear all
        this.setState({ inputField: '0', displayField: '', matrix: [], isOperandClicked: false, storedValue: '' });
        break;

      case LABEL.delete: // delete last number of input field
        newValue = newValue.slice(0, -1);
        this.setState({ inputField: newValue || '0' });
        break;

      case LABEL.plus_minus:
        newValue = newValue.indexOf('-') === -1 ? ('-' + newValue) : newValue.substr(1);
        this.setState({ inputField: newValue });
        break;

      case LABEL.dot:
        newValue = newValue.indexOf('.') === -1 ? newValue + '.' : newValue;
        this.setState({ inputField: newValue });
        break;

      default:
        break;
    }
  }

  onButtonChange(value, type) {

    const object = {
      [BUTTON_TYPES.number]: () => {
        this.handleNumberChange(value);
      },
      [BUTTON_TYPES.operand]: () => {
        this.handleOperandChange(value);
      },
      [BUTTON_TYPES.function]: () => {
        this.handleFunctionChange(value);
      }
    }

    object[type]();
  }

  renderRows(rowKey, i) {

    return (
      <div className="rows" key={i}>
        {
          CAL_STRUCTURE[rowKey].map( (item, index) => {
            
            return (
              <button
                value={item.label}
                className={`btn-style ${item.type}-bg`}
                key={index}
                onClick={() => this.onButtonChange(item.label, item.type)}>
                {item.label }
              </button>
            )
          })
        }
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    const {
      result,
      isWaiting
    } = nextProps;

    if (!isWaiting) {
      const { matrix: currentMatrix } = this.state;
      const newMatrix = currentMatrix.slice(0);
      newMatrix[0] = result;
      this.setState({ matrix: newMatrix, inputField: result });
    }
  }

  render() {
    const title = 'Calculator';
    const { inputField, displayField } = this.state;
    const { isWaiting } = this.props;

    return (
      <div className="Calculator">
        <Helmet title={title} />

        {isWaiting && <Spinner />}

        <div id="background">

          <div className="calculator-field">
            <input type="text" value={displayField} readOnly onChange={(e) => this.onInputChange(e.target.value)}/>
          </div>

          <div className="calculator-field result-field">
            <input type="text" value={inputField} readOnly onChange={(e) => this.onInputChange(e.target.value)}/>
          </div>

          <div id="main">
            {
              Object.keys(CAL_STRUCTURE).map( (key, index) => {
                return this.renderRows(key, index)
              })
            }
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ calculator = {} }) => {
  const { result, isWaiting } = calculator;

  return {
    result,
    isWaiting
  };
};

export default connect(mapStateToProps, { calculateResult })(Calculator);

