const $ = (id) => document.getElementById(id);

const languageSelect = $("language");
const themeSelect = $("theme");

let language = "fa";
let currentStep = 0;
let trustScore = 50;
let playerName = "";
let partnerGender = "boy";
let characterType = "honest";
let storySetting = "afghanistan";
let storyFinished = false;
let lastReply = null;

// ===============================
// شخصیت‌های بازی
// ===============================

const characters = {
    honest: {
        avatar: "🌷",
        name: {
            fa: "شخصیت صادق و جدی",
            en: "Honest and Serious"
        },
        messages: {
            fa: [
                "سلام! دوست دارم با احترام و صداقت با هم آشنا شویم.",
                "اگر هدف هر دوی ما ازدواج باشد، بهتر است دربارهٔ انتظاراتمان روشن صحبت کنیم.",
                "اگر آشنایی ما جدی شد و هر دو آماده بودیم، می‌توانیم دربارهٔ معرفی به خانواده‌ها صحبت کنیم.",
                "به نظر من، ازدواج فقط احساسات نیست؛ مسئولیت، تفاهم و برنامه‌ریزی هم مهم‌اند.",
                "دوست دارم تصمیم نهایی را با شناخت کافی و رضایت هر دو نفر بگیریم."
            ],
            en: [
                "Hi! I'd like us to get to know each other with respect and honesty.",
                "If we both want marriage, we should discuss our expectations clearly.",
                "If things become serious and we're both ready, we can discuss introducing our families.",
                "Marriage isn't only about feelings; responsibility, understanding, and planning matter too.",
                "I'd like us to make our decision with enough understanding and mutual consent."
            ]
        }
    },

    shy: {
        avatar: "🌸",
        name: {
            fa: "شخصیت خجالتی و محتاط",
            en: "Shy and Cautious"
        },
        messages: {
            fa: [
                "سلام! کمی خجالتی هستم و شاید نتوانم از همان اول احساساتم را خوب بیان کنم.",
                "ازدواج برایم موضوع مهمی است؛ ترجیح می‌دهم پیش از تصمیم‌گیری، بیشتر همدیگر را بشناسیم.",
                "معرفی به خانواده برایم مهم است، اما دوست دارم وقتی هر دو آماده بودیم این کار را انجام دهیم.",
                "هنوز دربارهٔ بعضی مسائل مالی و کاری باید فکر کنم. ترجیح می‌دهم صادقانه بگویم که همه‌چیز مشخص نیست.",
                "می‌خواهم بدون عجله تصمیم بگیریم. تو چه فکر می‌کنی؟"
            ],
            en: [
                "Hi! I'm a little shy and may not express my feelings well at first.",
                "Marriage is important to me. I'd prefer that we get to know each other better first.",
                "Introducing our families matters to me, but I'd like us both to be ready.",
                "I still need to think about some financial and work matters. Not everything is settled yet.",
                "I'd like us to decide without rushing. What do you think?"
            ]
        }
    },

    controlling: {
        avatar: "🚩",
        name: {
            fa: "شخصیت کنترل‌گر",
            en: "Controlling Character"
        },
        messages: {
            fa: [
                "سلام! اگر می‌خواهی با من باشی، باید همیشه فوراً به پیام‌هایم جواب بدهی.",
                "اگر واقعاً مرا می‌خواهی، باید ثابت کنی که فقط به حرف من گوش می‌کنی.",
                "من باید دربارهٔ این‌که با چه کسانی صحبت می‌کنی تصمیم بگیرم.",
                "بعد از ازدواج هم باید تمام تصمیم‌ها را من بگیرم؛ این‌طوری راحت‌تر است.",
                "اگر با خواسته‌هایم موافق نباشی، شاید اصلاً مناسب هم نباشیم!"
            ],
            en: [
                "Hi! If you want to be with me, you must always reply immediately.",
                "If you really want me, you must prove that you'll only listen to me.",
                "I should decide who you can talk to.",
                "After marriage, I should make all the decisions.",
                "If you don't agree with what I want, maybe we aren't right for each other!"
            ]
        }
    },

    vague: {
        avatar: "🌫️",
        name: {
            fa: "شخصیت وعده‌دهندهٔ مبهم",
            en: "Vague Promise-Maker"
        },
        messages: {
            fa: [
                "سلام! تو را خیلی دوست دارم. فکر می‌کنم آیندهٔ قشنگی با هم خواهیم داشت.",
                "فعلاً نمی‌خواهم دربارهٔ ازدواج و زمان آن صحبت کنم؛ بگذار بعداً ببینیم چه می‌شود.",
                "دربارهٔ خانواده هم فعلاً عجله نکن. یک روز همه‌چیز درست می‌شود.",
                "برنامهٔ مشخصی ندارم، اما مطمئن باش که آیندهٔ خوبی خواهیم داشت.",
                "چرا این‌قدر دربارهٔ آینده سؤال می‌کنی؟ مگر نمی‌توانیم فقط خوش باشیم؟"
            ],
            en: [
                "I really like you. I think we'll have a beautiful future together.",
                "I don't want to discuss marriage or timing right now. Let's see what happens.",
                "Don't rush about family. One day everything will work out.",
                "I don't have a clear plan, but trust me, we'll have a great future.",
                "Why do you ask so much about the future? Can't we just enjoy ourselves?"
            ]
        }
    }
};

// ===============================
// داستان و پاسخ‌های آماده
// ===============================

const scenarios = {
    fa: [
        {
            title: "مرحلهٔ اول: آشنایی",
            replies: [
                {
                    text: "خوشحال می‌شوم آشنا شویم؛ بهتر است با احترام و آرامش پیش برویم.",
                    score: 5,
                    analysis: "آشنایی تدریجی فرصت شناخت بیشتر و تصمیم‌گیری آگاهانه را فراهم می‌کند."
                },
                {
                    text: "اگر مرا دوست داری، باید همین حالا قول ازدواج بدهی!",
                    score: -3,
                    analysis: "قول فوری به‌تنهایی تعهد را ثابت نمی‌کند. بهتر است دربارهٔ هدف‌ها و شرایط واقعی صحبت شود."
                },
                {
                    text: "می‌خواهم بدانم از این آشنایی چه انتظاری داری.",
                    score: 5,
                    analysis: "پرسیدن دربارهٔ هدف آشنایی راه مناسبی برای روشن‌شدن انتظارات است."
                }
            ]
        },
        {
            title: "مرحلهٔ دوم: قصد ازدواج",
            replies: [
                {
                    text: "بهتر است دربارهٔ هدف ازدواج و زمان مناسب آن صادقانه صحبت کنیم.",
                    score: 5,
                    analysis: "گفت‌وگوی روشن دربارهٔ هدف‌ها مفید است؛ پاسخ واقعی طرف مقابل را هم در نظر بگیر."
                },
                {
                    text: "حرف‌هایت کافی است؛ نیازی نیست در عمل چیزی نشان بدهی.",
                    score: -5,
                    analysis: "وعده‌ها به‌تنهایی کافی نیستند. هماهنگی حرف و عمل در طول زمان اهمیت دارد."
                },
                {
                    text: "اگر هنوز مطمئن نیستی، می‌توانیم برای شناخت بیشتر وقت بگذاریم.",
                    score: 5,
                    analysis: "تردید صادقانه با فریب‌کاری یکسان نیست. مهم است که هر دو نفر دربارهٔ وضعیت خود روشن باشند."
                }
            ]
        },
        {
            title: "مرحلهٔ سوم: خانواده‌ها",
            replies: [
                {
                    text: "اگر هر دو آماده باشیم، دربارهٔ زمان و روش مناسب معرفی به خانواده‌ها صحبت کنیم.",
                    score: 5,
                    analysis: "تصمیم مشترک و احترام به شرایط هر دو نفر، از فشارآوردن بهتر است."
                },
                {
                    text: "اگر امروز خانواده‌ات را معرفی نکنی، یعنی حتماً فریب‌کار هستی!",
                    score: -3,
                    analysis: "تأخیر به‌تنهایی نیت بد را ثابت نمی‌کند. شرایط، دلایل و رفتارهای بعدی نیز مهم‌اند."
                },
                {
                    text: "می‌توانی توضیح بدهی چه چیزی باعث می‌شود هنوز آمادهٔ معرفی نباشی؟",
                    score: 5,
                    analysis: "پرسش محترمانه کمک می‌کند دلیل تأخیر روشن شود؛ به پاسخ و رفتار بعدی توجه کن."
                }
            ]
        },
        {
            title: "مرحلهٔ چهارم: مسئولیت‌های زندگی",
            replies: [
                {
                    text: "بیایید دربارهٔ کار، درس، مسائل مالی و مسئولیت‌های مشترک صحبت کنیم.",
                    score: 5,
                    analysis: "برنامه‌ریزی واقع‌بینانه برای زندگی مشترک مهم است؛ لازم نیست همه‌چیز از ابتدا کامل باشد."
                },
                {
                    text: "بعد از ازدواج هر مشکلی پیش آمد، خودش حل می‌شود.",
                    score: -3,
                    analysis: "امیدواری خوب است، اما صحبت دربارهٔ چالش‌های واقعی می‌تواند به آمادگی کمک کند."
                },
                {
                    text: "برایم مهم است که تصمیم‌های مهم را با تفاهم بگیریم.",
                    score: 5,
                    analysis: "تصمیم‌گیری مشترک و شنیدن نظر هر دو نفر از پایه‌های یک رابطهٔ سالم‌اند."
                }
            ]
        },
        {
            title: "مرحلهٔ پنجم: تصمیم نهایی",
            replies: [
                {
                    text: "می‌خواهم بر اساس شناخت، احترام و رفتارهای واقعی تصمیم بگیرم.",
                    score: 5,
                    analysis: "این انتخاب بر شناخت در طول زمان تأکید دارد، نه فقط حرف‌ها یا احساسات لحظه‌ای."
                },
                {
                    text: "هر اتفاقی بیفتد، از ترس تنهایی این رابطه را ترک نمی‌کنم.",
                    score: -5,
                    analysis: "ترس از تنهایی نباید تو را مجبور کند از امنیت، احترام یا خواسته‌های مهم خود بگذری."
                },
                {
                    text: "اگر هنوز نکات مهمی روشن نیست، بهتر است عجله نکنیم.",
                    score: 5,
                    analysis: "به‌تعویق‌انداختن تصمیم تا روشن‌شدن مسائل مهم می‌تواند انتخاب مسئولانه‌ای باشد."
                }
            ]
        }
    ],

    en: [
        {
            title: "Stage 1: Getting to know each other",
            replies: [
                {
                    text: "I'd be happy to get to know you. Let's proceed respectfully and calmly.",
                    score: 5,
                    analysis: "Taking time to get to know someone supports thoughtful decisions."
                },
                {
                    text: "If you love me, promise to marry me right now!",
                    score: -3,
                    analysis: "An immediate promise alone does not prove commitment."
                },
                {
                    text: "I'd like to understand what you're looking for in this connection.",
                    score: 5,
                    analysis: "Asking about intentions can clarify expectations."
                }
            ]
        },
        {
            title: "Stage 2: Marriage intentions",
            replies: [
                {
                    text: "Let's honestly discuss our goals and what timing might work.",
                    score: 5,
                    analysis: "Clear discussion helps clarify goals. Listen to the actual response too."
                },
                {
                    text: "Your words are enough; you don't need to show anything through actions.",
                    score: -5,
                    analysis: "Promises alone are not enough. Consistency over time matters."
                },
                {
                    text: "If you're unsure, we can take more time to understand each other.",
                    score: 5,
                    analysis: "Honest uncertainty is not the same as deception."
                }
            ]
        },
        {
            title: "Stage 3: Meeting the families",
            replies: [
                {
                    text: "If we're both ready, let's discuss an appropriate way to introduce our families.",
                    score: 5,
                    analysis: "Mutual readiness is healthier than pressure."
                },
                {
                    text: "If you don't introduce your family today, you must be deceptive!",
                    score: -3,
                    analysis: "Delay alone does not prove bad intentions. Context and later behavior matter."
                },
                {
                    text: "Can you explain what makes you feel unready to introduce your family?",
                    score: 5,
                    analysis: "Respectful questions can clarify the reason for delay."
                }
            ]
        },
        {
            title: "Stage 4: Life responsibilities",
            replies: [
                {
                    text: "Let's discuss work, studies, finances, and shared responsibilities.",
                    score: 5,
                    analysis: "Realistic planning helps. Everything doesn't need to be settled immediately."
                },
                {
                    text: "After marriage, every problem will somehow solve itself.",
                    score: -3,
                    analysis: "Hope is useful, but discussing real challenges can help you prepare."
                },
                {
                    text: "It's important to me that we make major decisions together.",
                    score: 5,
                    analysis: "Shared decision-making and listening to both people support a healthy relationship."
                }
            ]
        },
        {
            title: "Stage 5: The final decision",
            replies: [
                {
                    text: "I want to decide based on understanding, respect, and real behavior.",
                    score: 5,
                    analysis: "This focuses on patterns over time rather than words or momentary feelings."
                },
                {
                    text: "No matter what happens, I won't leave because I'm afraid to be alone.",
                    score: -5,
                    analysis: "Fear of loneliness should not make you give up safety, respect, or important needs."
                },
                {
                    text: "If important questions remain, we shouldn't rush.",
                    score: 5,
                    analysis: "Waiting until important issues are clearer can be a responsible choice."
                }
            ]
        }
    ]
};

// ===============================
// پیام‌های ویژهٔ فضای داستان
// ===============================

const settingMessages = {
    fa: {
        afghanistan: [
            "سلام! خوشحالم که فرصت پیدا کردیم با احترام همدیگر را بشناسیم.",
            "اگر هدف ما ازدواج باشد، بهتر است دربارهٔ خواسته‌ها و انتظاراتمان روشن صحبت کنیم.",
            "اگر هر دو آماده باشیم، می‌توانیم دربارهٔ آشنایی خانواده‌ها و روش مناسب آن صحبت کنیم.",
            "برای زندگی مشترک، تحصیل، کار، مسائل مالی و مسئولیت‌های خانواده مهم‌اند.",
            "می‌خواهم تصمیم نهایی با شناخت کافی، رضایت و احترام متقابل گرفته شود."
        ],
        modern: [
            "سلام! خوشحالم که آشنا شدیم. دوست دارم بدون عجله بیشتر همدیگر را بشناسیم.",
            "به نظرم بهتر است دربارهٔ هدف آشنایی و انتظاراتمان از آینده صحبت کنیم.",
            "اگر ارتباط ما جدی شد، می‌توانیم دربارهٔ معرفی خانواده‌ها یا قدم بعدی توافق کنیم.",
            "بیایید دربارهٔ کار، تحصیل، استقلال فردی و برنامه‌های آینده صحبت کنیم.",
            "تصمیم دربارهٔ آینده باید آگاهانه باشد و هر دو نفر در آن رضایت داشته باشند."
        ]
    },
    en: {
        afghanistan: [
            "Hi! I'm glad we have a chance to get to know each other respectfully.",
            "If marriage is our goal, we should discuss our expectations clearly.",
            "If we're both ready, we can discuss an appropriate way to introduce our families.",
            "Education, work, finances, and family responsibilities matter in married life.",
            "I'd like our final decision to be based on understanding, consent, and mutual respect."
        ],
        modern: [
            "Hi! I'm glad we met. I'd like us to get to know each other without rushing.",
            "We should discuss our intentions and expectations for the future.",
            "If things become serious, we can agree on introducing our families or taking the next step.",
            "Let's discuss work, education, personal independence, and future plans.",
            "Our decision should be informed, and both people should freely agree."
        ]
    }
};

// ===============================
// تغییر زبان بازی
// ===============================

function updateLanguage() {
    language = languageSelect.value;

    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";

    $("main-title").textContent =
        language === "fa" ? "عشق واقعی یا فریب؟" : "Love or Deception?";

    $("description").textContent =
        language === "fa"
            ? "رفتارها را بررسی کن و مسیر داستانت را بساز!"
            : "Explore behavior and shape your own story!";

    $("your-label").textContent =
        language === "fa" ? "جنسیت تو:" : "Your gender:";

    $("partner-label").textContent =
        language === "fa" ? "جنسیت شخصیت مقابل:" : "Other character's gender:";

    $("name-label").textContent =
        language === "fa" ? "نام مستعار تو:" : "Your nickname:";

    $("theme-label").textContent =
        language === "fa" ? "انتخاب تم بازی:" : "Choose a theme:";

    $("character-type-label").textContent =
        language === "fa" ? "شخصیت موردنظر:" : "Choose a character:";

    $("setting-label").textContent =
        language === "fa" ? "فضای داستان:" : "Story setting:";

    $("start-button").textContent =
        language === "fa" ? "شروع داستان ❤️" : "Start Story ❤️";

    $("notice").textContent =
        language === "fa"
            ? "⚠️ این بازی آموزشی است؛ رفتار یک‌باره نیت واقعی کسی را ثابت نمی‌کند."
            : "⚠️ This educational game cannot prove someone's intentions from one behavior.";

    const genderLabels = language === "fa"
        ? { girl: "دختر 👩", boy: "پسر 👨" }
        : { girl: "Girl 👩", boy: "Boy 👨" };

    ["your-gender", "partner-gender"].forEach(id => {
        Array.from($(id).options).forEach(option => {
            option.textContent = genderLabels[option.value];
        });
    });

    const characterLabels = language === "fa"
        ? {
            honest: "🌷 صادق و جدی",
            shy: "🌸 خجالتی و محتاط",
            controlling: "🚩 کنترل‌گر",
            vague: "🌫️ وعده‌دهندهٔ مبهم"
        }
        : {
            honest: "🌷 Honest and serious",
            shy: "🌸 Shy and cautious",
            controlling: "🚩 Controlling",
            vague: "🌫️ Vague promise-maker"
        };

    Array.from($("character-type").options).forEach(option => {
        option.textContent = characterLabels[option.value];
    });

    const settingLabels = language === "fa"
        ? {
            afghanistan: "🇦🇫 فضای افغانستان",
            modern: "🌍 فضای مدرن و جهانی"
        }
        : {
            afghanistan: "🇦🇫 Afghanistan setting",
            modern: "🌍 Modern and global setting"
        };

    Array.from($("story-setting").options).forEach(option => {
        option.textContent = settingLabels[option.value];
    });

    const themeLabels = language === "fa"
        ? {
            romantic: "💗 عاشقانه",
            messenger: "💬 مسنجر",
            cinematic: "🎬 سینمایی"
        }
        : {
            romantic: "💗 Romantic",
            messenger: "💬 Messenger",
            cinematic: "🎬 Cinematic"
        };

    Array.from(themeSelect.options).forEach(option => {
        option.textContent = themeLabels[option.value];
    });

    $("custom-reply").placeholder =
        language === "fa" ? "پیام خودت را بنویس..." : "Write your message...";

    $("send-button").textContent =
        language === "fa" ? "ارسال ➤" : "Send ➤";

    $("analysis-title").textContent =
        language === "fa" ? "🧠 تحلیل رفتار" : "🧠 Behavior insight";

    $("trust-label").textContent =
        language === "fa" ? "امتیاز آموزشی" : "Learning score";

    $("back-button").textContent = language === "fa" ? "→" : "←";

    $("restart-button").textContent =
        language === "fa" ? "شروع دوباره 🔄" : "Play again 🔄";

    $("chat-notice").textContent =
        language === "fa"
            ? "رفتارها را در طول زمان بررسی کن؛ یک پیام به‌تنهایی کافی نیست."
            : "Look at behavior over time; one message is not enough.";

    if (!$("chat-screen").hidden && !storyFinished) {
        renderCurrentStep();
    }
}

// ===============================
// تغییر ظاهر بازی
// ===============================

function updateTheme() {
    document.body.classList.remove("messenger", "cinematic");

    if (themeSelect.value === "messenger") {
        document.body.classList.add("messenger");
    } else if (themeSelect.value === "cinematic") {
        document.body.classList.add("cinematic");
    }
}

// ===============================
// نمایش پیام در صفحهٔ گفت‌وگو
// ===============================

function addMessage(text, type, label) {
    const message = document.createElement("div");
    message.className = `message ${type}`;

    const messageLabel = document.createElement("span");
    messageLabel.className = "message-label";
    messageLabel.textContent = label;

    const content = document.createElement("div");
    content.textContent = text;

    message.append(messageLabel, content);
    $("chat-messages").appendChild(message);

    $("chat-messages").scrollTop = $("chat-messages").scrollHeight;
}

// ===============================
// شروع داستان
// ===============================

function startStory() {
    playerName = $("player-name").value.trim();
    partnerGender = $("partner-gender").value;
    characterType = $("character-type").value;
    storySetting = $("story-setting").value;

    currentStep = 0;
    trustScore = 50;
    storyFinished = false;
    lastReply = null;

    $("welcome-screen").hidden = true;
    $("ending-screen").hidden = true;
    $("chat-screen").hidden = false;

    $("chat-messages").replaceChildren();

    const character = characters[characterType];

    $("character-avatar").textContent = character.avatar;
    $("character-name").textContent = character.name[language];

    $("character-status").textContent =
        language === "fa"
            ? (storySetting === "afghanistan"
                ? "آشنایی، خانواده و تصمیم ازدواج"
                : "آشنایی مدرن و تصمیم دربارهٔ آینده")
            : (storySetting === "afghanistan"
                ? "Getting to know each other, family, and marriage"
                : "Modern connection and future decisions");

    updateTheme();
    renderCurrentStep();
}

// ===============================
// نمایش مرحلهٔ فعلی
// ===============================

function renderCurrentStep() {
    const character = characters[characterType];
    const scenario = scenarios[language][currentStep];

    if (!scenario) {
        finishStory();
        return;
    }

    $("step-counter").textContent =
        language === "fa"
            ? `${currentStep + 1} از ${scenarios.fa.length}`
            : `${currentStep + 1} of ${scenarios.en.length}`;

    $("chapter-label").textContent = scenario.title;
    $("chat-messages").replaceChildren();
    $("reply-options").replaceChildren();

    // پیام اختصاصی فضای داستان
    const openingMessage =
        settingMessages[language][storySetting][currentStep];

    // شخصیت کنترل‌گر و وعده‌دهنده پیام‌های مخصوص خود را حفظ می‌کنند.
    // برای شخصیت‌های صادق و خجالتی از پیام‌های متناسب با فضای داستان استفاده می‌شود.
    const partnerMessage =
        (characterType === "honest" || characterType === "shy")
            ? openingMessage
            : character.messages[language][currentStep];

    addMessage(
        partnerMessage,
        "other",
        character.name[language]
    );

    $("analysis-text").textContent =
        language === "fa"
            ? "یکی از پاسخ‌ها را انتخاب کن و نکتهٔ آموزشی آن را ببین."
            : "Choose a reply to see its educational feedback.";

    scenario.replies.forEach((reply, index) => {
        const button = document.createElement("button");
        button.className = "reply-option";
        button.textContent = `${index + 1}. ${reply.text}`;

        button.addEventListener("click", () => chooseReply(reply));

        $("reply-options").appendChild(button);
    });

    updateTrustDisplay();
}

// ===============================
// انتخاب پاسخ
// ===============================

function chooseReply(reply) {
    if (storyFinished) return;

    lastReply = reply;

    addMessage(
        reply.text,
        "mine",
        playerName || (language === "fa" ? "تو" : "You")
    );

    trustScore = Math.max(
        0,
        Math.min(100, trustScore + reply.score)
    );

    $("analysis-text").textContent = reply.analysis;
    $("reply-options").replaceChildren();

    updateTrustDisplay();

    const nextButton = document.createElement("button");
    nextButton.className = "start-button";

    nextButton.textContent =
        language === "fa" ? "ادامهٔ داستان ←" : "Continue story →";

    nextButton.addEventListener("click", goToNextStep);

    $("reply-options").appendChild(nextButton);
}

// ===============================
// پیام دلخواه بازیکن
// ===============================

function sendCustomReply(event) {
    event.preventDefault();

    const input = $("custom-reply");
    const text = input.value.trim();

    if (!text || storyFinished) return;

    addMessage(
        text,
        "mine",
        playerName || (language === "fa" ? "تو" : "You")
    );

    input.value = "";

    $("analysis-text").textContent =
        language === "fa"
            ? "پیامت ثبت شد. در این نسخه، پیام‌های دلخواه هنوز به‌وسیلهٔ هوش مصنوعی تحلیل نمی‌شوند."
            : "Your message was added. Free-text messages are not analyzed by AI in this version.";

    $("reply-options").replaceChildren();

    const nextButton = document.createElement("button");
    nextButton.className = "start-button";

    nextButton.textContent =
        language === "fa" ? "ادامهٔ داستان ←" : "Continue story →";

    nextButton.addEventListener("click", goToNextStep);

    $("reply-options").appendChild(nextButton);
}

// ===============================
// رفتن به مرحلهٔ بعد
// ===============================

function goToNextStep() {
    if (storyFinished) return;

    currentStep++;

    if (currentStep >= scenarios[language].length) {
        finishStory();
    } else {
        renderCurrentStep();
    }
}

// ===============================
// به‌روزرسانی امتیاز آموزشی
// ===============================

function updateTrustDisplay() {
    $("trust-score").textContent =
        language === "fa"
            ? `${trustScore} از ۱۰۰`
            : `${trustScore} / 100`;

    $("trust-bar").style.width = `${trustScore}%`;
}

// ===============================
// پایان داستان
// ===============================

function finishStory() {
    storyFinished = true;

    $("chat-screen").hidden = true;
    $("ending-screen").hidden = false;

    let title;
    let description;
    let icon;

    if (characterType === "controlling") {
        icon = "🛡️";

        title = language === "fa"
            ? "پایان: مرزهای سالم مهم‌اند"
            : "Ending: Healthy boundaries matter";

        description = language === "fa"
            ? "در این داستان، شخصیت مقابل رفتارهای کنترل‌گرانه نشان داد. در زندگی واقعی، تلاش برای کنترول ارتباطات و تصمیم‌های تو نگران‌کننده است. به امنیت، احترام و آزادی تصمیم‌گیری خود توجه کن."
            : "In this story, the other character showed controlling behavior. Attempts to control your contacts and decisions are concerning. Protect your safety, respect, and autonomy.";

    } else if (characterType === "vague") {
        icon = "💭";

        title = language === "fa"
            ? "پایان: حرف و عمل را مقایسه کن"
            : "Ending: Compare words and actions";

        description = language === "fa"
            ? "در این داستان، وعده‌های بزرگ با برنامه‌های روشن همراه نبودند. این موضوع به‌تنهایی فریب را ثابت نمی‌کند؛ اما می‌توانی دربارهٔ انتظاراتت صحبت کنی و در طول زمان به هماهنگی حرف و عمل توجه کنی."
            : "In this story, big promises weren't matched by clear plans. This alone doesn't prove deception. Clarify expectations and look for consistency over time.";

    } else if (characterType === "shy") {
        icon = "🌸";

        title = language === "fa"
            ? "پایان: شناخت بیشتر"
            : "Ending: More time to understand";

        description = language === "fa"
            ? "محتاط‌بودن لزوماً نشانهٔ بی‌علاقگی یا فریب نیست. مهم است که هر دو نفر بتوانند دربارهٔ هدف‌ها صحبت کنند و به‌مرور تصمیم‌های واقعی بگیرند."
            : "Being cautious doesn't automatically mean disinterest or deception. What matters is whether both people can discuss their goals and make real decisions over time.";

    } else {
        icon = "🌷";

        title = language === "fa"
            ? "پایان: تعهد همراه با شناخت"
            : "Ending: Commitment with understanding";

        description = language === "fa"
            ? "این شخصیت در گفت‌وگو دربارهٔ احترام و مسئولیت روشن‌تر بود. با این حال، حرف‌های خوب به‌تنهایی کافی نیستند؛ رفتار پایدار و شناخت دوطرفه اهمیت دارند."
            : "This character communicated more clearly about respect and responsibility. Still, good words alone aren't enough; consistent behavior and mutual understanding matter.";
    }

    $("ending-icon").textContent = icon;
    $("ending-title").textContent = title;

    $("ending-description").textContent =
        `${description}\n\n${
            language === "fa"
                ? `امتیاز آموزشی انتخاب‌های تو: ${trustScore} از ۱۰۰`
                : `Your educational choice score: ${trustScore} out of 100`
        }\n\n${
            language === "fa"
                ? "یادآوری: امتیاز بازی معیار علمی برای تشخیص نیت واقعی افراد نیست."
                : "Reminder: This game score is not a scientific measure of someone's real intentions."
        }`;
}

// ===============================
// بازگشت به صفحهٔ آغازین
// ===============================

function backToWelcome() {
    storyFinished = false;

    $("chat-screen").hidden = true;
    $("ending-screen").hidden = true;
    $("welcome-screen").hidden = false;
}

// ===============================
// رویدادها
// ===============================

languageSelect.addEventListener("change", updateLanguage);
themeSelect.addEventListener("change", updateTheme);

$("start-button").addEventListener("click", startStory);
$("custom-reply-form").addEventListener("submit", sendCustomReply);
$("back-button").addEventListener("click", backToWelcome);
$("restart-button").addEventListener("click", backToWelcome);

updateLanguage();
updateTheme();