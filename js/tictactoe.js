/*global Vue*/
Vue.component('box', {
	template: '#box-template',
	props: ['value']
});

new Vue ({
	el: '#app',
	data: {
		board: [['', '', ''], ['', '', ''], ['', '', '']],
		cplayer: '1',
		players: { '1': { turn: 'X', name: 'Robin' }, '2': {turn: 'O', name: 'Arida'} },
		moves: '0',
		value: ''
	},
	watch: {
		board: function() {
			this.checkWinner();
		}
	},
	methods: {
/*		switchTurn: function() {
			this.players['1'] = this.
		}*/
		claim: function(x, y) {
			if(this.board[x][y] === '') {
				this.board[x].$set(y, this.players[this.cplayer].turn);
				this.nextTurn();
			} else {
				alert('This box is already taken!');
			}
		},
		nextTurn: function() {
			this.moves++;
			this.cplayer = this.cplayer === '1' ? '2' : '1';
		},
		checkWinner: function() {
			var b = this.board;
			if((b[0][0] === b[0][1] && b[0][1] === b[0][2] && b[0][2] !== '') ||
				(b[0][0] === b[1][1] && b[1][1]  === b[2][2] && b[2][2] !== '') ||
				(b[0][0] === b[1][0] && b[1][0] === b[2][0] && b[2][0] !== '') ||
				(b[0][1] === b[1][1] && b[1][1] === b[2][1] && b[2][1] !== '') ||
				(b[0][2] === b[1][2] && b[1][2] === b[2][2] && b[2][2] !== '') ||
				(b[1][0] === b[1][1] && b[1][1] === b[1][2] && b[1][2] !== '') ||
				(b[2][0] === b[2][1] && b[2][1] === b[2][2] && b[2][2] !== '') ||
				(b[2][0] === b[1][1] && b[1][1] === b[0][2] && b[0][2] !== '')) {
				alert(this.players[this.cplayer].name + ' has won!');
				this.reset();
			} else if(this.moves === 9) {
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
