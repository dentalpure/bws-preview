document.addEventListener( 'DOMContentLoaded', () => {
	const tabs = document.querySelector( '.tabs' );
	if ( tabs ) {
		const tabButtons = Array.from( tabs.querySelectorAll( '.tab-bar' ) );
		const tabContents = Array.from( tabs.querySelectorAll( '.tab-content' ) );

		if ( tabButtons.length && tabContents.length ) {
			const activateTab = ( activeIndex ) => {
				tabButtons.forEach( ( button ) => {
					const isActive = Number( button.dataset.tabIndex ) === activeIndex;
					button.classList.toggle( 'is-active', isActive );
				} );

				tabContents.forEach( ( content ) => {
					const isActive = Number( content.dataset.tabIndex ) === activeIndex;
					content.classList.toggle( 'is-active', isActive );
				} );
			};

			tabButtons.forEach( ( button ) => {
				button.addEventListener( 'click', () => {
					activateTab( Number( button.dataset.tabIndex ) );
				} );
			} );
		}
	}

	const expanderItems = Array.from( document.querySelectorAll( '.expander-item' ) );
	expanderItems.forEach( ( item ) => {
		const button = item.querySelector( '.title' );
		if ( ! button ) {
			return;
		}

		button.addEventListener( 'click', () => {
			const isOpen = item.classList.toggle( 'is-open' );
			button.setAttribute( 'aria-expanded', String( isOpen ) );
		} );
	} );

	const globalNav = document.querySelector( '.global-nav' );
	const menuToggle = globalNav?.querySelector( '.menu-toggle' );
	const menuLinks = globalNav?.querySelector( '.links' );
	const menuCloseButton = globalNav?.querySelector( '.menu-close' );
	const closeMenu = () => {
		globalNav.classList.remove( 'is-menu-open' );
		menuToggle.setAttribute( 'aria-expanded', 'false' );
		menuToggle.setAttribute( 'aria-label', 'メニューを開く' );
	};
	if ( globalNav && menuToggle && menuLinks ) {
		menuToggle.addEventListener( 'click', () => {
			const isOpen = globalNav.classList.toggle( 'is-menu-open' );
			menuToggle.setAttribute( 'aria-expanded', String( isOpen ) );
			menuToggle.setAttribute( 'aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く' );
		} );

		menuLinks.querySelectorAll( '.links > li > a' ).forEach( ( link ) => {
			link.addEventListener( 'click', () => {
				if ( link.hash ) {
					closeMenu();
				}
			} );
		} );

		if ( menuCloseButton ) {
			menuCloseButton.addEventListener( 'click', closeMenu );
		}

		window.addEventListener( 'resize', () => {
			if ( window.innerWidth > 768 ) {
				closeMenu();
			}
		} );
	}

	const navLinkWithSubmenu = document.querySelectorAll( '.global-nav .links li:has(ul)' );
	navLinkWithSubmenu.forEach( ( item ) => {
		item.addEventListener( 'click', ( e ) => {
			if ( window.innerWidth > 768 ) {
				return;
			}
			console.log( e.target.href );
			item.classList.toggle( 'show' );
			if ( e.target.href.endsWith( '/company/' ) ) {
				e.preventDefault();
				return false;
			}
			if ( ! e.target.href ) {
				e.preventDefault();
				return false;
			}
			closeMenu();
		} );
	} );
} );
