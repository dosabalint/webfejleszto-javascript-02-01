// SZÁMOLÁSHOZ SZÜKSÉGES VÁLTOZÓK

const STATUS_FIRSTNUM = 'firstnum',
  STATUS_OPERAND = 'operand',
  STATUS_SECONDNUM = 'secondnum',
  STATUS_DONE = 'done';

let number1 = null,
  number2 = null,
  operand = null,
  status = STATUS_FIRSTNUM; // firstnum || operand || secondnum || done

// ELEMEK ÖSSZEGYŰJTÉSE

// kijelző elemek
let displayNumber1 = document.getElementById('displayNumber1');
let displayNumber2 = document.getElementById('displayNumber2');
let displayOperand = document.getElementById('displayOperand');

// operandus gombok
let buttonAdd = document.getElementById('buttonAdd');
let buttonMinus = document.getElementById('buttonMinus');
let buttonTimes = document.getElementById('buttonTimes');
let buttonDivide = document.getElementById('buttonDivide');
let buttonEquals = document.getElementById('buttonEquals');

// szám gombok
let button0 = document.getElementById('button0');
let button1 = document.getElementById('button1');
let button2 = document.getElementById('button2');
let button3 = document.getElementById('button3');
let button4 = document.getElementById('button4');
let button5 = document.getElementById('button5');
let button6 = document.getElementById('button6');
let button7 = document.getElementById('button7');
let button8 = document.getElementById('button8');
let button9 = document.getElementById('button9');

// ESEMÉNYEKRE FELIRATKOZÁS

// operandus click

buttonAdd.addEventListener('click', OnOperandClick);
buttonMinus.addEventListener('click', OnOperandClick);
buttonTimes.addEventListener('click', OnOperandClick);
buttonDivide.addEventListener('click', OnOperandClick);
buttonEquals.addEventListener('click', OnOperandClick);

// szám click

button0.addEventListener('click', OnNumberClick);
button1.addEventListener('click', OnNumberClick);
button2.addEventListener('click', OnNumberClick);
button3.addEventListener('click', OnNumberClick);
button4.addEventListener('click', OnNumberClick);
button5.addEventListener('click', OnNumberClick);
button6.addEventListener('click', OnNumberClick);
button7.addEventListener('click', OnNumberClick);
button8.addEventListener('click', OnNumberClick);
button9.addEventListener('click', OnNumberClick);

// ESEMÉNYKEZELŐK

function OnOperandClick() {
  // adatok begyűjtése
  let currentElement = this;
  let currentOperand = currentElement.innerText;

  // logika
  switch (status) {
    case STATUS_DONE:
      // egy számra nem engedünk egyenlőséget
      if (currentOperand == '=') {
        break;
      }
      status = STATUS_FIRSTNUM;

    case STATUS_FIRSTNUM:
      // egy számra nem engedünk egyenlőséget
      if (currentOperand == '=') {
        break;
      }

      // operandus beállítás
      SetOperand(currentOperand);

      // státusz billentés
      status = STATUS_OPERAND;
      break;

    case STATUS_OPERAND:
      // egy számra nem engedünk egyenlőséget
      if (currentOperand == '=') {
        break;
      }

      // operandus mentése
      SetOperand(currentOperand);
      break;

    case STATUS_SECONDNUM:
      // eddigiek kiszámítása
      let answer = Math.round(eval(number1 + operand + number2) * 1000) / 1000;

      // válaszérték beszúrása első helyre
      SetNumber1(answer);

      // második szám ürítése
      SetNumber2(null);

      if (currentOperand == '=') {
        // státusz billentés
        status = STATUS_DONE;

        // operandus ürítése
        SetOperand(null);
      } else {
        // operandus mentése
        SetOperand(currentOperand);

        // státusz billentés
        status = STATUS_OPERAND;
      }
      break;
  }
  console.log('status: ', status);
}

function OnNumberClick() {
  // adatok begyűjtése
  let currentElement = this;
  let currentNumber = +currentElement.innerText;

  // logika
  switch (status) {
    case STATUS_DONE:
      // új szám beírása
      SetNumber1(currentNumber);
      status = STATUS_FIRSTNUM;
      break;

    case STATUS_FIRSTNUM:
      // első számhoz fűzés
      SetNumber1(number1 * 10 + currentNumber);
      break;

    case STATUS_OPERAND:
      status = STATUS_SECONDNUM;

    case STATUS_SECONDNUM:
      // második számhoz fűzés
      SetNumber2(number2 * 10 + currentNumber);
      break;
  }
  console.log('status: ', status);
}

// ÉRTÉKADÓ FÜGGVÉNYEK

// number1

function SetNumber1(value) {
  number1 = value;
  displayNumber1.innerText = value;
}

// number2

function SetNumber2(value) {
  number2 = value;
  displayNumber2.innerText = value;
}

// operand

function SetOperand(value) {
  operand = value;
  displayOperand.innerText = operand;
}