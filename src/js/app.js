/* eslint-disable no-console */
// Кастомная функция из папки с модулями
import * as flsFunctions from './modules/functions.js';
flsFunctions.isWebp();

import Swiper from 'swiper/bundle';
export const swiper = new Swiper('.details__swiper', {
  slidesPerView: 2,
  grid: {
    fill: 'row',
    rows: 2,
  },
  spaceBetween: 21,
  pagination: {
    el: '.details__pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '#detailsNext',
    prevEl: '#detailsPrev',
  },
  breakpoints: {
    585: {
      slidesPerView: 3,
      grid: {
        fill: 'row',
        rows: 3,
      },
    },
    834: {
      slidesPerView: 4,
      grid: {
        fill: 'row',
        rows: 3,
      },
    },
    1200: {
      slidesPerView: 6,
      grid: {
        fill: 'row',
        rows: 2,
      },
    },
  },
});

export const typesSwiper = new Swiper('.types__swiper', {
  slidesPerView: 3,
  spaceBetween: 20,
  pagination: {
    el: '.types__pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '#typesNext',
    prevEl: '#typesPrev',
  },
});

const fileInput = document.getElementById('file');
const selectedFilesDiv = document.querySelector('.selected-files');

function fileHandler() {
  selectedFilesDiv.innerHTML = ''; // Очистка предыдущего списка

  const files = fileInput.files;
  if (files.length > 5) {
    const fileItem = document.createElement('div');
    fileItem.style.color = 'red';
    fileItem.textContent = 'Не более 5 файлов';
    selectedFilesDiv.appendChild(fileItem);
    fileInput.value = '';
    return;
  }
  if (files.length > 0) {
    for (const file of files) {
      const fileName = file.name;
      const fileItem = document.createElement('div');
      fileItem.textContent = fileName;
      selectedFilesDiv.appendChild(fileItem);
    }
  } else {
    selectedFilesDiv.textContent = 'Нет выбранных файлов';
  }
}

fileInput.addEventListener('change', fileHandler);

document.addEventListener('DOMContentLoaded', fileHandler);
