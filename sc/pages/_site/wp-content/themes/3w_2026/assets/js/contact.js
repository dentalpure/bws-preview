// 郵便番号から住所を自動取得して入力補完
// Contact Form 7 のフィールド名:
// - postalcode-1, postalcode-2
// - prefecture, city, town

jQuery( function( $ ) {
	const $form = $( '.wpcf7 form' );
	if ( ! $form.length ) {
		return;
	}

	// 郵便番号 → 住所自動補完
	const $zip1 = $form.find( 'input[name="postalcode-1"]' );
	const $zip2 = $form.find( 'input[name="postalcode-2"]' );
	const $pref = $form.find( 'input[name="prefecture"]' );
	const $city = $form.find( 'input[name="city"]' );
	const $town = $form.find( 'input[name="town"]' );

	if ( $zip1.length && $zip2.length && $pref.length && $city.length && $town.length ) {
		let isFetching = false;

		function buildZip() {
			return String( $zip1.val() || '' ) + String( $zip2.val() || '' );
		}

		function shouldFetch( zip ) {
			const normalized = zip.replace( /\D/g, '' );
			return normalized.length === 7;
		}

		function fetchAddress() {
			if ( isFetching ) {
				return;
			}

			const rawZip = buildZip();
			const zipcode = rawZip.replace( /\D/g, '' );

			if ( ! shouldFetch( zipcode ) ) {
				return;
			}

			isFetching = true;

			fetch( 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + encodeURIComponent( zipcode ) )
				.then( function( res ) {
					if ( ! res.ok ) {
						throw new Error( 'Network response was not ok' );
					}
					return res.json();
				} )
				.then( function( data ) {
					if ( ! data || data.status !== 200 || ! Array.isArray( data.results ) || ! data.results.length ) {
						return;
					}
					const r = data.results[ 0 ];
					if ( ! $pref.val() ) {
						$pref.val( r.address1 || '' );
					}
					if ( ! $city.val() ) {
						$city.val( r.address2 || '' );
					}
					if ( ! $town.val() ) {
						$town.val( r.address3 || '' );
					}
				} )
				.catch( function() {
					// API エラー時は何もしない（ユーザー入力を邪魔しない）
				} )
				.finally( function() {
					isFetching = false;
				} );
		}

		// 郵便番号入力完了時に住所取得
		$zip1.on( 'blur', fetchAddress );
		$zip2.on( 'blur', fetchAddress );
		$zip1.on( 'change', fetchAddress );
		$zip2.on( 'change', fetchAddress );
	}

	// 「入力内容の確認」クリックでフォーム送信（確認画面へ）
	$form.on( 'click', '.rounded-button[data-action="confirm"]', function( e ) {
		e.preventDefault();
		$form.trigger( 'submit' );
	} );
} );
