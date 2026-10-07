document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       🎵 أسماء ملفات الأغاني
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

    if (confessionAudio) {
        confessionAudio.src = MUSIC.confession;
    }

    if (memoryAudio) {
        memoryAudio.src = MUSIC.memory;
    }

    if (afterDoorAudio) {
        afterDoorAudio.src = MUSIC.afterDoor;
    }


    /* =====================================================
       أدوات الصوت
    ===================================================== */

    function stopAllMusic() {

        [
            confessionAudio,
            memoryAudio,
            afterDoorAudio
        ].forEach((audio) => {

            if (!audio) return;

            audio.pause();
            audio.currentTime = 0;

        });

    }


    function playMusic(audio) {

        if (!audio) return;

        audio.volume = 0.75;

        const promise = audio.play();

        if (promise !== undefined) {

            promise.catch(() => {
                // المتصفح ممكن يمنع الصوت
            });

        }

    }


    /* =====================================================
       إظهار شاشة
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

        const nextScreen = screens[index];

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
                puzzleNext &&
                puzzleNext.classList.contains("show")
            ) {
                return;
            }

            if (
                star.classList.contains("different")
            ) {

                star.classList.add("correct");

                if (puzzleFeedback) {

                    puzzleFeedback.textContent =
                        "لقيتيها! 👀✨";

                    puzzleFeedback.classList.add("show");

                }

                if (puzzleNext) {
                    puzzleNext.classList.add("show");
                }

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


            if (codeLetters[index]) {

                codeLetters[index].textContent =
                    item.dataset.letter;

                codeLetters[index].classList.add(
                    "revealed"
                );

            }


            if (
                foundItems === hiddenItems.length
            ) {

                if (hiddenArea) {

                    hiddenArea.classList.add(
                        "completed"
                    );

                }

                if (codeFeedback) {

                    codeFeedback.textContent =
                        "كده الكلمة اكتملت... ✨";

                    codeFeedback.classList.add(
                        "show"
                    );

                }

                if (codeNext) {

                    codeNext.classList.add(
                        "show"
                    );

                }

            }

        });

    });


    /* =====================================================
       Puzzle 3 — الوردة 🌹
    ===================================================== */

    const interactiveRose =
        document.getElementById(
            "interactiveRose"
        );

    const roseHint =
        document.getElementById(
            "roseHint"
        );

    const roseMessage =
        document.getElementById(
            "roseMessage"
        );

    const roseNext =
        document.getElementById(
            "roseNext"
        );

    const roseSound =
        document.getElementById(
            "roseSound"
        );


    let roseOpened = false;


    if (interactiveRose) {

        interactiveRose.addEventListener(
            "click",
            () => {

                if (roseOpened) {
                    return;
                }

                roseOpened = true;


                /* تشغيل الصوت */

                if (roseSound) {

                    roseSound.currentTime = 0;

                    const soundPromise =
                        roseSound.play();

                    if (
                        soundPromise !== undefined
                    ) {

                        soundPromise.catch(() => {});

                    }

                }


                /* حركة الوردة */

                interactiveRose.classList.add(
                    "bloom"
                );


                /* إخفاء التلميح */

                if (roseHint) {

                    roseHint.classList.add(
                        "hide"
                    );

                }


                /* إظهار الرسالة */

                setTimeout(() => {

                    if (roseMessage) {

                        roseMessage.classList.add(
                            "show"
                        );

                    }

                }, 600);


                /* إظهار زر كملي */

                setTimeout(() => {

                    if (roseNext) {

                        roseNext.classList.add(
                            "show"
                        );

                    }

                }, 1800);

            }
        );

    }


    /* =====================================================
       الانتقال من الوردة → المرحلة الرابعة
    ===================================================== */

    if (roseNext) {

        roseNext.addEventListener(
            "click",
            () => {

                showScreen(3);

            }
        );

    }


    /* =====================================================
       Puzzle 4 — القفل
    ===================================================== */

    const lockNumbers =
        document.querySelectorAll(
            ".lock-number"
        );

    const lockDigit1 =
        document.getElementById(
            "lockDigit1"
        );

    const lockDigit2 =
        document.getElementById(
            "lockDigit2"
        );

    const lockDigit3 =
        document.getElementById(
            "lockDigit3"
        );

    const lockClear =
        document.getElementById(
            "lockClear"
        );

    const lockFeedback =
        document.getElementById(
            "lockFeedback"
        );

    const lockNext =
        document.getElementById(
            "lockNext"
        );

    const lockBox =
        document.querySelector(
            ".lock-box"
        );


    let enteredCode = "";

    const correctCode = "487";

    let lockSolved = false;


    lockNumbers.forEach((number) => {

        number.addEventListener(
            "click",
            () => {

                if (lockSolved) {
                    return;
                }

                if (enteredCode.length >= 3) {
                    return;
                }

                enteredCode +=
                    number.dataset.number;

                updateLockDisplay();

            }
        );

    });


    function updateLockDisplay() {

        if (lockDigit1) {
            lockDigit1.textContent =
                enteredCode[0] || "_";
        }

        if (lockDigit2) {
            lockDigit2.textContent =
                enteredCode[1] || "_";
        }

        if (lockDigit3) {
            lockDigit3.textContent =
                enteredCode[2] || "_";
        }


        const digits = [
            lockDigit1,
            lockDigit2,
            lockDigit3
        ];


        digits.forEach((digit, index) => {

            if (!digit) return;

            if (enteredCode[index]) {

                digit.classList.add(
                    "filled"
                );

            }

            else {

                digit.classList.remove(
                    "filled"
                );

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


            if (lockFeedback) {

                lockFeedback.textContent =
                    "اتفتح! 🔓✨";

                lockFeedback.classList.add(
                    "show"
                );

            }


            if (lockBox) {

                lockBox.classList.add(
                    "unlocked"
                );

            }


            if (lockNext) {

                lockNext.classList.add(
                    "show"
                );

            }


            lockNumbers.forEach((number) => {

                number.disabled = true;

            });

        }

        else {

            if (lockFeedback) {

                lockFeedback.textContent =
                    "الإجابة دي دايمًا بتبقى قدام عينينا واحنا مش عارفين.";

                lockFeedback.classList.add(
                    "show"
                );

            }


            if (lockBox) {

                lockBox.classList.add(
                    "wrong"
                );

            }


            setTimeout(() => {

                if (lockBox) {

                    lockBox.classList.remove(
                        "wrong"
                    );

                }

                enteredCode = "";

                updateLockDisplay();

            }, 700);

        }

    }


    /* =====================================================
       زر مسح القفل
    ===================================================== */

    if (lockClear) {

        lockClear.addEventListener(
            "click",
            () => {

                if (lockSolved) {
                    return;
                }

                enteredCode = "";

                if (lockFeedback) {

                    lockFeedback.classList.remove(
                        "show"
                    );

                }

                updateLockDisplay();

            }
        );

    }


    /* =====================================================
       انتقال المرحلة 1 → 2
    ===================================================== */

    if (puzzleNext) {

        puzzleNext.addEventListener(
            "click",
            () => {

                showScreen(
                    currentScreen + 1
                );

            }
        );

    }


    /* =====================================================
       انتقال المرحلة 2 → 3
    ===================================================== */

    if (codeNext) {

        codeNext.addEventListener(
            "click",
            () => {

                showScreen(
                    currentScreen + 1
                );

            }
        );

    }


    /* =====================================================
       انتقال المرحلة 4 → 5
    ===================================================== */

    if (lockNext) {

        lockNext.addEventListener(
            "click",
            () => {

                showScreen(
                    currentScreen + 1
                );

            }
        );

    }


    /* =====================================================
       Puzzle 5 — الأبواب
    ===================================================== */

    const doors =
        document.querySelectorAll(".door");

    const doorsContainer =
        document.querySelector(".doors");

    const doorFeedback =
        document.getElementById(
            "doorFeedback"
        );

    const doorNext =
        document.getElementById(
            "doorNext"
        );


    doors.forEach((door) => {

        door.addEventListener(
            "click",
            () => {

                if (
                    doorsContainer &&
                    doorsContainer.classList.contains(
                        "completed"
                    )
                ) {

                    return;

                }


                const selectedDoor =
                    door.dataset.door;


                /* الباب الصح 🌹 */

                if (
                    selectedDoor === "rose"
                ) {

                    door.classList.add(
                        "correct"
                    );


                    if (doorsContainer) {

                        doorsContainer.classList.add(
                            "completed"
                        );

                    }


                    if (doorFeedback) {

                        doorFeedback.textContent =
`كُلُّ إتجاه إلى عَينكِ يأخُذني
مِن أينَ أعبرُ يا كُلُّ اتجاهاتي؟`;

                        doorFeedback.classList.add(
                            "show"
                        );

                    }


                    if (doorNext) {

                        doorNext.classList.add(
                            "show"
                        );

                    }

                }


                /* الباب الغلط */

                else {

                    door.classList.add(
                        "wrong"
                    );


                    if (doorFeedback) {

                        doorFeedback.textContent =
`لا تَسْأَليني هَلْ أُحِبُّهُما ؟
عَيْناكِ إنّي مِنهُما لَهُما`;

                        doorFeedback.classList.add(
                            "show"
                        );

                    }


                    setTimeout(() => {

                        door.classList.remove(
                            "wrong"
                        );

                    }, 500);

                }

            }
        );

    });


    /* =====================================================
       بعد الباب الصح
    ===================================================== */

    if (doorNext) {

        doorNext.addEventListener(
            "click",
            () => {

                openLovePage();

            }
        );

    }


    function openLovePage() {

        screens.forEach((screen) => {

            screen.classList.remove(
                "active"
            );

            screen.style.display = "none";

        });


        if (lovePage) {

            lovePage.classList.add(
                "visible"
            );

        }


        document.body.classList.add(
            "love-page-open"
        );


        /* الأغنية الثالثة */

        if (!afterDoorPlayed) {

            stopAllMusic();

            playMusic(
                afterDoorAudio
            );

            afterDoorPlayed = true;

        }


        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }


    /* =====================================================
       الأغنية الثانية
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
                    memoryAudio &&
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

                else if (memoryAudio) {

                    memoryAudio.pause();

                    memoryMusicBtn.textContent =
                        "▶";

                }

            }
        );

    }


    /* =====================================================
       الأغنية الأولى — الاعتراف
    ===================================================== */

    function setupConfessionMusic() {

        const confession =
            document.getElementById(
                "confession"
            );


        if (!confession) {
            return;
        }


        const confessionObserver =
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
       ظهور عناصر الصفحة تدريجيًا
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


    /* =====================================================
       البداية
    ===================================================== */

    showScreen(0);

});