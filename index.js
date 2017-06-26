const morgan = require('morgan'),
    envVar = require('dotenv').config(),
    express = require('express'),
    nijelApp = express(),
    port = process.env.PORT || envVar.PORT;


nijelApp.use(morgan('dev'));

nijelApp.use(express.static('public'));

nijelApp.get('*', (req, res) => {
    res.sendFile('index.html', {
        root: './public'
    });
});

nijelApp.listen(port, () => {
    console.log('server running on port ' + port);
});
