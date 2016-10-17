function initialExtension() {
  var $recentBranches = $('.RecentBranches');
  if ($recentBranches.length) {
    resetClickAction($recentBranches);
  }
}

function resetClickAction($recentBranches) {
  $recentBranches.find('.RecentBranches-item').each(function(index, item) {
    console.log(index);
    var $a = $(item).find('a');
    var href = $a.attr('href');
    var hrefSplits = href.split('/');
    var lastSplit = hrefSplits.slice(-1);
    var branchName = lastSplit[0].split('?')[0];
    var newHref = hrefSplits.slice(0, -1);
    newHref.push(branchName + '...' + lastSplit[0]);
    $a.attr('href', newHref.join('/'));
  });
}

setTimeout(function() {
  initialExtension();
}, 1500);
