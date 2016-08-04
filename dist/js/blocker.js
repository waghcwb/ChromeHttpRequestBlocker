var ChromeRequestBlockerApp = (function( window, chrome, ChromeRequestBlocker, undefined ) {
    'use strict';

    chrome.storage.sync.get('blocked_patterns', function( data ) {
        ChromeRequestBlocker( data['blocked_patterns'] || [] );
    });

})( this, chrome, function ChromeRequestBlocker( patterns ) {
    // todo: extend prototype
    function blockRequest( details ) {
        console.log('Blocked: ', details.url);

        return {
            cancel: true
        };
    }

    function save( newPatterns, callback ) {
        patterns = newPatterns;

        chrome.storage.sync.set({
            'blocked_patterns': newPatterns
        },
        function() {
            updateFilters();
            callback.call();
        });
    }

    function updateFilters( urls ) {
        console.info('Updating...');

        if ( chrome.webRequest.onBeforeRequest.hasListener( blockRequest ) ) {
            chrome.webRequest.onBeforeRequest.removeListener( blockRequest );
        }

        if ( patterns.length ) {
            chrome.webRequest.onBeforeRequest.addListener( blockRequest, {
                urls: patterns
            }, ['blocking']);

            console.info('Using patterns:');

            for ( p in patterns ) {
                console.info( patterns[ p ] );
            }
        }
        else {
            console.warn('No patterns defined.');
        }

        console.info('Updated!');
    }

    updateFilters();
});