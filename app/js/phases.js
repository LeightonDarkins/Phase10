var Phases = {
  getPhaseByNumber: function(number) {
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].number === number) {
        return this.list[i];
      }
    }
  },
  list: [
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
  ]
};

export default Phases;
