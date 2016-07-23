import guid from 'guid';

import Constants from './constants';

function pushCard(deck, number, color) {
  if (number <= 12) {
    deck.push({
      key: guid.create(),
      number: number,
      color: color,
      value: getValueByNumber(number)
    });

    deck.push({
      key: guid.create(),
      number: number,
      color: color,
      value: getValueByNumber(number)
    });
  } else {
    deck.push({
      key: guid.create(),
      number: 'W',
      color: color,
      value: 25
    });
  }
};

function getValueByNumber(number) {
  if (number <= 9) {
    return 5;
  } else {
    return 10;
  }
}

function addSkips(deck) {
  for (var i = 0; i < 4; i++) {
    deck.push({
      key: guid.create(),
      number:'S',
      color: Constants.blue,
      value: 15
    });
  }
};

var Deck = {
  newDeck: function() {
    var deck = [];

    for (var color = 0; color < 4; color++) {
      for (var number = 1; number <= 14; number++) {
        if (color === 0) {
          pushCard(deck, number, Constants.blue);
        } else if (color === 1) {
          pushCard(deck, number, Constants.red);
        } else if (color === 2) {
          pushCard(deck, number, Constants.yellow);
        } else if (color === 3) {
          pushCard(deck, number, Constants.green);
        }
      }
    }

    addSkips(deck);

    return deck;
  }
};

export default Deck;
