import {polyfill} from 'es6-promise';
polyfill();

const REPO_INFO = "https://api.github.com/repos/";
const SEARCH = "https://api.github.com/search/repositories?o=desc&s=stars&type=Repositories&utf8=✓";
const HEADERS = {
  'User-Agent': 'github-extension'
};

const KB2MB = 0.0009765625;
const KB2BYTES = 1024;

export const formatRepoSize = (repoSize) => {
  return parseInt(repoSize).toFixed(2);
}

export const formatRepoSizeAndUnit = (repoSize) => {
  if (repoSize < 1) {
    return [formatRepoSize(repoSize * KB2BYTES), 'Bytes'];
  }
  if (repoSize >= 1 / KB2MB) {
    return [formatRepoSize(repoSize * KB2MB), 'MB'];
  }
  return [repoSize, 'KB'];
};

export const reposUrl = () => {
  const hrefs = originalURL().split('/');
  if (hrefs.length === 5) {
    return hrefs.slice(-2).join('/');
  } else {
    return null;
  }
};

export const originalURL = () => {
  return window.location.href;
};

export const matchUrl = (url) => {
  return url.match(/\/pull\//) || url.match(/\/compare\//);
};

export const activePage = (url) => {
  var href = originalURL();
  var re = new RegExp(url + "$");
  var result = re.exec(href);
  return result && result.length === 1;
};

export const fetchRepoInfo = (url) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${REPO_INFO}${url}`,
      method: 'get',
      headers: HEADERS,
      success: (data) => {
        resolve(data);
      },
      error: (data) => {
        reject(false);
      }
    });
  });
};

export const fetchSearchResult = (value, language) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${SEARCH}&l=${language}&q=${value}`,
      headers: HEADERS,
      method: 'get',
      success: (data) => {
        resolve(data.items);
      },
      error: (data) => {
        reject(false);
      }
    });
  });
};
