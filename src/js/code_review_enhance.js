import {
  matchUrl,
  activePage,
  originalURL
} from './utils';

class ActionButton {
  constructor() {
    this.url = originalURL();
    this.canInitial = matchUrl(this.url);
  }

  initial() {
    if (this.canInitial) {
      this._addScrollButton();
      this._listenWindowScroll();
    }
    return this;
  }

  listenUrlChange() {
    if (this.canInitial) {
      var observer = new window.WebKitMutationObserver((mutations) => {
        if (originalURL() !== this.url) {
          console.log('before change');
          console.log(this.url);
          this.url = originalURL();
          this._handleUrlChange();
        }
      });
      try {
        observer.observe($('.pull-request-tab-content')[0], {
          subtree: true,
          characterData: true,
          childList: true
        });
      } catch (e) {}
    }
  }

  _addScrollButton() {
    const scrollButton = $(this._actionButtonTemplate());
    $('body').append(scrollButton);
    this._bindButtonAction();
  }

  _bindButtonAction() {
    const $scrollButton = $('.github_scroll_top');
    $scrollButton.on('click', () => {
      $('html, body').animate({
        scrollTop: 0
      }, 'slow');
    });
  }

  _handleUrlChange() {
    console.log('url is changed');
    console.log(this.url);
  }

  _listenWindowScroll() {
    const $document = $(document);
    const $actionButton = $('.git_action_button_wrapper');
    $(window).scroll(() => {
      const $currentTop = $document.scrollTop();
      if ($currentTop > 300) {
        $actionButton.addClass('active');
      } else {
        $actionButton.removeClass('active');
      }
    });
  }

  _actionButtonTemplate() {
    return "<div class='git_action_button_wrapper'>" +
    this.scrollButtonTemplate +
    this.topBarButtonTemplate +
    "</div>";
  }

  get scrollButtonTemplate() {
    return "<div class='git_action_button github_scroll_top'>" +
    "<div class='scroll_top_icon'></div>" +
    "</div>";
  }

  get topBarButtonTemplate() {
    return "<div class='code_review_tab_wrapper'>" + this.topbarButton + "</div>";
  }

  get topbarButton() {
    const $topbar = $('.tabnav-pr').find('.tabnav-tabs');
    if (!$topbar || !$topbar.length) {
      return "";
    }
    const tabs = [];
    $topbar.find('a.tabnav-tab').each((index, tab) => {
      const href = $(tab).attr('href');
      const svg = $(tab).find('svg')[0].outerHTML;
      tabs.push({
        href: href,
        svg: svg
      });
    });
    const tabTemplates = tabs.map((tab, index) => {
      return this._getTopBarTemplate(tab);
    });
    return tabTemplates.join("");
  }

  _getTopBarTemplate(tabObj) {
    const actionButtonClass = activePage(tabObj.href) ? 'git_action_button code_review_tab active' : 'git_action_button code_review_tab';
    return "<a href='" + tabObj.href + "' class='" + actionButtonClass + "'>" +
    "<div class='code_review_icon'>" + tabObj.svg + "</div>" +
    "</a>";
  }
}

export default ActionButton;
