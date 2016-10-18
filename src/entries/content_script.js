import '../css/code_review_enhance.css';
import '../css/recommend_repositories.css';
import ActionButton from '../js/code_review_enhance';
import initialPullRequest from '../js/create_pull_request';
import RecommendRepo from '../js/recommend_repositories';

initialPullRequest();

const actionButton = new ActionButton();
actionButton.initial();

const recommendRepo = new RecommendRepo();
recommendRepo.initial();
