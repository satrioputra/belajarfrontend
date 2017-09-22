var 
d = document;
w = window;

function showOverlay() {
  var
    overlay = $('.overlay'),
    menuItem = $('.menu-item-has-children'),
    menuItemChild = $('.menu-item-child'),
    mq = w.matchMedia('min-width: 600px');

  if(matchMedia) {
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  function WidthChange(mq) {
    if (mq.matches) {
      menuItem.hover(
        function () {
          overlay.addClass('active');
        },
        function () {
          overlay.removeClass('active');
        }
      )
    }
  }
}
showOverlay();

function retrieveImage() {
  var specialLinks = d.querySelectorAll('.menu-item-child-list a');
  var itemLink = d.querySelectorAll(".item-link");
  var itemImage = d.getElementsByClassName('item-image');
  var maxLength = itemLink.length;

  for (var x = 0; x < specialLinks.length; x++) {
    specialLinks[x].addEventListener("mouseover", retrieve, true);

    function retrieve(e) {
      for (var i = 0; i < maxLength; i++) {
        itemLink[i].setAttribute('href', e.target.getAttribute("data-url-" + i));
        itemImage[i].setAttribute('src', e.target.getAttribute("data-img-" + i));
      };
    };
  };
};
retrieveImage();

function toggleMenu() {
  var
    button = d.querySelector('.site-nav-mobile-button'),
    menu = d.querySelector('.site-nav-top'),
    overlay = d.querySelector('.overlay');

  button.addEventListener('click', function () {
    menu.classList.toggle('open');
    overlay.classList.toggle('active');
  });
};
toggleMenu();

function mobileDropdown() {
  var 
    menuItemHasChild = d.querySelectorAll('.menu-item-has-children'),
    arrayMenu = Array.prototype.slice.call(menuItemHasChild),
    max = menuItemHasChild.length;

  arrayMenu.map(function(i) {
    i.addEventListener('click', function(){
      this.lastChild.previousSibling.classList.toggle('open');
    });
  });
}
mobileDropdown();

function closeMenu() {
  var
    button = d.querySelector('.menu-close'),
    menu = d.querySelector('.site-nav-top'),
    overlay = d.querySelector('.overlay');

  button.addEventListener('click', function () {
    menu.classList.remove('open');
    overlay.classList.toggle('active');
  })
}
closeMenu();