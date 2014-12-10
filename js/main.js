/* Javascript for MetaFahr.de (c) Florian Sesser 2013.
 *
 * Glad you've come here. Do as you please: This code is licensed
 * under the WTFPL, see http://www.wtfpl.net/
 * However I would be proud to hear from you if you find anything
 * I have built useful. Maybe we'll have a beer some time.
 * I welcome issue reports and pull requests at
 * https://github.com/hacklschorsch/metafahr
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
	/* breaks out of its iFrame
    var bmUrl = 'http://www.bessermitfahren.de/' + fromCity + '/' + toCity + '/angebote';
    // Poor man's Unicode Normalization:
    bmUrl = ersetzeUmlauts(bmUrl.toLowerCase());
    addResult('bm', bmUrl);
	*/


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
        findId('results').innerHTML +=
            '<div class="result" id="result-' + id + '">' +
                '<div class="buttons">' +
                    '<button id="maximize-' + id + '">O</button>' +
                    '<button id="close-' + id + '">X</button>' +
                '</div>' +
                '<iframe id="' + id + '" src="' + url + '" />' +
            '</div>';
    }, 1);
    setTimeout(function () {
        findId('maximize-' + id).addEventListener('click', function () {
            findId(id).style.height = '100%';
        });
        findId('close-' + id).addEventListener('click', function () {
            findId('result-' + id).outerHTML = ''; // TODO ugly, probably not portable.
        });
    }, 200); // TODO: racy, workaround (at least) for Opera. FF and Chrome will work w/ '2'.
}

/* Add String.trim if it's not natively available (IE<9). Thanks to
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
 */
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

