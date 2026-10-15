/* 兜家旅館 プランB — ルート表
   ページを増やすときは、このファイルだけを触る。
   path は本番のURLと同じ形にしてある（受注後そのまま静的ファイルに切り出せる）。 */
const SUFFIX = "｜兜家旅館｜東京・檜原村の茅葺きの宿";

const ROUTES = [
  { path:"/", tpl:"tpl-home", nav:false, lang:"ja", parent:null, label:"トップ",
    title:"兜家旅館｜東京・檜原村 数馬の茅葺きの宿",
    desc:"東京都西多摩郡檜原村・数馬。兜造りの茅葺き屋根の母屋で、囲炉裏端の炭火焼きと山の幸、猪鍋を。『龍胆の間』を含む全十六室・定員六十七名の山あいの一軒宿。新宿から二時間、銘酒二十種も。",
    kw:"兜家旅館 / 檜原村 旅館" },

  { path:"/about/", tpl:"tpl-about", nav:true, lang:"ja", parent:"/", label:"兜家について",
    title:"兜家について"+SUFFIX,
    desc:"東京都西多摩郡檜原村・数馬に四百年伝わる兜造り（富士系合掌造り）。完全な形で残るのは四軒だけ。釘をほとんど使わない木組み、厚さ120cmの茅葺き、養蚕を支えた四層構造。東京に現存する茅葺きの宿です。",
    kw:"東京 茅葺き 宿" },

  { path:"/about/irori/", tpl:"tpl-about-irori", nav:false, lang:"ja", parent:"/about/", label:"囲炉裏",
    title:"囲炉裏｜兜家について"+SUFFIX,
    desc:"東京都檜原村・数馬の兜家旅館。炭を熾した囲炉裏に串を立て、じっくりと炙る。東京で囲炉裏端の炭火焼きを供する宿は多くありません。火のそばで食事をする時間そのものが、この宿の献立です。",
    kw:"東京 囲炉裏 旅館" },

  { path:"/okami/", tpl:"tpl-okami", nav:true, lang:"ja", parent:"/", label:"女将",
    title:"女将"+SUFFIX,
    desc:"都会での仕事を経て、未経験から兜家旅館の女将へ。所作を一から覚え、東京都西多摩郡檜原村・数馬の山あいの一軒宿を切り盛りする岡部ゆみこ。迎えるひとのことを、すこしだけお話しします。",
    kw:"兜家旅館 女将（指名検索・信頼性）" },

  { path:"/seasons/", tpl:"tpl-seasons", nav:true, lang:"ja", parent:"/", label:"四季",
    title:"四季"+SUFFIX,
    desc:"東京都西多摩郡檜原村・数馬の十二の月。桜は都心より半月遅れ、夏は都心より六度低く、秋は渓谷が染まり、冬は払沢の滝が氷瀑となる。月ごとの兜家旅館の表情をお伝えします。",
    kw:"檜原村 四季" },

  { path:"/seasons/09/", tpl:"tpl-seasons-09", nav:false, lang:"ja", parent:"/seasons/", label:"九月の兜家",
    title:"九月の兜家｜四季"+SUFFIX,
    desc:"東京都西多摩郡檜原村・数馬の九月。紅葉にはまだ早く、朝夕に霧が出はじめる頃。渓谷の水はもう冷たく、囲炉裏に火を入れる日が増えます。九月の兜家旅館の様子をお伝えします。",
    kw:"檜原村 九月 / 奥多摩 九月" },

  { path:"/meals/", tpl:"tpl-meals", nav:true, lang:"ja", parent:"/", label:"お食事",
    title:"お食事"+SUFFIX,
    desc:"山菜、川魚、猪。囲炉裏端の炭火焼きで、山が出すものをそのままに。銘酒二十種も取り揃え、東京都西多摩郡檜原村・数馬の山あいで供する、ジビエと囲炉裏の宿の献立です。",
    kw:"檜原村 旅館 食事" },

  { path:"/meals/inoshishi/", tpl:"tpl-meals-inoshishi", nav:false, lang:"ja", parent:"/meals/", label:"猪鍋",
    title:"猪鍋｜お食事"+SUFFIX,
    desc:"東京で猪鍋を。厳選した猪肉を、自家製の味噌だれで仕立てます。臭みのない肉と、脂の甘み。兜家旅館は東京都西多摩郡檜原村で「ジビエと囲炉裏の宿」として猪と鹿をお出ししています。",
    kw:"奥多摩 猪鍋" },

  { path:"/rooms/", tpl:"tpl-rooms", nav:true, lang:"ja", parent:"/", label:"お部屋",
    title:"お部屋"+SUFFIX,
    desc:"全十六室、定員六十七名。本館と新館、渓谷を望む和室。龍胆の間など、名のついた部屋もございます。東京都西多摩郡檜原村・数馬の山あいの一軒宿のお部屋をご案内します。",
    kw:"兜家旅館 客室" },

  { path:"/rooms/onsen/", tpl:"tpl-rooms-onsen", nav:false, lang:"ja", parent:"/rooms/", label:"温泉",
    title:"温泉｜お部屋"+SUFFIX,
    desc:"浴室付のお部屋には、天然温泉「数馬の湯」（アルカリ性単純温泉）を。男女別の大浴室は、お泊まりの少ない日には貸切に。東京都西多摩郡檜原村・数馬にわく、山あいの一軒宿の湯です。",
    kw:"檜原村 温泉 旅館" },

  { path:"/around/", tpl:"tpl-around", nav:true, lang:"ja", parent:"/", label:"周辺",
    title:"周辺のご案内"+SUFFIX,
    desc:"払沢の滝、冬に凍る氷瀑、渓谷と吊橋、奥多摩湖。檜原村は東京都で唯一の村です。都心より六度ほど低い山あいの気候が、四季の景色を際立たせます。西多摩郡檜原村・数馬の兜家旅館がご案内します。",
    kw:"檜原村 観光" },

  { path:"/access/", tpl:"tpl-access", nav:true, lang:"ja", parent:"/", label:"アクセス・宿情報",
    title:"アクセス・宿情報"+SUFFIX,
    desc:"新宿から二時間、電車とバスで参ります。JR武蔵五日市駅から西東京バス数馬行にお乗り換えください。お車でも。全十六室、定員六十七名。東京都西多摩郡檜原村数馬2612、兜家旅館。",
    kw:"兜家旅館 アクセス" },

  { path:"/plans/", tpl:"tpl-plans", nav:false, lang:"ja", parent:"/", label:"宿泊プラン・料金",
    title:"宿泊プラン・料金"+SUFFIX,
    desc:"一泊二食、囲炉裏の炭火焼きと猪鍋のプラン。銘酒二十種もお楽しみいただけます。ご予約はお電話で承ります。東京都西多摩郡檜原村の茅葺きの宿、兜家旅館のご宿泊案内です。",
    kw:"兜家旅館 料金 / 宿泊プラン" },

  /* ---- 2026-09-28 山田追加：現行サイトのメニュー項目から移植した7ページ ---- */
  { path:"/reserve/", tpl:"tpl-reserve", nav:false, lang:"ja", parent:"/plans/", label:"ご予約フォーム",
    title:"ご予約フォーム｜宿泊プラン・料金"+SUFFIX,
    desc:"兜家旅館のご予約フォームです。ご希望の日にち、人数、お部屋とお食事をお知らせください。宿から空室のお返事をさしあげます。お電話でも承ります。東京都西多摩郡檜原村・数馬の茅葺きの宿。",
    kw:"兜家旅館 予約" },

  { path:"/meals/lunch/", tpl:"tpl-meals-lunch", nav:false, lang:"ja", parent:"/meals/", label:"ランチ・ディナー",
    title:"ランチ・ディナー｜お食事"+SUFFIX,
    desc:"お泊まりでなくても、山の膳を。山菜料理、猪鍋、囲炉裏の炭火焼きを、ランチとディナーでお出しします。木曜定休、完全予約制。東京都西多摩郡檜原村・数馬の兜家旅館へ、日帰りでどうぞ。",
    kw:"檜原村 ランチ / 檜原村 食事処" },

  { path:"/cafe/", tpl:"tpl-cafe", nav:false, lang:"ja", parent:"/", label:"渓谷展望カフェ",
    title:"渓谷展望カフェ"+SUFFIX,
    desc:"渓谷を眺めながら、ゆっくり淹れたフェアトレードのコーヒーと、檜原村の無農薬紅茶を。一日三組限定、完全予約制の渓谷展望カフェです。東京都西多摩郡檜原村・数馬、兜家旅館の中にあります。",
    kw:"檜原村 カフェ" },

  { path:"/lounge/", tpl:"tpl-lounge", nav:false, lang:"ja", parent:"/", label:"焚き火ラウンジ",
    title:"焚き火ラウンジ"+SUFFIX,
    desc:"檜原村の山あいで、焚き火を眺めながらお酒を。ご宿泊の方だけの、各回一組限定の焚き火ラウンジです。沢の水で割るウイスキーと、沢の水で淹れるコーヒーを。東京都西多摩郡檜原村、兜家旅館。",
    kw:"東京 焚き火 宿" },

  { path:"/rooms/relaxation/", tpl:"tpl-rooms-relaxation", nav:false, lang:"ja", parent:"/rooms/", label:"リラクゼーション",
    title:"リラクゼーション｜お部屋"+SUFFIX,
    desc:"お部屋までお伺いする、もみほぐしのリラクゼーション。着衣のまま、肩・腰・足の疲れをやわらげます。夕方六時から九時まで、完全予約制。東京都西多摩郡檜原村・数馬の兜家旅館でのご宿泊に。",
    kw:"兜家旅館 リラクゼーション" },

  { path:"/shop/", tpl:"tpl-shop", nav:false, lang:"ja", parent:"/", label:"お買いもの",
    title:"お買いもの"+SUFFIX,
    desc:"塩分ひかえめの自家製「おじいちゃんの梅干」、檜原村特産の刺身こんにゃく、無農薬のひのはら紅茶、檜原村の水。東京都西多摩郡檜原村・数馬の兜家旅館から、山の味をご自宅へお届けします。",
    kw:"檜原村 特産 / 刺身こんにゃく" },

  { path:"/news/", tpl:"tpl-news", nav:false, lang:"ja", parent:"/", label:"お知らせ",
    title:"お知らせ"+SUFFIX,
    desc:"東京都西多摩郡檜原村・数馬の兜家旅館からのお知らせです。檜原街道の交通情報、新しいお食事やプラン、テレビや動画でのご紹介、宿泊料金とご予約についてのご案内を、日付の新しい順にお伝えします。",
    kw:"兜家旅館 お知らせ" },

  { path:"/en/", tpl:"tpl-en-home", nav:false, lang:"en", parent:null, label:"English",
    title:"Kabutoya Ryokan｜A Thatched Inn in Tokyo",
    desc:"A thatched kabuto-zukuri inn in Kazuma, Hinohara, Tokyo. Charcoal grilling by the sunken hearth, wild boar hotpot, and mountain vegetables. Two hours from Shinjuku.",
    kw:"Tokyo thatched ryokan" },

  { path:"/en/about/", tpl:"tpl-en-about", nav:false, lang:"en", parent:"/en/", label:"About",
    title:"About｜Kabutoya Ryokan",
    desc:"Only four kabuto-zukuri thatched houses survive intact in Kazuma. Timber joined almost without nails, thatch 120cm thick, four storeys once used for silkworms.",
    kw:"Tokyo kabuto-zukuri" },
];

/* ============================================================
   メニューの構成（2026-09-28 山田：ページが22に増えたので、ヘッダーとフッターを組み直した）
   ・MENU   … ヘッダー（PC）とメニュー（スマホ）の6項目。sub は、PCでは重ねて出る小メニュー、スマホでは小さな字で並ぶ
   ・FOOTER … フッターの4つのまとまり。「何をしたいか」で分けてある（知る／泊まる／味わう／訪ねる）
   ページの名前は ROUTES の label を使う（ここに書いた name は、ヘッダーで短く見せたいときだけの上書き）。
   check.py が読む書式（path / tpl / parent / nav / desc / lang）と重ならないよう、ここでは to / sub という名前を使う。
   ============================================================ */
const MENU = [
  { to:"/about/",  sub:["/about/irori/", "/okami/", "/seasons/"] },
  { to:"/rooms/",  sub:["/rooms/onsen/", "/lounge/", "/rooms/relaxation/"] },
  { to:"/meals/",  sub:["/meals/inoshishi/", "/meals/lunch/", "/cafe/"] },
  { to:"/plans/",  sub:["/reserve/"], name:"宿泊プラン" },
  { to:"/around/", sub:[] },
  { to:"/access/", sub:[], name:"アクセス" },
];
const FOOTER = [
  { head:"宿を知る", en:"Story", links:["/about/", "/about/irori/", "/okami/", "/seasons/", "/seasons/09/", "/news/"] },
  { head:"泊まる",   en:"Stay",  links:["/rooms/", "/rooms/onsen/", "/lounge/", "/rooms/relaxation/", "/plans/", "/reserve/"] },
  { head:"味わう",   en:"Taste", links:["/meals/", "/meals/inoshishi/", "/meals/lunch/", "/cafe/", "/shop/"] },
  { head:"訪ねる",   en:"Visit", links:["/access/", "/around/", "/en/"] },
];

/* 言語切替の対応表。対訳がないページからは /en/ に送る（router.js が使う） */
const LANG_PAIRS = { "/":"/en/", "/about/":"/en/about/", "/en/":"/", "/en/about/":"/about/" };
