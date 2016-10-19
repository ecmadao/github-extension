import {
  fetchRepoInfo,
  fetchSearchResult
} from './utils';

class RecommendRepo {
  constructor() {
    const hrefs = window.location.href.split('/');
    if (hrefs.length === 5) {
      this.repoUrl = hrefs.slice(-2).join('/');
    } else {
      this.repoUrl = null;
    }
    this.repoLanguage = null;
    this.repoName = null;
  }

  initial() {
    if (this.repoUrl) {
      this._getRepoInfo();
    }
  }

  _getRepoInfo() {
    fetchRepoInfo(this.repoUrl).then((result) => {
      const {name, language} = result;
      this.repoLanguage = language;
      this.repoName = name;
      return fetchSearchResult(name, language);
    }).then((items) => {
      const repos = items.slice(0, 6);
      this._addRecommendRepos(repos);
    });
  }

  _addRecommendRepos(repos) {
    const $repoWrapper = $(this._reposWrapper(repos));
    $('.repository-meta.js-details-container').after($repoWrapper);
  }

  _reposWrapper(repos) {
    const repoTemplates = repos.map((repo) => {
      return this._repoTemplate(repo);
    });
    return `<div class="repo_wrapper"><div class="repo_wrapper_title">Recommend Repos <span class="repo_wrapper_language">${this.repoLanguage}</span></div>${repoTemplates.join('')}</div>`;
  }

  _repoTemplate(repo) {
    return `<div class="repo_container"><a href="${repo.html_url}" class="repo_title">${repo.name}</a><div class="repo_desc">${repo.description}</div><div class="repo_info"><a href="${repo.owner.html_url}">${repo.owner.login}</a><span class="repo_stars">${repo.stargazers_count} stars</span></div></div>`;
  }
}

export default RecommendRepo;
