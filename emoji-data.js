// Unicode表情包数据 - 基于unicode-emoji-json
// 包含常用的表情符号，按类别分组

const EMOJI_DATA = {
  // 笑脸和情感
  "smileys-emotion": {
    "name": "笑脸和情感",
    "emojis": [
      { "emoji": "😀", "name": "grinning face", "unicode": "1F600" },
      { "emoji": "😃", "name": "grinning face with big eyes", "unicode": "1F603" },
      { "emoji": "😄", "name": "grinning face with smiling eyes", "unicode": "1F604" },
      { "emoji": "😁", "name": "beaming face with smiling eyes", "unicode": "1F601" },
      { "emoji": "😆", "name": "grinning squinting face", "unicode": "1F606" },
      { "emoji": "😅", "name": "grinning face with sweat", "unicode": "1F605" },
      { "emoji": "🤣", "name": "rolling on the floor laughing", "unicode": "1F923" },
      { "emoji": "😂", "name": "face with tears of joy", "unicode": "1F602" },
      { "emoji": "🙂", "name": "slightly smiling face", "unicode": "1F642" },
      { "emoji": "🙃", "name": "upside-down face", "unicode": "1F643" },
      { "emoji": "😉", "name": "winking face", "unicode": "1F609" },
      { "emoji": "😊", "name": "smiling face with smiling eyes", "unicode": "1F60A" },
      { "emoji": "😇", "name": "smiling face with halo", "unicode": "1F607" },
      { "emoji": "🥰", "name": "smiling face with hearts", "unicode": "1F970" },
      { "emoji": "😍", "name": "smiling face with heart-eyes", "unicode": "1F60D" },
      { "emoji": "🤩", "name": "star-struck", "unicode": "1F929" },
      { "emoji": "😘", "name": "face blowing a kiss", "unicode": "1F618" },
      { "emoji": "😗", "name": "kissing face", "unicode": "1F617" },
      { "emoji": "😚", "name": "kissing face with closed eyes", "unicode": "1F61A" },
      { "emoji": "😙", "name": "kissing face with smiling eyes", "unicode": "1F619" },
      { "emoji": "😋", "name": "face savoring food", "unicode": "1F60B" },
      { "emoji": "😛", "name": "face with tongue", "unicode": "1F61B" },
      { "emoji": "😜", "name": "winking face with tongue", "unicode": "1F61C" },
      { "emoji": "🤪", "name": "zany face", "unicode": "1F92A" },
      { "emoji": "😝", "name": "squinting face with tongue", "unicode": "1F61D" },
      { "emoji": "🤑", "name": "money-mouth face", "unicode": "1F911" },
      { "emoji": "🤗", "name": "hugging face", "unicode": "1F917" },
      { "emoji": "🤭", "name": "face with hand over mouth", "unicode": "1F92D" },
      { "emoji": "🤫", "name": "shushing face", "unicode": "1F92B" },
      { "emoji": "🤔", "name": "thinking face", "unicode": "1F914" },
      { "emoji": "🤐", "name": "zipper-mouth face", "unicode": "1F910" },
      { "emoji": "🤨", "name": "face with raised eyebrow", "unicode": "1F928" },
      { "emoji": "😐", "name": "neutral face", "unicode": "1F610" },
      { "emoji": "😑", "name": "expressionless face", "unicode": "1F611" },
      { "emoji": "😶", "name": "face without mouth", "unicode": "1F636" },
      { "emoji": "😏", "name": "smirking face", "unicode": "1F60F" },
      { "emoji": "😒", "name": "unamused face", "unicode": "1F612" },
      { "emoji": "🙄", "name": "face with rolling eyes", "unicode": "1F644" },
      { "emoji": "😬", "name": "grimacing face", "unicode": "1F62C" },
      { "emoji": "🤥", "name": "lying face", "unicode": "1F925" },
      { "emoji": "😔", "name": "pensive face", "unicode": "1F614" },
      { "emoji": "😪", "name": "sleepy face", "unicode": "1F62A" },
      { "emoji": "🤤", "name": "drooling face", "unicode": "1F924" },
      { "emoji": "😴", "name": "sleeping face", "unicode": "1F634" },
      { "emoji": "😷", "name": "face with medical mask", "unicode": "1F637" },
      { "emoji": "🤒", "name": "face with thermometer", "unicode": "1F912" },
      { "emoji": "🤕", "name": "face with head-bandage", "unicode": "1F915" },
      { "emoji": "🤢", "name": "nauseated face", "unicode": "1F922" },
      { "emoji": "🤮", "name": "face vomiting", "unicode": "1F92E" },
      { "emoji": "🤧", "name": "sneezing face", "unicode": "1F927" },
      { "emoji": "🥵", "name": "hot face", "unicode": "1F975" },
      { "emoji": "🥶", "name": "cold face", "unicode": "1F976" },
      { "emoji": "🥴", "name": "woozy face", "unicode": "1F974" },
      { "emoji": "😵", "name": "dizzy face", "unicode": "1F635" },
      { "emoji": "🤯", "name": "exploding head", "unicode": "1F92F" },
      { "emoji": "🤠", "name": "cowboy hat face", "unicode": "1F920" },
      { "emoji": "🥳", "name": "partying face", "unicode": "1F973" },
      { "emoji": "😎", "name": "smiling face with sunglasses", "unicode": "1F60E" },
      { "emoji": "🤓", "name": "nerd face", "unicode": "1F913" },
      { "emoji": "🧐", "name": "face with monocle", "unicode": "1F9D0" }
    ]
  },
  
  // 手势
  "people-body": {
    "name": "人物和手势",
    "emojis": [
      { "emoji": "👍", "name": "thumbs up", "unicode": "1F44D" },
      { "emoji": "👎", "name": "thumbs down", "unicode": "1F44E" },
      { "emoji": "👌", "name": "OK hand", "unicode": "1F44C" },
      { "emoji": "✌️", "name": "victory hand", "unicode": "270C" },
      { "emoji": "🤞", "name": "crossed fingers", "unicode": "1F91E" },
      { "emoji": "🤟", "name": "love-you gesture", "unicode": "1F91F" },
      { "emoji": "🤘", "name": "sign of the horns", "unicode": "1F918" },
      { "emoji": "🤙", "name": "call me hand", "unicode": "1F919" },
      { "emoji": "👈", "name": "backhand index pointing left", "unicode": "1F448" },
      { "emoji": "👉", "name": "backhand index pointing right", "unicode": "1F449" },
      { "emoji": "👆", "name": "backhand index pointing up", "unicode": "1F446" },
      { "emoji": "👇", "name": "backhand index pointing down", "unicode": "1F447" },
      { "emoji": "☝️", "name": "index pointing up", "unicode": "261D" },
      { "emoji": "✋", "name": "raised hand", "unicode": "270B" },
      { "emoji": "🤚", "name": "raised back of hand", "unicode": "1F91A" },
      { "emoji": "🖐️", "name": "hand with fingers splayed", "unicode": "1F590" },
      { "emoji": "🖖", "name": "vulcan salute", "unicode": "1F596" },
      { "emoji": "👋", "name": "waving hand", "unicode": "1F44B" },
      { "emoji": "🤛", "name": "left-facing fist", "unicode": "1F91B" },
      { "emoji": "🤜", "name": "right-facing fist", "unicode": "1F91C" },
      { "emoji": "✊", "name": "raised fist", "unicode": "270A" },
      { "emoji": "👊", "name": "oncoming fist", "unicode": "1F44A" },
      { "emoji": "🤝", "name": "handshake", "unicode": "1F91D" },
      { "emoji": "🙏", "name": "folded hands", "unicode": "1F64F" },
      { "emoji": "✍️", "name": "writing hand", "unicode": "270D" },
      { "emoji": "💪", "name": "flexed biceps", "unicode": "1F4AA" },
      { "emoji": "🦵", "name": "leg", "unicode": "1F9B5" },
      { "emoji": "🦶", "name": "foot", "unicode": "1F9B6" }
    ]
  },
  
  // 心形符号
  "symbols": {
    "name": "符号",
    "emojis": [
      { "emoji": "❤️", "name": "red heart", "unicode": "2764" },
      { "emoji": "🧡", "name": "orange heart", "unicode": "1F9E1" },
      { "emoji": "💛", "name": "yellow heart", "unicode": "1F49B" },
      { "emoji": "💚", "name": "green heart", "unicode": "1F49A" },
      { "emoji": "💙", "name": "blue heart", "unicode": "1F499" },
      { "emoji": "💜", "name": "purple heart", "unicode": "1F49C" },
      { "emoji": "🖤", "name": "black heart", "unicode": "1F5A4" },
      { "emoji": "🤍", "name": "white heart", "unicode": "1F90D" },
      { "emoji": "🤎", "name": "brown heart", "unicode": "1F90E" },
      { "emoji": "💔", "name": "broken heart", "unicode": "1F494" },
      { "emoji": "❣️", "name": "heart exclamation", "unicode": "2763" },
      { "emoji": "💕", "name": "two hearts", "unicode": "1F495" },
      { "emoji": "💞", "name": "revolving hearts", "unicode": "1F49E" },
      { "emoji": "💓", "name": "beating heart", "unicode": "1F493" },
      { "emoji": "💗", "name": "growing heart", "unicode": "1F497" },
      { "emoji": "💖", "name": "sparkling heart", "unicode": "1F496" },
      { "emoji": "💘", "name": "heart with arrow", "unicode": "1F498" },
      { "emoji": "💝", "name": "heart with ribbon", "unicode": "1F49D" },
      { "emoji": "💟", "name": "heart decoration", "unicode": "1F49F" },
      { "emoji": "☮️", "name": "peace symbol", "unicode": "262E" },
      { "emoji": "✝️", "name": "latin cross", "unicode": "271D" },
      { "emoji": "☪️", "name": "star and crescent", "unicode": "262A" },
      { "emoji": "🕉️", "name": "om", "unicode": "1F549" },
      { "emoji": "☸️", "name": "wheel of dharma", "unicode": "2638" },
      { "emoji": "✡️", "name": "star of David", "unicode": "2721" },
      { "emoji": "🔯", "name": "dotted six-pointed star", "unicode": "1F52F" },
      { "emoji": "🕎", "name": "menorah", "unicode": "1F54E" },
      { "emoji": "☯️", "name": "yin yang", "unicode": "262F" },
      { "emoji": "☦️", "name": "orthodox cross", "unicode": "2626" },
      { "emoji": "🛐", "name": "place of worship", "unicode": "1F6D0" },
      { "emoji": "⛎", "name": "Ophiuchus", "unicode": "26CE" },
      { "emoji": "♈", "name": "Aries", "unicode": "2648" },
      { "emoji": "♉", "name": "Taurus", "unicode": "2649" },
      { "emoji": "♊", "name": "Gemini", "unicode": "264A" },
      { "emoji": "♋", "name": "Cancer", "unicode": "264B" },
      { "emoji": "♌", "name": "Leo", "unicode": "264C" },
      { "emoji": "♍", "name": "Virgo", "unicode": "264D" },
      { "emoji": "♎", "name": "Libra", "unicode": "264E" },
      { "emoji": "♏", "name": "Scorpio", "unicode": "264F" },
      { "emoji": "♐", "name": "Sagittarius", "unicode": "2650" },
      { "emoji": "♑", "name": "Capricorn", "unicode": "2651" },
      { "emoji": "♒", "name": "Aquarius", "unicode": "2652" },
      { "emoji": "♓", "name": "Pisces", "unicode": "2653" }
    ]
  },
  
  // 动物和自然
  "animals-nature": {
    "name": "动物和自然",
    "emojis": [
      { "emoji": "🐶", "name": "dog face", "unicode": "1F436" },
      { "emoji": "🐱", "name": "cat face", "unicode": "1F431" },
      { "emoji": "🐭", "name": "mouse face", "unicode": "1F42D" },
      { "emoji": "🐹", "name": "hamster", "unicode": "1F439" },
      { "emoji": "🐰", "name": "rabbit face", "unicode": "1F430" },
      { "emoji": "🦊", "name": "fox", "unicode": "1F98A" },
      { "emoji": "🐻", "name": "bear", "unicode": "1F43B" },
      { "emoji": "🐼", "name": "panda", "unicode": "1F43C" },
      { "emoji": "🐨", "name": "koala", "unicode": "1F428" },
      { "emoji": "🐯", "name": "tiger face", "unicode": "1F42F" },
      { "emoji": "🦁", "name": "lion", "unicode": "1F981" },
      { "emoji": "🐮", "name": "cow face", "unicode": "1F42E" },
      { "emoji": "🐷", "name": "pig face", "unicode": "1F437" },
      { "emoji": "🐽", "name": "pig nose", "unicode": "1F43D" },
      { "emoji": "🐸", "name": "frog", "unicode": "1F438" },
      { "emoji": "🐵", "name": "monkey face", "unicode": "1F435" },
      { "emoji": "🙈", "name": "see-no-evil monkey", "unicode": "1F648" },
      { "emoji": "🙉", "name": "hear-no-evil monkey", "unicode": "1F649" },
      { "emoji": "🙊", "name": "speak-no-evil monkey", "unicode": "1F64A" },
      { "emoji": "🐒", "name": "monkey", "unicode": "1F412" },
      { "emoji": "🐔", "name": "chicken", "unicode": "1F414" },
      { "emoji": "🐧", "name": "penguin", "unicode": "1F427" },
      { "emoji": "🐦", "name": "bird", "unicode": "1F426" },
      { "emoji": "🐤", "name": "baby chick", "unicode": "1F424" },
      { "emoji": "🐣", "name": "hatching chick", "unicode": "1F423" },
      { "emoji": "🐥", "name": "front-facing baby chick", "unicode": "1F425" },
      { "emoji": "🦆", "name": "duck", "unicode": "1F986" },
      { "emoji": "🦅", "name": "eagle", "unicode": "1F985" },
      { "emoji": "🦉", "name": "owl", "unicode": "1F989" },
      { "emoji": "🦇", "name": "bat", "unicode": "1F987" },
      { "emoji": "🐺", "name": "wolf", "unicode": "1F43A" },
      { "emoji": "🐗", "name": "boar", "unicode": "1F417" },
      { "emoji": "🐴", "name": "horse face", "unicode": "1F434" },
      { "emoji": "🦄", "name": "unicorn", "unicode": "1F984" },
      { "emoji": "🐝", "name": "honeybee", "unicode": "1F41D" },
      { "emoji": "🐛", "name": "bug", "unicode": "1F41B" },
      { "emoji": "🦋", "name": "butterfly", "unicode": "1F98B" },
      { "emoji": "🐌", "name": "snail", "unicode": "1F40C" },
      { "emoji": "🐞", "name": "lady beetle", "unicode": "1F41E" },
      { "emoji": "🐜", "name": "ant", "unicode": "1F41C" },
      { "emoji": "🦟", "name": "mosquito", "unicode": "1F99F" },
      { "emoji": "🦗", "name": "cricket", "unicode": "1F997" },
      { "emoji": "🕷️", "name": "spider", "unicode": "1F577" },
      { "emoji": "🕸️", "name": "spider web", "unicode": "1F578" },
      { "emoji": "🦂", "name": "scorpion", "unicode": "1F982" }
    ]
  },
  
  // 食物和饮料
  "food-drink": {
    "name": "食物和饮料",
    "emojis": [
      { "emoji": "🍎", "name": "red apple", "unicode": "1F34E" },
      { "emoji": "🍊", "name": "tangerine", "unicode": "1F34A" },
      { "emoji": "🍋", "name": "lemon", "unicode": "1F34B" },
      { "emoji": "🍌", "name": "banana", "unicode": "1F34C" },
      { "emoji": "🍉", "name": "watermelon", "unicode": "1F349" },
      { "emoji": "🍇", "name": "grapes", "unicode": "1F347" },
      { "emoji": "🍓", "name": "strawberry", "unicode": "1F353" },
      { "emoji": "🫐", "name": "blueberries", "unicode": "1FAD0" },
      { "emoji": "🍈", "name": "melon", "unicode": "1F348" },
      { "emoji": "🍒", "name": "cherries", "unicode": "1F352" },
      { "emoji": "🍑", "name": "peach", "unicode": "1F351" },
      { "emoji": "🥭", "name": "mango", "unicode": "1F96D" },
      { "emoji": "🍍", "name": "pineapple", "unicode": "1F34D" },
      { "emoji": "🥥", "name": "coconut", "unicode": "1F965" },
      { "emoji": "🥝", "name": "kiwi fruit", "unicode": "1F95D" },
      { "emoji": "🍅", "name": "tomato", "unicode": "1F345" },
      { "emoji": "🍆", "name": "eggplant", "unicode": "1F346" },
      { "emoji": "🥑", "name": "avocado", "unicode": "1F951" },
      { "emoji": "🥦", "name": "broccoli", "unicode": "1F966" },
      { "emoji": "🥬", "name": "leafy greens", "unicode": "1F96C" },
      { "emoji": "🥒", "name": "cucumber", "unicode": "1F952" },
      { "emoji": "🌶️", "name": "hot pepper", "unicode": "1F336" },
      { "emoji": "🫒", "name": "olive", "unicode": "1FAD2" },
      { "emoji": "🌽", "name": "ear of corn", "unicode": "1F33D" },
      { "emoji": "🥕", "name": "carrot", "unicode": "1F955" },
      { "emoji": "🫑", "name": "bell pepper", "unicode": "1FAD1" },
      { "emoji": "🥔", "name": "potato", "unicode": "1F954" },
      { "emoji": "🍠", "name": "roasted sweet potato", "unicode": "1F360" },
      { "emoji": "🥐", "name": "croissant", "unicode": "1F950" },
      { "emoji": "🥖", "name": "baguette bread", "unicode": "1F956" },
      { "emoji": "🍞", "name": "bread", "unicode": "1F35E" },
      { "emoji": "🥨", "name": "pretzel", "unicode": "1F968" },
      { "emoji": "🥯", "name": "bagel", "unicode": "1F96F" },
      { "emoji": "🥞", "name": "pancakes", "unicode": "1F95E" },
      { "emoji": "🧇", "name": "waffle", "unicode": "1F9C7" },
      { "emoji": "🧀", "name": "cheese wedge", "unicode": "1F9C0" },
      { "emoji": "🍖", "name": "meat on bone", "unicode": "1F356" },
      { "emoji": "🍗", "name": "poultry leg", "unicode": "1F357" },
      { "emoji": "🥩", "name": "cut of meat", "unicode": "1F969" },
      { "emoji": "🥓", "name": "bacon", "unicode": "1F953" },
      { "emoji": "🍔", "name": "hamburger", "unicode": "1F354" },
      { "emoji": "🍟", "name": "french fries", "unicode": "1F35F" },
      { "emoji": "🍕", "name": "pizza", "unicode": "1F355" },
      { "emoji": "🌭", "name": "hot dog", "unicode": "1F32D" },
      { "emoji": "🥪", "name": "sandwich", "unicode": "1F96A" },
      { "emoji": "🌮", "name": "taco", "unicode": "1F32E" },
      { "emoji": "🌯", "name": "burrito", "unicode": "1F32F" },
      { "emoji": "🫔", "name": "tamale", "unicode": "1FAD4" },
      { "emoji": "🥙", "name": "stuffed flatbread", "unicode": "1F959" },
      { "emoji": "🧆", "name": "falafel", "unicode": "1F9C6" },
      { "emoji": "🥚", "name": "egg", "unicode": "1F95A" },
      { "emoji": "🍳", "name": "cooking", "unicode": "1F373" },
      { "emoji": "🥘", "name": "shallow pan of food", "unicode": "1F958" },
      { "emoji": "🍲", "name": "pot of food", "unicode": "1F372" },
      { "emoji": "🫕", "name": "fondue", "unicode": "1FAD5" },
      { "emoji": "🥣", "name": "bowl with spoon", "unicode": "1F963" },
      { "emoji": "🥗", "name": "green salad", "unicode": "1F957" },
      { "emoji": "🍿", "name": "popcorn", "unicode": "1F37F" },
      { "emoji": "🧈", "name": "butter", "unicode": "1F9C8" },
      { "emoji": "🧂", "name": "salt", "unicode": "1F9C2" },
      { "emoji": "🥫", "name": "canned food", "unicode": "1F96B" }
    ]
  }
};

// 获取所有表情符号的扁平化数组
function getAllEmojis() {
  const allEmojis = [];
  Object.values(EMOJI_DATA).forEach(category => {
    allEmojis.push(...category.emojis);
  });
  return allEmojis;
}

// 根据关键词搜索表情符号
function searchEmojis(keyword) {
  const allEmojis = getAllEmojis();
  const lowerKeyword = keyword.toLowerCase();
  return allEmojis.filter(emoji => 
    emoji.name.toLowerCase().includes(lowerKeyword) ||
    emoji.emoji.includes(keyword)
  );
}

// 获取指定类别的表情符号
function getEmojisByCategory(categoryKey) {
  return EMOJI_DATA[categoryKey] ? EMOJI_DATA[categoryKey].emojis : [];
}

// 获取所有类别
function getCategories() {
  return Object.keys(EMOJI_DATA).map(key => ({
    key,
    name: EMOJI_DATA[key].name,
    count: EMOJI_DATA[key].emojis.length
  }));
}

// 导出数据和函数
if (typeof module !== 'undefined' && module.exports) {
  // Node.js环境
  module.exports = {
    EMOJI_DATA,
    getAllEmojis,
    searchEmojis,
    getEmojisByCategory,
    getCategories
  };
} else {
  // 浏览器环境
  window.EmojiData = {
    EMOJI_DATA,
    getAllEmojis,
    searchEmojis,
    getEmojisByCategory,
    getCategories
  };
}