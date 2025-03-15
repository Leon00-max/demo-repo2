class Calculator {
    constructor() {
      this.display = document.querySelector('.output');
      this.currentValue = '0';
      this.previousValue = null;
      this.operation = null;
      this.shouldResetDisplay = false;
      
      this.bindEvents();
    }
  
    bindEvents() {
      document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => this.appendNumber(button.textContent));
      });
  
      document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => this.handleOperator(button.textContent));
      });
  
      document.querySelector('.clear').addEventListener('click', () => this.clear());
      document.querySelector('.equals').addEventListener('click', () => this.calculate());
      document.querySelector('.decimal').addEventListener('click', () => this.appendDecimal());
    }
  
    appendNumber(number) {
      if (this.shouldResetDisplay) {
        this.currentValue = number;
        this.shouldResetDisplay = false;
      } else {
        this.currentValue = this.currentValue === '0' ? number : this.currentValue + number;
      }
      this.updateDisplay();
    }
  
    appendDecimal() {
      if (!this.currentValue.includes('.')) {
        this.currentValue += '.';
        this.updateDisplay();
      }
    }
  
    handleOperator(operator) {
      if (this.operation !== null) {
        this.calculate();
      }
      this.previousValue = this.currentValue;
      this.operation = operator;
      this.shouldResetDisplay = true;
    }
  
    calculate() {
      if (this.operation === null || this.previousValue === null) return;
      
      let result;
      const prev = parseFloat(this.previousValue);
      const current = parseFloat(this.currentValue);
  
      switch (this.operation) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '×':
          result = prev * current;
          break;
        case '÷':
          if (current === 0) {
            this.display.textContent = 'Error';
            return;
          }
          result = prev / current;
          break;
        case '%':
          result = prev % current;
          break;
        default:
          return;
      }
  
      this.currentValue = result.toString();
      this.operation = null;
      this.previousValue = null;
      this.updateDisplay();
      this.shouldResetDisplay = true;
    }
  
    clear() {
      this.currentValue = '0';
      this.previousValue = null;
      this.operation = null;
      this.shouldResetDisplay = false;
      this.updateDisplay();
    }
  
    updateDisplay() {
      this.display.textContent = this.currentValue;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
  });
  