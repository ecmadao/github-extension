import {
  fetchRepoInfo,
  fetchSearchResult,
  formatRepoSizeAndUnit
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
    this.repoSize = null;
  }

  initial() {
    if (this.repoUrl) {
      this._getRepoInfo();
    }
  }

  _getRepoInfo() {
    fetchRepoInfo(this.repoUrl).then((result) => {
      const {name, language, size} = result;
      this.repoLanguage = language;
      this.repoName = name;
      this.repoSize = size;
      this._showRepoSize();
      return fetchSearchResult(name, language);
    }).then((items) => {
      const repos = items.slice(0, 6);
      this._addRecommendRepos(repos);
    });
  }

  _showRepoSize() {
    const $numbersSummary = $('ul.numbers-summary');
    if ($numbersSummary.length) {
      $numbersSummary.append(this.githubRepoSize);
    }
  }

  get githubRepoSize() {
    const [repoSize, repoSizeUnit] = formatRepoSizeAndUnit(this.repoSize);
    return `<li class="github_repo_size">
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
        </svg>
        <span class="num text-emphasized"> ${repoSize}</span> ${repoSizeUnit}
      </a>
    </li>`;
  }

  _addRecommendRepos(repos) {
    const $repoWrapper = $(this._reposWrapper(repos));
    $('.repository-meta.js-details-container').after($repoWrapper);
  }

  _reposWrapper(repos) {
    const repoTemplates = repos.map((repo) => {
      return this._repoTemplate(repo);
    });
    return `<div class="repo_wrapper">
      <div class="repo_wrapper_title">
        Recommend Repos
        <span class="repo_wrapper_language">
          ${this.repoLanguage}
        </span>
      </div>
      ${repoTemplates.join('')}
    </div>`;
  }

  _repoTemplate(repo) {
    return `<div class="repo_container">
      <a href="${repo.html_url}" class="repo_title">${repo.name}</a>
      <div class="repo_desc">${repo.description}</div>
      <div class="repo_info">
        <a href="${repo.owner.html_url}">${repo.owner.login}</a>
        <span class="repo_stars">${repo.stargazers_count} stars</span>
      </div>
    </div>`;
  }
}

export default RecommendRepo;
