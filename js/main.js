YUI().use('node', 'transition', 'resize', function (Y) {

    Y.one('#findRides').on('click', function () {
        Y.one('#container').transition({
            duration: 0.5, // secs
            'margin-top': '2em'
        });

        var mfgUrl = 'http://www.mitfahrgelegenheit.de/mitfahrzentrale/M%C3%BCnchen/Erlangen.html';
        Y.one('#results').empty().append('<iframe src="' + mfgUrl + '" class="result" />');
        var mfgResize = new Y.Resize({node: '.result'});
    });

});

