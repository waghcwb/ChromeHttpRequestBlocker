var RequestBlockerApp = (function( $, angular, chrome, window, document, undefined ) {
    'use strict';

    var app = angular.module('RequestBlockerApp', []);

    var requestBlocker;

    var RequestBlocker = function() {
        if ( ! ( this instanceof RequestBlocker ) ) {
            return new RequestBlocker();
        }

        return this;
    };

    RequestBlocker.fn = RequestBlocker.prototype = {
        init: function() {
            RequestBlocker.angular().loadLocalData(function( data ) {
                if( chrome.webRequest.onBeforeRequest.hasListener( blockRequest ) ) {
                    chrome.webRequest.onBeforeRequest.removeListener( blockRequest );
                }

if (patterns.length) {
        chrome.webRequest.onBeforeRequest.addListener(blockRequest, {
            urls: patterns
        }, ['blocking']);
        console.info('Using patterns:');
        for (p in patterns) {
            console.info(patterns[p]);
        }
    } else {
        console.warn('No patterns defined.');
    }
            });
        }
    };

    RequestBlocker.fn.loadLocalData = function( callback ) {
        chrome.storage.sync.get('blocked_patterns', function( data ) {
            callback( data['blocked_patterns'] || [] );
        });
    };

    RequestBlocker.fn.helpers = {
        parseLink: function( url ) {
            var _link = document.createElement('a');
                _link.href = url;

            return _link;
        }
    };

    RequestBlocker.fn.angular = function() {
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

        return this;
    };

    window.requestBlocker = requestBlocker = RequestBlocker();

    requestBlocker.init()

})( jQuery, angular, chrome, this, document );