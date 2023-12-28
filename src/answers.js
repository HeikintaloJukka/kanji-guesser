export function answersFile() {
  var answers = []
  //numbers
  answers.push(
  {kanji:"一", reading: "ichi", meanings:["1"], categories: ["numbers"]},
  {kanji:"二", reading: "ni", meanings:["2"], categories: ["numbers"]},
  {kanji:"三", reading: "san", meanings:["3"], categories: ["numbers"]},
  {kanji:"四", reading: "yo/yon", meanings:["4"], categories: ["numbers"]},
  {kanji:"五", reading: "go", meanings:["5"], categories: ["numbers"]},
  {kanji:"六", reading: "roku", meanings:["6"], categories: ["numbers"]},
  {kanji:"七", reading: "shichi/nana", meanings:["7"], categories: ["numbers"]},
  {kanji:"八", reading: "hachi", meanings:["8"], categories: ["numbers"]},
  {kanji:"九", reading: "ku/kyu", meanings:["9"], categories: ["numbers"]},
  {kanji:"十", reading: "jyu", meanings:["10"], categories: ["numbers"]},
  {kanji:"百", reading: "hyaku", meanings:["100"], categories: ["numbers"]},
  {kanji:"千", reading: "sen", meanings:["1000"], categories: ["numbers"]},
  )

  //days
  answers.push(
  {kanji:"土曜日",reading: "doyoubi", meanings:["saturday"], categories: ["days"]},
  {kanji:"日曜日",reading: "nichiyoubi", meanings:["sunday"], categories: ["days"]},
  )

  //random interesting ones
  answers.push(
  {kanji:"古い", reading: "furui",meanings: ["old"], categories: ["interesting"]},
  //{kanji:"大き", reading: "ooki",meanings: ["big"], categories: ["interesting"]},
  {kanji:"買います", reading: "kaimasu", meanings: ["buy"], categories: ["interesting"]},
  {kanji:"新しい", reading: "atarashi", meanings: ["new"], categories: ["interesting"]},
  {kanji:"小さい", reading: "chiisai", meanings: ["small"], categories: ["interesting"]},
  {kanji:"来ます", reading: "kimasu", meanings: ["come"], categories: ["interesting"]},
  {kanji:"時間", reading: "jikan", meanings: ["time"], categories: ["interesting"]},
  {kanji:"分ぐらい", reading: "fungurai", meanings: ["minute"], categories: ["interesting"]},
  {kanji:"好きです", reading: "sukidesu", meanings: ["like"], categories: ["interesting"]},
  {kanji:"問", reading: "mon/toi", meanings: ["questions", "question"], categories: ["interesting", "lastAdded"]},
  {kanji:"何", reading: "nan", meanings: ["what"], categories: ["interesting", "lastAdded"]},
  {kanji:"何時", reading: "nanji", meanings: ["when"], categories: ["interesting", "lastAdded"]},
  {kanji:"水", reading: "mizu", meanings: ["water"], categories: ["interesting", "lastAdded"]},
  {kanji:"食べます", reading: "tabemasu", meanings: ["eat"], categories: ["interesting", "lastAdded"]},
  {kanji:"高", reading: "takai", meanings: ["expensive"], categories: ["interesting", "lastAdded"]},
  {kanji:"少すこ", reading: "sukoshi", meanings: ["a bit"], categories: ["interesting", "lastAdded"]},
  )

  //mostUsed
  answers.push(
  {kanji:"日", reading: "hi", meanings: ["day"], categories: ["mostUsed"]},
  {kanji:"人", reading: "hito", meanings: ["person"], categories: ["mostUsed"]},
  //{kanji:"一", reading: "ichi", meanings: ["one"], categories: ["mostUsed"]},
  {kanji:"大", reading: "dai", meanings: ["big"], categories: ["mostUsed"]},
  {kanji:"年", reading: "nen", meanings: ["year"], categories: ["mostUsed"]},
  {kanji:"本", reading: "hon", meanings: ["book"], categories: ["mostUsed"]},
  {kanji:"中", reading: "chu", meanings: ["middle"], categories: ["mostUsed"]},
  {kanji:"出", reading: "deru", meanings: ["come out"], categories: ["mostUsed", "lastAdded"]},
  {kanji:"時", reading: "toki", meanings: ["time"], categories: ["mostUsed", "lastAdded"]},
  {kanji:"行", reading: "gyi", meanings: ["to go","row"], categories: ["mostUsed", "lastAdded"]},
  {kanji:"事", reading: "koto", meanings: ["matter","job"], categories: ["mostUsed", "lastAdded"]},
  //{kanji:"分", reading: "fun", meanings: ["minute"], categories: ["mostUsed", "lastAdded"]},
  {kanji:"会", reading: "kai", meanings: ["meeting"], categories: ["mostUsed", "lastAdded"]},
  {kanji:"上", reading: "ue", meanings: ["above","upper"], categories: ["mostUsed", "lastAdded"]},
  {kanji:"生", reading: "nama", meanings: ["raw","live"], categories: ["mostUsed", "lastAdded"]},
  {kanji:"国", reading: "kuni", meanings: ["land","large place"], categories: ["mostUsed", "lastAdded"]},
  )
  return answers;
}