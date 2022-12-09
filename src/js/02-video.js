// В HTML есть < iframe > с видео для Vimeo плеера.Напиши скрипт который будет сохранять текущее время воспроизведения видео в локальное хранилище и,
//     при перезагрузке страницы, продолжать воспроизводить видео с этого времени.

// <iframe
//   id="vimeo-player"
//   src="https://player.vimeo.com/video/236203659"
//   width="640"
//   height="360"
//   frameborder="0"
//   allowfullscreen
//   allow="autoplay; encrypted-media"
// ></iframe>

// Выполняй это задание в файлах 02-video.html и 02-video.js. Разбей его на несколько подзадач:

// Ознакомься с документацией библиотеки Vimeo плеера.
// Добавь библиотеку как зависимость проекта через npm.
// Инициализируй плеер в файле скрипта как это описано в секции pre-existing player, но учти что у тебя плеер добавлен как npm пакет, а не через CDN.
// Разбери документацию метода on() и начни отслеживать событие timeupdate - обновление времени воспроизведения.
// Сохраняй время воспроизведения в локальное хранилище. Пусть ключом для хранилища будет строка "videoplayer-current-time".
// При перезагрузке страницы воспользуйся методом setCurrentTime() для того чтобы возобновить воспроизведение с сохраненной позиции.
// Добавь в проект библиотеку lodash.throttle и сделай так, чтобы время воспроизведения обновлялось в хранилище не чаще чем раз в секунду.

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {});
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', function (time) {
  throttle(localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(time)), 1000);
});

const savedTime = localStorage.getItem(LOCALSTORAGE_KEY);
const parsedTime = JSON.parse(savedTime);

if (savedTime) {
  console.log(parsedTime.seconds);
  player.setCurrentTime(parsedTime.seconds);
}

// player.on('play', function () {
//   console.log('played the video!');
// });
