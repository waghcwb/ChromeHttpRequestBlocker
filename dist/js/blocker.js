var ChromeRequestBlockerApp = (function( window, chrome, RequestBlocker, undefined ) {
    'use strict';

    var dummie = [{
        'domain': 'web.whatsapp.com',
        'pattern': '*://web.whatsapp.com/*',
        'title': 'WhatsApp'
    }, {
        'title': 'Chromiun',
        'pattern': '*://web.whatsapp.com/*',
        'domain': 'ogjpdnmgkiecfocnbdjjecbfljhanhjc'
    }];

    return chrome.storage.sync.get('blocked_patterns', function( data ) {
        RequestBlocker( data['blocked_patterns'] || dummie );
    });

})( this, chrome, function RequestBlocker( patterns ) {
    'use strict';

    var ChromeRequestBlocker = function() {
        if ( ! ( this instanceof ChromeRequestBlocker ) ) {
            return new ChromeRequestBlocker();
        }

        this.patterns = patterns;

        this.init();

        return this;
    };

    ChromeRequestBlocker.fn = ChromeRequestBlocker.prototype = {
        init: function() {
            this.updateFilters( this.patterns );
        }
    };

    ChromeRequestBlocker.fn.updateFilters = function( urls ) {
        var index, pattern;

        if ( chrome.webRequest.onBeforeRequest.hasListener( this.blockRequest ) ) {
            chrome.webRequest.onBeforeRequest.removeListener( this.blockRequest );
        }

        if ( this.patterns.length ) {
            var blockPatterns = [];

            console.groupCollapsed('Patterns');

            for ( index in this.patterns ) {
                if ( patterns.hasOwnProperty( index ) ) {
                    pattern = this.patterns[ index ];

                    blockPatterns.push( pattern.pattern );

                    console.groupCollapsed( pattern.title )
                    console.log( 'Domain:', pattern.domain );
                    console.log( 'Pattern:', pattern.pattern );
                    console.groupEnd();
                }
            }

            console.groupEnd();

            if ( pattern.domain != '*' && window.location.host === pattern.domain ) {
                chrome.webRequest.onBeforeRequest.addListener( this.blockRequest, {
                    urls: blockPatterns
                }, ['blocking']);
            }
        }
        else {
            console.warn('No patterns found.');
        }
    };

    ChromeRequestBlocker.fn.blockRequest = function( details ) {
        console.log('Blocked: ', details.url);

        return {
            cancel: true
        };
    };

    ChromeRequestBlocker.fn.save = function( newPatterns, callback ) {
        this.patterns = newPatterns;

        chrome.storage.sync.set({
            'blocked_patterns': newPatterns
        },
        function() {
            console.info('verificar escopo de this');
            this.updateFilters();
            callback.call();
        });
    };

    window.ChromeRequestBlocker = ChromeRequestBlocker();
});