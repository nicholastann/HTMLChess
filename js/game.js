var ChessBoard_View = Backbone.View.extend({
	// chessboard is essentially the backend and our Backbone view will render it
	chessboard: null,
	el: $("#chess_board"),
	initialize: function(){
		this.chessboard = new ChessBoard();
		this.render();
	},
	render: function(){
		// Do a full refresh of the pane
		$("td", this.el).html("");
		
		var piece, color, asciicode;
		var chessboard = this.chessboard;
		for( position in chessboard.positions ){
			// Split the string up to find out color and piece name of the current position
			piece = chessboard.positions[position].substring(1);
			color = chessboard.positions[position][0];

			if( color == "B" ) asciicode = chessboard.fullpieces[piece][2];
			else asciicode = chessboard.fullpieces[piece][1];
			
			// Pump the correct ascii code into corresponding position
			$("#" + position).html( "<a>" + asciicode + "</a>");
		}
	}
});

var App_View = Backbone.View.extend({
	el: $(".container"),
	initialize: function() {
		this.chessboard_view = new ChessBoard_View;
	},
	events: {
		"click #game": "game",
		"click #setsubmittedTurn": "setsubmittedTurn"
	},
	game: function(){
		this.chessboard_view.chessboard.game($("#oldposition").val(), $("#newposition").val(), true);
		this.chessboard_view.render();
	},
	setsubmittedTurn: function() {
	this.chessboard_view.chessboard.setsubmittedTurn($("#oldposition").val(), $("#newposition").val());
	},
	resumeplay: function() {
		this.chessboard_view.resumeplay($("#oldposition").val(), $("#newposition").val());
	}
});
var app_view = new App_View;

