import React from 'react';

import Constants from './constants';

var Card = React.createClass({
  handleDraw: function() {
    this.props.onDraw();
  },

  handleClick: function(event) {
    var id = event.target.id;

    var elements = id.split('.');

    var action = elements[0];
    var key = elements[1];

    if (this.props.inHand === true) {
      if (elements[0] === 'phase') {
        this.props.onPhase(key);
      }

      if (elements[0] === 'trash') {
        this.props.onPlay(key);
      }
    } else {
      if (this.props.phased) {
        this.props.onPickup(key, 'phased');
      } else if (elements[0] === 'phase') {
        this.props.onPickup();
      }
    }
  },

  render: function() {
    if (this.props.faceDown) {
      return (
        <div className='card card-back' onClick={this.handleDraw}>
          <img className='card-icon' src={Constants.logoUrl}/>
        </div>
      );
    }

    var trashClass = 'fa fa-trash fa-2x card-action-icon';

    if (this.props.inHand === false) {
      trashClass += ' disabled';
    }

    var cardClass = 'card ';

    if (this.props.color === Constants.blue) {
      cardClass += Constants.blue;
    }

    if (this.props.color === Constants.red) {
      cardClass += Constants.red;
    }

    if (this.props.color === Constants.yellow) {
      cardClass += Constants.yellow;
    }

    if (this.props.color === Constants.green) {
      cardClass += Constants.green;
    }

    return (
      <div id={'card.' + this.props.id} className={cardClass} >
        <div id={'card.' + this.props.id} className='card-number'>
          {this.props.number}
        </div>
        <div className='card-action-section'>
          <div className='card-action-container'>
            <i id={'trash.' + this.props.id} className={trashClass} onClick={this.handleClick}></i>
          </div>
          <div className='card-action-container'>
            <i id={'phase.' + this.props.id} className='fa fa-plus fa-2x card-action-icon' onClick={this.handleClick}></i>
          </div>
        </div>
      </div>
    );
  }
});

export default Card;
