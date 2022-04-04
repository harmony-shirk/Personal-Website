"use strict";
(function() {
  const navMenu = id("nav-menu");
  const navToggle = id("nav-toggle");
  const navClose = id("nav-close");
  const navLink = qsa('.nav_link');

  const skillsContent = document.getElementsByClassName('skills_content');
  const skillsHeader = qsa('.skills_header');

  const tab = qsa('[data-target]');
  const tabContents = qsa('[data-content]');

  const modalViews = qsa('.services_modal'),
        modalBtns = qsa('.services_button'),
        modalCloses = qsa('.services_modal-close');

  window.addEventListener("load", init);

  function init() {
    if (navToggle) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
      });
    }
    if (navClose) {
      navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
      });
    }
    navLink.forEach(n => n.addEventListener('click', linkAction));

    skillsHeader.forEach(el => el.addEventListener('click', toggleSkills));

    tabContents.forEach(tab => {
      tab.addEventListener('click', addQualification);
    });

    modalBtns.forEach((modalBtn, i) => {
      modalBtn.addEventListener('click', function() {
        modal(i);
      });
    });
    modalCloses.forEach((modalClose) => {
      modalClose.addEventListener('click', function() {
        modalViews.forEach((modalView) => {
          modalView.classList.remove('active-modal');
        });
      });
    });
  }

  /*================== REMOVE MENU MOBILE ====================*/
  function linkAction() {
    let navMenu = id('nav-menu');
    navMenu.classList.remove('show-menu');
  }

  /*================== ACCORDIAN SKILLS ====================*/
  function toggleSkills() {
    let itemClass = this.parentNode.className;
    for (let i = 0; i < skillsContent.length; i++) {
      skillsContent[i].className = "skills_content skills_close";
    }
    if (itemClass === "skills_content skills_close") {
      this.parentNode.className = "skills_content skills_open";
    }
  }

  /*================== QUALIFICATION TABS ====================*/
  function addQualification() {
    let target = qs(tab.dataset.target);
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification_active');
    });
    target.classList.add('qualification_active');
    tab.forEach(tab => {
      tab.classList.remove('qualification_active');
    });
    tab.classList.add('qualification_active');
  }

  /*================== SERVICES MODAL ====================*/
  function modal(modalClick) {
    modalViews[modalClick].classList.add('active-modal');
  }



  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
    function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();