const dataMusic = [
  {
    id: '1',
    artist: 'The weeknd',
    track: 'Save your tears',
    poster: 'img/photo1.jpg',
    mp3: 'audio/The Weeknd - Save Your Tears.mp3',
  },
  {
    id: '2',
    artist: 'Imagine Dragons',
    track: 'Follow You',
    poster: 'img/photo2.jpg',
    mp3: 'audio/Imagine Dragons - Follow You.mp3',
  },
  {
    id: '3',
    artist: 'Tove Lo',
    track: 'How Long',
    poster: 'img/photo3.jpg',
    mp3: 'audio/Tove Lo - How Long.mp3',
  },
  {
    id: '4',
    artist: 'Tom Odell',
    track: 'Another Love',
    poster: 'img/photo4.jpg',
    mp3: 'audio/Tom Odell - Another Love.mp3',
  },
  {
    id: '5',
    artist: 'Lana Del Rey',
    track: 'Born To Die',
    poster: 'img/photo5.jpg',
    mp3: 'audio/Lana Del Rey - Born To Die.mp3',
  },
  {
    id: '6',
    artist: 'Adele',
    track: 'Hello',
    poster: 'img/photo6.jpg',
    mp3: 'audio/Adele - Hello.mp3',
  },
  {
    id: '7',
    artist: 'Tom Odell',
    track: "Can't Pretend",
    poster: 'img/photo7.jpg',
    mp3: "audio/Tom Odell - Can't Pretend.mp3",
  },
  {
    id: '8',
    artist: 'Lana Del Rey',
    track: 'Young And Beautiful',
    poster: 'img/photo8.jpg',
    mp3: 'audio/Lana Del Rey - Young And Beautiful.mp3',
  },
  {
    id: '9',
    artist: 'Adele',
    track: 'Someone Like You',
    poster: 'img/photo9.jpg',
    mp3: 'audio/Adele - Someone Like You.mp3',
  },
  {
    id: '10',
    artist: 'Imagine Dragons',
    track: 'Natural',
    poster: 'img/photo10.jpg',
    mp3: 'audio/Imagine Dragons - Natural.mp3',
  },
  {
    id: '11',
    artist: 'Drake',
    track: 'Laugh Now Cry Later',
    poster: 'img/photo11.jpg',
    mp3: 'audio/Drake - Laugh Now Cry Later.mp3',
  },
  {
    id: '12',
    artist: 'Madonna',
    track: 'Frozen',
    poster: 'img/photo12.jpg',
    mp3: 'audio/Madonna - Frozen.mp3',
  },
];

const audio = new Audio();
const tracksCard = document.getElementsByClassName('track');
const catalogContainer = document.querySelector('.catalog__container');

const player = document.querySelector('.player');
const pauseBtn = document.querySelector('.player__controller-pause');
const stopBtn = document.querySelector('.player__controller-stop');

const catalogAddBtn = document.createElement('button');
catalogAddBtn.classList.add('catalog__btn-add');
catalogAddBtn.innerHTML = `
  <span>Увидееть всё</span>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
    />
  </svg>
`;

const deleteActiveClass = () => {
  for (let i = 0; i < tracksCard.length; i++) {
    tracksCard[i].classList.remove('track_active');
    tracksCard[i].classList.remove('track_active_paused');
  }
};

const pausePlayer = () => {
  const activeTrackCard = document.querySelector('.track_active');

  if (audio.paused) {
    audio.play();
    pauseBtn.classList.remove('player__icon_play');
    activeTrackCard.classList.remove('track_active_paused');
  } else {
    audio.pause();
    pauseBtn.classList.add('player__icon_play');
    activeTrackCard.classList.add('track_active_paused');
  }
};

const playMusic = (event) => {
  event.preventDefault();
  const trackActive = event.currentTarget;

  if (trackActive.classList.contains('track_active')) {
    pausePlayer();
    return;
  }

  const id = trackActive.dataset.idTrack;
  audio.src = dataMusic.find((data) => data.id === id).mp3;
  audio.play();
  pauseBtn.classList.remove('player__icon_play');
  player.classList.add('player_active');

  deleteActiveClass();
  trackActive.classList.add('track_active');
};

const addHandlerTrack = () => {
  for (let i = 0; i < tracksCard.length; i++) {
    tracksCard[i].addEventListener('click', playMusic);
  }
};

pauseBtn.addEventListener('click', pausePlayer);

stopBtn.addEventListener('click', () => {
  audio.src = '';
  player.classList.remove('player_active');
  deleteActiveClass();
});

const createCard = (cardData) => {
  const card = document.createElement('a');
  card.href = '#';
  card.classList.add('catalog__item', 'track');
  card.dataset.idTrack = cardData.id;

  card.innerHTML = `
    <div class="track__img-wrap">
      <img
        class="track__poster"
        src="${cardData.poster}"
        alt="${cardData.artist} ${cardData.track}"
        width="180"
        height="180"
      />
    </div>
    <div class="track__info track-info">
      <p class="track-info__title">${cardData.track}</p>
      <p class="track-info__artist">${cardData.artist}</p>
    </div>
  `;
  return card;
};

const renderCatalog = (dataList) => {
  catalogContainer.textContent = '';
  const listCards = dataList.map(createCard);
  catalogContainer.append(...listCards);
};

const checkCount = (i = 1) => {
  if (catalogContainer.clientHeight > tracksCard[0].clientHeight * 3) {
    tracksCard[tracksCard.length - i].style.display = 'none';
    checkCount(i + 1);
  } else if (i !== 1) {
    catalogContainer.append(catalogAddBtn);
  }
};

const init = () => {
  renderCatalog(dataMusic);
  checkCount();
  addHandlerTrack();

  catalogAddBtn.addEventListener('click', () => {
    [...tracksCard].forEach((trackCard) => {
      trackCard.style.display = '';
    });
    catalogAddBtn.remove();
  });
};

init();
