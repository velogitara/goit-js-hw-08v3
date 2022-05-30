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

function onFormSubmit(evt) {
  evt.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Please, all fields are required!!!');
  } else {
    console.log(formData);
    evt.currentTarget.reset();

    localStorage.removeItem(STORAGE_KEY);
    formData.email = '';
    formData.message = '';
  }
}

function inputValue(e) {
  formData[e.target.name] = e.target.value;
  const savedString = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, savedString);
  console.log(e.target);
}

function populateInput() {
  const savedInput = localStorage.getItem(STORAGE_KEY);
  const parsedInput = JSON.parse(savedInput);
  console.log(parsedInput);

  if (parsedInput.email) {
    const savedString = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, savedString);
    refs.form.email.value = parsedInput.email;
  }
  if (parsedInput.message) {
    const savedString = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, savedString);
    refs.form.message.value = parsedInput.message;
  }
}
