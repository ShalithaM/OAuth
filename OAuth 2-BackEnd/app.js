var express = require('express'),
	bodyParser = require('body-parser'),
	oauthserver = require('oauth2-server'),
	cors = require('cors')

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.oauth = oauthserver({
	model: require('./config.js'),
	grants: ['password', 'client_credentials'],
	debug: true
});

app.all('/login', app.oauth.grant());

app.get('/', app.oauth.authorise(), function (req, res) {
	res.send({ status: "success" });
});

app.use(app.oauth.errorHandler());

app.listen(3000, function () {
	console.log('app listening on port ' + 3000);
});
