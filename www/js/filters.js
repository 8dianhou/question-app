angular.module('question-app.filters', [])

.filter('rawHtml', ['$sce', function($sce){
  return function(val) {
  	 var output = val
            // replace possible line breaks.
            .replace(/(\r\n|\r|\n)/g, '<br/>')
            // replace tabs
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;')
            // replace spaces.
            .replace(/ /g, '&nbsp;');
  	return $sce.trustAsHtml(output);
  };
}]);
