document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       🎵 أسماء ملفات الأغاني
       =====================================================

       حط ملفات الأغاني جنب:
       index.html
       style.css
       script.js

       وبعدها غيّر الأسماء هنا فقط.
    ===================================================== */

    const MUSIC = {

        confession: "A.m4a",

        memory: "B.m4a",

        afterDoor: "C.m4a"

    };


    /* =====================================================
       العناصر الأساسية
    ===================================================== */

    const screens = document.querySelectorAll(".screen");

    const startBtn =
        document.getElementById("startBtn");

    const lovePage =
        document.getElementById("love-page");

    const confessionAudio =
        document.getElementById("confessionAudio");

    const memoryAudio =
        document.getElementById("memoryAudio");

    const afterDoorAudio =
        document.getElementById("afterDoorAudio");

    let currentScreen = 0;

    let confessionPlayed = false;
    let memoryPlayed = false;
    let afterDoorPlayed = false;


    /* =====================================================
       تحميل الأغاني
    ===================================================== */

    confessionAudio.src = MUSIC.confession;
    memoryAudio.src = MUSIC.memory;
    afterDoorAudio.src = MUSIC.afterDoor;


    /* =====================================================
       أدوات الصوت
    ===================================================== */

    function stopAllMusic() {

        [
            confessionAudio,
            memoryAudio,
            afterDoorAudio
        ].forEach((audio) => {

            audio.pause();

            audio.currentTime = 0;

        });

    }


    function playMusic(audio) {

        if (!audio) {
            return;
        }

        audio.volume = 0.75;

        const promise = audio.play();

        if (promise !== undefined) {

            promise.catch(() => {
                /*
                    المتصفح ممكن يمنع التشغيل
                    لو مفيش User Gesture.
                    في حالتنا الأغنية الأولى والثالثة
                    بيتشغلوا من ضغطات المستخدم.
                */
            });

        }

    }


    /* =====================================================
       إظهار شاشة معينة
    ===================================================== */

    function showScreen(index) {

        if (
            index < 0 ||
            index >= screens.length
        ) {
            return;
        }

        screens.forEach((screen) => {

            screen.classList.remove("active");

        });

        const nextScreen =
            screens[index];

        nextScreen.classList.add("active");

        nextScreen.scrollTop = 0;

        currentScreen = index;

    }


    /* =====================================================
       البداية
    ===================================================== */

    if (startBtn) {

        startBtn.addEventListener("click", () => {

            showScreen(1);

        });

    }


    /* =====================================================
       Puzzle 1
    ===================================================== */

    const puzzleStars =
        document.querySelectorAll(".puzzle-star");

    const puzzleFeedback =
        document.getElementById("puzzleFeedback");

    const puzzleNext =
        document.getElementById("puzzleNext");


    puzzleStars.forEach((star) => {

        star.addEventListener("click", () => {

            if (
                puzzleNext.classList.contains("show")
            ) {
                return;
            }

            if (
                star.classList.contains("different")
            ) {

                star.classList.add("correct");

                puzzleFeedback.textContent =
                    "لقيتيها! 👀✨";

                puzzleFeedback.classList.add("show");

                puzzleNext.classList.add("show");

            }

            else {

                star.classList.add("wrong");

                setTimeout(() => {

                    star.classList.remove("wrong");

                }, 400);

            }

        });

    });


    /* =====================================================
       Puzzle 2
    ===================================================== */

    const hiddenItems =
        document.querySelectorAll(".hidden-item");

    const codeLetters =
        document.querySelectorAll(".code-letter");

    const codeFeedback =
        document.getElementById("codeFeedback");

    const codeNext =
        document.getElementById("codeNext");

    const hiddenArea =
        document.querySelector(".hidden-items");

    let foundItems = 0;


    hiddenItems.forEach((item, index) => {

        item.addEventListener("click", () => {

            if (
                item.classList.contains("found")
            ) {
                return;
            }

            item.classList.add("found");

            foundItems++;

            codeLetters[index].textContent =
                item.dataset.letter;

            codeLetters[index].classList.add("revealed");


            if (
                foundItems ===
                hiddenItems.length
            ) {

                hiddenArea.classList.add("completed");

                codeFeedback.textContent =
                    "كده الكلمة اكتملت... ✨";

                codeFeedback.classList.add("show");

                codeNext.classList.add("show");

            }

        });

    });

// =================================
// Level 3 — الوردة 🌹
// =================================

const interactiveRose = document.getElementById("interactiveRose");
const roseHint = document.getElementById("roseHint");
const roseMessage = document.getElementById("roseMessage");
const roseNext = document.getElementById("roseNext");
const roseSound = document.getElementById("roseSound");

let roseOpened = false;

interactiveRose.addEventListener("click", () => {

    if (roseOpened) return;

    roseOpened = true;

    // تشغيل الصوت
    if (roseSound) {
        roseSound.currentTime = 0;
        roseSound.play().catch(() => {});
    }

    // حركة الوردة
    interactiveRose.classList.add("bloom");

    // إخفاء التلميح
    roseHint.classList.add("hide");

    // إظهار الرسالة
    setTimeout(() => {
        roseMessage.classList.add("show");
    }, 600);

    // إظهار زر كملي
    setTimeout(() => {
        roseNext.classList.add("show");
    }, 1800);
});


// الانتقال للمرحلة الرابعة
roseNext.addEventListener("click", () => {
    showScreen(3);
});


    /* =====================================================
       Puzzle 4
    ===================================================== */

    const lockNumbers =
        document.querySelectorAll(".lock-number");

    const lockDigit1 =
        document.getElementById("lockDigit1");

    const lockDigit2 =
        document.getElementById("lockDigit2");

    const lockDigit3 =
        document.getElementById("lockDigit3");

    const lockClear =
        document.getElementById("lockClear");

    const lockFeedback =
        document.getElementById("lockFeedback");

    const lockNext =
        document.getElementById("lockNext");

    const lockBox =
        document.querySelector(".lock-box");


    let enteredCode = "";

    const correctCode = "487";

    let lockSolved = false;


    lockNumbers.forEach((number) => {

        number.addEventListener("click", () => {

            if (lockSolved) {
                return;
            }

            if (enteredCode.length >= 3) {
                return;
            }

            enteredCode +=
                number.dataset.number;

            updateLockDisplay();

        });

    });


    function updateLockDisplay() {

        lockDigit1.textContent =
            enteredCode[0] || "_";

        lockDigit2.textContent =
            enteredCode[1] || "_";

        lockDigit3.textContent =
            enteredCode[2] || "_";


        const digits = [
            lockDigit1,
            lockDigit2,
            lockDigit3
        ];


        digits.forEach((digit, index) => {

            if (enteredCode[index]) {

                digit.classList.add("filled");

            }

            else {

                digit.classList.remove("filled");

            }

        });


        if (
            enteredCode.length === 3
        ) {

            checkLock();

        }

    }


    function checkLock() {

        if (
            enteredCode === correctCode
        ) {

            lockSolved = true;

            lockFeedback.textContent =
                "اتفتح! 🔓✨";

            lockFeedback.classList.add(
                "show"
            );

            lockBox.classList.add(
                "unlocked"
            );

            lockNext.classList.add(
                "show"
            );


            lockNumbers.forEach((number) => {

                number.disabled = true;

            });

        }

        else {

            lockFeedback.textContent =
                "الاجابه ديما بتبقا قدام عينينا واحنا مش عارفين";

            lockFeedback.classList.add(
                "show"
            );

            lockBox.classList.add(
                "wrong"
            );


            setTimeout(() => {

                lockBox.classList.remove(
                    "wrong"
                );

                enteredCode = "";

                updateLockDisplay();

            }, 700);

        }

    }


    if (lockClear) {

        lockClear.addEventListener(
            "click",
            () => {

                if (lockSolved) {
                    return;
                }

                enteredCode = "";

                lockFeedback.classList.remove(
                    "show"
                );

                updateLockDisplay();

            }
        );

    }


    /* =====================================================
       الانتقال من Puzzle 1 → 2
       Puzzle 2 → 3
       Puzzle 3 → 4
       Puzzle 4 → الأبواب
    ===================================================== */

    puzzleNext.addEventListener("click", () => {

        showScreen(currentScreen + 1);

    });


    codeNext.addEventListener("click", () => {

        showScreen(currentScreen + 1);

    });


    symbolNext.addEventListener("click", () => {

        showScreen(currentScreen + 1);

    });


    lockNext.addEventListener("click", () => {

        showScreen(currentScreen + 1);

    });


    /* =====================================================
       Puzzle 5 - الأبواب
    ===================================================== */

    const doors =
        document.querySelectorAll(".door");

    const doorsContainer =
        document.querySelector(".doors");

    const doorFeedback =
        document.getElementById("doorFeedback");

    const doorNext =
        document.getElementById("doorNext");


    doors.forEach((door) => {

        door.addEventListener("click", () => {

            if (
                doorsContainer.classList.contains(
                    "completed"
                )
            ) {
                return;
            }


            const selectedDoor =
                door.dataset.door;


            /* =================================
               الباب الصح 🌹
            ================================= */

            if (
                selectedDoor === "rose"
            ) {

                door.classList.add(
                    "correct"
                );

                doorsContainer.classList.add(
                    "completed"
                );


                doorFeedback.textContent =
`كُلُّ إتجاه إلى عَينكِ يأخُذني
مِن أينَ أعبرُ يا كُلُّ اتجاهاتي؟`;

                doorFeedback.classList.add(
                    "show"
                );


                doorNext.classList.add(
                    "show"
                );

            }


            /* =================================
               الباب الغلط
            ================================= */

            else {

                door.classList.add(
                    "wrong"
                );


                doorFeedback.textContent =
`لا تَسْأَليني هَلْ أُحِبُّهُما ؟
عَيْناكِ إنّي مِنهُما لَهُما`;

                doorFeedback.classList.add(
                    "show"
                );


                setTimeout(() => {

                    door.classList.remove(
                        "wrong"
                    );

                }, 500);

            }

        });

    });


    /* =====================================================
       بعد الباب الصح
       نفتح الصفحة الطويلة
    ===================================================== */

    doorNext.addEventListener("click", () => {

        openLovePage();

    });


    function openLovePage() {

        showScreenWithoutTransition();

        lovePage.classList.add("visible");

        document.body.classList.add(
            "love-page-open"
        );


        /*
            الأغنية الثالثة تبدأ من نفس ضغطة
            فتح الباب، وده مهم جدًا للموبايل.
        */

        if (!afterDoorPlayed) {

            stopAllMusic();

            playMusic(afterDoorAudio);

            afterDoorPlayed = true;

        }


        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }


    /* =====================================================
       إخفاء نظام الشاشات
    ===================================================== */

    function showScreenWithoutTransition() {

        screens.forEach((screen) => {

            screen.classList.remove(
                "active"
            );

            screen.style.display = "none";

        });

    }


    /* =====================================================
       الأغنية الثانية
       زر صغير اختياري عشان المتصفح يسمح بالصوت
    ===================================================== */

    const memoryMusicBtn =
        document.getElementById(
            "memoryMusicBtn"
        );


    if (memoryMusicBtn) {

        memoryMusicBtn.addEventListener(
            "click",
            () => {

                if (
                    memoryAudio.paused
                ) {

                    stopAllMusic();

                    playMusic(
                        memoryAudio
                    );

                    memoryPlayed = true;

                    memoryMusicBtn.textContent =
                        "❚❚";

                }

                else {

                    memoryAudio.pause();

                    memoryMusicBtn.textContent =
                        "▶";

                }

            }
        );

    }


    /* =====================================================
       الأغنية الأولى
       مع زر "اسمعيني"
       
       ملاحظة:
       الزر لم يعد موجودًا في الصفحة.
       لذلك سنشغلها عند أول وصول فعلي
       للاعتراف باستخدام IntersectionObserver.
    ===================================================== */

    let confessionObserver = null;


    function setupConfessionMusic() {

        const confession =
            document.getElementById(
                "confession"
            );


        if (!confession) {
            return;
        }


        confessionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting &&
                            !confessionPlayed
                        ) {

                            stopAllMusic();

                            playMusic(
                                confessionAudio
                            );

                            confessionPlayed = true;

                        }

                    });

                },
                {
                    threshold: 0.45
                }
            );


        confessionObserver.observe(
            confession
        );

    }


    setupConfessionMusic();


    /* =====================================================
       ظهور عناصر الصفحة تدريجيًا أثناء النزول
    ===================================================== */

    const storyBlocks =
        document.querySelectorAll(
            ".story-block"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "in-view"
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    storyBlocks.forEach((block) => {

        revealObserver.observe(block);

    });


});