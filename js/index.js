const audio = new Audio();
const tracksCard = document.getElementsByClassName('track');
const activeTrackCard = document.getElementsByClassName('track_active');

const player = document.querySelector('.player');
const pauseBtn = document.querySelector('.player__controller-pause');
const stopBtn = document.querySelector('.player__controller-stop');

const deleteActiveClass = () => {
  for (let i = 0; i < tracksCard.length; i++) {
    tracksCard[i].classList.remove('track_active');
    tracksCard[i].classList.remove('track_active_paused');
  }
};

const playMusic = (event) => {
  const trackActive = event.currentTarget;
  audio.src = trackActive.dataset.track;
  audio.play();
  pauseBtn.classList.remove('player__icon_play');
  player.classList.add('player_active');
  deleteActiveClass();
  trackActive.classList.add('track_active');
};

for (let i = 0; i < tracksCard.length; i++) {
  tracksCard[i].addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains('track_active')) {
      if (audio.paused) {
        audio.play();
        pauseBtn.classList.remove('player__icon_play');
        e.currentTarget.classList.remove('track_active_paused');
      } else {
        audio.pause();
        pauseBtn.classList.add('player__icon_play');
        e.currentTarget.classList.add('track_active_paused');
      }
    } else {
      playMusic(e);
    }
  });
}

pauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    pauseBtn.classList.remove('player__icon_play');
    activeTrackCard[0].classList.remove('track_active_paused');
  } else {
    audio.pause();
    pauseBtn.classList.add('player__icon_play');
    activeTrackCard[0].classList.add('track_active_paused');
  }
});

stopBtn.addEventListener('click', () => {
  audio.src = '';
  player.classList.remove('player_active');
  deleteActiveClass();
});
