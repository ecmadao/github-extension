function listenWindowScroll() {
  var $document = $(document);
  var $scrollButton = $('.github_scroll_top');
  $(window).scroll(function() {
    var $currentTop = $document.scrollTop();
    if ($currentTop > 200) {
      $scrollButton.addClass('active');
    } else {
      $scrollButton.removeClass('active');
    }
  });
}

function addScrollButton() {
  var scrollButton = $(scrollButtonTemplate());
  $('body').append(scrollButton);
  bindButtonAction();
}

function bindButtonAction() {
  var $scrollButton = $('.github_scroll_top');
  $scrollButton.on('click', function() {
    $('html, body').animate({scrollTop: 0}, 'slow');
  });
}

function scrollButtonTemplate() {
  return "<div class='github_scroll_top'>" +
  "<div class='scroll_top_icon'></div>" +
  "</div>";
}

function initial() {
  var url = window.location.href;
  if (url.match(/\/pull\//)) {
    addScrollButton();
    listenWindowScroll();
  }
}

initial();
