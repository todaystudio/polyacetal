/* eslint-disable radix */
/* eslint-disable prefer-const */
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

(function () {
  /*[pan and well CSS scrolls]*/
  let pnls = document.querySelectorAll('.panel').length,
    scdir,
    hold = false;

  function _scrollY(obj) {
    let slength,
      plength,
      pan,
      step = 100,
      vh = window.innerHeight / 100,
      vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
    if (
      (this !== undefined && this.id === 'well') ||
      (obj !== undefined && obj.id === 'well')
    ) {
      pan = this || obj;
      plength = parseInt(pan.offsetHeight / vh);
    }
    if (pan === undefined) {
      return;
    }
    plength = plength || parseInt(pan.offsetHeight / vmin);
    slength = parseInt(pan.style.transform.replace('translateY(', ''));
    if (scdir === 'up' && Math.abs(slength) < plength - plength / pnls) {
      slength = slength - step;
    } else if (scdir === 'down' && slength < 0) {
      slength = slength + step;
    } else if (scdir === 'top') {
      slength = 0;
    }
    if (hold === false) {
      hold = true;
      pan.style.transform = `translateY(${slength}vh)`;
      setTimeout(() => {
        hold = false;
      }, 1000);
    }
    console.log(`${scdir}:${slength}:${plength}:${plength - plength / pnls}`);
  }
  /*[swipe detection on touchscreen devices]*/
  function _swipe(obj) {
    var swdir,
      sX,
      sY,
      dX,
      dY,
      threshold = 100,
      /*[min distance traveled to be considered swipe]*/
      slack = 50,
      /*[max distance allowed at the same time in perpendicular direction]*/
      alT = 500,
      /*[max time allowed to travel that distance]*/
      elT /*[elapsed time]*/,
      stT; /*[start time]*/
    obj.addEventListener(
      'touchstart',
      function (e) {
        var tchs = e.changedTouches[0];
        swdir = 'none';
        sX = tchs.pageX;
        sY = tchs.pageY;
        stT = new Date().getTime();
        //e.preventDefault();
      },
      false
    );

    obj.addEventListener(
      'touchmove',
      function (e) {
        e.preventDefault(); /*[prevent scrolling when inside DIV]*/
      },
      false
    );

    obj.addEventListener(
      'touchend',
      function (e) {
        var tchs = e.changedTouches[0];
        dX = tchs.pageX - sX;
        dY = tchs.pageY - sY;
        elT = new Date().getTime() - stT;
        if (elT <= alT) {
          if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
            swdir = dX < 0 ? 'left' : 'right';
          } else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
            swdir = dY < 0 ? 'up' : 'down';
          }
          if (obj.id === 'well') {
            if (swdir === 'up') {
              scdir = swdir;
              _scrollY(obj);
            } else if (
              swdir === 'down' &&
              obj.style.transform !== 'translateY(0)'
            ) {
              scdir = swdir;
              _scrollY(obj);
            }
            e.stopPropagation();
          }
        }
      },
      false
    );
  }
  /*[assignments]*/
  var well = document.getElementById('well');
  well.style.transform = 'translateY(0)';
  well.addEventListener('wheel', function (e) {
    if (e.deltaY < 0) {
      scdir = 'down';
    }
    if (e.deltaY > 0) {
      scdir = 'up';
    }
    e.stopPropagation();
  });
  well.addEventListener('wheel', _scrollY);
  _swipe(well);
  var tops = document.querySelectorAll('.top');
  for (var i = 0; i < tops.length; i++) {
    tops[i].addEventListener('click', function () {
      scdir = 'top';
      _scrollY(well);
    });
  }
})();
