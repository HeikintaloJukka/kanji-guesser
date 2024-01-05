export function answersFile() {
  var answers = []
  //hiragana
  answers.push(
  {kanji:"あ", reading: "", meanings:["a"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"い", reading: "", meanings:["i"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"う", reading: "", meanings:["u"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"え", reading: "", meanings:["e"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"お", reading: "", meanings:["o"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"か", reading: "", meanings:["ka"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"き", reading: "", meanings:["ki"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"く", reading: "", meanings:["ku"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"け", reading: "", meanings:["ke"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"こ", reading: "", meanings:["ko"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"が", reading: "", meanings:["ga"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ぎ", reading: "", meanings:["gi"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ぐ", reading: "", meanings:["gu"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"げ", reading: "", meanings:["ge"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ご", reading: "", meanings:["go"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"さ", reading: "", meanings:["sa"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"し", reading: "", meanings:["shi"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"す", reading: "", meanings:["su"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"せ", reading: "", meanings:["se"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"そ", reading: "", meanings:["so"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ざ", reading: "", meanings:["za"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"じ", reading: "", meanings:["ji"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ず", reading: "", meanings:["zu"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ぜ", reading: "", meanings:["ze"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ぞ", reading: "", meanings:["zo"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"た", reading: "", meanings:["ta"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"ち", reading: "", meanings:["chi"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"つ", reading: "", meanings:["tsu"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"て", reading: "", meanings:["te"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"と", reading: "", meanings:["to"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"だ", reading: "", meanings:["da"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ぢ", reading: "", meanings:["ji"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"づ", reading: "", meanings:["zu"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"で", reading: "", meanings:["de"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ど", reading: "", meanings:["do"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"な", reading: "", meanings:["na"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"に", reading: "", meanings:["ni"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"ぬ", reading: "", meanings:["nu"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"ね", reading: "", meanings:["ne"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"の", reading: "", meanings:["no"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"は", reading: "", meanings:["ha"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"ひ", reading: "", meanings:["hi"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"ふ", reading: "", meanings:["fu"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"へ", reading: "", meanings:["he"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"ほ", reading: "", meanings:["ho"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ば", reading: "", meanings:["ba"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"び", reading: "", meanings:["bi"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ぶ", reading: "", meanings:["bu"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"べ", reading: "", meanings:["be"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ぼ", reading: "", meanings:["bo"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ぱ", reading: "", meanings:["pa"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ぴ", reading: "", meanings:["pi"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ぷ", reading: "", meanings:["pu"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ぺ", reading: "", meanings:["pe"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ぽ", reading: "", meanings:["po"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ま", reading: "", meanings:["ma"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"み", reading: "", meanings:["mi"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"む", reading: "", meanings:["mu"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"め", reading: "", meanings:["me"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"も", reading: "", meanings:["mo"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"や", reading: "", meanings:["ya"], categories: ["hiragana"], date:"1970-01-01"},      
  {kanji:"ゆ", reading: "", meanings:["yu"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"よ", reading: "", meanings:["yo"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ら", reading: "", meanings:["ra"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"り", reading: "", meanings:["ri"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"る", reading: "", meanings:["ru"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"れ", reading: "", meanings:["re"], categories: ["hiragana"], date:"1970-01-01"},   
  {kanji:"ろ", reading: "", meanings:["ro"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"わ", reading: "", meanings:["wa"], categories: ["hiragana"], date:"1970-01-01"},    
  {kanji:"を", reading: "", meanings:["o"], categories: ["hiragana"], date:"1970-01-01"},
  {kanji:"ん", reading: "", meanings:["n"], categories: ["hiragana"], date:"1970-01-01"},
  )

  //katakana
  answers.push(
  {kanji:"ア", reading: "", meanings:["a"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"イ", reading: "", meanings:["i"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ウ", reading: "", meanings:["u"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"エ", reading: "", meanings:["e"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"オ", reading: "", meanings:["o"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"カ", reading: "", meanings:["ka"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"キ", reading: "", meanings:["ki"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ク", reading: "", meanings:["ku"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ケ", reading: "", meanings:["ke"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"コ", reading: "", meanings:["ko"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"ガ", reading: "", meanings:["ga"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ギ", reading: "", meanings:["gi"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"グ", reading: "", meanings:["gu"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ゲ", reading: "", meanings:["ge"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ゴ", reading: "", meanings:["go"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"サ", reading: "", meanings:["sa"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"シ", reading: "", meanings:["shi"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ス", reading: "", meanings:["su"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"セ", reading: "", meanings:["se"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ソ", reading: "", meanings:["so"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"ザ", reading: "", meanings:["za"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ジ", reading: "", meanings:["ji"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ズ", reading: "", meanings:["zu"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ゼ", reading: "", meanings:["ze"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ゾ", reading: "", meanings:["zo"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"タ", reading: "", meanings:["ta"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"チ", reading: "", meanings:["chi"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ツ", reading: "", meanings:["tsu"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"テ", reading: "", meanings:["te"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ト", reading: "", meanings:["to"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"ダ", reading: "", meanings:["da"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ヂ", reading: "", meanings:["ji"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ヅ", reading: "", meanings:["zu"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"デ", reading: "", meanings:["de"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ド", reading: "", meanings:["do"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"ナ", reading: "", meanings:["na"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ニ", reading: "", meanings:["ni"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ヌ", reading: "", meanings:["nu"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ネ", reading: "", meanings:["ne"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ノ", reading: "", meanings:["no"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"ハ", reading: "", meanings:["ha"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ヒ", reading: "", meanings:["hi"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"フ", reading: "", meanings:["fu"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ヘ", reading: "", meanings:["he"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ホ", reading: "", meanings:["ho"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"バ", reading: "", meanings:["ba"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ビ", reading: "", meanings:["bi"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ブ", reading: "", meanings:["bu"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ベ", reading: "", meanings:["be"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ボ", reading: "", meanings:["bo"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"パ", reading: "", meanings:["pa"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ピ", reading: "", meanings:["pi"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"プ", reading: "", meanings:["pu"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ペ", reading: "", meanings:["pe"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ポ", reading: "", meanings:["po"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"マ", reading: "", meanings:["ma"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ミ", reading: "", meanings:["mi"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ム", reading: "", meanings:["mu"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"メ", reading: "", meanings:["me"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"モ", reading: "", meanings:["mo"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"ヤ", reading: "", meanings:["ya"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ユ", reading: "", meanings:["yu"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ヨ", reading: "", meanings:["yo"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"ラ", reading: "", meanings:["ra"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"リ", reading: "", meanings:["ri"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ル", reading: "", meanings:["ru"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"レ", reading: "", meanings:["re"], categories: ["katakana"], date:"1970-01-01"},   
  {kanji:"ロ", reading: "", meanings:["ro"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"ワ", reading: "", meanings:["wa"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"ヲ", reading: "", meanings:["wo"], categories: ["katakana"], date:"1970-01-01"},
  {kanji:"ン", reading: "", meanings:["n"], categories: ["katakana"], date:"1970-01-01"},
  )

  //numbers
  answers.push(
  {kanji:"一", reading: "ichi", meanings:["1"], categories: ["numbers"], date:"2023-12-19"},
  {kanji:"二", reading: "ni", meanings:["2"], categories: ["numbers"], date:"2023-12-19"},
  {kanji:"三", reading: "san", meanings:["3"], categories: ["numbers"], date:"2023-12-19"},
  {kanji:"四", reading: "yo/yon", meanings:["4"], categories: ["numbers"], date:"2023-12-19"},
  {kanji:"五", reading: "go", meanings:["5"], categories: ["numbers"], date:"2023-12-19"},
  {kanji:"六", reading: "roku", meanings:["6"], categories: ["numbers"], date:"2023-12-19"},
  {kanji:"七", reading: "shichi/nana", meanings:["7"], categories: ["numbers"], date:"2023-12-19"},
  {kanji:"八", reading: "hachi", meanings:["8"], categories: ["numbers"], date:"2023-12-19"},
  {kanji:"九", reading: "ku/kyu", meanings:["9"], categories: ["numbers"], date:"2023-12-19"},
  {kanji:"十", reading: "jyu", meanings:["10"], categories: ["numbers"], date:"2023-12-19"},
  {kanji:"百", reading: "hyaku", meanings:["100"], categories: ["numbers"], date:"2023-12-19"},
  {kanji:"千", reading: "sen", meanings:["1000"], categories: ["numbers"], date:"2023-12-19"},
  )

  //days
  answers.push(
  {kanji:"土曜日",reading: "doyoubi", meanings:["saturday"], categories: ["days"], date:"2023-12-19"},
  {kanji:"日曜日",reading: "nichiyoubi", meanings:["sunday"], categories: ["days"], date:"2023-12-19"},
  )

  //random interesting ones
  answers.push(
  {kanji:"古い", reading: "furui",meanings: ["old"], categories: ["interesting"], date:"2023-12-19"},
  //{kanji:"大き", reading: "ooki",meanings: ["big"], categories: ["interesting"], date:"2023-12-19"},
  {kanji:"買います", reading: "kaimasu", meanings: ["buy"], categories: ["interesting"], date:"2023-12-19"},
  {kanji:"新しい", reading: "atarashi", meanings: ["new"], categories: ["interesting"], date:"2023-12-19"},
  {kanji:"小さい", reading: "chiisai", meanings: ["small"], categories: ["interesting"], date:"2023-12-19"},
  {kanji:"来ます", reading: "kimasu", meanings: ["come"], categories: ["interesting"], date:"2023-12-19"},
  {kanji:"時間", reading: "jikan", meanings: ["time"], categories: ["interesting"], date:"2023-12-19"},
  {kanji:"分ぐらい", reading: "fungurai", meanings: ["minute"], categories: ["interesting"], date:"2023-12-19"},
  {kanji:"好きです", reading: "sukidesu", meanings: ["like"], categories: ["interesting"], date:"2023-12-19"},
  {kanji:"問", reading: "mon/toi", meanings: ["questions", "question"], categories: ["interesting"], date:"2023-12-22"},
  {kanji:"何", reading: "nan", meanings: ["what"], categories: ["interesting"], date:"2023-12-22"},
  {kanji:"何時", reading: "nanji", meanings: ["when"], categories: ["interesting"], date:"2023-12-22"},
  {kanji:"水", reading: "mizu", meanings: ["water"], categories: ["interesting"], date:"2023-12-22"},
  {kanji:"食べます", reading: "tabemasu", meanings: ["eat"], categories: ["interesting"], date:"2023-12-22"},
  {kanji:"高", reading: "takai", meanings: ["expensive", "high"], categories: ["interesting"], date:"2023-12-22"},
  {kanji:"少すこ", reading: "sukoshi", meanings: ["a bit"], categories: ["interesting"], date:"2023-12-22"},
  {kanji:"飲", reading: "in,nomu",meanings: ["drink"], categories: ["interesting"], date:"2024-01-05"},
  {kanji:"読", reading: "yomu",meanings: ["read"], categories: ["interesting"], date:"2024-01-05"},
  {kanji:"山", reading: "yama",meanings: ["mountain"], categories: ["interesting"], date:"2024-01-05"},
  {kanji:"父", reading: "chichi",meanings: ["father"], categories: ["interesting"], date:"2024-01-05"},
  //{kanji:"土", reading: "tsuchi",meanings: ["earth","soil","mud"], categories: ["interesting"], date:"2024-01-05"},
  )

  //kyoiku kanji first grade
  answers.push(
  /*一   one   ichi
  二   two   ni
  三   three   san
  四   four  shi
  五   five  go
  六   six   roku
  七   seven   shichi
  八   eight   hachi
  九   nine  ku
  十   ten   jū
  百   hundred   hyaku
  千   thousand  sen
  上   top, above  jō*/
  {kanji:"下", reading: "shita",meanings:["bottom","below"], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  {kanji:"左", reading: "hidari",meanings:["left",], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  {kanji:"右", reading: "migi",meanings:["right",], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  //{kanji:"中", reading: "naka",meanings:["inside","middle"], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  //{kanji:"大", reading: "ō-kii",meanings:["large",], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  //{kanji:"小", reading: "chii-sai",meanings:["small",], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  {kanji:"月", reading: "tsuki",meanings:["month","moon"], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  //{kanji:"日", reading: "ka",meanings:["day","sun"], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  //{kanji:"年", reading: "toshi",meanings:["year",], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  {kanji:"早", reading: "haya-i",meanings:["early",], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  {kanji:"木", reading: "ki",meanings:["tree",], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  {kanji:"林", reading: "hayashi",meanings:["woods","forest"], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  //{kanji:"山", reading: "yama",meanings:["mountain",], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  {kanji:"川", reading: "kawa",meanings:["river",], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  {kanji:"土", reading: "tsuchi",meanings:["soil","earth"], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  {kanji:"空", reading: "sora",meanings:["sky",], categories: ["kyoikuGrade1"], date:"2024-01-05"},
  )


  //mostUsed
  answers.push(
  {kanji:"日", reading: "hi", meanings: ["day"], categories: ["mostUsed"], date:"2023-12-19"},
  {kanji:"人", reading: "hito", meanings: ["person"], categories: ["mostUsed"], date:"2023-12-19"},
  //{kanji:"一", reading: "ichi", meanings: ["one"], categories: ["mostUsed"], date:"2023-12-19"},
  {kanji:"大", reading: "dai", meanings: ["big"], categories: ["mostUsed"], date:"2023-12-19"},
  {kanji:"年", reading: "nen", meanings: ["year"], categories: ["mostUsed"], date:"2023-12-19"},
  {kanji:"本", reading: "hon", meanings: ["book"], categories: ["mostUsed"], date:"2023-12-19"},
  {kanji:"中", reading: "chu", meanings: ["middle"], categories: ["mostUsed"], date:"2023-12-19"},
  {kanji:"出", reading: "deru", meanings: ["come out"], categories: ["mostUsed"], date:"2023-12-22"},
  {kanji:"時", reading: "toki", meanings: ["time"], categories: ["mostUsed"], date:"2023-12-22"},
  {kanji:"行", reading: "gyi", meanings: ["to go","row"], categories: ["mostUsed"], date:"2023-12-22"},
  {kanji:"事", reading: "koto", meanings: ["matter","thing","job"], categories: ["mostUsed"], date:"2023-12-22"},
  //{kanji:"分", reading: "fun", meanings: ["minute"], categories: ["mostUsed"], date:"2023-12-22"},
  {kanji:"会", reading: "kai", meanings: ["meeting"], categories: ["mostUsed"], date:"2023-12-22"},
  {kanji:"上", reading: "ue", meanings: ["above","upper"], categories: ["mostUsed"], date:"2023-12-22"},
  {kanji:"生", reading: "nama", meanings: ["raw","live"], categories: ["mostUsed"], date:"2023-12-22"},
  {kanji:"国", reading: "kuni", meanings: ["land","large place"], categories: ["mostUsed"], date:"2023-12-22"},
  {kanji:"者", reading: "mono (insult person)", meanings: ["person","thing"], categories: ["mostUsed"], date:"2023-12-29"},
  {kanji:"合", reading: "au", meanings: ["fit","suit","match"], categories: ["mostUsed"], date:"2023-12-29"},
  {kanji:"自ら", reading: "mizukara", meanings: ["self","oneself"], categories: ["mostUsed"], date:"2023-12-29"},
  {kanji:"間", reading: "aida", meanings: ["space","between","interval","room"], categories: ["mostUsed"], date:"2023-12-29"},
  {kanji:"方", reading: "kata (polite person)", meanings: ["direction","person","way"], categories: ["mostUsed"], date:"2023-12-29"},
  {kanji:"見", reading: "mi", meanings: ["seeing","looking","look","see","view"], categories: ["mostUsed"], date:"2023-12-29"},
  {kanji:"手", reading: "te", meanings: ["hand","handle","paw","way","way of acting"], categories: ["mostUsed"], date:"2023-12-29"},
  {kanji:"前", reading: "mae", meanings: ["before","in front"], categories: ["mostUsed"], date:"2024-01-05"},
  {kanji:"場", reading: "ba", meanings: ["place"], categories: ["mostUsed"], date:"2024-01-05"},
  //{kanji:"月", reading: "tsuki", meanings: ["month","moon"], categories: ["mostUsed"], date:"2024-01-05"},
  {kanji:"子", reading: "ko", meanings: ["child","term of endearment"], categories: ["mostUsed"], date:"2024-01-05"},
  {kanji:"地", reading: "ji", meanings: ["earth","dirt"], categories: ["mostUsed"], date:"2024-01-05"},
  {kanji:"学", reading: "gaku", meanings: ["learn","education","school"], categories: ["mostUsed"], date:"2024-01-05"},
  {kanji:"後", reading: "ato", meanings: ["behind","after"], categories: ["mostUsed"], date:"2024-01-05"},
  {kanji:"入", reading: "iru", meanings: ["enter","insert"], categories: ["mostUsed"], date:"2024-01-05"},
  {kanji:"目", reading: "me", meanings: ["eye"], categories: ["mostUsed"], date:"2024-01-05"},
  )
  return answers;
}