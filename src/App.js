import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [expression, setExpression] = useState("0");
  const [currentVal, setCurrentVal] = useState("0");
  const [theme, setTheme] = useState(1);

  useEffect(() => {
  });

  const display = (symbol) => {
      setExpression(prev => prev + symbol);
  }

  const calculate = () => {
    console.log("check", (/[^0-9]$/).test(expression));
    if((/[^0-9]$/).test(expression)) {
      setExpression(expression.slice(0, -1));
    } else {
        console.log(expression);
        let res = (new Function('return '+ expression)());
        if(res) {}
        else {
          res = "0";
        }
        setExpression(res.toString());
        setCurrentVal('');
      }
    }

  const clear = () => {
    setExpression('0');
    setCurrentVal('0');
  }

  const deleteBack = () => {
    if((/[0-9]$/).test(expression)) {
      setCurrentVal(currentVal.slice(0, -1));
      if(currentVal.length === 0) {
        setCurrentVal('0');
      }
    }
    setExpression(expression.slice(0, -1));
    if(expression.length === 0) {
      setExpression('0');
    }
  }

  const handleOperators = (operator) => {
    setCurrentVal('0');
    // let copy;
    // if((/[^0-9]$/).test(expression) && operator !== '-') {
    //   setExpression(expression.slice(0, -1));
    //   copy = expression;
    // }
    // console.log("sau khi xoa", copy);
    // if((/[^0-9]$/).test(expression) && operator !== '-') {
    //   console.log('Expression: ' + expression)
    //     setExpression(expression.slice(0, -1));
    // }
    let count = 0, index = expression.length-1;
    let ischanged = false;
    if(operator !== '-') {
      while ((/[^0-9]/).test(expression[index]) && index >=0) {
        // eslint-disable-next-line no-unused-vars
        ischanged = true;
        count++;
        index--;
      }
    }
    if(ischanged) {
      setExpression(expression.slice(0, -count));

    }
    console.log(expression);
    display(operator);
  }

  const handleNumbers = (number) => {
    if(currentVal.length >= 21) {
      alert('Digit Limit Met!');
    } else {
      if(expression === '0') {
        deleteBack();
      }
      display(number);
    }
    setCurrentVal(prev => prev + number);
  }

  const handleDecimal = () => {
    if(currentVal.length >= 21) {
      alert('Decimal Limit Met!');
    } else if(currentVal.includes('.')) {}
    else {
      display('.');
      setCurrentVal(prev => prev + '.');
    }
  }

  const screenClass = () => {
    switch(theme) {
      case '1':
        return "App-screen";
      case '2':
        return "App-screen scr-color-2";
      case '3':
        return "App-screen scr-color-3";
      default:
        return "App-screen";
    }
  }

  return (
    <div className={`container ${theme==='2'?"bk-color-2":theme==='3'?"bk-color-3":""}`}>
      <div className="App">
        <nav className="nav">
          <h1 className={`${theme==='2'?"text-color-2":theme==='3'?"text-color-3":""}`} id="title">calc</h1>
          <div className="theme">
              <p className={`${theme==='2'?"text-color-2":theme==='3'?"text-color-3":""}`}>THEME</p>
              <div className="theme-range">
                <ul className={`${theme==='2'?"text-color-2":theme==='3'?"text-color-3":""}`}>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
                <input 
                    className={`${theme==='2'?"scr-color-2":theme==='3'?"scr-color-3":""}`}
                    type="range" 
                    id="range" 
                    max="3" 
                    min="1" 
                    step="1" 
                    value={theme} 
                    onChange={(e) => setTheme(e.target.value)} 
                />
              </div>
          </div>
        </nav>
        <header className="App-header">
          <div className={screenClass()}>
            <div className={`total ${theme==='2'?"text-color-2":theme==='3'?"text-color-3":""}`} id="display">{expression}</div>
          </div>
          <div className={`grid ${theme==='2'?"contain-color-2":theme==='3'?"contain-color-3":""}`}>
            <div onClick={() => handleNumbers("7")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="seven">7</div>
            <div onClick={() => handleNumbers("8")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="eight">8</div>
            <div onClick={() => handleNumbers("9")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="nine">9</div>
            <div onClick={() => deleteBack()} className={`padButton control ${theme==='2'?"ctrl-color-2":theme==='3'?"ctrl-color-3":""}`} id="delete">DEL</div>

            <div onClick={() => handleNumbers("4")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="four">4</div>
            <div onClick={() => handleNumbers("5")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="five">5</div>
            <div onClick={() => handleNumbers("6")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="six">6</div>
            <div onClick={() => handleOperators("+")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="add">+</div>

            <div onClick={() => handleNumbers("1")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="one">1</div>
            <div onClick={() => handleNumbers("2")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="two">2</div>
            <div onClick={() => handleNumbers("3")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="three">3</div>
            <div onClick={() => handleOperators("-")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="subtract">-</div>

            <div onClick={() => handleDecimal()} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="decimal">.</div>
            <div onClick={() => handleNumbers("0")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="zero">0</div>
            <div onClick={() => handleOperators("*")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="multiply">x</div>
            <div onClick={() => handleOperators("/")} className={`padButton maths ${theme==='2'?"text-color-2 btn-color-2":theme==='3'?"text-color-3 btn-color-3":""}`} id="divide">/</div>

            <div onClick={() => clear()} className={`padButton control ${theme==='2'?"ctrl-color-2":theme==='3'?"ctrl-color-3":""}`} id="clear">RESET</div>
            <div onClick={calculate} className={`padButton result ${theme==='2'?"res-color-2":theme==='3'?"res-color-3":""}`} id="equals">=</div>
          </div>
        </header>
      </div>

    </div>
  );
}

export default App;
