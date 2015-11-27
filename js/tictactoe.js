/*global Vue*/
require("../css/styles.css");

import Vue from 'vue';
import {box} from './box';

new Vue ({
	el: '#app',
	data: {
		board: getState('board').length ? getState('board') : [['', '', ''], ['', '', ''], ['', '', '']],
		cplayer: getState('cplayer').length ? getState('cplayer') : '1',
		players: Object.keys(getState('players')).length ? getState('players') : { '1': { turn: 'X', name: 'Robin', score: 0 }, '2': {turn: 'O', name: 'Arida', score: 0} },
		moves: getState('moves').length ? getState('moves') : 0
	},
	components: {
		box: box
	},
	methods: {
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
			let b = this.board;
			if((b[0][0] === b[0][1] && b[0][1] === b[0][2] && b[0][2] !== '') ||
				(b[0][0] === b[1][1] && b[1][1]  === b[2][2] && b[2][2] !== '') ||
				(b[0][0] === b[1][0] && b[1][0] === b[2][0] && b[2][0] !== '') ||
				(b[0][1] === b[1][1] && b[1][1] === b[2][1] && b[2][1] !== '') ||
				(b[0][2] === b[1][2] && b[1][2] === b[2][2] && b[2][2] !== '') ||
				(b[1][0] === b[1][1] && b[1][1] === b[1][2] && b[1][2] !== '') ||
				(b[2][0] === b[2][1] && b[2][1] === b[2][2] && b[2][2] !== '') ||
				(b[2][0] === b[1][1] && b[1][1] === b[0][2] && b[0][2] !== '')) {
				this.players[this.cplayer].score++;
				/* Sample template strings
				   `${this.players[this.cplayer].name} has won!` is same as this.players[this.cplayer].name + 
				   ' has won!' */
				alert(`${this.players[this.cplayer].name} has won!`);
				saveState('players', this.players);
				this.reset();	
			} else if(this.moves === 9) {
				alert('Draw!');
				this.reset();
			}
		},
		reset: function() {
			this.board = [['', '', ''], ['', '', ''], ['', '', '']];
			this.moves = 0;
			this.cplayer = '1';
		}
	},
	/* Sample enhanced object literals
		 ready: function() is same as ready() */
	ready() {
		/* Sample arrow function
			 function(value) is same as (value) => */
		this.$watch('board', (value) => saveState('board', value));
		this.$watch('cplayer', (value) => saveState('cplayer', value));
		this.$watch('moves', (value) => saveState('moves', value));
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
}