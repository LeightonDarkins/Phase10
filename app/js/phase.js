import React from 'react';

import Constants from './constants';

import Card from './card';

var Phase = React.createClass({

  getDefaultProps: function() {
    return {
      cards:[]
    };
  },

  handlePickup: function(key, type) {
    this.props.onCardPickedUp(key, type)
  },

  render: function() {
    var cardElements = [];

    for (var i = 0; i < this.props.cards.length; i++) {
      var card = this.props.cards[i];

      if (card !== undefined) {
        cardElements.push(<Card id={card.key} key={card.key} number={card.number} color={card.color} inHand={false} phased={true} onPickup={this.handlePickup}/>);
      }
    }

    return (
      <div className='row phase-row'>
        <div className='label label-info phase'>{this.props.phase.description}</div>
        <br/>
        {cardElements}
      </div>


    );
  }
});

export default Phase;
