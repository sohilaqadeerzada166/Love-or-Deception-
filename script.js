// ======================================
// LOVE OR DECEPTION
// عشق واقعی یا فریب؟
// ======================================


// 1. ترجمه ها
const T = {
    fa: {
        title: "عشق واقعی یا فریب؟",
        welcome: "در این بازی با یک شخصیت آشنا می‌شوی و با انتخاب‌هایت، رفتار و تصمیم‌های او را بررسی می‌کنی.",
        start: "شروع بازی",
        back: "بازگشت",
        restart: "شروع دوباره",
        yourGender: "جنسیت شما",
        partnerGender: "جنسیت شخصیت مقابل",
        characterType: "نوع شخصیت",
        setting: "فضای داستان",
        theme: "تم بازی",
        girl: "دختر",
        boy: "پسر",
        honest: "صادق و جدی",
        shy: "خجالتی",
        controlling: "کنترل‌گر",
        vague: "مبهم و نامشخص",
        afghanistan: "افغانستان و خانواده",
        modern: "زندگی امروزی",
        romantic: "رمانتیک",
        messenger: "پیام‌رسان",
        cinematic: "سینمایی",
        stage: "مرحله",
        score: "امتیاز آموزشی",
        choose: "یکی از پاسخ‌ها را انتخاب کن:",
        customLabel: "یا پاسخ دلخواه خودت را بنویس:",
        placeholder: "پاسخت را اینجا بنویس...",
        send: "ارسال پیام",
        continue: "ادامه داستان",
        healthy: "انتخاب سالم",
        thoughtful: "انتخاب سنجیده",
        risky: "انتخاب پرخطر",
        ending: "نتیجه داستان",
        analysis: "تحلیل انتخاب‌های شما",
        lesson: "پیام آموزشی",
        goodEnding: "رابطه سالم",
        warningEnding: "نیازمند احتیاط",
        uncertainEnding: "نیازمند شناخت بیشتر",
        finalScore: "امتیاز نهایی",
        familyIntro: "این داستان در فضایی با توجه به خانواده، احترام و رسم‌ورواج افغانستان جریان دارد.",
        modernIntro: "این داستان در فضای زندگی امروزی و ارتباطات اجتماعی جریان دارد.",
        lessonText: "در یک رابطه سالم، صداقت، احترام، اعتماد و مسئولیت‌پذیری اهمیت زیادی دارند. برای شناخت یک فرد، به رفتارهای او در طول زمان توجه کن، نه فقط به حرف‌هایش.",
        healthyFeedback: "این انتخاب نشان می‌دهد که به احترام، صداقت و مرزهای سالم اهمیت می‌دهی.",
        thoughtfulFeedback: "این انتخاب نشان می‌دهد که پیش از تصمیم‌گیری، به شناخت بیشتر و بررسی شرایط اهمیت می‌دهی.",
        riskyFeedback: "این انتخاب ممکن است باعث نادیده‌گرفتن مرزهای شخصی یا اعتماد زودهنگام شود."
    },

    en: {
        title: "Love or Deception?",
        welcome: "Meet a character and explore their behavior through your decisions.",
        start: "Start Game",
        back: "Back",
        restart: "Play Again",
        yourGender: "Your Gender",
        partnerGender: "Partner Gender",
        characterType: "Character Type",
        setting: "Story Setting",
        theme: "Game Theme",
        girl: "Girl",
        boy: "Boy",
        honest: "Honest and Serious",
        shy: "Shy",
        controlling: "Controlling",
        vague: "Unclear",
        afghanistan: "Afghanistan and Family",
        modern: "Modern Life",
        romantic: "Romantic",
        messenger: "Messenger",
        cinematic: "Cinematic",
        stage: "Stage",
        score: "Learning Score",
        choose: "Choose your reply:",
        customLabel: "Or write your own reply:",
        placeholder: "Write your reply here...",
        send: "Send Message",
        continue: "Continue Story",
        healthy: "Healthy Choice",
        thoughtful: "Thoughtful Choice",
        risky: "Risky Choice",
        ending: "Story Result",
        analysis: "Your Choice Analysis",
        lesson: "Learning Message",
        goodEnding: "Healthy Relationship",
        warningEnding: "Be Careful",
        uncertainEnding: "Needs More Understanding",
        finalScore: "Final Score",
        familyIntro: "This story takes place in a setting that considers family, respect and Afghan traditions.",
        modernIntro: "This story takes place in a modern social environment.",
        lessonText: "Honesty, respect, trust and responsibility are important in a healthy relationship. Observe someone's behavior over time, not only their words.",
        healthyFeedback: "Your choice shows that you value respect, honesty and healthy boundaries.",
        thoughtfulFeedback: "Your choice shows that you value understanding and careful decisions.",
        riskyFeedback: "This choice may lead to ignoring personal boundaries or trusting too quickly."
    }
};


// 2. اطلاعات مراحل داستان

const storyMessages = {

    honest: {
        fa: [
            "سلام! خوشحالم که با تو آشنا شدم. دوست دارم بیشتر درباره علایق و هدف‌هایت بدانم.",
            "من به صداقت اهمیت زیادی می‌دهم. به نظرم شناخت واقعی با گفت‌وگوی محترمانه آغاز می‌شود.",
            "اگر روزی بخواهیم رابطه جدی‌تری داشته باشیم، فکر می‌کنم خانواده‌ها نیز باید در جریان باشند.",
            "من باور دارم که هر دو نفر باید در تصمیم‌های مهم زندگی نظر داشته باشند.",
            "می‌خواهم بدانم تو یک رابطه سالم را چگونه تعریف می‌کنی؟"
        ],

        en: [
            "Hello! I am happy to meet you. I would like to know more about your interests and goals.",
            "Honesty is very important to me. I believe real understanding starts with respectful conversation.",
            "If we ever consider a serious relationship, I believe our families should be involved.",
            "I believe both people should have a voice in important life decisions.",
            "How would you describe a healthy relationship?"
        ]
    },

    shy: {
        fa: [
            "سلام! راستش کمی خجالت می‌کشم، اما خوشحالم که با تو صحبت می‌کنم.",
            "گاهی نمی‌دانم چگونه احساساتم را بیان کنم، ولی دوست دارم آرام‌آرام بیشتر آشنا شویم.",
            "فکر می‌کنم برای تصمیم‌های جدی باید وقت کافی داشته باشیم.",
            "من به نظر خانواده و همچنین انتخاب خود دو نفر اهمیت می‌دهم.",
            "دوست دارم بدانم چه چیزهایی برای آینده‌ات مهم است؟"
        ],

        en: [
            "Hello! I am a little shy, but I am happy to talk with you.",
            "Sometimes I do not know how to express my feelings, but I would like us to get to know each other slowly.",
            "I think serious decisions need enough time.",
            "I respect both family opinions and the choices of the two people.",
            "I would like to know what matters most to you in the future."
        ]
    },

    controlling: {
        fa: [
            "سلام! دوست دارم همیشه بدانی که با چه کسی صحبت می‌کنی و کجا هستی.",
            "اگر واقعاً به من اهمیت بدهی، باید بیشتر وقتت را برای من بگذاری.",
            "من دوست ندارم با بعضی از دوستانت ارتباط داشته باشی.",
            "فکر می‌کنم بهتر است در تصمیم‌ها بیشتر مطابق خواسته من عمل کنی.",
            "اگر با من مخالف باشی، یعنی به اندازه کافی به من اعتماد نداری؟"
        ],

        en: [
            "Hello! I want to always know who you talk to and where you are.",
            "If you really care about me, you should spend more time with me.",
            "I do not like you communicating with some of your friends.",
            "I think you should make decisions more according to what I want.",
            "If you disagree with me, does that mean you do not trust me enough?"
        ]
    },

    vague: {
        fa: [
            "سلام! فعلاً نمی‌خواهم درباره خودم زیاد توضیح بدهم.",
            "آینده را نمی‌دانم، بهتر است فعلاً فقط صحبت کنیم.",
            "وقتی درباره جدی‌شدن رابطه می‌پرسی، هنوز جواب مشخصی ندارم.",
            "گاهی فکر می‌کنم نباید درباره آینده زیاد صحبت کنیم.",
            "نمی‌دانم دقیقاً چه می‌خواهم، شاید زمان همه چیز را مشخص کند."
        ],

        en: [
            "Hello! I do not want to explain too much about myself right now.",
            "I do not know about the future. Let's just talk for now.",
            "I still do not have a clear answer about a serious relationship.",
            "Sometimes I think we should not talk too much about the future.",
            "I do not know exactly what I want. Maybe time will tell."
        ]
    }

};


// 3. گزینه های پاسخ

const choices = {

    fa: [
        [
            { text: "خوشحالم. بهتر است با احترام و صداقت آشنا شویم.", score: 10, type: "healthy" },
            { text: "من هم دوست دارم بدون شناخت زیاد زود صمیمی شویم.", score: -5, type: "risky" },
            { text: "اول بهتر است درباره هدف‌هایمان صحبت کنیم.", score: 7, type: "thoughtful" }
        ],

        [
            { text: "صداقت و احترام برای من هم مهم است.", score: 10, type: "healthy" },
            { text: "هرچه تو بگویی همان درست است.", score: -5, type: "risky" },
            { text: "بهتر است حرف و عمل یکدیگر را بشناسیم.", score: 7, type: "thoughtful" }
        ],

        [
            { text: "اگر رابطه جدی باشد، خانواده‌ها باید محترم شمرده شوند.", score: 10, type: "healthy" },
            { text: "لازم نیست کسی از رابطه ما خبر داشته باشد.", score: -5, type: "risky" },
            { text: "باید ابتدا شرایط و هدف‌ها را روشن کنیم.", score: 7, type: "thoughtful" }
        ],

        [
            { text: "تصمیم‌های مهم باید با مشورت و رضایت هر دو نفر باشد.", score: 10, type: "healthy" },
            { text: "یکی از ما باید همیشه تصمیم‌گیرنده باشد.", score: -5, type: "risky" },
            { text: "باید درباره مسئولیت‌ها بیشتر صحبت کنیم.", score: 7, type: "thoughtful" }
        ],

        [
            { text: "رابطه سالم بر پایه احترام، اعتماد و صداقت است.", score: 10, type: "healthy" },
            { text: "مهم این است که همیشه به خواسته یکدیگر جواب مثبت بدهیم.", score: -5, type: "risky" },
            { text: "برای تعریف رابطه سالم باید بیشتر گفت‌وگو کنیم.", score: 7, type: "thoughtful" }
        ]
    ],

    en: [
        [
            { text: "I am glad. Let's get to know each other with respect and honesty.", score: 10, type: "healthy" },
            { text: "I also want us to become close very quickly.", score: -5, type: "risky" },
            { text: "Let's first talk about our goals.", score: 7, type: "thoughtful" }
        ],

        [
            { text: "Honesty and respect are important to me too.", score: 10, type: "healthy" },
            { text: "Whatever you say is always right.", score: -5, type: "risky" },
            { text: "Let's understand each other's words and actions.", score: 7, type: "thoughtful" }
        ],

        [
            { text: "If the relationship is serious, families should be respected.", score: 10, type: "healthy" },
            { text: "Nobody needs to know about our relationship.", score: -5, type: "risky" },
            { text: "We should clarify our goals and circumstances first.", score: 7, type: "thoughtful" }
        ],

        [
            { text: "Important decisions should involve both people.", score: 10, type: "healthy" },
            { text: "One person should always make the decisions.", score: -5, type: "risky" },
            { text: "We should discuss responsibilities more.", score: 7, type: "thoughtful" }
        ],

        [
            { text: "A healthy relationship is based on respect, trust and honesty.", score: 10, type: "healthy" },
            { text: "The important thing is always agreeing with each other.", score: -5, type: "risky" },
            { text: "We should discuss what a healthy relationship means.", score: 7, type: "thoughtful" }
        ]
    ]

};


// 4. متغیرهای بازی

let currentLanguage = "fa";
let playerGender = "girl";
let partnerGender = "boy";
let characterType = "honest";
let storySetting = "afghanistan";
let theme = "romantic";

let currentStage = 0;
let trustScore = 50;

let healthyCount = 0;
let riskyCount = 0;
let thoughtfulCount = 0;

let currentChoice = null;
let currentCustomReplies = [];


// 5. انتخاب عناصر HTML

function el(id) {
    return document.getElementById(id);
}

function tx(key) {
    return T[currentLanguage][key];
}


// 6. نمایش صفحات

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.hidden = screen.id !== screenId;
    });

}


// 7. تغییر تم بازی

function applyTheme() {

    document.body.classList.remove(
        "theme-romantic",
        "theme-messenger",
        "theme-cinematic"
    );

    document.body.classList.add("theme-" + theme);

}


// 8. نام شخصیت

function getCharacterName() {

    if (partnerGender === "girl") {
        return currentLanguage === "fa" ? "سارا" : "Sara";
    }

    return currentLanguage === "fa" ? "احمد" : "Ahmad";
}


// 9. تصویرک شخصیت

function getCharacterAvatar() {

    return partnerGender === "girl" ? "👩🏻" : "👨🏻";

}

function getPlayerAvatar() {

    return playerGender === "girl" ? "👩🏻" : "👨🏻";

}


// 10. ترجمه صفحه ها

function updateLanguageUI() {

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "fa" ? "rtl" : "ltr";

    const textIds = {
        "game-title": "title",
        "welcome-description": "welcome",
        "start-button": "start",
        "back-button": "back",
        "restart-button": "restart",
        "custom-reply-label": "customLabel",
        "send-reply-button": "send",
        "ending-title": "ending",
        "analysis-title": "analysis",
        "lesson-title": "lesson",
        "final-score-label": "finalScore"
    };

    for (const id in textIds) {
        const element = el(id);

        if (element) {
            element.textContent = tx(textIds[id]);
        }
    }

    const labels = {
        "language": currentLanguage === "fa" ? "زبان بازی" : "Game Language",
        "your-gender": tx("yourGender"),
        "partner-gender": tx("partnerGender"),
        "character-type": tx("characterType"),
        "story-setting": tx("setting"),
        "theme": tx("theme")
    };

    for (const id in labels) {
        const label = document.querySelector(`label[for="${id}"]`);

        if (label) {
            label.textContent = labels[id];
        }
    }

    translateSelect("your-gender", {
        girl: "girl",
        boy: "boy"
    });

    translateSelect("partner-gender", {
        girl: "girl",
        boy: "boy"
    });

    translateSelect("character-type", {
        honest: "honest",
        shy: "shy",
        controlling: "controlling",
        vague: "vague"
    });

    translateSelect("story-setting", {
        afghanistan: "afghanistan",
        modern: "modern"
    });

    translateSelect("theme", {
        romantic: "romantic",
        messenger: "messenger",
        cinematic: "cinematic"
    });

    if (el("custom-reply")) {
        el("custom-reply").placeholder = tx("placeholder");
    }

    updateCharacterInfo();

    if (!el("chat-screen").hidden) {
        renderCurrentStep();
    }

    if (!el("ending-screen").hidden) {
        finishStory();
    }

}


function translateSelect(id, options) {

    const select = el(id);

    if (!select) return;

    Array.from(select.options).forEach(option => {

        const key = options[option.value];

        if (key) {
            option.textContent = tx(key);
        }

    });

}


// 11. اطلاعات شخصیت

function updateCharacterInfo() {

    if (el("character-name")) {
        el("character-name").textContent = getCharacterName();
    }

    if (el("character-avatar")) {
        el("character-avatar").textContent = getCharacterAvatar();
    }

    if (el("character-status")) {

        const names = {
            honest: currentLanguage === "fa" ? "صادق و جدی" : "Honest and Serious",
            shy: currentLanguage === "fa" ? "خجالتی" : "Shy",
            controlling: currentLanguage === "fa" ? "کنترل‌گر" : "Controlling",
            vague: currentLanguage === "fa" ? "مبهم" : "Unclear"
        };

        el("character-status").textContent = names[characterType];
    }

}


// 12. شروع بازی

function startStory() {

    currentLanguage = el("language").value;
    playerGender = el("your-gender").value;
    partnerGender = el("partner-gender").value;
    characterType = el("character-type").value;
    storySetting = el("story-setting").value;
    theme = el("theme").value;

    currentStage = 0;
    trustScore = 50;

    healthyCount = 0;
    riskyCount = 0;
    thoughtfulCount = 0;

    currentChoice = null;
    currentCustomReplies = [];

    applyTheme();
    updateLanguageUI();
    updateCharacterInfo();

    showScreen("chat-screen");

    renderCurrentStep();

}


// 13. افزودن پیام به چت

function addMessage(text, sender) {

    const chat = el("chat-messages");

    if (!chat) return;

    const message = document.createElement("div");

    message.className = sender === "character"
        ? "message character-message"
        : "message player-message";

    const avatar = document.createElement("div");

    avatar.className = "message-avatar";

    avatar.textContent = sender === "character"
        ? getCharacterAvatar()
        : getPlayerAvatar();

    const messageText = document.createElement("div");

    messageText.className = "message-text";
    messageText.textContent = text;

    message.appendChild(avatar);
    message.appendChild(messageText);

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;

}


// 14. ایجاد بخش تحلیل مرحله

function createStageAnalysis() {

    let box = el("stage-analysis-content");

    if (!box) {

        box = document.createElement("div");

        box.id = "stage-analysis-content";
        box.className = "analysis-box";

        const replyOptions = el("reply-options");

        replyOptions.parentNode.insertBefore(box, replyOptions);

    }

    return box;

}


// 15. نمایش مرحله فعلی

function renderCurrentStep() {

    const chat = el("chat-messages");

    chat.innerHTML = "";

    const intro = storySetting === "afghanistan"
        ? tx("familyIntro")
        : tx("modernIntro");

    if (currentStage === 0) {
        const introBox = document.createElement("p");
        introBox.className = "story-description";
        introBox.textContent = intro;
        chat.appendChild(introBox);
    }

    const message = storyMessages[characterType][currentLanguage][currentStage];

    addMessage(message, "character");

    currentCustomReplies.forEach(reply => {
        addMessage(reply, "player");
    });

    updateProgressDisplay();
    updateTrustDisplay();

    const analysis = createStageAnalysis();

    analysis.innerHTML = "";

    if (currentChoice) {

        showChoiceAnalysis();

        renderContinueButton();

        return;
    }

    renderReplyOptions();

}


// 16. نمایش گزینه های پاسخ

function renderReplyOptions() {

    const container = el("reply-options");

    container.innerHTML = "";

    const stageChoices = choices[currentLanguage][currentStage];

    const title = document.createElement("p");

    title.textContent = tx("choose");

    container.appendChild(title);

    stageChoices.forEach((choice, index) => {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "reply-option";
        button.textContent = choice.text;

        button.addEventListener("click", () => {
            chooseReply(index);
        });

        container.appendChild(button);

    });

}


// 17. انتخاب پاسخ

function chooseReply(index) {

    if (currentChoice) return;

    currentChoice = choices[currentLanguage][currentStage][index];

    trustScore += currentChoice.score;

    trustScore = Math.max(0, Math.min(100, trustScore));

    if (currentChoice.type === "healthy") {
        healthyCount++;
    }

    if (currentChoice.type === "risky") {
        riskyCount++;
    }

    if (currentChoice.type === "thoughtful") {
        thoughtfulCount++;
    }

    addMessage(currentChoice.text, "player");

    showChoiceAnalysis();

    renderContinueButton();

    updateTrustDisplay();

}


// 18. تحلیل انتخاب

function showChoiceAnalysis() {

    const box = createStageAnalysis();

    let feedback = "";

    if (currentChoice.type === "healthy") {
        feedback = tx("healthyFeedback");
    }

    if (currentChoice.type === "thoughtful") {
        feedback = tx("thoughtfulFeedback");
    }

    if (currentChoice.type === "risky") {
        feedback = tx("riskyFeedback");
    }

    box.textContent = feedback;

}


// 19. دکمه ادامه

function renderContinueButton() {

    const container = el("reply-options");

    container.innerHTML = "";

    const button = document.createElement("button");

    button.type = "button";
    button.className = "continue-button";
    button.textContent = tx("continue");

    button.addEventListener("click", goToNextStep);

    container.appendChild(button);

}


// 20. ارسال پیام دلخواه

function sendCustomReply() {

    const input = el("custom-reply");

    const text = input.value.trim();

    if (!text) return;

    currentCustomReplies.push(text);

    addMessage(text, "player");

    input.value = "";

}


// 21. رفتن به مرحله بعد

function goToNextStep() {

    currentStage++;

    currentChoice = null;

    if (currentStage >= 5) {

        finishStory();

        return;
    }

    renderCurrentStep();

}


// 22. نمایش امتیاز

function updateTrustDisplay() {

    if (el("trust-score")) {
        el("trust-score").textContent = trustScore;
    }

    if (el("trust-label")) {
        el("trust-label").textContent = tx("score");
    }

}


// 23. نمایش پیشرفت مراحل

function updateProgressDisplay() {

    const progress = ((currentStage + 1) / 5) * 100;

    if (el("progress-fill")) {
        el("progress-fill").style.width = progress + "%";
    }

    if (el("stage-label")) {

        el("stage-label").textContent =
            tx("stage") + " " + (currentStage + 1) + " / 5";

    }

    if (el("stage-title")) {

        const stageNames = currentLanguage === "fa"
            ? [
                "آشنایی اولیه",
                "شناخت شخصیت",
                "هدف از رابطه",
                "مسئولیت‌ها و تصمیم‌ها",
                "تصمیم نهایی"
            ]
            : [
                "First Meeting",
                "Understanding Character",
                "Relationship Intentions",
                "Responsibilities and Decisions",
                "Final Decision"
            ];

        el("stage-title").textContent = stageNames[currentStage];

    }

}


// 24. پایان بازی

function finishStory() {

    showScreen("ending-screen");

    let endingTitle = "";
    let endingDescription = "";

    if (healthyCount >= 3 && riskyCount <= 1) {

        endingTitle = tx("goodEnding");

        endingDescription = currentLanguage === "fa"
            ? "انتخاب‌های تو بیشتر نشان‌دهنده اهمیت‌دادن به احترام و رابطه سالم است."
            : "Your choices mostly show that you value respect and healthy relationships.";

    } else if (riskyCount >= 3) {

        endingTitle = tx("warningEnding");

        endingDescription = currentLanguage === "fa"
            ? "در انتخاب‌هایت چند مورد پرخطر دیده می‌شود. بهتر است درباره مرزهای شخصی و احترام بیشتر فکر کنی."
            : "Some of your choices were risky. Consider personal boundaries and respect.";

    } else {

        endingTitle = tx("uncertainEnding");

        endingDescription = currentLanguage === "fa"
            ? "برای شناخت بهتر یک رابطه، زمان، گفت‌وگو و بررسی رفتارها ضروری است."
            : "Time, communication and observing behavior are important for understanding a relationship.";

    }

    if (el("ending-title")) {
        el("ending-title").textContent = endingTitle;
    }

    if (el("ending-result")) {
        el("ending-result").textContent = endingDescription;
    }

    if (el("ending-icon")) {

        el("ending-icon").textContent =
            healthyCount >= 3 ? "💚" :
            riskyCount >= 3 ? "⚠️" : "🤔";

    }

    if (el("final-score")) {
        el("final-score").textContent = trustScore + " / 100";
    }

    if (el("analysis-content")) {

        el("analysis-content").textContent =
            (currentLanguage === "fa"
                ? "انتخاب‌های سالم: "
                : "Healthy choices: ") + healthyCount +

            " | " +

            (currentLanguage === "fa"
                ? "انتخاب‌های سنجیده: "
                : "Thoughtful choices: ") + thoughtfulCount +

            " | " +

            (currentLanguage === "fa"
                ? "انتخاب‌های پرخطر: "
                : "Risky choices: ") + riskyCount;

    }

    if (el("lesson-content")) {
        el("lesson-content").textContent = tx("lessonText");
    }

}


// 25. بازگشت به صفحه اول

function backToWelcome() {

    showScreen("welcome-screen");

}


// 26. شروع دوباره

function restartGame() {

    startStory();

}


// 27. تغییر زبان

function changeLanguage() {

    currentLanguage = el("language").value;

    updateLanguageUI();

}


// 28. اتصال دکمه ها و رویدادها

document.addEventListener("DOMContentLoaded", function () {

    // دکمه شروع
    if (el("start-button")) {
        el("start-button").addEventListener("click", startStory);
    }

    // دکمه بازگشت
    if (el("back-button")) {
        el("back-button").addEventListener("click", backToWelcome);
    }

    // دکمه شروع دوباره
    if (el("restart-button")) {
        el("restart-button").addEventListener("click", restartGame);
    }

    // دکمه ارسال پیام
    if (el("send-reply-button")) {
        el("send-reply-button").addEventListener("click", sendCustomReply);
    }

    // تغییر زبان
    if (el("language")) {
        el("language").addEventListener("change", changeLanguage);
    }

    // تغییر تم
    if (el("theme")) {
        el("theme").addEventListener("change", function () {
            theme = this.value;
            applyTheme();
        });
    }

    // نمایش اولیه
    updateLanguageUI();

    showScreen("welcome-screen");

});