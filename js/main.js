YUI().use('node', 'transition', function (Y) {

    Y.one('#findRides').on('click', function () {
        var fromCity = Y.one('#fromCity').get('value');
        var toCity = Y.one('#toCity').get('value');

        Y.one('#query').transition({
            duration: 0.5, // secs
            'margin-top': '2em'
        }, function () {alert('boom!');});

        var mfgUrl = 'http://www.mitfahrgelegenheit.de/mitfahrzentrale/' +
                fromCity + '/' + toCity + '.html';
        Y.one('#results').empty().append('<iframe src="' + mfgUrl + '" class="result" />');
    });

});

