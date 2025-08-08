// ====== STYLED NONSENSE GENERATOR ======
function convertToStyledNonsense(language, inputText) {
    const wordBanks = {
        korean: ["ajhissi", "shincha", "ajhimma", "bollaya", "duri", "hanbok", "kimchi", "bap", "dongdaemun", "chingu", "gamsa", "sarang", "geurae", "jinjja", "yeppeo", "gwaenchanha", "bangapseumnida", "annyeong", "mashisseoyo"],
        japanese: ["ne", "sugoi", "kawaii", "yatta", "daijoubu", "wakaranai", "momo", "kaze", "mizu", "yuki", "itai", "toki", "genki", "nante", "arigatou", "onegaishimasu", "senpai", "baka", "desu"],
        mandarin: ["qing", "ai", "xiao", "mei", "zhen", "xin", "hua", "lan", "yue", "feng", "chen", "mu", "shan", "mei", "pengyou", "laoshi", "xuexi", "zhongguo", "piaoliang", "haode", "zaijian"],
        arabic: ["tamale", "mata", "ya habibi", "yalla", "allah", "habibti", "salam", "nour", "amir", "rami", "khalas", "ya shams", "leila", "hob", "kalbi", "mafi", "mushkila", "inshallah", "mashallah"],
        spanish: ["mamacita", "dale", "fuego", "papi", "perreo", "rojo", "tokio", "barrio", "clica", "vamos", "dinero", "chulo", "por favor", "amor", "Puerto Rico", "solo", "conmigo", "polvo", "noche", "calle", "fiesta", "vida", "bailando"],
        french: ["bonjour", "merci", "amour", "chérie", "bistro", "baguette", "croissant", "paris", "métro", "pardon", "monsieur", "madame", "oui", "non", "s'il vous plaît"],
        thai: ["sawatdee", "khobkhun", "phom", "chan", "prachum", "baan", "dee", "sabai", "ka", "krub", "chai", "mai", "sanook", "rak", "khun", "nong"],
        random: ["lorem", "ipsum", "dolor", "sit", "amet", "viva", "pura", "luna", "bella", "forte"]
    };

    const bank = wordBanks[language] || wordBanks.random;
    const inputWordCount = inputText.trim().split(/\s+/).filter(w => w.length > 0).length;
    let output = [];

    if (inputWordCount === 1) {
        let word = bank[Math.floor(Math.random() * bank.length)];
        output.push(word.charAt(0).toUpperCase() + word.slice(1) + ".");
    } else {
        let sentenceCount = Math.floor(Math.random() * 2) + 2;
        for (let s = 0; s < sentenceCount; s++) {
            let wordCount = Math.floor(Math.random() * 5) + 6;
            let sentence = [];
            let lastWord = null;

            for (let i = 0; i < wordCount; i++) {
                let word;
                do {
                    word = bank[Math.floor(Math.random() * bank.length)];
                } while (word === lastWord);
                sentence.push(word);
                lastWord = word;
            }
            let sentenceStr = sentence.join(" ");
            sentenceStr = sentenceStr.charAt(0).toUpperCase() + sentenceStr.slice(1);
            output.push(sentenceStr + ".");
        }
    }
    return output.join(" ");
}

// ====== SIMPLE TRANSLATION ======
function simpleTranslate(text, language) {
    const dictionaries = {
        korean: { hello: "안녕하세요", friend: "친구", love: "사랑", good: "좋아", morning: "아침" },
        japanese: { hello: "こんにちは", friend: "友達", love: "愛", good: "良い", morning: "朝" },
        mandarin: { hello: "你好", friend: "朋友", love: "爱", good: "好", morning: "早上" },
        arabic: { hello: "مرحبا", friend: "صديق", love: "حب", good: "جيد", morning: "صباح" },
        spanish: { hello: "hola", friend: "amigo", love: "amor", good: "bueno", morning: "mañana" },
        french: { hello: "bonjour", friend: "ami", love: "amour", good: "bon", morning: "matin" },
        thai: { hello: "สวัสดี", friend: "เพื่อน", love: "รัก", good: "ดี", morning: "เช้า" }
    };
    const dict = dictionaries[language] || {};
    return text.split(/\s+/).map(word => dict[word.toLowerCase()] || word).join(" ");
}

// ====== FORM HANDLER ======
const form = document.getElementById('mimic-form');
const textarea = document.getElementById('input-text');
const outputDiv = document.getElementById('output');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = textarea.value.trim();
    const language = document.getElementById('language-select').value;
    // --- LANGUAGE BACKGROUND SWITCH ---
    document.body.className = document.body.className
        .replace(/\b\w+-bg\b/g, '') // Remove any previous -bg class
        .trim();
    if (["korean","japanese","mandarin","arabic","spanish","french","thai"].includes(language)) {
        document.body.classList.add(`${language}-bg`);
    } else {
        document.body.classList.add('random-bg');
    }

    if (!text) {
        alert("Please enter a sentence to mimic.");
        return;
    }

    const translated = simpleTranslate(text, language);

    // ===== Add romaji for Japanese =====
    let romajiText = "";
    if (language === "japanese") {
        const romajiMap = {
            "こんにちは": "konnichiwa",
            "友達": "tomodachi",
            "愛": "ai",
            "良い": "yoi",
            "朝": "asa"
        };
        romajiText = romajiMap[translated] || "";
    }

    const outputText = convertToStyledNonsense(language, text);

    outputDiv.innerHTML = `
        <div style="color:#22223b;font-weight:bold;margin-bottom:0.7em;">
            <span style="color:#43c6ac;">Original:</span> ${text}
        </div>
        <div style="color:#22223b;font-weight:bold;margin-bottom:0.7em;">
            <span style="color:#43c6ac;">
                ${language.charAt(0).toUpperCase() + language.slice(1)}:
            </span> ${translated} ${romajiText ? `(${romajiText})` : ""}
        </div>
        <div style="color:#43c6ac;font-weight:bold;margin-bottom:0.3em;">
            <span style="color:#f72585;">Mimic:</span> ${outputText}
        </div>
    `;
    outputDiv.style.display = 'block';
});

// ====== READ OUTPUT BUTTON ======
const readBtn = document.createElement('button');
readBtn.type = 'button';
readBtn.textContent = '🔊 Read Output';
readBtn.style.marginTop = '1em';
outputDiv.parentNode.insertBefore(readBtn, outputDiv.nextSibling);

readBtn.addEventListener('click', () => {
    const lines = outputDiv.innerText;
    if (lines && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(lines);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    }
});
// ...existing mimic code above...

// ====== GAME LOGIC ======
const gameBtn = document.getElementById('game-btn');
const gameArea = document.getElementById('game-area');

const gameLanguages = [
    { key: 'korean', label: 'Korean' },
    { key: 'japanese', label: 'Japanese' },
    { key: 'mandarin', label: 'Mandarin' },
    { key: 'arabic', label: 'Arabic' },
    { key: 'spanish', label: 'Spanish' },
    { key: 'french', label: 'French' },
    { key: 'thai', label: 'Thai' }
];

let gameDifficulty = 'easy';
let gameScore = 0;
let gameAnswer = '';
let gameLevel = 1;

function showGameMenu() {
    gameArea.style.display = 'block';
    document.getElementById('mimic-form').style.display = 'none';
    gameBtn.style.display = 'none';

    gameArea.innerHTML = `
        <div>
            <span id="game-score">Score: ${gameScore}</span>
            <span id="game-level" style="margin-left:2em;">Level: ${gameLevel}</span>
            <div>
                <button class="game-difficulty-btn${gameDifficulty==='easy'?' selected':''}" data-diff="easy">Easy</button>
                <button class="game-difficulty-btn${gameDifficulty==='medium'?' selected':''}" data-diff="medium">Medium</button>
                <button class="game-difficulty-btn${gameDifficulty==='hard'?' selected':''}" data-diff="hard">Hard</button>
            </div>
        </div>
        <div id="game-question" style="margin-top:2em;"></div>
        <button id="back-to-mimic" style="margin-top:2em;">⬅️ Home</button>
    `;

    document.querySelectorAll('.game-difficulty-btn').forEach(btn => {
        btn.onclick = () => {
            gameDifficulty = btn.getAttribute('data-diff');
            gameLevel = 1;
            gameScore = 0;
            showGameMenu();
        };
    });

    document.getElementById('back-to-mimic').onclick = () => {
        gameArea.style.display = 'none';
        document.getElementById('mimic-form').style.display = '';
        gameBtn.style.display = '';
        gameLevel = 1;
        gameScore = 0;
    };

    startGameRound();
}

function startGameRound() {
    const questionDiv = document.getElementById('game-question');
    // Pick a random language
    const lang = gameLanguages[Math.floor(Math.random() * gameLanguages.length)];
    gameAnswer = lang.key;

    // --- Pick a single random word from the language's word bank ---
    const wordBanks = {
        korean: ["ajhissi", "shincha", "ajhimma", "bollaya", "duri", "hanbok", "kimchi", "bap", "dongdaemun", "chingu", "gamsa", "sarang", "geurae", "jinjja", "yeppeo", "gwaenchanha", "bangapseumnida", "annyeong", "mashisseoyo"],
        japanese: ["ne", "sugoi", "kawaii", "yatta", "daijoubu", "wakaranai", "momo", "kaze", "mizu", "yuki", "itai", "toki", "genki", "nante", "arigatou", "onegaishimasu", "senpai", "baka", "desu"],
        mandarin: ["qing", "ai", "xiao", "mei", "zhen", "xin", "hua", "lan", "yue", "feng", "chen", "mu", "shan", "mei", "pengyou", "laoshi", "xuexi", "zhongguo", "piaoliang", "haode", "zaijian"],
        arabic: ["tamale", "mata", "ya habibi", "yalla", "allah", "habibti", "salam", "nour", "amir", "rami", "khalas", "ya shams", "leila", "hob", "kalbi", "mafi", "mushkila", "inshallah", "mashallah"],
        spanish: ["mamacita", "dale", "fuego", "papi", "perreo", "rojo", "tokio", "barrio", "clica", "vamos", "dinero", "chulo", "por favor", "amor", "Puerto Rico", "solo", "conmigo", "polvo", "noche", "calle", "fiesta", "vida", "bailando"],
        french: ["bonjour", "merci", "amour", "chérie", "bistro", "baguette", "croissant", "paris", "métro", "pardon", "monsieur", "madame", "oui", "non", "s'il vous plaît"],
        thai: ["sawatdee", "khobkhun", "phom", "chan", "prachum", "baan", "dee", "sabai", "ka", "krub", "chai", "mai", "sanook", "rak", "khun", "nong"],
        random: ["lorem", "ipsum", "dolor", "sit", "amet", "viva", "pura", "luna", "bella", "forte"]
    };
    const bank = wordBanks[lang.key] || wordBanks.random;
    const singleWord = bank[Math.floor(Math.random() * bank.length)];

    // Prepare options
    let options = [lang.key];
    while (options.length < (gameDifficulty === 'easy' ? 3 : gameDifficulty === 'medium' ? 5 : 7)) {
        const opt = gameLanguages[Math.floor(Math.random() * gameLanguages.length)].key;
        if (!options.includes(opt)) options.push(opt);
    }
    options = options.sort(() => Math.random() - 0.5);

    // Render question and options
    questionDiv.innerHTML = `
        <div style="font-size:1.3em; margin-bottom:1.2em; color:#43c6ac;">
            <strong>Which language is this word inspired by?</strong>
        </div>
        <div style="font-size:2em; margin-bottom:1.5em; color:#22223b;">
            <em>${singleWord}</em>
        </div>
        <div id="game-options"></div>
    `;

    const optionsDiv = document.getElementById('game-options');
    options.forEach(optKey => {
        const langObj = gameLanguages.find(l => l.key === optKey);
        const btn = document.createElement('button');
        btn.className = 'game-option-btn';
        btn.textContent = langObj.label;
        btn.onclick = () => handleGameGuess(btn, optKey);
        optionsDiv.appendChild(btn);
    });
}

function handleGameGuess(btn, selectedKey) {
    const optionBtns = document.querySelectorAll('.game-option-btn');
    optionBtns.forEach(b => b.disabled = true);

    if (selectedKey === gameAnswer) {
        btn.classList.add('correct');
        gameScore++;
    } else {
        btn.classList.add('wrong');
        gameScore = Math.max(0, gameScore - 1);
        // Highlight correct
        optionBtns.forEach(b => {
            if (b.textContent === gameLanguages.find(l => l.key === gameAnswer).label) {
                b.classList.add('correct');
            }
        });
    }

    setTimeout(() => {
        gameLevel++;
        showGameMenu();
    }, 1200);
}

// Show game menu when game button is clicked
gameBtn.onclick = showGameMenu;