var express = require('express'),
    app = express();

app.use(express.static(__dirname));
app.use(express.bodyParser());

/* -------------------------------------------------- DATA START ---------------------------------------------------- */

var albums = {
    '1': {
        title: 'Dark Side Of The Moon',
        band: 'Pink Floyd'
    },
    '2': {
        title: 'Thriller',
        band: 'Michael Jackson'
    },
    '3': {
        title: 'In the Court of the Crimson King',
        band: 'King Crimson'
    }
};

/* -------------------------------------------------- DATA END ------------------------------------------------------ */

/* -------------------------------------------------- STATIC PAGES START -------------------------------------------- */

app.get('/', function(req, res, next){
    res.sendfile(__dirname + '/index.html');
});

app.get('/ajax', function(req, res, next){
    res.sendfile(__dirname + '/1.ajax.html');
});

/* -------------------------------------------------- STATIC PAGES END ---------------------------------------------- */

/* -------------------------------------------------- API START ----------------------------------------------------- */

app.post('/api/albums', function(req, res, next){
    var album = albums[req.body.album_id],
        data = { outcome: 'success', album: album };

    if(!album) return res.send({ error: 'no data found' });
    return res.send(data);
});

/* -------------------------------------------------- API END ------------------------------------------------------- */

app.listen(8000);
