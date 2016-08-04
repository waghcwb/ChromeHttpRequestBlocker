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
    } else {
        console.warn('No patterns defined.');
    }
            });
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

    RequestBlocker.fn.helpers = {
        parseLink: function( url ) {
            var _link = document.createElement('a');
                _link.href = url;

            return _link;
        }
    });
});