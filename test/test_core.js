eval(loadFile('src/lang.js'));
eval(loadFile('src/hangul.js'));


testCases(test,

function test_isHangul() {
    assert.that(hangul.isHangul('ㄱ'), isTrue());
    assert.that(hangul.isHangul('ㅣ'), isTrue());
    assert.that(hangul.isHangul('가'), isTrue());
    assert.that(hangul.isHangul('힣'), isTrue());
    assert.that(hangul.isHangul(''), isFalse());
    assert.that(hangul.isHangul('陵'), isFalse());
    assert.that(hangul.isHangul('\u1100'), isFalse());
},

function test_isSyllable() {
    assert.that(hangul.isSyllable('가'), isTrue());
    assert.that(hangul.isSyllable('힣'), isTrue());
    assert.that(hangul.isSyllable('갹'), isTrue());
    assert.that(hangul.isSyllable(''), isFalse());
    assert.that(hangul.isSyllable('ㄱ'), isFalse());
    assert.that(hangul.isSyllable('\u1101'), isFalse());
},

function test_isJamo() {
    assert.that(hangul.isJamo('ㄱ'), isTrue());
    assert.that(hangul.isJamo('ㅋ'), isTrue());
    assert.that(hangul.isJamo('ㅘ'), isTrue());
    assert.that(hangul.isJamo('크'), isFalse());
    assert.that(hangul.isJamo('\u1102'), isFalse());
},

function test_isInitial() {
    assert.that(hangul.isInitial('ㄱ'), isTrue());
    assert.that(hangul.isInitial('ㅎ'), isTrue());
    assert.that(hangul.isInitial('ㄼ'), isFalse());
    assert.that(hangul.isInitial('ㅏ'), isFalse());
},

function test_isMedial() {
    assert.that(hangul.isMedial('ㅡ'), isTrue());
    assert.that(hangul.isMedial('ㅘ'), isTrue());
    assert.that(hangul.isMedial('ㅎ'), isFalse());
    assert.that(hangul.isMedial('ㄻ'), isFalse());
},

function test_isFinal() {
    assert.that(hangul.isFinal('ㄴ'), isTrue());
    assert.that(hangul.isFinal('ㄿ'), isTrue());
    assert.that(hangul.isFinal('ㅃ'), isFalse());
    assert.that(hangul.isFinal('ㅣ'), isFalse());
},

function test_getInitial() {
    assert.that(hangul.getInitial('가'), eq('ㄱ'));
    assert.that(hangul.getInitial('뽁'), eq('ㅃ'));
    assert.that(hangul.getInitial('흡'), eq('ㅎ'));
    assert.that(hangul.getInitial('힣'), eq('ㅎ'));
    assert.that(hangul.getInitial('ㅇ'), eq(undefined));
},

function test_getMedial() {
    assert.that(hangul.getMedial('가'), eq('ㅏ'));
    assert.that(hangul.getMedial('놔'), eq('ㅘ'));
    assert.that(hangul.getMedial('쟈'), eq('ㅑ'));
    assert.that(hangul.getMedial('힣'), eq('ㅣ'));
    assert.that(hangul.getInitial('ㅢ'), eq(undefined));
},

function test_getFinal() {
    assert.that(hangul.getFinal('가'), eq(''));
    assert.that(hangul.getFinal('굷'), eq('ㄼ'));
    assert.that(hangul.getFinal('힣'), eq('ㅎ'));
    assert.that(hangul.getFinal('ㄼ'), eq(undefined));
},

function test_decompose() {
    assert.that(hangul.decompose('가'), containsInOrder('ㄱ', 'ㅏ'));
    assert.that(hangul.decompose('얘'), containsInOrder('ㅇ', 'ㅒ'));
    assert.that(hangul.decompose('뷙'), containsInOrder('ㅂ', 'ㅟ', 'ㄵ'));
    assert.that(hangul.decompose('잆'), containsInOrder('ㅇ', 'ㅣ', 'ㅄ'));
    assert.that(hangul.decompose('힣'), containsInOrder('ㅎ', 'ㅣ', 'ㅎ'));
},

function test_compose() {
    assert.that(hangul.compose('ㄱ', 'ㅏ'), eq('가'));
    assert.that(hangul.compose('ㅃ', 'ㅖ', ''), eq('뼤'));
    assert.that(hangul.compose('ㅇ', 'ㅟ', 'ㄱ'), eq('윅'));
    assert.that(hangul.compose('ㅋ', 'ㅠ', 'ㄼ'), eq('큛'));
    assert.that(hangul.compose('ㅎ', 'ㅣ', 'ㅎ'), eq('힣'));
    assert.that(hangul.compose('ㅎ', 'ㅣ', 'ㅃ'), eq(undefined));
},

function test_composeDoubleJamo() {
    assert.that(hangul.composeDoubleJamo('ㄷ', 'ㄷ'), eq('ㄸ'));
    assert.that(hangul.composeDoubleJamo('ㄱ', 'ㅅ'), eq('ㄳ'));
    assert.that(hangul.composeDoubleJamo('ㅜ', 'ㅓ'), eq('ㅝ'));
    assert.that(hangul.composeDoubleJamo('ㅡ', 'ㅣ'), eq('ㅢ'));
    assert.that(hangul.composeDoubleJamo('ㄴ', 'ㄴ'), eq(undefined));
},

function test_decomposeDoubleJamo() {
    assert.that(hangul.decomposeDoubleJamo('ㅃ'), containsInOrder('ㅂ', 'ㅂ'));
    assert.that(hangul.decomposeDoubleJamo('ㄻ'), containsInOrder('ㄹ', 'ㅁ'));
    assert.that(hangul.decomposeDoubleJamo('ㅢ'), containsInOrder('ㅡ', 'ㅣ'));
    assert.that(hangul.decomposeDoubleJamo('ㅖ'), eq(undefined));
}

);
