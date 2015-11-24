/*global Vue*/
Vue.component('box', {
	template: '#box-template',
	props: ['value']
});

new Vue ({
	el: '#app',
/*	data: {
		board: [['', '', ''], ['', '', ''], ['', '', '']],
		cplayer: '1',
		players: { '1': { turn: 'X', name: 'Robin' }, '2': {turn: 'O', name: 'Arida'} },
		moves: '0'
	},*/
	data: {
		board: getState('board').length ? getState('board') : [['', '', ''], ['', '', ''], ['', '', '']],
		cplayer: getState('cplayer').length ? getState('cplayer') : '1',
		players: getState('players').length ? getState('players') : { '1': { turn: 'X', name: 'Robin', score: 0 }, '2': {turn: 'O', name: 'Arida', score: 0} },
		moves: getState('moves').length ? getState('moves') : 0
	},
	methods: {
		switchTurn: function() {
			var temp = this.players['1'];
/*			this.players.$set('1', this.players['2']);
			this.players.$set('2', temp);*/
			this.players['1'] = this.players['2'];
			this.players['2'] = temp;
		},
		claim: function(x, y) {
			if(this.board[x][y] === '') {
				this.board[x].$set(y, this.players[this.cplayer].turn);
				this.moves++;
				this.checkWinner();
				this.nextTurn();
			} else {
				alert('This box is already taken!');
			}
		},
		nextTurn: function() {
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
			this.switchTurn();
			this.cplayer = '1';
		}
	},
	ready: function() {
		this.$watch('board', function(value) {
			saveState('board', value);
		});
		this.$watch('cplayer', function(value) {
			saveState('cplayer', value);
		});
		this.$watch('players', function(value) {
			alert('test');
			saveState('players', value);
		});
		this.$watch('moves', function(value) {
			saveState('moves', value);
		});
	}
});

function getState(key) {
	if(localStorage.getItem(key)) {
		return JSON.parse(localStorage.getItem(key));
	}
	return [];
}

function saveState(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
	if(key === 'players') {
		alert(JSON.stringify(value));
	}
}