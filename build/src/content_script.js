function initialExtension() {
  var $recentBranches = $('.RecentBranches');
  $recentBranches.find('.RecentBranches-item').find('a').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });
}

initialExtension();
console.log('====================initialExtension==========================')
