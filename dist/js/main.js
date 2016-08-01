;(function( $, angular, window, document, undefined ) {
    'use strict';

    var app = angular.module('RequestBlockerApp', []);

    app
        .controller('PopupController', function( $scope ) {
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
                templateUrl: 'dist/js/templates/modals.html'
            };
        })
        .directive('navbar', function() {
            return {
                templateUrl: 'dist/js/templates/navbar.html'
            };
        })
        .directive('testing', function() {
            return {
                templateUrl: 'dist/js/templates/table.html'
            }
        });

    function parseLink( url ) {
        var _link = document.createElement('a');
            _link.href = url;

        console.warn( _link );
        return _link;
    };

})( jQuery, angular, this, document );