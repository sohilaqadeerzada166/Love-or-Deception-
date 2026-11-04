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
let choiceHistory = [];
let storyPath = "balanced";

// ===============================
// اطلاعات شخصیت‌ها
// ===============================

const characters = {
    honest: {
        avatar: "🌷",
        name: {
            fa: "شخصیت صادق و جدی",
            en: "Honest and Serious"
        }
    },

    shy: {
        avatar: "🌸",
        name: {
            fa: "شخصیت خجالتی و محتاط",
            en: "Shy and Cautious"
        }
    },

    controlling: {
        avatar: "🚩",
        name: {
            fa: "شخصیت کنترل‌گر",
            en: "Controlling Character"
        }
    },

    vague: {
        avatar: "🌫️",
        name: {
            fa: "شخصیت وعده‌دهندهٔ مبهم",
            en: "Vague Promise-Maker"
        }
    }
};

// ===============================
// داستان افغانستان و مدرن
// هر مرحله پاسخ‌ها و پیام‌های جدا دارد
// ===============================

const stories = {
    fa: {
        afghanistan: [
            {
                title: "مرحلهٔ اول: آشنایی",
                message: {
                    honest: "سلام! دوست دارم با احترام و صداقت با هم آشنا شویم.",
                    shy: "سلام! کمی خجالتی هستم؛ امیدوارم به‌مرور همدیگر را بهتر بشناسیم.",
                    controlling: "سلام! اگر می‌خواهی با من باشی، باید همیشه فوراً به پیام‌هایم جواب بدهی.",
                    vague: "سلام! تو را خیلی دوست دارم؛ مطمئنم آیندهٔ قشنگی با هم خواهیم داشت."
                },
                replies: [
                    {
                        text: "خوشحال می‌شوم آشنا شویم؛ بهتر است آرام و با احترام پیش برویم.",
                        score: 5,
                        path: "healthy",
                        analysis: "آشنایی تدریجی کمک می‌کند شناخت واقعی‌تری به دست بیاوری."
                    },
                    {
                        text: "اگر مرا دوست داری، همین حالا قول ازدواج بده!",
                        score: -3,
                        path: "pressure",
                        analysis: "قول فوری به‌تنهایی تعهد را ثابت نمی‌کند؛ شناخت و رفتار در طول زمان مهم‌اند."
                    },
                    {
                        text: "می‌خواهم بدانم از این آشنایی چه انتظاری داری.",
                        score: 5,
                        path: "clarity",
                        analysis: "پرسیدن دربارهٔ هدف آشنایی می‌تواند انتظارات دو طرف را روشن کند."
                    }
                ]
            },

            {
                title: "مرحلهٔ دوم: نیت ازدواج",
                message: {
                    honest: "اگر هدف ما ازدواج باشد، بهتر است دربارهٔ انتظاراتمان روشن صحبت کنیم.",
                    shy: "ازدواج برایم مهم است؛ ترجیح می‌دهم پیش از تصمیم‌گیری بیشتر همدیگر را بشناسیم.",
                    controlling: "اگر واقعاً مرا می‌خواهی، باید ثابت کنی که فقط به حرف من گوش می‌کنی.",
                    vague: "فعلاً نمی‌خواهم دربارهٔ ازدواج و زمان آن صحبت کنم؛ بگذار بعداً ببینیم چه می‌شود."
                },
                replies: [
                    {
                        text: "بیایید دربارهٔ هدف ازدواج و زمان مناسب آن صادقانه صحبت کنیم.",
                        score: 5,
                        path: "healthy",
                        analysis: "گفت‌وگوی روشن دربارهٔ هدف‌ها مفید است. به پاسخ و رفتار طرف مقابل هم توجه کن."
                    },
                    {
                        text: "مهم نیست چه می‌گویی؛ من هر وعده‌ای را باور می‌کنم.",
                        score: -5,
                        path: "blind",
                        analysis: "اعتماد بهتر است به‌تدریج و بر اساس هماهنگی حرف و عمل شکل بگیرد."
                    },
                    {
                        text: "اگر هنوز مطمئن نیستی، می‌توانیم برای شناخت بیشتر وقت بگذاریم.",
                        score: 5,
                        path: "patient",
                        analysis: "تردید صادقانه با فریب‌کاری یکسان نیست؛ روشن‌بودن دربارهٔ وضعیت مهم است."
                    }
                ]
            },

            {
                title: "مرحلهٔ سوم: خانواده‌ها و خواستگاری",
                message: {
                    honest: "اگر هر دو آماده باشیم، می‌توانیم دربارهٔ معرفی به خانواده‌ها صحبت کنیم.",
                    shy: "معرفی خانواده‌ها برایم مهم است، اما دوست دارم وقتی هر دو آماده بودیم این کار را انجام دهیم.",
                    controlling: "من باید دربارهٔ این‌که با چه کسانی صحبت می‌کنی تصمیم بگیرم.",
                    vague: "دربارهٔ خانواده فعلاً عجله نکن؛ یک روز همه‌چیز درست می‌شود."
                },
                replies: [
                    {
                        text: "اگر هر دو آماده باشیم، دربارهٔ زمان مناسب معرفی خانواده‌ها توافق کنیم.",
                        score: 5,
                        path: "healthy",
                        analysis: "توافق دوطرفه بهتر از فشارآوردن است؛ شرایط و دلایل هر دو نفر اهمیت دارند."
                    },
                    {
                        text: "اگر امروز خانواده‌ات را معرفی نکنی، حتماً فریب‌کار هستی!",
                        score: -3,
                        path: "pressure",
                        analysis: "تأخیر به‌تنهایی نیت بد را ثابت نمی‌کند. به دلایل و رفتارهای بعدی هم توجه کن."
                    },
                    {
                        text: "می‌توانی توضیح بدهی چه چیزی باعث شده هنوز آماده نباشی؟",
                        score: 5,
                        path: "clarity",
                        analysis: "پرسش محترمانه کمک می‌کند علت تأخیر روشن شود و انتظارات دو طرف مشخص بماند."
                    }
                ]
            },

            {
                title: "مرحلهٔ چهارم: مسئولیت‌های زندگی",
                message: {
                    honest: "ازدواج فقط احساسات نیست؛ مسئولیت، تفاهم و برنامه‌ریزی هم مهم‌اند.",
                    shy: "هنوز دربارهٔ بعضی مسائل مالی و کاری باید فکر کنم. ترجیح می‌دهم صادقانه بگویم.",
                    controlling: "بعد از ازدواج باید تمام تصمیم‌ها را من بگیرم؛ این‌طوری راحت‌تر است.",
                    vague: "برنامهٔ مشخصی ندارم، اما مطمئن باش آیندهٔ خوبی خواهیم داشت."
                },
                replies: [
                    {
                        text: "بیایید دربارهٔ کار، درس، مسائل مالی و مسئولیت‌های مشترک صحبت کنیم.",
                        score: 5,
                        path: "healthy",
                        analysis: "برنامه‌ریزی واقع‌بینانه کمک می‌کند دربارهٔ زندگی آینده آگاهانه تصمیم بگیرید."
                    },
                    {
                        text: "بعد از ازدواج هر مشکلی پیش بیاید، خودش حل می‌شود.",
                        score: -3,
                        path: "blind",
                        analysis: "امیدواری خوب است، اما گفت‌وگو دربارهٔ چالش‌های واقعی نیز اهمیت دارد."
                    },
                    {
                        text: "برایم مهم است که تصمیم‌های مهم را با تفاهم بگیریم.",
                        score: 5,
                        path: "healthy",
                        analysis: "احترام به نظر هر دو نفر و تصمیم‌گیری مشترک از پایه‌های رابطهٔ سالم است."
                    }
                ]
            },

            {
                title: "مرحلهٔ پنجم: تصمیم نهایی",
                message: {
                    honest: "می‌خواهم تصمیم نهایی را با شناخت کافی و رضایت هر دو نفر بگیریم.",
                    shy: "می‌خواهم بدون عجله تصمیم بگیریم. تو چه فکر می‌کنی؟",
                    controlling: "اگر با خواسته‌هایم موافق نباشی، شاید اصلاً مناسب هم نباشیم!",
                    vague: "چرا این‌قدر دربارهٔ آینده سؤال می‌کنی؟ مگر نمی‌توانیم فقط خوش باشیم؟"
                },
                replies: [
                    {
                        text: "بر اساس شناخت، احترام و رفتارهای واقعی تصمیم می‌گیرم.",
                        score: 5,
                        path: "healthy",
                        analysis: "به الگوی رفتار در طول زمان توجه کن، نه فقط حرف‌ها و احساسات لحظه‌ای."
                    },
                    {
                        text: "از ترس تنهایی، به هر شرایطی راضی می‌شوم.",
                        score: -5,
                        path: "unsafe",
                        analysis: "ترس از تنهایی نباید تو را مجبور کند از امنیت، احترام یا نیازهای مهم خود بگذری."
                    },
                    {
                        text: "اگر نکات مهمی روشن نیست، بهتر است عجله نکنیم.",
                        score: 5,
                        path: "patient",
                        analysis: "به‌تعویق‌انداختن تصمیم تا روشن‌شدن مسائل مهم می‌تواند مسئولانه باشد."
                    }
                ]
            }
        ],

        modern: [
            {
                title: "مرحلهٔ اول: آشنایی آنلاین",
                message: {
                    honest: "سلام! خوشحالم که آشنا شدیم. دوست دارم با احترام و صداقت بیشتر همدیگر را بشناسیم.",
                    shy: "سلام! کمی خجالتی هستم؛ شاید برای شناخت بیشتر به زمان نیاز داشته باشم.",
                    controlling: "اگر می‌خواهی با من باشی، باید همیشه فوراً به پیام‌هایم جواب بدهی.",
                    vague: "از همان لحظهٔ اول حس کردم تو همان شخص خاص زندگی من هستی!"
                },
                replies: [
                    {
                        text: "خوب است؛ آرام پیش برویم و بیشتر همدیگر را بشناسیم.",
                        score: 5,
                        path: "healthy",
                        analysis: "در آشنایی آنلاین بهتر است به‌تدریج شناخت پیدا کنی و از اعتماد عجولانه پرهیز کنی."
                    },
                    {
                        text: "چون در پیام‌ها مهربان هستی، تمام حرف‌هایت را باور می‌کنم.",
                        score: -5,
                        path: "blind",
                        analysis: "مهربانی در پیام‌ها به‌تنهایی هویت، صداقت یا نیت واقعی کسی را ثابت نمی‌کند."
                    },
                    {
                        text: "دوست دارم بدانم دنبال چه نوع رابطه‌ای هستی.",
                        score: 5,
                        path: "clarity",
                        analysis: "روشن‌کردن هدف آشنایی کمک می‌کند انتظارات دو طرف مشخص شود."
                    }
                ]
            },

            {
                title: "مرحلهٔ دوم: اعتماد و مرزهای شخصی",
                message: {
                    honest: "اعتماد مهم است، اما هر دو نفر حق دارند حریم خصوصی و مرزهای خود را داشته باشند.",
                    shy: "گاهی برای پاسخ‌دادن به پیام‌ها به زمان نیاز دارم؛ امیدوارم این موضوع را درک کنی.",
                    controlling: "اگر واقعاً مرا دوست داری، رمز حساب‌هایت را به من بده.",
                    vague: "اگر به من اعتماد داری، دیگر لازم نیست دربارهٔ حرف‌هایم سؤال کنی."
                },
                replies: [
                    {
                        text: "اعتماد مهم است؛ اما حریم خصوصی هر دو نفر نیز باید محترم باشد.",
                        score: 5,
                        path: "healthy",
                        analysis: "در رابطهٔ سالم، اعتماد با اجبار به دادن رمزها یا کنترل‌کردن ساخته نمی‌شود."
                    },
                    {
                        text: "برای اثبات عشق، تمام رمزهایم را می‌دهم.",
                        score: -5,
                        path: "unsafe",
                        analysis: "برای اثبات محبت مجبور نیستی رمزها یا اطلاعات خصوصی خود را در اختیار کسی بگذاری."
                    },
                    {
                        text: "بیایید دربارهٔ مرزها و انتظاراتمان واضح صحبت کنیم.",
                        score: 5,
                        path: "clarity",
                        analysis: "گفت‌وگوی روشن دربارهٔ حریم خصوصی و ارتباطات، سوءتفاهم را کاهش می‌دهد."
                    }
                ]
            },

            {
                title: "مرحلهٔ سوم: هماهنگی حرف و عمل",
                message: {
                    honest: "اگر قرار بگذاریم کاری انجام دهیم، مهم است که به توافقمان احترام بگذاریم.",
                    shy: "ممکن است همیشه نتوانم همه‌چیز را فوری مشخص کنم؛ اما می‌توانم صادقانه درباره‌اش صحبت کنم.",
                    controlling: "اگر دیر جواب بدهم اشکالی ندارد، اما تو باید همیشه در دسترس باشی.",
                    vague: "به‌زودی یک برنامهٔ عالی برای آینده داریم؛ فعلاً تاریخ مشخصی ندارم."
                },
                replies: [
                    {
                        text: "به وعده‌ها توجه می‌کنم، اما رفتار و عمل را هم در طول زمان می‌سنجم.",
                        score: 5,
                        path: "healthy",
                        analysis: "ثبات رفتاری در طول زمان اطلاعات بیشتری از وعده‌های بزرگ به تو می‌دهد."
                    },
                    {
                        text: "هر وعده‌ای بدهی، بدون هیچ پرسشی قبول می‌کنم.",
                        score: -5,
                        path: "blind",
                        analysis: "اعتماد به معنی نادیده‌گرفتن تناقض‌ها نیست؛ می‌توانی محترمانه سؤال بپرسی."
                    },
                    {
                        text: "می‌توانی مشخص کنی چه زمانی برای این کار آماده می‌شوی؟",
                        score: 5,
                        path: "clarity",
                        analysis: "درخواست توضیح مشخص می‌تواند کمک کند بفهمید آیا انتظاراتتان با هم سازگار است."
                    }
                ]
            },

            {
                title: "مرحلهٔ چهارم: آینده و استقلال",
                message: {
                    honest: "بیایید دربارهٔ کار، تحصیل، استقلال فردی و برنامه‌های آینده صحبت کنیم.",
                    shy: "هنوز بعضی برنامه‌های آینده‌ام مشخص نیست، اما می‌توانیم درباره‌شان گفت‌وگو کنیم.",
                    controlling: "بعد از ازدواج یا جدی‌شدن رابطه، دیگر نیازی نیست به درس یا کار خودت ادامه بدهی.",
                    vague: "فقط به آیندهٔ قشنگ فکر کن؛ نیازی به برنامه‌ریزی نیست."
                },
                replies: [
                    {
                        text: "می‌خواهم دربارهٔ هدف‌های فردی و مشترکمان صحبت کنیم.",
                        score: 5,
                        path: "healthy",
                        analysis: "یک رابطهٔ سالم می‌تواند هم به هدف‌های مشترک و هم به رشد فردی احترام بگذارد."
                    },
                    {
                        text: "برای حفظ رابطه از تمام هدف‌های شخصی‌ام می‌گذرم.",
                        score: -5,
                        path: "unsafe",
                        analysis: "رابطه نباید به معنی کنارگذاشتن اجباری تحصیل، کار یا هویت فردی باشد."
                    },
                    {
                        text: "اگر هنوز برنامه‌ای نداریم، می‌توانیم قدم‌به‌قدم فکر کنیم.",
                        score: 5,
                        path: "patient",
                        analysis: "همهٔ برنامه‌ها از ابتدا مشخص نیستند؛ صداقت و تلاش مشترک اهمیت دارند."
                    }
                ]
            },

            {
                title: "مرحلهٔ پنجم: تصمیم نهایی",
                message: {
                    honest: "دوست دارم تصمیم نهایی بر اساس شناخت، احترام و رضایت دوطرفه باشد.",
                    shy: "می‌خواهم بدون عجله تصمیم بگیریم. برای تو چه چیزهایی مهم است؟",
                    controlling: "اگر تمام خواسته‌هایم را قبول نکنی، ثابت می‌شود که مرا دوست نداری.",
                    vague: "چرا دربارهٔ آینده سؤال می‌کنی؟ فعلاً از لحظه لذت ببر!"
                },
                replies: [
                    {
                        text: "با توجه به شناخت و رفتار واقعی تصمیم می‌گیرم.",
                        score: 5,
                        path: "healthy",
                        analysis: "به ثبات رفتار، احترام، صداقت و سازگاری هدف‌ها در طول زمان توجه کن."
                    },
                    {
                        text: "حتی اگر احساس امنیت نکنم، رابطه را ادامه می‌دهم.",
                        score: -5,
                        path: "unsafe",
                        analysis: "احساس ناامنی یا بی‌احترامی را نادیده نگیر؛ از فرد مورد اعتماد کمک بگیر."
                    },
                    {
                        text: "اگر موضوع مهمی نامشخص است، هنوز تصمیم نهایی نمی‌گیرم.",
                        score: 5,
                        path: "patient",
                        analysis: "حق داری برای تصمیم مهم زمان بخواهی و بدون فشار انتخاب کنی."
                    }
                ]
            }
        ]
    },

    en: {
        afghanistan: [
            {
                title: "Stage 1: Getting to know each other",
                message: {
                    honest: "Hi! I'd like us to get to know each other with respect and honesty.",
                    shy: "Hi! I'm a little shy. I hope we can get to know each other gradually.",
                    controlling: "If you want to be with me, you must always reply immediately.",
                    vague: "I really like you! I'm sure we'll have a beautiful future together."
                },
                replies: [
                    {
                        text: "I'd be happy to get to know you. Let's proceed calmly and respectfully.",
                        score: 5, path: "healthy",
                        analysis: "Taking time to get to know someone helps build a more realistic understanding."
                    },
                    {
                        text: "If you love me, promise to marry me right now!",
                        score: -3, path: "pressure",
                        analysis: "An immediate promise alone doesn't prove commitment."
                    },
                    {
                        text: "I'd like to understand what you're looking for in this connection.",
                        score: 5, path: "clarity",
                        analysis: "Asking about intentions can clarify expectations."
                    }
                ]
            },
            {
                title: "Stage 2: Marriage intentions",
                message: {
                    honest: "If marriage is our goal, we should discuss our expectations clearly.",
                    shy: "Marriage is important to me. I'd prefer to get to know each other better first.",
                    controlling: "If you really want me, you must prove that you'll only listen to me.",
                    vague: "I don't want to discuss marriage or timing right now. Let's see what happens."
                },
                replies: [
                    {
                        text: "Let's honestly discuss our marriage goals and possible timing.",
                        score: 5, path: "healthy",
                        analysis: "Clear discussion helps. Pay attention to the actual response and behavior too."
                    },
                    {
                        text: "It doesn't matter what you say; I'll believe every promise.",
                        score: -5, path: "blind",
                        analysis: "Trust is best built gradually through consistency between words and actions."
                    },
                    {
                        text: "If you're unsure, we can take more time to understand each other.",
                        score: 5, path: "patient",
                        analysis: "Honest uncertainty isn't the same as deception."
                    }
                ]
            },
            {
                title: "Stage 3: Families and engagement",
                message: {
                    honest: "If we're both ready, we can discuss introducing our families.",
                    shy: "Introducing our families matters to me, but I'd like us both to be ready.",
                    controlling: "I should decide who you can talk to.",
                    vague: "Don't rush about family. One day everything will work out."
                },
                replies: [
                    {
                        text: "If we're both ready, let's agree on a suitable time to introduce our families.",
                        score: 5, path: "healthy",
                        analysis: "Mutual agreement is healthier than pressure. Both people's circumstances matter."
                    },
                    {
                        text: "If you don't introduce your family today, you must be deceptive!",
                        score: -3, path: "pressure",
                        analysis: "Delay alone doesn't prove bad intentions. Context and later behavior matter."
                    },
                    {
                        text: "Can you explain why you don't feel ready yet?",
                        score: 5, path: "clarity",
                        analysis: "Respectful questions can clarify the reason for delay."
                    }
                ]
            },
            {
                title: "Stage 4: Life responsibilities",
                message: {
                    honest: "Marriage isn't only about feelings; responsibility and planning matter too.",
                    shy: "I still need to think about some financial and work matters. I'd rather be honest.",
                    controlling: "After marriage, I should make all the decisions.",
                    vague: "I don't have a clear plan, but trust me, we'll have a great future."
                },
                replies: [
                    {
                        text: "Let's discuss work, studies, finances, and shared responsibilities.",
                        score: 5, path: "healthy",
                        analysis: "Realistic planning helps people make informed decisions about the future."
                    },
                    {
                        text: "After marriage, every problem will somehow solve itself.",
                        score: -3, path: "blind",
                        analysis: "Hope is useful, but discussing real challenges matters too."
                    },
                    {
                        text: "It's important to me that we make major decisions together.",
                        score: 5, path: "healthy",
                        analysis: "Shared decision-making and mutual respect support healthy relationships."
                    }
                ]
            },
            {
                title: "Stage 5: The final decision",
                message: {
                    honest: "I'd like our final decision to be based on understanding and mutual consent.",
                    shy: "I'd like us to decide without rushing. What do you think?",
                    controlling: "If you don't agree with me, maybe we're not right for each other!",
                    vague: "Why do you ask so much about the future? Can't we just enjoy ourselves?"
                },
                replies: [
                    {
                        text: "I'll decide based on understanding, respect, and real behavior.",
                        score: 5, path: "healthy",
                        analysis: "Look at behavior over time, not just words or momentary feelings."
                    },
                    {
                        text: "I'll accept anything because I'm afraid of being alone.",
                        score: -5, path: "unsafe",
                        analysis: "Fear of loneliness shouldn't make you give up safety, respect, or important needs."
                    },
                    {
                        text: "If important questions remain, we shouldn't rush.",
                        score: 5, path: "patient",
                        analysis: "Waiting until important issues are clearer can be responsible."
                    }
                ]
            }
        ],

        modern: [
            {
                title: "Stage 1: Online connection",
                message: {
                    honest: "Hi! I'm glad we met. I'd like to get to know each other with respect and honesty.",
                    shy: "Hi! I'm a little shy and may need time to get to know each other.",
                    controlling: "If you want to be with me, you must always reply immediately.",
                    vague: "From the first moment, I felt you were the special person in my life!"
                },
                replies: [
                    {
                        text: "Sounds good. Let's take our time and get to know each other.",
                        score: 5, path: "healthy",
                        analysis: "Online connections benefit from gradual understanding rather than rushed trust."
                    },
                    {
                        text: "You're kind in messages, so I'll believe everything you say.",
                        score: -5, path: "blind",
                        analysis: "Kind messages alone don't prove someone's identity, honesty, or intentions."
                    },
                    {
                        text: "I'd like to know what kind of relationship you're looking for.",
                        score: 5, path: "clarity",
                        analysis: "Clarifying intentions helps both people understand expectations."
                    }
                ]
            },
            {
                title: "Stage 2: Trust and personal boundaries",
                message: {
                    honest: "Trust matters, but both people deserve privacy and personal boundaries.",
                    shy: "Sometimes I need time to reply. I hope you can understand that.",
                    controlling: "If you really love me, give me your account passwords.",
                    vague: "If you trust me, you shouldn't need to ask questions about what I say."
                },
                replies: [
                    {
                        text: "Trust matters, but both people's privacy must be respected.",
                        score: 5, path: "healthy",
                        analysis: "Healthy trust isn't built by forcing someone to share passwords or accept control."
                    },
                    {
                        text: "I'll give you all my passwords to prove my love.",
                        score: -5, path: "unsafe",
                        analysis: "You don't have to share passwords or private information to prove affection."
                    },
                    {
                        text: "Let's discuss our boundaries and expectations clearly.",
                        score: 5, path: "clarity",
                        analysis: "Clear communication about privacy and contact can reduce misunderstandings."
                    }
                ]
            },
            {
                title: "Stage 3: Words and actions",
                message: {
                    honest: "If we agree to do something, we should respect our agreement.",
                    shy: "I may not have every answer immediately, but I can talk about it honestly.",
                    controlling: "It's fine if I reply late, but you must always be available.",
                    vague: "We have a great future plan coming soon, but I don't have a date yet."
                },
                replies: [
                    {
                        text: "I'll consider promises, but I'll also observe actions over time.",
                        score: 5, path: "healthy",
                        analysis: "Consistent behavior over time tells you more than grand promises."
                    },
                    {
                        text: "I'll accept every promise without asking questions.",
                        score: -5, path: "blind",
                        analysis: "Trust doesn't mean ignoring contradictions. You can ask respectful questions."
                    },
                    {
                        text: "Can you explain when you might be ready to take that step?",
                        score: 5, path: "clarity",
                        analysis: "A specific question can clarify whether your expectations are compatible."
                    }
                ]
            },
            {
                title: "Stage 4: Future and independence",
                message: {
                    honest: "Let's discuss work, education, personal independence, and future plans.",
                    shy: "Some of my future plans aren't settled yet, but we can talk about them.",
                    controlling: "Once our relationship is serious, you won't need to continue studying or working.",
                    vague: "Just think about our beautiful future. We don't need a plan."
                },
                replies: [
                    {
                        text: "I'd like to discuss both our individual and shared goals.",
                        score: 5, path: "healthy",
                        analysis: "A healthy relationship can respect shared goals and individual growth."
                    },
                    {
                        text: "I'll give up all my personal goals to keep this relationship.",
                        score: -5, path: "unsafe",
                        analysis: "A relationship shouldn't require you to give up education, work, or identity under pressure."
                    },
                    {
                        text: "If we don't have a plan yet, we can think through it step by step.",
                        score: 5, path: "patient",
                        analysis: "Not every plan is settled at the beginning. Honesty and shared effort matter."
                    }
                ]
            },
            {
                title: "Stage 5: The final decision",
                message: {
                    honest: "I'd like our decision to be based on understanding, respect, and mutual consent.",
                    shy: "I'd like us to decide without rushing. What matters most to you?",
                    controlling: "If you don't accept everything I want, you don't love me.",
                    vague: "Why ask about the future? Just enjoy the moment!"
                },
                replies: [
                    {
                        text: "I'll decide based on understanding and real behavior.",
                        score: 5, path: "healthy",
                        analysis: "Consider consistency, respect, honesty, and compatible goals over time."
                    },
                    {
                        text: "I'll continue even if I don't feel safe.",
                        score: -5, path: "unsafe",
                        analysis: "Don't ignore feeling unsafe or disrespected. Consider seeking support from someone you trust."
                    },
                    {
                        text: "If something important remains unclear, I'll wait before deciding.",
                        score: 5, path: "patient",
                        analysis: "You have the right to take time and make important decisions without pressure."
                    }
                ]
            }
        ]
    }
};

// ===============================
// تغییر زبان
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
            ? "⚠️ این بازی آموزشی است؛ یک رفتار به‌تنهایی نیت واقعی کسی را ثابت نمی‌کند."
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
// تغییر ظاهر
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
// نمایش پیام
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
    choiceHistory = [];
    storyPath = "balanced";

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
                : "آشنایی مدرن، مرزهای شخصی و آینده")
            : (storySetting === "afghanistan"
                ? "Getting to know each other, family, and marriage"
                : "Modern connection, boundaries, and the future");

    updateTheme();
    renderCurrentStep();
}

// ===============================
// نمایش مرحلهٔ جاری
// ===============================

function renderCurrentStep() {
    const story = stories[language][storySetting];
    const scenario = story[currentStep];

    if (!scenario) {
        finishStory();
        return;
    }

    $("step-counter").textContent =
        language === "fa"
            ? `${currentStep + 1} از ${story.length}`
            : `${currentStep + 1} of ${story.length}`;

    $("chapter-label").textContent = scenario.title;
    $("chat-messages").replaceChildren();
    $("reply-options").replaceChildren();

    const character = characters[characterType];
    const partnerMessage = scenario.message[characterType];

    addMessage(
        partnerMessage,
        "other",
        character.name[language]
    );

    $("analysis-text").textContent =
        language === "fa"
            ? "پاسخت را انتخاب کن تا پیامد آموزشی آن را ببینی."
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
// انتخاب پاسخ و ثبت مسیر
// ===============================

function chooseReply(reply) {
    if (storyFinished) return;

    lastReply = reply;

    addMessage(
        reply.text,
        "mine",
        playerName || (language === "fa" ? "تو" : "You")
    );

    trustScore = Math.max(0, Math.min(100, trustScore + reply.score));

    choiceHistory.push({
        step: currentStep,
        score: reply.score,
        path: reply.path
    });

    if (reply.path === "unsafe" || reply.path === "blind") {
        storyPath = "caution";
    } else if (
        reply.path === "healthy" ||
        reply.path === "clarity" ||
        reply.path === "patient"
    ) {
        if (storyPath !== "caution") {
            storyPath = "healthy";
        }
    } else if (reply.path === "pressure") {
        if (storyPath === "balanced") {
            storyPath = "pressure";
        }
    }

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
            ? "پیامت ثبت شد؛ اما در این نسخه پیام دلخواه هنوز با هوش مصنوعی تحلیل نمی‌شود."
            : "Your message was added, but free-text messages are not analyzed by AI in this version.";

    $("reply-options").replaceChildren();

    const nextButton = document.createElement("button");
    nextButton.className = "start-button";
    nextButton.textContent =
        language === "fa" ? "ادامهٔ داستان ←" : "Continue story →";

    nextButton.addEventListener("click", goToNextStep);
    $("reply-options").appendChild(nextButton);
}

// ===============================
// مرحلهٔ بعد
// ===============================

function goToNextStep() {
    if (storyFinished) return;

    currentStep++;

    const story = stories[language][storySetting];

    if (currentStep >= story.length) {
        finishStory();
    } else {
        renderCurrentStep();
    }
}

// ===============================
// امتیاز
// ===============================

function updateTrustDisplay() {
    $("trust-score").textContent =
        language === "fa"
            ? `${trustScore} از ۱۰۰`
            : `${trustScore} / 100`;

    $("trust-bar").style.width = `${trustScore}%`;
}

// ===============================
// پایان بر اساس شخصیت و انتخاب‌ها
// ===============================

function finishStory() {
    storyFinished = true;

    $("chat-screen").hidden = true;
    $("ending-screen").hidden = false;

    let title = "";
    let description = "";
    let icon = "💭";

    const unsafeChoices = choiceHistory.filter(
        choice => choice.path === "unsafe" || choice.path === "blind"
    ).length;

    const healthyChoices = choiceHistory.filter(
        choice => choice.path === "healthy" ||
                  choice.path === "clarity" ||
                  choice.path === "patient"
    ).length;

    if (characterType === "controlling") {
        icon = "🛡️";

        title = language === "fa"
            ? "پایان: مرزهای سالم مهم‌اند"
            : "Ending: Healthy boundaries matter";

        description = language === "fa"
            ? "شخصیت مقابل رفتارهای کنترل‌گرانه نشان داد. کنترل‌کردن ارتباطات، رمزها یا تصمیم‌های تو نشانهٔ نگران‌کننده است. در زندگی واقعی، امنیت، احترام و آزادی تصمیم‌گیری خود را جدی بگیر."
            : "The other character showed controlling behavior. Attempts to control your contacts, passwords, or decisions are concerning. Take your safety, respect, and autonomy seriously.";

    } else if (characterType === "vague") {
        icon = "🔎";

        title = language === "fa"
            ? "پایان: وعده‌ها را با عمل مقایسه کن"
            : "Ending: Compare promises with actions";

        description = language === "fa"
            ? "شخصیت مقابل دربارهٔ آینده حرف زد، اما برنامه‌های روشنی نداشت. این موضوع به‌تنهایی فریب را ثابت نمی‌کند. بهتر است انتظارات را روشن کنی و در طول زمان به هماهنگی حرف و عمل توجه کنی."
            : "The other character talked about the future without clear plans. This alone doesn't prove deception. Clarify expectations and look for consistency over time.";

    } else if (unsafeChoices >= 2) {
        icon = "⚠️";

        title = language === "fa"
            ? "پایان: به مرزها و نیازهای خود توجه کن"
            : "Ending: Respect your boundaries and needs";

        description = language === "fa"
            ? "چند انتخاب تو نشان داد که ممکن است برای حفظ رابطه از بعضی نیازهای مهم خود بگذری یا خیلی زود اعتماد کنی. می‌توانی مهربان باشی و در عین حال مرزهای خود را حفظ کنی."
            : "Several choices suggested you might give up important needs or trust too quickly. You can be kind while still protecting your boundaries.";

    } else if (healthyChoices >= 3 && trustScore >= 60) {
        icon = "🌱";

        title = language === "fa"
            ? "پایان: شناخت آگاهانه"
            : "Ending: Thoughtful understanding";

        description = language === "fa"
            ? "انتخاب‌هایت بیشتر بر احترام، گفت‌وگوی روشن و شناخت تدریجی تأکید داشتند. این رویکرد می‌تواند به تصمیم‌گیری آگاهانه کمک کند؛ اما شخصیت واقعی افراد را باید از رفتارشان در طول زمان شناخت."
            : "Your choices emphasized respect, clear communication, and gradual understanding. This approach can support informed decisions, but real intentions are best understood through behavior over time.";

    } else if (characterType === "shy") {
        icon = "🌸";

        title = language === "fa"
            ? "پایان: فرصت شناخت بیشتر"
            : "Ending: Give understanding more time";

        description = language === "fa"
            ? "محتاط‌بودن یا خجالتی‌بودن به‌تنهایی نشانهٔ فریب نیست. مهم است که هر دو نفر بتوانند دربارهٔ هدف‌ها و نگرانی‌های خود صادقانه صحبت کنند."
            : "Being shy or cautious doesn't automatically mean deception. What matters is whether both people can discuss their goals and concerns honestly.";

    } else {
        icon = "🌷";

        title = language === "fa"
            ? "پایان: تصمیم با شناخت و احترام"
            : "Ending: Decide with understanding and respect";

        description = language === "fa"
            ? "بهتر است تصمیم نهایی را بر اساس شناخت، رفتار واقعی، احترام متقابل و رضایت آزادانه بگیری. هیچ امتیازی در این بازی نمی‌تواند نیت واقعی کسی را با قطعیت مشخص کند."
            : "It's best to make decisions based on understanding, real behavior, mutual respect, and freely given consent. No score in this game can determine someone's real intentions with certainty.";
    }

    $("ending-icon").textContent = icon;
    $("ending-title").textContent = title;

    $("ending-description").textContent =
        `${description}\n\n${
            language === "fa"
                ? `امتیاز آموزشی انتخاب‌ها: ${trustScore} از ۱۰۰`
                : `Educational choice score: ${trustScore} out of 100`
        }\n\n${
            language === "fa"
                ? `انتخاب‌های سنجیده: ${healthyChoices} | انتخاب‌های نیازمند احتیاط: ${unsafeChoices}`
                : `Thoughtful choices: ${healthyChoices} | Choices needing caution: ${unsafeChoices}`
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
