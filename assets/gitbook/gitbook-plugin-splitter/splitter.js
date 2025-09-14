require(['gitbook', 'jQuery'], function (gitbook, $) {
	// MEMO:
	// Gitbook is calculated as "calc (100% - 60px)" in the horizontal width when the width of the screen size is 600px
	// or less.
	// In this case, since contradiction occurs in the implementation of this module, return.
	if($(window).width() <= 600) {
		return;
	}

	gitbook.events.bind('start', function () {
	});

	gitbook.events.bind('page.change', function () {

		var KEY_SPLIT_STATE = 'plugin_gitbook_split';
		var KEY_USER_PREFERENCE = 'plugin_gitbook_user_preference';

		var dividerWidth = null;
		var isDraggable = false;
		var dividerCenterOffsetLeft = null;
		var splitState = null;
		var grabPointWidth = null;

		var $body = $('body');
		var $book = $('.book');
		var $summary = $('.book-summary');
		var $bookBody = $('.book-body');
		var $divider = $('<div class="divider-content-summary">' +
			               '<div class="divider-content-summary__icon">' +
			               '</div>' +
			             '</div>');

		$summary.append($divider);

		dividerWidth = $divider.outerWidth();
		dividerCenterOffsetLeft = $divider.outerWidth() / 2;

		// restore split state from sessionStorage
		splitState = getSplitState();
		splitState.summaryWidth = 300;
        // If the sidebar is open (not negatively offset), the body offset must match the new width.
        if (splitState.summaryOffset >= 0) {
            splitState.bookBodyOffset = 300;
        }
		setSplitState(
			splitState.summaryWidth,
			splitState.summaryOffset,
			splitState.bookBodyOffset
		);

		setTimeout(function() {
			var isGreaterThanEqualGitbookV2_5 = !Boolean($('.toggle-summary').length);

			var $toggleSummary = isGreaterThanEqualGitbookV2_5
				? $('.fa.fa-align-justify').parent() : $('.toggle-summary');

			$toggleSummary.on('click', function () {

				var summaryOffset  = null;
				var bookBodyOffset = null;
				var summaryWidth = 300;

				var isOpen = isGreaterThanEqualGitbookV2_5
					? !gitbook.sidebar.isOpen() : $book.hasClass('with-summary');

				if (isOpen) {
					summaryOffset  = -(summaryWidth);
					bookBodyOffset = 0;
				} else {
					summaryOffset  = 0;
					bookBodyOffset = summaryWidth;
				}

				setSplitState(summaryWidth, summaryOffset, bookBodyOffset);
				saveUserState(summaryWidth, summaryOffset, bookBodyOffset);
			});

			var isIntroPage = (window.location.pathname === gitbook.state.basePath || window.location.pathname === gitbook.state.basePath + '/');

            // Use the official API to check the state. It is the source of truth.
            if (isIntroPage) {
                // On intro page, collapse if open. This only affects the main state key.
                if (gitbook.sidebar.isOpen()) {
                    collapseSidebar();
                }
            } else {
                // ====================================================================
                // NEW: On non-intro pages, check and restore user preference.
                var userPreference = JSON.parse(sessionStorage.getItem(KEY_USER_PREFERENCE));
                // Check if user preference exists and is "open" (offset >= 0)
                if (userPreference && userPreference.summaryOffset >= 0) {
                    // And if the sidebar is currently closed (because we came from the intro page)
                    if (!gitbook.sidebar.isOpen()) {
                        // Then expand it to match the user's preference.
                        expandSidebarToUserPreference(userPreference);
                    }
                }
                // ====================================================================
            }
		}, 100);

		// Sidebar resizing disabled to prevent top bar resize glitch
		/* $divider.on('mousedown', function (event) {
			event.stopPropagation();
			isDraggable = true;
			grabPointWidth = $summary.outerWidth() - event.pageX;
		});

		$body.on('mouseup', function (event) {
			event.stopPropagation();
			isDraggable = false;
			saveSplitState(
				$summary.outerWidth(),
				$summary.position().left,
				$bookBody.position().left
			);
		});

		$body.on('mousemove', function (event) {
			if (!isDraggable) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();
			$summary.outerWidth(event.pageX + grabPointWidth);
			$bookBody.offset({ left: event.pageX + grabPointWidth });
		}); */

		function getSplitState() {
			var splitState = JSON.parse(sessionStorage.getItem(KEY_SPLIT_STATE));
			splitState || (splitState = {});
			splitState.summaryWidth || (splitState.summaryWidth = $summary.outerWidth());
			splitState.summaryOffset || (splitState.summaryOffset = $summary.position().left);
			splitState.bookBodyOffset || (splitState.bookBodyOffset = $bookBody.position().left);
			return splitState;
		}

		function saveSplitState(summaryWidth, summaryWidthOffset, bookBodyOffset) {
			sessionStorage.setItem(KEY_SPLIT_STATE, JSON.stringify({
				summaryWidth: summaryWidth,
				summaryOffset: summaryWidthOffset,
				bookBodyOffset: bookBodyOffset,
			}));
		}

		function setSplitState(summaryWidth, summaryOffset, bookBodyOffset) {
			$summary.outerWidth(summaryWidth);
			$summary.offset({ left: summaryOffset });
			$bookBody.offset({ left: bookBodyOffset });
			// improved broken layout in windows chrome.
			//   "$(x).offset" automatically add to "position:relative".
			//   but it cause layout broken..
			$summary.css({ position: 'absolute' });
			$bookBody.css({ position: 'absolute' });
		}

		function collapseSidebar() {
			gitbook.sidebar.toggle(false);
			var summaryWidth = $summary.outerWidth();
			var summaryOffset = -(summaryWidth);
			var bookBodyOffset = 0;
			setSplitState(summaryWidth, summaryOffset, bookBodyOffset);
			saveSplitState(summaryWidth, summaryOffset, bookBodyOffset); // Does NOT save user pref
		}

		function saveUserState(summaryWidth, summaryWidthOffset, bookBodyOffset) {
            var state = {
                summaryWidth: summaryWidth,
                summaryOffset: summaryWidthOffset,
                bookBodyOffset: bookBodyOffset,
            };
            sessionStorage.setItem(KEY_SPLIT_STATE, JSON.stringify(state));
            sessionStorage.setItem(KEY_USER_PREFERENCE, JSON.stringify(state));
        }

		function expandSidebarToUserPreference(userPreference) {
            gitbook.sidebar.toggle(true);
            setSplitState(userPreference.summaryWidth, userPreference.summaryOffset, userPreference.bookBodyOffset);
            saveSplitState(userPreference.summaryWidth, userPreference.summaryOffset, userPreference.bookBodyOffset);
        }
	});
});
