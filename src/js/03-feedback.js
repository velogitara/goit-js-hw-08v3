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
// console.log(refs.form);

populateInput();

function onFormSubmit(evt) {
  evt.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Заповніть, будь ласка, всі поля форми');
  }
  evt.currentTarget.reset();
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
}

function inputValue(e) {
  formData[e.target.name] = e.target.value;
  const savedString = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, savedString);
}

function populateInput() {
  const savedInput = localStorage.getItem(STORAGE_KEY);
  const parsedInput = JSON.parse(savedInput);
  // console.log(refs.form.email.value);

  if (savedInput) {
    refs.form.email.value = parsedInput.email;
    refs.form.message.value = parsedInput.message;
  }
}
