/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*global Vue*/

	new Vue ({
		el: '#app',
		data: {
			board: getState('board').length ? getState('board') : [['', '', ''], ['', '', ''], ['', '', '']],
			cplayer: getState('cplayer').length ? getState('cplayer') : '1',
			players: Object.keys(getState('players')).length ? getState('players') : { '1': { turn: 'X', name: 'Robin', score: 0 }, '2': {turn: 'O', name: 'Arida', score: 0} },
			moves: getState('moves').length ? getState('moves') : 0
		},
		components: {
			'box': __webpack_require__(2)
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
				var b = this.board;
				if((b[0][0] === b[0][1] && b[0][1] === b[0][2] && b[0][2] !== '') ||
					(b[0][0] === b[1][1] && b[1][1]  === b[2][2] && b[2][2] !== '') ||
					(b[0][0] === b[1][0] && b[1][0] === b[2][0] && b[2][0] !== '') ||
					(b[0][1] === b[1][1] && b[1][1] === b[2][1] && b[2][1] !== '') ||
					(b[0][2] === b[1][2] && b[1][2] === b[2][2] && b[2][2] !== '') ||
					(b[1][0] === b[1][1] && b[1][1] === b[1][2] && b[1][2] !== '') ||
					(b[2][0] === b[2][1] && b[2][1] === b[2][2] && b[2][2] !== '') ||
					(b[2][0] === b[1][1] && b[1][1] === b[0][2] && b[0][2] !== '')) {
					this.players[this.cplayer].score++;
					alert(this.players[this.cplayer].name + ' has won!');
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
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
		template: '#box-template',
		props: ['value']
	}
	/*Vue.component('box', {
		template: '#box-template',
		props: ['value']
	});
	*/

/***/ },
/* 3 */
/***/ function(module, exports) {

	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		/*global Vue*/

		new Vue ({
			el: '#app',
			data: {
				board: getState('board').length ? getState('board') : [['', '', ''], ['', '', ''], ['', '', '']],
				cplayer: getState('cplayer').length ? getState('cplayer') : '1',
				players: Object.keys(getState('players')).length ? getState('players') : { '1': { turn: 'X', name: 'Robin', score: 0 }, '2': {turn: 'O', name: 'Arida', score: 0} },
				moves: getState('moves').length ? getState('moves') : 0
			},
			components: {
				'box': __webpack_require__(1)
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
					var b = this.board;
					if((b[0][0] === b[0][1] && b[0][1] === b[0][2] && b[0][2] !== '') ||
						(b[0][0] === b[1][1] && b[1][1]  === b[2][2] && b[2][2] !== '') ||
						(b[0][0] === b[1][0] && b[1][0] === b[2][0] && b[2][0] !== '') ||
						(b[0][1] === b[1][1] && b[1][1] === b[2][1] && b[2][1] !== '') ||
						(b[0][2] === b[1][2] && b[1][2] === b[2][2] && b[2][2] !== '') ||
						(b[1][0] === b[1][1] && b[1][1] === b[1][2] && b[1][2] !== '') ||
						(b[2][0] === b[2][1] && b[2][1] === b[2][2] && b[2][2] !== '') ||
						(b[2][0] === b[1][1] && b[1][1] === b[0][2] && b[0][2] !== '')) {
						this.players[this.cplayer].score++;
						alert(this.players[this.cplayer].name + ' has won!');
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
		}

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		module.exports = {
			template: '#box-template',
			props: ['value']
		}
		/*Vue.component('box', {
			template: '#box-template',
			props: ['value']
		});
		*/

	/***/ }
	/******/ ]);

/***/ }
/******/ ]);