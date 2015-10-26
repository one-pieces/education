
angular.module('dragging', ['mouseCapture' ] )


.factory('dragging', function ($rootScope, mouseCapture) {

	var threshold = 5;

	return {

  		startDrag: function (evt, config) {

  			var dragging = false;
			var x = evt.pageX;
			var y = evt.pageY;

	  		var mouseMove = function (evt) {

				if (!dragging) {
					if (Math.abs(evt.pageX - x) > threshold ||
						Math.abs(evt.pageY - y) > threshold)
					{
						dragging = true;

						if (config.dragStarted) {
							config.dragStarted(x, y, evt);
						}

						if (config.dragging) {
							// First 'dragging' call to take into account that we have 
							// already moved the mouse by a 'threshold' amount.
							config.dragging(evt.pageX, evt.pageY, evt);
						}
					}
				}
				else {
					if (config.dragging) {
						config.dragging(evt.pageX, evt.pageY, evt);
					}

					x = evt.pageX;
					y = evt.pageY;
				}
	  		};

	  		//
	  		// Handler for when mouse capture is released.
	  		//
	  		var released = function() {

	  			if (dragging) {
  					if (config.dragEnded) {
  						config.dragEnded();
  					}
	  			}
	  			else {
  					if (config.clicked) {
  						config.clicked();
  					}
	  			}
	  		};



	  		var mouseUp = function (evt) {

	  			mouseCapture.release();

	  			evt.stopPropagation();
	  			evt.preventDefault();
	  		};

	  		//
	  		// Acquire the mouse capture and start handling mouse events.
	  		//
			mouseCapture.acquire(evt, {
				mouseMove: mouseMove,
				mouseUp: mouseUp,
				released: released
			});

	  		evt.stopPropagation();
	  		evt.preventDefault();
  		}

	};

})

;

