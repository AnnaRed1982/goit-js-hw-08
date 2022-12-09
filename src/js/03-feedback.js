// В HTML есть разметка формы. Напиши скрипт который будет сохранять значения полей в локальное хранилище когда пользователь что-то печатает.

// <form class="feedback-form" autocomplete="off">
//   <label>
//     Email
//     <input type="email" name="email" autofocus />
//   </label>
//   <label>
//     Message
//     <textarea name="message" rows="8"></textarea>
//   </label>
//   <button type="submit">Submit</button>
// </form>

// Выполняй это задание в файлах 03-feedback.html и 03-feedback.js. Разбей его на несколько подзадач:

// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы.
// Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.

import throttle from 'lodash.throttle';

ref = {
  form: document.querySelector('form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};

ref.form.addEventListener('submit', onFormSubmit);
ref.form.addEventListener('input', throttle(onAddDataLocalStorage, 500));

fillData();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(formData);
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onAddDataLocalStorage(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function fillData() {
  const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
  const parsedData = JSON.parse(savedData);

  if (savedData) {
    console.log(parsedData);
    ref.email.value = parsedData.email;
    ref.message.value = parsedData.message;
  }
}

// ref.email.addEventListener('input', throttle(onEmailInput, 500));
// ref.message.addEventListener('input', throttle(onMessageInput, 500));
// function onEmailInput(evt) {}
// function onMessageInput(evt) {}
//ghfh@yu.o
