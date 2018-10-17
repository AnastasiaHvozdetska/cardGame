// Start game.
document.querySelector('#start').addEventListener('click', function () {
	GuessCard.init();
});

// Get settings.
var GuessCard = new GuessCard({
	level: { // level settings
		junior: {
			board: {
				x: 6,
				y: 5
			},
			repeat: 2
		},
		middle: {
			board: {
				x: 10,
				y: 12
			},
			repeat: 4
		},
		senior: {
			board: {
				x: 20,
				y: 14
			},
			repeat: 8
		}
	},
	board: {
		container: '#board', // game container
	}
})

// Build a game board.
function GuessCard(args) {
	// Declare const.
	const $this = this;
	const level = 'junior';
	const board = args.level[level]; //
	const boardContainer = args.board.container;

	this.init = function () {
		if ((board.board.x * board.board.y) % board.repeat === 0) {
			$this.buildBoard()

			var array = $this.buildArray()

			var sort_array = $this.sortRandArray(array)

			var matrix_array = $this.toMatrix(sort_array)


			$this.findIndex(matrix_array);

			// $this.cardsRandom()
		} else {
			console.error('pshol von. ne buduiy')
		}
	}

	// Function for building 
	this.buildBoard = function () {
		for (var i = 0; i < board.board.y; i++) {
			// arr[i] = [];
			var item = document.createElement("div");
			item.classList.add('row');
			item.style = "grid-template-columns: repeat(" + board.board.x + ", 1fr)"
			document.querySelector(boardContainer).appendChild(item);

			for (var j = 0; j < board.board.x; j++) {
				// arr[i][j] = j+i;
				var card = document.createElement('div');
				card.classList.add('flipper-container');
				item.appendChild(card);
				card.innerHTML = '<div class="flipping-card"><div class="front-card"></div><div class="back-card"></div></div>'
			}
		}
	}
	// Function for random cards.
	this.sortRandArray = function (arr_input) {
		var arr_output = arr_input.sort(function () {
			return .5 - Math.random();
		});

		return arr_output;
	}

	// Function for building array.
	this.buildArray = function () {
		var array = [];
		var key = 0;

		for (var i = 0; i < (board.board.x * board.board.y) / board.repeat; i++) {
			for (var k = 0; k < board.repeat; k++) {
				array[key++] = i;
			}
		}
		return array
	}

	// Function for building array.
	this.toMatrix = function (sort_array) {
		var array = [];
		var key = 0;

		for (var i = 0; i < board.board.y; i++) {
			array[i] = [];
			for (var j = 0; j < board.board.x; j++) {
				array[i][j] = sort_array[key++];
			}
		}
		return array
	}


	this.findIndex = function (array) {
		// Synchronize matrix and board.
		document.querySelector('.board-container').addEventListener('click', function (el) {
			// Get row's index.
			const y = Array.from(document.querySelectorAll('.row')).indexOf(el.target.parentNode.parentNode.parentNode);
			// Get element's index relatively row.
			const x = Array.from(document.querySelectorAll('.row')[y].querySelectorAll('.flipper-container')).indexOf(el.target.parentNode.parentNode);
			el.target.parentNode.classList.toggle('active')
		});
	}
}
