var RequestBlockerApp = (function( window, $, AngularFactory, undefined ) {
    'use strict';

    var requestBlocker;

    var RequestBlocker = function() {
        if ( ! ( this instanceof RequestBlocker ) ) {
            return new RequestBlocker();
        }

        return this;
    };

    RequestBlocker.fn = RequestBlocker.prototype = {
        init: function() {
            AngularFactory();
        }
    };

    function parseLink( url ) {
        var _link = document.createElement('a');
            _link.href = url;

        return _link;
    };

    window.requestBlocker = requestBlocker = RequestBlocker();

    requestBlocker.init()

})( this, jQuery, function AngularFactory() {

    'use strict';

    var app = angular.module('RequestBlockerApp', []);

    app.controller('PopupController', function( $scope ) {
        $scope.brand = 'HTTP Request Blocker';

        $scope.edit = function( id ) {
            var $link = $('[data-link-id="' + id + '"]'),
                $modal = $('#edit-link-modal');

            var title = $link.find('.link-url').text(),
                hostname = parseLink( title ).hostname;

            $modal.find('.modal-header .modal-title').text( hostname );
            $modal.modal();
        };
    })
    .directive('modals', function() {
        return {
            templateUrl: 'dist/js/templates/modals.html',
            replace: true
        };
    })
    .directive('navbar', function() {
        return {
            templateUrl: 'dist/js/templates/navbar.html',
            replace: true
        };
    })
    .directive('testing', function() {
        return {
            templateUrl: 'dist/js/templates/table.html',
            replace: true
        }
    });
});