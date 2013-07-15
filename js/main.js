YUI().use('node', 'transition', function (Y) {

    Y.one('#findRides').on('click', function () {
        var fromCity = Y.one('#fromCity').get('value').trim();
        var toCity = Y.one('#toCity').get('value').trim();
        var results = Y.one('#results');

        Y.one('#query').transition({
            duration: 0.5, // secs
            'margin-top': '2em'
        });

        results.empty();


        /* Mitfahrgelegenheit.de */
        var mfgUrl = 'http://www.mitfahrgelegenheit.de/mitfahrzentrale/' + fromCity + '/' + toCity + '.html';
        results.append('<iframe id="mfg" src="' + mfgUrl + '" class="result" />');


        /* Bessermitfahren.de */
        var bmUrl = 'http://www.bessermitfahren.de/' + fromCity + '/' + toCity + '/angebote';
        // Poor man's Unicode Normalization:
        // lower-case and german umlauts replacement
        bmUrl = ersetzeUmlauts(bmUrl.toLowerCase());
        results.append('<iframe id="bm" src="' + bmUrl + '" class="result" />');


        /* Mitfahrzentrale.de */
        var mfzUrl = 'http://www.mitfahrzentrale.de/suche.php?art=100&frmpost=1&STARTLAND=D&START=' + fromCity + '&ZIELLAND=D&ZIEL=' + toCity + '&abdat=';
        results.append('<iframe id="mfz" src="' + mfzUrl + '" class="result" />');


        /* TODO: Add a couple more */
    });
});



/* Helpers */

function ersetzeUmlauts(s) {
    // Thanks http://stackoverflow.com/a/3140468
    var tr = {"\u00e4":"ae", "\u00fc":"ue", "\u00f6":"oe", "\u00df":"ss"};
    return s.replace(/[\u00e4|\u00fc|\u00f6|\u00df]/g, function(match) {return tr[match];});
}

