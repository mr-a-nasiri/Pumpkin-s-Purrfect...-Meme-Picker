'use strict';
import { catsData } from '/js/data.js';

// Elements & Input
const emotionRadiosEl = document.getElementById('emotion-radios');
const memeModalEl = document.getElementById('meme-modal');
const memeModalInner = document.getElementById('meme-modal-inner');
const body = document.body;
// Btn & Checkbox Elements
const showOneRandomCatBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
// Values

// LocalStorage Functions
// Utility Functions
// Functions

const allEmotionTags = [];

const getAllEmotionTags = function () {
  for (let cat of catsData) {
    for (let emotionTag of cat.emotionTags) {
      if (!allEmotionTags.includes(emotionTag)) {
        allEmotionTags.push(emotionTag);
      }
    }
  }
};
getAllEmotionTags();

const renderAllEmotionTags = function () {
  let html = '';
  for (let emotionTag of allEmotionTags) {
    html += `
      <div class="radio">
        <label for="${emotionTag}"> ${emotionTag} </label>
        <input type="radio" name="emotionTag" id="${emotionTag}" value = "${emotionTag}">
      </div>
    `;
  }

  emotionRadiosEl.innerHTML = html;
};
renderAllEmotionTags();

const checkSelectedEmotion = function () {
  return document.querySelector("input[type = 'radio']:checked").value;
};

const getRelatedCats = function () {
  const isGif = gifsOnlyOption.checked;
  const selectedEmotion = checkSelectedEmotion();

  const relatedCats = catsData.filter(function (cat) {
    return isGif
      ? cat.emotionTags.includes(selectedEmotion) && cat.isGif
      : cat.emotionTags.includes(selectedEmotion);
  });
  return relatedCats;
};

const showOneRandomCat = function () {
  const relatedCats = getRelatedCats();

  const randomIndex = Math.trunc(Math.random() * relatedCats.length);

  const oneRandomCat = relatedCats[randomIndex];

  document.body.addEventListener('click', memeModalClose);
  document.addEventListener('keyup', memeModalClose);
  memeModalEl.classList.remove('hidden');

  memeModalInner.innerHTML = `<img src="${oneRandomCat.image}" alt="${oneRandomCat.alt}" class="cat-img">`;
};

const memeModalClose = function (e) {
  // console.log(e.target.parentElement);
  if (
    e.target.id === 'meme-modal-close-btn' ||
    e.key === 'Escape' ||
    (e.target.parentElement === body && e.target !== memeModalEl)
  ) {
    memeModalEl.classList.add('hidden');
  }
};

// Event listeners
(() => {
  showOneRandomCatBtn.addEventListener('click', showOneRandomCat);
})();
showOneRandomCatBtn.parentElement.parentElement;

// mouseup
