/* Javascript for MetaFahr.de (c) Florian Sesser 2013.
 *
 * Glad you've come here. Do as you please: This code is licensed
 * under the WTFPL, see http://www.wtfpl.net/
 * However I would be proud to hear from you if you find anything
 * I have built useful. Maybe we'll have a beer some time.
 * I welcome issue reports and pull requests at
 * https://github.com/hacklschorsch/metafahr
 *
 * Please don't sue/abmahn me, a short eMail to florian DOT sesser
 * AT web DOT de will suffice and I'll remove your site from this page.
 */

findId('findRides').onclick = function (ev) {
    var fromCity = findId('fromCity').value.trim();
    var toCity = findId('toCity').value.trim();

    // Prevent 'submit' action also in IE<9
    if (ev && ev.preventDefault) {
       ev.preventDefault();
    } else {
        event.returnValue = false;
    }

    findId('query').style.marginTop = '2em';
    findId('results').innerHTML = '';


    /* Mitfahrgelegenheit.de */
    var mfgUrl = 'http://www.mitfahrgelegenheit.de/mitfahrzentrale/' + fromCity + '/' + toCity + '.html';
    addResult('mfg', mfgUrl);


    /* Bessermitfahren.de */
    var bmUrl = 'http://www.bessermitfahren.de/' + fromCity + '/' + toCity + '/angebote';
    // Poor man's Unicode Normalization:
    bmUrl = ersetzeUmlauts(bmUrl.toLowerCase());
    addResult('bm', bmUrl);


    /* Mitfahrzentrale.de */
    var mfzUrl = 'http://www.mitfahrzentrale.de/suche.php?art=100&frmpost=1&STARTLAND=D&START=' + fromCity + '&ZIELLAND=D&ZIEL=' + toCity + '&abdat=';
    addResult('mfz', mfzUrl);


    /* Blablacar.de */
    var bbcUrl = 'http://www.blablacar.de/mitfahrgelegenheiten-angebote?fn=' + encodeURIComponent(fromCity) + '&tn=' + encodeURIComponent(toCity);
    addResult('bbc', bbcUrl);


    /* Flinc */
    var flincUrl = 'https://flinc.org/discover/' + fromCity + '..' + toCity;
    flincUrl = ersetzeUmlauts(flincUrl.toLowerCase());
    addResult('flinc', flincUrl);


    /* Fahrtfinder.net */
    var ffUrl = 'http://www.fahrtfinder.net/?von=' + encodeURIComponent(fromCity) + '&nach=' + encodeURIComponent(toCity);
    addResult('ff', ffUrl);


    /* Fahrgemeinschaft.de */
    /* ??? */


    /* TODO: Add a couple more */
};



/* Helpers */

function ersetzeUmlauts(s) {
    // Thanks http://stackoverflow.com/a/3140468
    var tr = {"\u00e4":"ae", "\u00fc":"ue", "\u00f6":"oe", "\u00df":"ss"};
    return s.replace(/[\u00e4|\u00fc|\u00f6|\u00df]/g, function(match) {return tr[match];});
}

function findId(id) {
    return document.getElementById(id);
}

function addResult(id, url) {
    setTimeout(function () {
        // Maximize/close buttons
        findId('results').innerHTML +=
            '<div class="result-buttons">' +
                '<button id="maximize-' + id + '">O</button>' +
                '<button id="close-' + id + '">X</button>' +
            '</div>';

        // Result iFrame
        var resDOM = document.createElement('iframe');
        resDOM.setAttribute('class', 'result');
        resDOM.setAttribute('id', id);
        resDOM.setAttribute('src', url);
        findId('results').appendChild(resDOM);
    }, 1);
}

/* Add String.trim if it's not natively available (IE<9). Thanks to
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
 */
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

