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

  const modalViews = qsa('.services_modal');
  const modalBtns = qsa('.services_button');
  const modalCloses = qsa('.services_modal-close');

  const sections = document.querySelectorAll('section[id]');


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

    skillsHeader.forEach((el) => {
      el.addEventListener('click', toggleSkills)
    });

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
    /*================== PORTFOLIO SWIPER ====================*/
    let swiper = new Swiper('.portfolio_container', {
      cssMode: true,
      loop: true,

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    window.addEventListener('scroll', scrollActive);
    window.addEventListener('scroll', scrollHeader);
    window.addEventListener('scroll', scrollUp);

    /*==================== DARK LIGHT THEME ====================*/
    let themeButton = id("theme-button");
    let darkTheme = 'dark-theme';
    let iconTheme = 'uil-sun';

    // Previously selected topic (if user selected)
    let selectedTheme = localStorage.getItem('selected-theme')
    let selectedIcon = localStorage.getItem('selected-icon')

    // We obtain the current theme that the interface has by validating the dark-theme class
    let getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
    let getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'
    // We validate if the user previously chose a topic
    if (selectedTheme) {
      // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
      document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
      themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
    }

    // Activate / deactivate the theme manually with the button
    themeButton.addEventListener('click', () => {
        // Add or remove the dark / icon theme
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
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

  /*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
  function scrollActive(){
      let scrollY = window.pageYOffset;

      sections.forEach(current =>{
          let sectionHeight = current.offsetHeight;
          let sectionTop = current.offsetTop - 50;
          sectionId = current.getAttribute('id')

          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
              qs('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
          } else {
              qs('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
          }
      })
  }

  /*==================== CHANGE BACKGROUND HEADER ====================*/
  function scrollHeader(){
    let nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
  }

  /*==================== SHOW SCROLL UP ====================*/
  function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
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