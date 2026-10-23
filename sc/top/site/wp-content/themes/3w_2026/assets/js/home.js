/* global PIXI */

$( function() {
	// グローバルナビとファーストビューを取得
	const $nav = $( '.global-nav' );
	const $fv = $( '.home .fv' );

	if ( ! $nav.length || ! $fv.length ) {
		return;
	}

	function toggleNavTransparent() {
		const fvBottom = $fv.offset().top + $fv.outerHeight();
		const scrollY = $( window ).scrollTop();

		if ( scrollY < fvBottom ) {
			$nav.addClass( 'transparent' );
		} else {
			$nav.removeClass( 'transparent' );
		}
	}

	// 初期表示時
	toggleNavTransparent();

	$( window ).on( 'scroll resize', toggleNavTransparent );
} );

$( function() {
	const $opening = $( '.opening-animation' );
	const $fvVideo = $( '.home .fv video' );

	function startFvVideo() {
		if ( ! $fvVideo.length ) {
			return;
		}

		const video = $fvVideo.get( 0 );
		const playPromise = video.play();
		if ( playPromise && typeof playPromise.catch === 'function' ) {
			playPromise.catch( () => {} );
		}
	}

	function resetAndPauseFvVideo() {
		if ( ! $fvVideo.length ) {
			return;
		}

		const video = $fvVideo.get( 0 );
		video.pause();
		video.currentTime = 0;
	}

	if ( ! $opening.length || typeof PIXI === 'undefined' ) {
		startFvVideo();
		return;
	}

	resetAndPauseFvVideo();

	// オープニングコピーを追加
	const $copy = $( '<p class="opening-copy">水と人の豊かな暮らしを作る</p>' );
	$opening.append( $copy );

	const templateUrl = $( 'body' ).data( 'template-url' );
	if ( ! templateUrl ) {
		return;
	}

	const texturePath = `${ templateUrl }/assets/img/home/openinng-animation.webp`;
	const baseTexture = PIXI.Texture.from( texturePath );

	const app = new PIXI.Application( {
		resizeTo: $opening[ 0 ],
		antialias: true,
		backgroundColor: 0xffffff,
		backgroundAlpha: 1,
	} );

	$opening.append( app.view );

	function startAnimation() {
		const sprite = new PIXI.Sprite( baseTexture );
		sprite.anchor.set( 0.5 );
		sprite.alpha = 0;

		app.stage.addChild( sprite );

		const displacementSprite = new PIXI.Sprite( baseTexture );
		displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
		app.stage.addChild( displacementSprite );

		const displacementFilter = new PIXI.filters.DisplacementFilter( displacementSprite );
		app.stage.filters = [ displacementFilter ];

		function resize() {
			const { width, height } = app.renderer;
			sprite.x = width / 2;
			sprite.y = height / 2;

			const scale = Math.max(
				width / sprite.texture.width,
				height / sprite.texture.height
			);
			sprite.scale.set( scale * 1.1 );

			displacementSprite.x = 0;
			displacementSprite.y = 0;
			displacementSprite.width = width;
			displacementSprite.height = height;
		}

		resize();
		window.addEventListener( 'resize', resize );

		let elapsed = 0;
		const total = 3000; // アニメーション全体の時間(ms)
		const maxAmp = 40;

		app.ticker.add( () => {
			const deltaMs = app.ticker.deltaMS;
			elapsed += deltaMs;

			const t = Math.min( elapsed / total, 1 );

			displacementSprite.x += 1.5;
			displacementSprite.y += 0.8;

			const wave = Math.sin( t * Math.PI );
			displacementFilter.scale.x = maxAmp * wave;
			displacementFilter.scale.y = maxAmp * wave;

			// 画像のフェードイン / アウト
			if ( t < 0.3 ) {
				sprite.alpha = t / 0.3;
			} else if ( t > 0.7 ) {
				sprite.alpha = ( 1 - t ) / 0.3;
			} else {
				sprite.alpha = 1;
			}

			// テキストは少し遅れてフェードインして、そのまま表示
			if ( t > 0.2 ) {
				const textT = Math.min( ( t - 0.2 ) / 0.3, 1 ); // 0.2〜0.5 の間でフェードイン
				$copy.css( 'opacity', textT );
			}

			// 背景色：前半は白、終盤で #1E4F84 に切り替える
			if ( t > 0.7 ) {
				app.renderer.background.color = 0x1e4f84;
			} else {
				app.renderer.background.color = 0xffffff;
			}

			if ( t >= 1 ) {
				app.ticker.stop();
				window.removeEventListener( 'resize', resize );

				// #1E4F84 になった状態から全体をフェードアウト
				setTimeout( () => {
					startFvVideo();
					$opening.fadeOut( 600, function() {
						app.destroy( true, { children: true, texture: true, baseTexture: true } );
						$opening.remove();
					} );
				}, 100 );
			}
		} );
	}

	if ( baseTexture.baseTexture.valid ) {
		startAnimation();
	} else {
		baseTexture.baseTexture.once( 'loaded', startAnimation );
	}
} );
