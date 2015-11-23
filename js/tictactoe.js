/*global Vue*/
Vue.component('box', {
	template: '#box-template',
	props: ['value', 'cplayer'],
	methods: {
		claim: function() {
			if(this.value === '') {
				this.value = (this.cplayer === 'player1' ? 'X' : 'O');
			} else {
				alert('This box is already taken!');
			}
		}
	}
});

new Vue ({
	el: '#app',
	data: {
		board: [['', '', ''], ['', '', ''], ['', '', '']],
		cplayer: 'player1',
		moves: '0'
	},
	watch: {
		board: function() {
			this.moves++;
			this.checkWinner();
			this.nextTurn();
		}
	},
	methods: {
		nextTurn: function() {
			this.cplayer = this.cplayer === 'player1' ? 'player2' : 'player1';
		},
		checkWinner: function() {
			var b = this.board;
			if((b[0][0] === b[0][1] && b[0][1] === b[0][2] && b[0][2] !== '') ||
				(b[0][0] === b[1][1] && b[1][1]  === b[2][2] && b[2][2] !== '') ||
				(b[0][0] === b[1][0] && b[1][0] === b[2][0] && b[2][0] !== '') ||
				(b[0][1] === b[1][1] && b[1][1] === b[2][1] && b[2][1] !== '') ||
				(b[0][2] === b[1][2] && b[1][2] === b[2][2] && b[2][2] !== '') ||
				(b[1][0] === b[1][1] && b[1][1] === b[1][2] && b[1][2] !== '') ||
				(b[2][0] === b[2][1] && b[2][1] === b[2][2] && b[2][2] !== '')) {
				alert(this.cplayer + ' has won!');
				this.reset();
			} else if(this.moves > 9) {
				alert('Draw!');
				this.reset();
			}
		},
		reset: function() {
			this.board = [['', '', ''], ['', '', ''], ['', '', '']];
			this.moves = 0;
		}
	}
});
