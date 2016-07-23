import React from 'react';

import Constants from './constants';

import Card from './card';
import Deck from './deck';
import Hand from './hand';
import Phases from './phases';
import Phase from './phase';

var PhaseTen = React.createClass({
  getInitialState: function() {
    return {
      used: [],
      deck: Deck.newDeck(),
      currentCard: {},
      hand:[],
      phase: Phases.getPhaseByNumber(2),
      phaseCards:[]
    };
  },

  componentDidMount: function() {
    this.setState({
      hand: this.deal(),
      currentCard: this.getRandomCard()
    });
  },

  deal: function() {
    var hand = [];

    for (var i = 0; i < 10; i++) {
      var card = this.getRandomCard();

      hand.push(card);
    }

    return hand;
  },

  getRandomCard: function() {
    var notNewNumber = true;
    var index = undefined;

    if (this.state.deck.length === this.state.used.length) {
      return undefined;
    }

    while (notNewNumber) {
      index = Math.floor((Math.random() * this.state.deck.length));

      if (this.state.used.indexOf(index) === -1) {
        notNewNumber = false;
        this.state.used.push(index);
      }
    }

    return this.state.deck[index];
  },

  handleDraw: function() {
    var randomCard = this.getRandomCard();

    if (randomCard === undefined) {
      alert('all done!');
      return;
    }

    var hand = this.state.hand;

    hand.push(randomCard);

    this.setState({
      hand: hand
    });
  },

  handlePickup: function(key, type) {


    if (type === undefined) {
      var hand = this.state.hand;

      hand.push(this.state.currentCard);

      this.setState({
        hand: hand,
        currentCard: {number: 'X'}
      });
    } else if (type = 'phased') {
      if (key !== undefined) {
        var card = {};
        var phaseCards = this.state.phaseCards;

        for (var i = 0; i < phaseCards.length; i++) {
          if (phaseCards[i] !== undefined) {
            if (phaseCards[i].key.value === key) {
              card = phaseCards[i];
              delete phaseCards[i];
            }
          }
        }

        var hand = this.state.hand;

        hand.push(card);

        this.setState({
          hand: hand,
          phaseCards: phaseCards
        });
      }
    }
  },

  handleCardPlayed: function(key) {
    if (key !== undefined) {
      var card = {};

      var hand = this.state.hand;

      for (var i = 0; i < hand.length; i++) {
        if (hand[i] !== undefined) {
          if (hand[i].key.value === key) {
            card = hand[i];
            delete hand[i];
          }
        }
      }

      this.setState({
        currentCard: card,
        hand: hand
      });
    }
  },

  handleCardPhased: function(key) {
    if (key !== undefined) {
      var card = {};

      var hand = this.state.hand;

      for (var i = 0; i < hand.length; i++) {
        if (hand[i] !== undefined) {
          if (hand[i].key.value === key) {
            card = hand[i];
            delete hand[i];
          }
        }
      }

      var phaseCards = this.state.phaseCards;

      phaseCards.push(card);

      this.setState({
        phaseCards: phaseCards,
        hand: hand
      });
    }
  },

  render: function() {
    return (

      <div className='container'>
        <h1>Phase {this.state.phase.number}</h1>

        <div className='row game-row'>
          <div className='col-sm-6 current-card-column'>
            <Card
              id={this.state.currentCard.key}
              number={this.state.currentCard.number}
              color={this.state.currentCard.color}
              faceDown={false}
              inHand={false}
              onPickup={this.handlePickup}
              />
          </div>

          <div className='col-sm-6 card-pile-column'>
            <Card faceDown={true} onDraw={this.handleDraw}/>
          </div>

        </div>

        <Phase phase={this.state.phase} cards={this.state.phaseCards} onCardPickedUp={this.handlePickup}/>

        <Hand cards={this.state.hand} onCardPlayed={this.handleCardPlayed} onCardPhased={this.handleCardPhased}/>
      </div>
    );
  }
});

export default PhaseTen;
