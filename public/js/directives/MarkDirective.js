imt.directive('elementMarker', function() {
    return {
        restrict: 'A',
        scope: {
            markerSelector: '@',
            onMarked: '&'
        },
        link: function(scope, $element, $attrs) {
            var $box = null;
            var active = false;
            var startPos = {};
            var threshold = 20;

            $element.bind('mousedown', function(event) {
                startPos.x = event.pageX;
                startPos.y = event.pageY;
                active = true;
            });

            $element.bind('mousemove', function(event) {
                if (
                    active
                    && event.pageX - startPos.x > threshold
                    && event.pageY - startPos.y > threshold
                ) {
                    $element.css('-webkit-user-select', 'none');
                    $element.css('cursor', 'se-resize');

                    if ($box == null) {
                        $box = scope.createBox();
                        $element.append($box);
                    }

                    $box
                        .width(event.pageX - startPos.x)
                        .height(event.pageY - startPos.y);
                }
            });

            $element.bind('mouseup', function(event) {
                if ($box) {
                    $box.remove();
                    $box = null;
                }

                active = false;

                $element.css('-webkit-user-select', 'initial');
                $element.css('cursor', 'initial');

                var selectedElements = [];
                $element.find(scope.markerSelector).each(function(index, el) {
                    var offset = $(el).offset();
                    var width = $(el).width();
                    var height = $(el).height();

                    var startX = startPos.x;
                    var startY = startPos.y;
                    var endX = event.pageX;
                    var endY = event.pageY;

                    if (
                        startX < offset.left + width
                        && startY < offset.top + height
                        && endX > offset.left
                        && endY > offset.top
                    ) {
                        selectedElements.push(el);
                    }
                });

                scope.onMarked({selectedElements: selectedElements});
            });

            scope.createBox = function() {
                return $('<div/>').css({
                    position: 'absolute',
                    border: '1px dashed #333',
                    background: '#DCF5FF',
                    opacity: 0.5,
                    left: startPos.x,
                    top: startPos.y
                });
            };
        }
    }
});
