import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  //   input: document.querySelector('.feedback-form input'),
  //   textArea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(inputValue, 1000));

populateInput();
// populateInputEmail();
// populateMessage();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
}

// function emailInput(e) {
//   const emailValue = e.target.value;
//   // console.log();
//   localStorage.setItem(STORAGE_KEY, emailValue);
// }

function inputValue(e) {
  console.log(formData);
  formData[e.target.name] = e.target.value;
  const savedString = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, savedString);
}

function populateInput() {
  const savedInput = localStorage.getItem(STORAGE_KEY);
  const parsedInput = JSON.parse(savedInput);
  console.log(refs.form.email.value);

  if (savedInput) {
    refs.form.email.value = parsedInput.email;
    refs.form.message.value = parsedInput.message;
  }
}

// function populateInputEmail() {
//   const savedInput = localStorage.getItem(STORAGE_KEY);
//   const parsedInput = JSON.parse(savedInput);
//   if (savedInput) {
//     //     console.dir(parsedInput);
//     refs.input.value = parsedInput.email;
//     //     // formData[parsedInput.target.name] = parsedInput.target.value;
//   }
// }

// function populateMessage() {
//   const savedInput = localStorage.getItem(STORAGE_KEY);
//   const parsedInput = JSON.parse(savedInput);
//   if (savedInput) {
//     //     console.dir(parsedInput);
//     refs.textArea.value = parsedInput.message;
//     //     // formData[parsedInput.target.name] = parsedInput.target.value;
//   }
// }
