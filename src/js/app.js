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
