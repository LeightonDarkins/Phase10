import React from 'react';

import Constants from './constants';

import Card from './card';

var Hand = React.createClass({

  getDefaultProps: function() {
    return {
      cards:[]
    };
  },

  handlePlay: function(key) {
    this.props.onCardPlayed(key);
  },

  handlePhase: function(key) {
    this.props.onCardPhased(key);
  },

  render: function() {
    var cardElements = [];
    var points = 0;

    for (var i = 0; i < this.props.cards.length; i++) {
      var card = this.props.cards[i];

      if (card !== undefined) {
        points += card.value;
        cardElements.push(<Card id={card.key} key={card.key} number={card.number} color={card.color} inHand={true} onPlay={this.handlePlay} onPhase={this.handlePhase}/>);
      }
    }

    return (
      <div className='row hand-row'>
        {cardElements}
        <hr/>
        <span className='label label-success points'>
          Points In Hand: {points}
        </span>
      </div>
    );
  }
});

export default Hand;
