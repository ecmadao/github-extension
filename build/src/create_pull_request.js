function initialExtension() {
  var $recentBranches = $('.RecentBranches');
  if ($recentBranches.length) {
    resetClickAction($recentBranches);
  }
}

function resetClickAction($recentBranches) {
  $recentBranches.find('.RecentBranches-item').find('a').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var href = $(this).attr('href');
    var hrefSplits = href.split('/');
    var lastSplit = hrefSplits.slice(-1);
    var branchName = lastSplit[0].split('?')[0];
    var newHref = hrefSplits.slice(0, -1);
    newHref.push(branchName + '...' + lastSplit[0]);
    window.location.href = newHref.join('/');
    return false;
  });
}

setTimeout(function() {
  initialExtension();
}, 1500);
