var express = require('express');
var bodyParser = require('body-parser');
var guid = require('guid');
var port = process.env.PORT || 3000;
var app = express();

app.use(express.static('app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var players = [];
var game = undefined;
var deck = {};

var phases = [
	{
		number: 1,
		description: 'Two sets of three'
	},
	{
		number: 2,
		description: 'One set of three & one run of four'
	},
	{
		number: 3,
		description: 'One set of four & one run of four'
	},
	{
		number: 4,
		description: 'One run of seven'
	},
	{
		number: 5,
		description: 'One run of eight'
	},
	{
		number: 6,
		description: 'One run of nine'
	},
	{
		number: 7,
		description: 'Two sets of four'
	},
	{
		number: 8,
		description: 'Seven cards of one colour'
	},
	{
		number: 9,
		description: 'One set of five & one set of two'
	},
	{
		number: 10,
		description: 'One set of five & one set of three'
	},
];

app.get('/phases', function(req, res) {
	res.status(200).send(phases);
});

function guidAsString() {
	return '' + guid.create();
}

app.get('/game/new', function(req, res) {
	if (game !== undefined) {
		res.status(304).send();
	} else if (players.length < 2) {
		res.status(304).send();
	} else {
		game = getGameWithPlayers(players);

		res.status(200).send(game);
	}
});

app.delete('/game/:name', function(req, res) {
	console.info('delete');

	res.status(204).send();
});

function getGameWithPlayers(players) {
	return {
		id: guidAsString(),
		player1: players[0],
		player2: players[1]
	}
}

app.get('/player/new', function(req, res) {
	if (players.length === 2) {
		res.status(304).send();
	} else {
		var playerId = guidAsString()

		players.push(playerId);

		res.status(201).send(playerId);
	}
});

app.delete('/player/:name', function(req, res) {
	for (var i = 0; i < players.length; i++) {
		console.info('Arg: %s. Player: %s', req.params.name, players[i]);

		if (players[i] === req.params.name) {
			console.info('Removing: %s', players[i]);

			players.splice(i, 1);
		}
	}

	res.status(200).send(players);
});

app.listen(port);
console.log('Server loaded. The magic happens on port', port)
