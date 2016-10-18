import {
  matchUrl,
  activePage
} from './utils';

var ActionButton = function() {};
ActionButton.prototype = {
  initial: function() {
    var url = window.location.href;
    if (matchUrl(url)) {
      this._addScrollButton();
      this._listenWindowScroll();
    }
  },

  _addScrollButton: function() {
    var scrollButton = $(this._actionButtonTemplate());
    $('body').append(scrollButton);
    this._bindButtonAction();
  },

  _listenWindowScroll: function() {
    var $document = $(document);
    var $actionButton = $('.git_action_button_wrapper');
    $(window).scroll(function() {
      var $currentTop = $document.scrollTop();
      if ($currentTop > 300) {
        $actionButton.addClass('active');
      } else {
        $actionButton.removeClass('active');
      }
    });
  },

  _bindButtonAction: function() {
    var $scrollButton = $('.github_scroll_top');
    $scrollButton.on('click', function() {
      $('html, body').animate({
        scrollTop: 0
      }, 'slow');
    });
  },

  _actionButtonTemplate: function() {
    return "<div class='git_action_button_wrapper'>" +
    this.scrollButtonTemplate +
    this.topBarButtonTemplate +
    "</div>";
  },

  get scrollButtonTemplate() {
    return "<div class='git_action_button github_scroll_top'>" +
    "<div class='scroll_top_icon'></div>" +
    "</div>";
  },

  get topBarButtonTemplate() {
    return "<div class='code_review_tab_wrapper'>" + this.topbarButton + "</div>";
  },

  get topbarButton() {
    var $topbar = $('.tabnav-pr').find('.tabnav-tabs');
    if (!$topbar || !$topbar.length) {
      return "";
    }
    var tabs = [];
    $topbar.find('a.tabnav-tab').each(function(index, tab) {
      var href = $(tab).attr('href');
      var svg = $(tab).find('svg')[0].outerHTML;
      tabs.push({
        href: href,
        svg: svg
      });
    });
    var tabTemplates = [];
    tabs.forEach((tab, index) => {
      tabTemplates.push(this._getTopBarTemplate(tab));
    });
    return tabTemplates.join("");
  },

  _getTopBarTemplate: function(tabObj) {
    var actionButtonClass = activePage(tabObj.href) ? 'git_action_button code_review_tab active' : 'git_action_button code_review_tab';
    return "<a href='" + tabObj.href + "' class='" + actionButtonClass + "'>" +
    "<div class='code_review_icon'>" + tabObj.svg + "</div>" +
    "</a>";
  }
};

export default ActionButton;
