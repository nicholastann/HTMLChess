var submittedTurn = false;
var gameover = false;
var turn = true;
(function(){
		// Save a reference to the root
		var root = this;
		
		// Pre-configure a standard chessboard layout
		var set_board = {
			8: "BR", 16: "BKN", 24: "BB", 32: "BK", 40: "BQ", 48: "BB", 56: "BKN", 64: "BR",
			7: "BP", 15: "BP", 23: "BP", 31: "BP", 39: "BP", 47: "BP", 55: "BP", 63: "BP",
			
			// White Pieces
			2: "WP", 10: "WP", 18: "WP", 26: "WP", 34: "WP", 42: "WP", 50: "WP", 58: "WP",
			1: "WR", 9: "WKN", 17: "WB", 25: "WK", 33: "WQ", 41: "WB", 49: "WKN", 57: "WR"
		}
		
		
		
		
		// A simple lookup object for piece labels
		// FullName, White ASCII, Black ASCII
		var fullpieces = {
			"K": ["King", "&#9813;", "&#9819;"],
			"Q": ["Queen", "&#9812;", "&#9818;"],
			"B": ["Bishop", "&#9815;", "&#9821;"],
			"KN": ["Knight", "&#9816;", "&#9822;"],
			"R": ["Rook", "&#9814;", "&#9820;"],
			"P": ["Pawn", "&#9817;", "&#9823;"]
		}
		
		
		
		// Create a global variable to access the ChessBoard library at anytime
		var ChessBoard = root.ChessBoard = function(positions) {
			
			// If any positions are passed to the board use them for the setup.
			// Otherwise load the board with a standard setup. This allows for saving and starting of games
			this.positions = positions || $.extend(true, {}, set_board);
			
			var chessboard = this;
			chessboard.fullpieces = fullpieces;
					
			
			
			
			//event occurs immediately after submit is pressed
			this.setsubmittedTurn = function(old_position, new_position) {
				submittedTurn = true; //exits waity loop
				resumeplay(old_position, new_position, true, chessboard);
			}

			
			
			
			//begins game logic. continues until gameover true. rest of logic is in resumeplay. broken in 2 bc wait for input by user
			this.game = function(old_position, new_position, newgame) {
				if (newgame) alert("Beginning chess game!"); //newgame only true if you hit game button
				if (gameover == false) { //since we will be calling game repeatedly this will act as a while loop waiting for game to finish
					submittedTurn = false;
					resumeplay(old_position, new_position, false, chessboard); 
				}
			}
		};
}).call(this);








//determines validity of every move given int representation of user input
validmove = function(nold_position, nnew_position) {
	//does old pos have a piece owned by player and is new pos already occupied by friendly piece
	if (turn) {
		if (document.getElementById(nold_position).innerHTML == "<a>♚</a>") return false;
		if (document.getElementById(nold_position).innerHTML == "<a>♛</a>") return false;
		if (document.getElementById(nold_position).innerHTML == "<a>♜</a>") return false;
		if (document.getElementById(nold_position).innerHTML == "<a>♝</a>") return false;
		if (document.getElementById(nold_position).innerHTML == "<a>♞</a>") return false;
		if (document.getElementById(nold_position).innerHTML == "<a>♟</a>") return false;
		if (document.getElementById(nold_position).innerHTML == "") return false;

		if (document.getElementById(nnew_position).innerHTML == "<a>♔</a>") return false;
		if (document.getElementById(nnew_position).innerHTML == "<a>♕</a>") return false;
		if (document.getElementById(nnew_position).innerHTML == "<a>♖</a>") return false;
		if (document.getElementById(nnew_position).innerHTML == "<a>♗</a>") return false;
		if (document.getElementById(nnew_position).innerHTML == "<a>♘</a>") return false;
		if (document.getElementById(nnew_position).innerHTML == "<a>♙</a>") return false;
	}
	else {
		if (document.getElementById(nold_position).innerHTML == "<a>♔</a>") return false;
		if (document.getElementById(nold_position).innerHTML == "<a>♕</a>") return false;
		if (document.getElementById(nold_position).innerHTML == "<a>♖</a>") return false;
		if (document.getElementById(nold_position).innerHTML == "<a>♗</a>") return false;
		if (document.getElementById(nold_position).innerHTML == "<a>♘</a>") return false;
		if (document.getElementById(nold_position).innerHTML == "<a>♙</a>") return false;
		if (document.getElementById(nold_position).innerHTML == "") return false;

		if (document.getElementById(nnew_position).innerHTML == "<a>♚</a>") return false;
		if (document.getElementById(nnew_position).innerHTML == "<a>♛</a>") return false;
		if (document.getElementById(nnew_position).innerHTML == "<a>♜</a>") return false;
		if (document.getElementById(nnew_position).innerHTML == "<a>♝</a>") return false;
		if (document.getElementById(nnew_position).innerHTML == "<a>♞</a>") return false;
		if (document.getElementById(nnew_position).innerHTML == "<a>♟</a>") return false;
	}

		 //inside ifs will be logic for moving specific pieces
		if (document.getElementById(nold_position).innerHTML == "<a>♔</a>" || document.getElementById(nold_position).innerHTML == "<a>♚</a>") { //king logic
			if (nold_position == 1) { //bottom left corner cant move upleft, left, downleft, down, downright
				if (nnew_position != 2 && nnew_position != 9 && nnew_position != 10) return false;
			}
			else if (nold_position == 8) { //top left corner cant move upright, up, upleft, left, downleft
				if (nnew_position != 7 && nnew_position != 16 && nnew_position != 15) return false;
			}
			else if (nold_position == 57) { //bottom right corner cant move upright, right, downright, down, downleft
				if (nnew_position != 58 && nnew_position != 50 && nnew_position != 49) return false;
			}
			else if (nold_position == 64) { //top right corner cant move upleft, up, upright, right downright
				if (nnew_position != 63 && nnew_position != 56 && nnew_position != 55) return false;
			}
			else if (nold_position < 8) { //left side cant move left upleft or downleft
				if (nnew_position != nold_position+9 && nnew_position != nold_position+8 && nnew_position != nold_position+7 && nnew_position != nold_position+1 && nnew_position != nold_position-1) return false;
			}
			else if (nold_position % 8 == 0) { //top side cant move up upright or upleft or up
				if (nnew_position != nold_position-8 && nnew_position != nold_position+8 && nnew_position != nold_position+7 && nnew_position != nold_position-7 && nnew_position != nold_position-1) return false;
			}
			else if (nold_position % 9 == 0) { //bottom side cant move down downright or downleft
				if (nnew_position != nold_position-8 && nnew_position != nold_position+8 && nnew_position != nold_position+7 && nnew_position != nold_position-7 && nnew_position != nold_position+1) return false;
			}
			else if (nold_position > 56) { //right side cant move right upright or downright
				if (nnew_position != nold_position-9 && nnew_position != nold_position-8 && nnew_position != nold_position-7 && nnew_position != nold_position+1 && nnew_position != nold_position-1) return false;
			}
			else { //not on edges can only move once step in all orthogonal or diagonols
				if (nnew_position != nold_position-9 && nnew_position != nold_position-8 && nnew_position != nold_position-7 && nnew_position != nold_position-1 &&
					nnew_position != nold_position+9 && nnew_position != nold_position+8 && nnew_position != nold_position+7 && nnew_position != nold_position+1) return false;
			}
		}


		if (document.getElementById(nold_position).innerHTML == "<a>♕</a>" || document.getElementById.innerHTML == "<a>♛</a>") { //queen logic
			if (Math.ceil(nold_position / 8) == Math.ceil(nnew_position / 8) ) { //up down
				var steps = nnew_position - nold_position;
				if (steps > 0) {
					for(var i = 0; i<steps-1; i++) {
						nold_position++;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
				else {
					for (var i = 0; i < (steps*-1)-1; i++) {
						nold_position--;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
			}
			else if (nold_position % 8 == nnew_position % 8) { //left right
				var steps = Math.floor(nnew_position / 8) - Math.floor(nold_position / 8);
				if (steps > 0) {
					for(var i = 0; i<steps-1; i++) {
						nold_position+=8;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
				else {
					for (var i = 0; i < (steps*-1)-1; i++) {
						nold_position-=8;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
			}
			
			else if (nold_position % 9 == nnew_position % 9) { //upright/downleft
				var steps = Math.floor(nnew_position / 9) - Math.floor(nold_position / 9);
				if (steps > 0) {
					for(var i = 0; i<steps-1; i++) {
						nold_position+=9;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
				else {
					for (var i = 0; i < (steps*-1)-1; i++) {
						nold_position-=9;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
			}
			
			else if (nold_position % 7 == nnew_position % 7) { //downright upleft
				var steps = Math.floor(nnew_position / 7) - Math.floor(nold_position / 7);
				if (steps > 0) {
					for(var i = 0; i<steps-1; i++) {
						nold_position+=7;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
				else {
					for (var i = 0; i < (steps*-1)-1; i++) {
						nold_position-=7;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
			}
			else {
				alert("not a straight line");
				return false;
			}
		}

		else if (document.getElementById(nold_position).innerHTML == "<a>♖</a>" || document.getElementById(nold_position).innerHTML == "<a>♜</a>") { //rook logic
			//same as queen but without the option to go in the diagnols
			if (Math.ceil(nold_position / 8) == Math.ceil(nnew_position / 8) ) { //up down
				var steps = nnew_position - nold_position;
				if (steps > 0) {
					for(var i = 0; i<steps-1; i++) {
						nold_position++;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
				else {
					for (var i = 0; i < (steps*-1)-1; i++) {
						nold_position--;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
			}
			else if (nold_position % 8 == nnew_position % 8) { //left right
				var steps = Math.floor(nnew_position / 8) - Math.floor(nold_position / 8);
				if (steps > 0) {
					for(var i = 0; i<steps-1; i++) {
						nold_position+=8;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
				else {
					for (var i = 0; i < (steps*-1)-1; i++) {
						nold_position-=8;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
			}
			else {
				alert("not orthogonal line");
				return false;
			}
		}

		else if (document.getElementById(nold_position).innerHTML == "<a>♗</a>" || document.getElementById(nold_position).innerHTML == "<a>♝</a>") {
			//same as queen without the option to move along orthogonals
			if (nold_position % 9 == nnew_position % 9) { //upright/downleft
				var steps = Math.floor(nnew_position / 9) - Math.floor(nold_position / 9);
				if (steps > 0) {
					for(var i = 0; i<steps-1; i++) {
						nold_position+=9;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
				else {
					for (var i = 0; i < (steps*-1)-1; i++) {
						nold_position-=9;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
			}
			
			else if (nold_position % 7 == nnew_position % 7) { //downright upleft
				var steps = Math.floor(nnew_position / 9) - Math.floor(nold_position / 9);
				if (steps > 0) {
					for(var i = 0; i<steps-1; i++) {
						nold_position+=7;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
				else {
					for (var i = 0; i < (steps*-1)-1; i++) {
						nold_position-=7;
						if (document.getElementById(nold_position).innerHTML != "") return false;
					}
				}
			}
			else {
				alert("not a diagonol");
				return false;
			}
		}

		else if (document.getElementById(nold_position).innerHTML == "<a>♘</a>"  || document.getElementById(nold_position).innerHTML == "<a>♞</a>") {
			if (nold_position == 1) { //2 move options at corners
				if (nnew_position != nold_position+10 && nnew_position != nold_position+17) return false;
			}
			else if (nold_position == 8) {
				if (nnew_position != nold_position+15 && nnew_position != nold_position+6) return false;
			}
			else if (nold_position == 64) {
				if (nnew_position != nold_position-10 && nnew_position != nold_position-17) return false;
			}
			else if (nold_position == 57) {
				if (nnew_position != nold_position-6 && nnew_position != nold_position-15) return false;
			}

			else if (nold_position == 2) { //3 around squares adjacent to corners
				if (nnew_position != nold_position+17 && nnew_position != nold_position+10 && nnew_position != nold_position+15) return false;
			}
			else if (nold_position == 9) {
				if(nnew_position == nold_position-6) return true;
				if (nnew_position != nold_position+17 && nnew_position != nold_position+10 && nnew_position != nold_position-6) return false;
			}
			else if (nold_position == 7) {
				if (nnew_position != nold_position+8 && nnew_position != nold_position+15 && nnew_position != nold_position+17) return false;
			}
			else if (nold_position == 16) {
				if (nnew_position != nold_position-10 && nnew_position != nold_position-6 && nnew_position != nold_position+15) return false;
			}
			else if (nold_position == 56) {
				if (nnew_position != nold_position-17 && nnew_position != nold_position-10 && nnew_position != nold_position+8) return false;
			}
			else if (nold_position == 63) {
				if (nnew_position != nold_position-17 && nnew_position != nold_position-10 && nnew_position != nold_position-15) return false;
			}
			else if (nold_position == 58) {
				if (nnew_position != nold_position-6 && nnew_position != nold_position-15 && nnew_position != nold_position-17) return false;
			}
			else if (nold_position == 49) {
				if (nnew_position != nold_position-6 && nnew_position != nold_position+10 && nnew_position != nold_position-15) return false;
			}

			else if (nold_position < 8) {//4 along sides and 1 step diagonol from corners
				if (nnew_position != nold_position+10 && nnew_position != nold_position+17 && nnew_position != nold_position+15 && nnew_position != nold_position+8 ) return false;
			}
			else if (nold_position % 8 == 0) {
				if (nnew_position != nold_position-17 && nnew_position != nold_position+8 && nnew_position != nold_position+15 && nnew_position != nold_position-10 ) return false;
			}
			else if (nold_position % 9 == 0) {
				if (nnew_position != nold_position-6 && nnew_position != nold_position+10 && nnew_position != nold_position-15 && nnew_position != nold_position+17) return false;
			}
			else if (nold_position > 56) {
				if (nnew_position != nold_position-6 && nnew_position != nold_position-15 && nnew_position != nold_position-17 && nnew_position != nold_position-10) return false;
			}
			else if(nold_position == 15) {
				if (nnew_position != nold_position-10 && nnew_position != nold_position+8 && nnew_position != nold_position+15 && nnew_position != nold_position+17 ) return false;
			}
			else if (nold_position == 10) {
				if (nnew_position != nold_position-6 && nnew_position != nold_position+10 && nnew_position != nold_position+17 && nnew_position != nold_position+15 ) return false;
			}
			else if (nold_position == 50) {
				if (nnew_position != nold_position-6 && nnew_position != nold_position+10 && nnew_position != nold_position-15 && nnew_position != nold_position-17 ) return false;
			}
			else if (nold_position == 55) {
				if (nnew_position != nold_position-10 && nnew_position != nold_position+8 && nnew_position != nold_position-15 && nnew_position != nold_position-17 ) return false;
			}
			

			else if (nold_position < 16) { //6 options available along perimeter of remaining squares
				if (nnew_position != nold_position-6 && nnew_position != nold_position-10 && nnew_position != nold_position+17 && nnew_position != nold_position+10&& nnew_position != nold_position+8 && nnew_position != nold_position+15 ) return false;
			}
			else if (nold_position % 23 == 0) {
				if (nnew_position != nold_position-15 && nnew_position != nold_position-17 && nnew_position != nold_position-10 && nnew_position != nold_position+8&& nnew_position != nold_position+15 && nnew_position != nold_position+17 ) return false;
			}
			else if (nold_position > 50) {
				if (nnew_position != nold_position-10 && nnew_position != nold_position+10 && nnew_position != nold_position-15 && nnew_position != nold_position-17&& nnew_position != nold_position-6 && nnew_position != nold_position+8 ) return false;
			}
			else if (nold_position % 18 == 0) {
				if (nnew_position != nold_position-17 && nnew_position != nold_position-15 && nnew_position != nold_position-6 && nnew_position != nold_position+10&& nnew_position != nold_position+15 && nnew_position != nold_position+17 ) return false;
			}

			else { //8 moves inside the box of squares left available in the middle
				if (nnew_position != nold_position-17 && nnew_position != nold_position-15 && nnew_position != nold_position-6 && nnew_position != nold_position-10 &&
					nnew_position != nold_position+17 && nnew_position != nold_position+15 && nnew_position != nold_position+8 && nnew_position != nold_position+10) return false;
			}
		}

		else if (document.getElementById(nold_position).innerHTML == "<a>♙</a>") { //white pawn logic
			//white pawns can only move up if there is a free space in front of it. It can move upleft/upright if a black piece occupies the space
			//it can also move forward 2 if both spaces clear and its the 1st move
			if (nold_position % 8 == 0) return false; //cant move if its at the top edge 
			//if its at the origin pos lets add the option of moving 2 steps at once
			if (nold_position == 2 || nold_position == 10 || nold_position == 18 || nold_position == 26 || nold_position == 34 || nold_position == 42 || nold_position == 50 || nold_position == 58) {
				if (nold_position < 9) { //left side only up/upright attk
					if (nnew_position == nold_position+1) { //single step from origin just make sure in front is clear
						if (document.getElementById(nnew_position).innerHTML != "") return false;
					}
					else if (nnew_position == nold_position+2) { //double step from origin make sure both clear
						if (document.getElementById(nnew_position).innerHTML != "") return false;
						if (document.getElementById(nnew_position-1).innerHTML != "") return false;
					}
					else if (nnew_position != nold_position+9) return false; //not a forward step and not right diagonol while on left side
					else {
						if (document.getElementById(nnew_position).innerHTML == "") return false; //is right diagonol on left side but nothing to attk
					}
				}
				else if (nold_position > 56) { //right side only up/upleft attk
					if (nnew_position == nold_position+2) {
						if (document.getElementById(nnew_position).innerHTML != "") return false;
						if (document.getElementById(nnew_position-1).innerHTML != "") return false;
					}
					else if (nnew_position == nold_position+1) {
						if (document.getElementById(nnew_position).innerHTML != "") return false;
					}
					else if (nnew_position != nold_position-7) return false; //not a forward step and not left diagonol while on right side
					else {
						if (document.getElementById(nnew_position).innerHTML == "") return false; //left diagonol on right side but nothing to attk
					}
				}
				else { //not on the sides
					if (nnew_position == nold_position+2) {
						if (document.getElementById(nnew_position).innerHTML != "") return false;
						if (document.getElementById(nnew_position-1).innerHTML != "") return false;
					}
					else if (nnew_position == nold_position+1) {
						if (document.getElementById(nnew_position).innerHTML != "") return false;
					}
					else if (nnew_position != nold_position-7 && nnew_position != nold_position+9) return false; //not forward step or diagonol
					else {
						if (document.getElementById(nnew_position).innerHTML == "") return false; //diagonol with nothing to attk
					}
				}
			}
			else { //not at any of the starting positions so 2 step not an option all else same
				 if (nold_position < 9) { //left side only up/upright attk
					if (nnew_position == nold_position+1) {
						if (document.getElementById(nnew_position).innerHTML != "") return false;
					}
					else if (nnew_position != nold_position+9) return false;
					else {
						if (document.getElementById(nnew_position).innerHTML == "") return false;
					}
				}
				else if (nold_position > 56) { //right side only up/upleft attk
					if (nnew_position == nold_position+1) {
						if (document.getElementById(nnew_position).innerHTML != "") return false;
					}
					else if (nnew_position != nold_position-7) return false;
					else {
						if (document.getElementById(nnew_position).innerHTML == "") return false;
					}
				}
				else { //not at origin or any of the sides
					if (nnew_position == nold_position+1) {
						if (document.getElementById(nnew_position).innerHTML != "") return false;
					}
					else if (nnew_position != nold_position-7 && nnew_position != nold_position+9) return false;
					else {
						if (document.getElementById(nnew_position).innerHTML == "") return false;
					}
				}
			}
		}

		else if (document.getElementById(nold_position).innerHTML == "<a>♟</a>") { //black pawn logic
			//same rules as white pawn however instead of moving up all directional movements will face downward
			if (nold_position % 9 == 0) return false; //at the bottom it cannot move
			if (nold_position == 7 || nold_position == 15 || nold_position == 23 || nold_position == 31 || nold_position == 39 || nold_position == 47 || nold_position == 55 || nold_position == 63) {
				if (nold_position < 9) { //left side only down/downright attk
					if (nnew_position == nold_position-1 || nnew_position == nold_position-2) {
						if (document.getElementById(nnew_position).innerHTML != "") return false;
						if (document.getElementById(nnew_position+1).innerHTML != "") return false;
					}
					else if (nnew_position != nold_position+7) return false;
					else {
						if (document.getElementById(nnew_position).innerHTML == "") return false;
					}
				}
				else if (nold_position > 56) { //right side only down/downleft attk
					if (nnew_position == nold_position-1 || nnew_position == nold_position-2) {
						if (document.getElementById(nnew_position).innerHTML != "") return false;
						if (document.getElementById(nnew_position+1).innerHTML != "") return false;
					}
					else if (nnew_position != nold_position-9) return false;
					else {
						if (document.getElementById(nnew_position).innerHTML == "") return false;
					}
				}
				else {
					if (nnew_position == nold_position-1 || nnew_position == nold_position-2) {
						if (document.getElementById(nnew_position).innerHTML != "") return false;
						if (document.getElementById(nnew_position+1).innerHTML != "") return false;
					}
					else if (nnew_position != nold_position-9 && nnew_position != nold_position+7) return false;
					else {
						if (document.getElementById(nnew_position).innerHTML == "") return false;
					}
				}
			}
			else {
				if (nold_position < 9) { //left side only down/downright attk
					if (nnew_position == nold_position-1) {
						if (document.getElementById(nnew_position).innerHTML != "") return false;
					}
					else if (nnew_position != nold_position+7) return false;
					else {
						if (document.getElementById(nnew_position).innerHTML == "") return false;
					}
				}
				else if (nold_position > 56) { //right side only down/downleft attk
					if (nnew_position == nold_position-1) {
						if (document.getElementById(nnew_position).innerHTML != "") return false;
					}
					else if (nnew_position != nold_position-9) return false;
					else {
						if (document.getElementById(nnew_position).innerHTML == "") return false;
					}
				}
				else {
					if (nnew_position == nold_position-1) {
						if (document.getElementById(nnew_position).innerHTML != "") return false;
					}
					else if (nnew_position != nold_position-9 && nnew_position != nold_position+7) return false;
					else {
						if (document.getElementById(nnew_position).innerHTML == "") return false;
					}
				}
			}
		}
	return true;
}









checkmoves = function () { //returns true if any of the kings have been eliminated
	var whiteq = false;
	var blackq = false;

	for (var i = 1; i<64; i++) { //scans every square for white and black king if both exist return true
			if (document.getElementById(i).innerHTML == "<a>♔</a>") whiteq = true;
			else if (document.getElementById(i).innerHTML == "<a>♚</a>") blackq = true;
	}

	if (whiteq && blackq) return true;
	else return false;
}




checkpawns = function () { //if pawn gets to the other side lets swap it with a queen
	for (var i = 8; i<65; i+=8) { //check every square at the top if occupied by white pawn turn it into a white queen
		if (document.getElementById(i).innerHTML == "♙") document.getElementById(i).innerHTML == "♕";
	}
	for (var i = 1; i<64; i+=8) { //check every square at the bottom if occupied by a black pawn turn it into a black queen
		if (document.getElementById(i).innerHTML == "♟") document.getElementById(i).innerHTML == "♛";
	}	
}




//gameplay logic. broken from game as workaround for wait for input
function resumeplay (old_position, new_position, resume, chessboard) { 
	document.getElementById("Turn").innerHTML = "White Turn: " + turn; //display whose turn on screen
	if (!resume) { //resume helps determine if submitted button has been pressed yet for this turn
			if (turn) alert("awaiting white player input...");
			else alert("awaiting dark player input...");
			setTimeout(waity(old_position, new_position), 25000); //waits for button submit
	}
	else {
		nold_position = convertToNum(old_position); //handle user inputs like "b7" as "15"
		nnew_position = convertToNum(new_position);

		if (validmove(nold_position, nnew_position)) { // move valid?
			document.getElementById(nnew_position).innerHTML = document.getElementById(nold_position).innerHTML; //put object in new pos
			document.getElementById(nold_position).innerHTML = ""; //delete object in the old pos
		}
		else {
			submittedTurn = false; //try input again
			alert("move incorrect. awaiting new input....");
			setTimeout(waity(), 25000); //waits for button submit
		}

		if (turn) turn = false; //changes the turn from white to black
		else turn = true; //black to white
		if (!checkmoves()) { //checkmoves only true if win conditions have yet to be met 
			gameover = true; 
			if (turn) alert("black power!"); //black win condition true
			else alert("white power!"); //white win condition true
		}
		else { //game not over
			checkpawns(); //turn pawns that make it to the other side to queens
			chessboard.game(old_position, new_position, false); 
		}
	}
}




//delays until user presses submit
function waity() {
	if (submittedTurn == false) setTimeout(waity(), 2500);
}




//convert user inputted position into a number
function convertToNum(convin) { 
	var convnum = 0;
	var arr = convin.split("");

	if (arr[0].toUpperCase() == "B") convnum += 8;
	else if (arr[0].toUpperCase() == "C") convnum += 16;
	else if (arr[0].toUpperCase() == "D") convnum += 24;
	else if (arr[0].toUpperCase() == "E") convnum += 32;
	else if (arr[0].toUpperCase() == "F") convnum += 40;
	else if (arr[0].toUpperCase() == "G") convnum += 48;
	else if (arr[0].toUpperCase() == "H") convnum += 56;
	convnum+= Number(arr[1]);
	return convnum;
}