import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const getTime = ({ duration, percent, seconds }) => {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
};

const savedCurrentTime = localStorage.getItem('videoplayer-current-time');
const parsedCurrentTime = JSON.parse(savedCurrentTime);

const clearCashBtn = document.querySelector('.btn');
// console.log(clearCashBtn.name);
clearCashBtn.addEventListener('click', () => {
  localStorage.clear();
  console.log('мы очистили Local Storage');
});

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('timeupdate', throttle(getTime, 1000));

player
  .setCurrentTime(parsedCurrentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
