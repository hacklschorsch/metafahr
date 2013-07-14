YUI().use('node', 'transition', 'resize', function (Y) {

    Y.one('#findRides').on('click', function () {
        var fromCity = Y.one('#fromCity').get('value');
        var toCity = Y.one('#toCity').get('value');

        Y.one('#container').transition({
            duration: 0.5, // secs
            'margin-top': '2em'
        });

        var mfgUrl = 'http://www.mitfahrgelegenheit.de/mitfahrzentrale/' +
                fromCity + '/' + toCity + '.html';
        Y.one('#results').empty().append('<iframe src="' + mfgUrl + '" class="result" />');
        var mfgResize = new Y.Resize({node: '.result'});
    });

});

