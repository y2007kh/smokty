document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GENERAL SCREEN SYSTEM
    ===================================================== */

    const screens = document.querySelectorAll(".screen");

    let currentScreen = 0;


    function showScreen(index) {

        if (index < 0 || index >= screens.length) {
            return;
        }

        screens.forEach((screen) => {
            screen.classList.remove("active");
        });

        const nextScreen = screens[index];

        nextScreen.classList.add("active");

        // رجوع الشاشة لبدايتها كل مرة
        nextScreen.scrollTop = 0;

        currentScreen = index;
    }


    /* =====================================================
       START
    ===================================================== */

    const startBtn = document.getElementById("startBtn");

    if (startBtn) {

        startBtn.addEventListener("click", () => {
            showScreen(1);
        });

    }


    /* =====================================================
       GENERIC NEXT BUTTONS
    ===================================================== */

    const nextButtons = document.querySelectorAll(".next-btn");

    nextButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const nextIndex = currentScreen + 1;

            showScreen(nextIndex);

        });

    });


    /* =====================================================
       PUZZLE 1
       مين المختلف؟
    ===================================================== */

    const puzzleStars =
        document.querySelectorAll(".puzzle-star");

    const puzzleFeedback =
        document.getElementById("puzzleFeedback");

    const puzzleNext =
        document.getElementById("puzzleNext");


    puzzleStars.forEach((star) => {

        star.addEventListener("click", () => {

            // لو اللغز اتحل بالفعل
            if (
                puzzleNext &&
                puzzleNext.classList.contains("show")
            ) {
                return;
            }


            // الإجابة الصحيحة
            if (star.classList.contains("different")) {

                star.classList.remove("wrong");
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

            // إجابة غلط
            else {

                star.classList.remove("wrong");

                // force reflow لإعادة تشغيل animation
                void star.offsetWidth;

                star.classList.add("wrong");

                setTimeout(() => {

                    star.classList.remove("wrong");

                }, 450);

            }

        });

    });


    /* =====================================================
       PUZZLE 2
       الحاجات المخفية
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

            // منع الضغط مرتين
            if (item.classList.contains("found")) {
                return;
            }


            item.classList.add("found");

            foundItems++;


            // إظهار الحرف
            if (codeLetters[index]) {

                codeLetters[index].textContent =
                    item.dataset.letter;

                codeLetters[index].classList.add("revealed");

            }


            // اكتشاف الثلاثة
            if (foundItems === hiddenItems.length) {

                if (hiddenArea) {
                    hiddenArea.classList.add("completed");
                }

                if (codeFeedback) {

                    codeFeedback.textContent =
                        "كده الكلمة اكتملت... ✨";

                    codeFeedback.classList.add("show");

                }

                if (codeNext) {
                    codeNext.classList.add("show");
                }

            }

        });

    });


    /* =====================================================
       PUZZLE 3
       ترتيب الرموز
    ===================================================== */

    const symbols =
        document.querySelectorAll(".symbol");

    const symbolSlots =
        document.querySelectorAll(".symbol-slot");

    const symbolFeedback =
        document.getElementById("symbolFeedback");

    const symbolNext =
        document.getElementById("symbolNext");

    const symbolPuzzle =
        document.getElementById("symbolPuzzle");


    const correctOrder = [
        "moon",
        "star",
        "heart",
        "sparkle"
    ];


    let currentSymbolIndex = 0;


    symbols.forEach((symbol) => {

        symbol.addEventListener("click", () => {

            // اللغز خلص
            if (
                currentSymbolIndex >=
                correctOrder.length
            ) {
                return;
            }


            const selectedSymbol =
                symbol.dataset.symbol;


            // الاختيار الصحيح
            if (
                selectedSymbol ===
                correctOrder[currentSymbolIndex]
            ) {

                if (symbolSlots[currentSymbolIndex]) {

                    symbolSlots[currentSymbolIndex]
                        .textContent =
                        symbol.textContent;

                    symbolSlots[currentSymbolIndex]
                        .classList.add("filled");

                }


                symbol.classList.add("used");

                currentSymbolIndex++;


                // خلصنا اللغز
                if (
                    currentSymbolIndex ===
                    correctOrder.length
                ) {

                    if (symbolPuzzle) {
                        symbolPuzzle.classList.add("completed");
                    }

                    if (symbolFeedback) {

                        symbolFeedback.textContent =
                            "أهو كده 👀✨ الترتيب صح!";

                        symbolFeedback.classList.add("show");

                    }

                    if (symbolNext) {
                        symbolNext.classList.add("show");
                    }

                }

            }

            // اختيار غلط
            else {

                if (symbolFeedback) {

                    symbolFeedback.textContent =
                        "لأ... جربي تاني 👀";

                    symbolFeedback.classList.add("show");

                }


                symbol.classList.remove("wrong-symbol");

                // force reflow
                void symbol.offsetWidth;

                symbol.classList.add("wrong-symbol");


                setTimeout(() => {

                    symbol.classList.remove(
                        "wrong-symbol"
                    );

                }, 450);

            }

        });

    });


    /* =====================================================
       PUZZLE 4
       SECRET LOCK
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


    /* -----------------------------------------------------
       تحديث شاشة القفل
    ----------------------------------------------------- */

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

            if (!digit) {
                return;
            }

            if (enteredCode[index]) {
                digit.classList.add("filled");
            } else {
                digit.classList.remove("filled");
            }

        });


        // لما يدخل 3 أرقام
        if (enteredCode.length === 3) {
            checkLock();
        }

    }


    /* -----------------------------------------------------
       فحص الكود
    ----------------------------------------------------- */

    function checkLock() {

        if (lockSolved) {
            return;
        }


        // الكود صحيح
        if (enteredCode === correctCode) {

            lockSolved = true;


            if (lockFeedback) {

                lockFeedback.textContent =
                    "اتفتح! 🔓✨";

                lockFeedback.classList.add("show");

            }


            if (lockBox) {

                lockBox.classList.remove("wrong");

                void lockBox.offsetWidth;

                lockBox.classList.add("unlocked");

            }


            if (lockNext) {
                lockNext.classList.add("show");
            }


            // منع الضغط على الأرقام
            lockNumbers.forEach((number) => {

                number.disabled = true;

            });


            if (lockClear) {
                lockClear.disabled = true;
            }

        }

        // الكود غلط
        else {

            if (lockFeedback) {

                lockFeedback.textContent =
                    "الاجابه ديما بتبقا قدام عينينا واحنا مش عارفين";

                lockFeedback.classList.add("show");

            }


            if (lockBox) {

                lockBox.classList.remove("wrong");

                void lockBox.offsetWidth;

                lockBox.classList.add("wrong");

            }


            setTimeout(() => {

                if (lockBox) {
                    lockBox.classList.remove("wrong");
                }

                enteredCode = "";

                if (lockFeedback) {
                    lockFeedback.classList.remove("show");
                }

                updateLockDisplay();

            }, 750);

        }

    }


    /* -----------------------------------------------------
       أرقام القفل
    ----------------------------------------------------- */

    lockNumbers.forEach((number) => {

        number.addEventListener("click", () => {

            if (lockSolved) {
                return;
            }

            // أقصى حاجة 3 أرقام
            if (enteredCode.length >= 3) {
                return;
            }


            enteredCode += number.dataset.number;

            updateLockDisplay();

        });

    });


    /* -----------------------------------------------------
       زر المسح
    ----------------------------------------------------- */

    if (lockClear) {

        lockClear.addEventListener("click", () => {

            if (lockSolved) {
                return;
            }

            enteredCode = "";

            if (lockFeedback) {
                lockFeedback.classList.remove("show");
            }

            updateLockDisplay();

        });

    }


    /* =====================================================
       PUZZLE 5
       THE DOORS
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

            // لو خلص اللغز
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


            /* ------------------------------------------------
               الباب الصح 🌹
            ------------------------------------------------ */

            if (selectedDoor === "rose") {

                door.classList.remove("wrong");

                void door.offsetWidth;

                door.classList.add("correct");


                if (doorsContainer) {
                    doorsContainer.classList.add("completed");
                }


                if (doorFeedback) {

                    doorFeedback.textContent =
`كُلُّ إتجاه إلى عَينكِ يأخُذني
مِن أينَ أعبرُ يا كُلُّ اتجاهاتي؟`;

                    doorFeedback.classList.add("show");

                }


                if (doorNext) {
                    doorNext.classList.add("show");
                }

            }


            /* ------------------------------------------------
               الباب الغلط
            ------------------------------------------------ */

            else {

                door.classList.remove("wrong");

                void door.offsetWidth;

                door.classList.add("wrong");


                if (doorFeedback) {

                    doorFeedback.textContent =
`لا تَسْأَليني هَلْ أُحِبُّهُما ؟
عَيْناكِ إنّي مِنهُما لَهُما`;

                    doorFeedback.classList.add("show");

                }


                setTimeout(() => {

                    door.classList.remove("wrong");

                }, 500);

            }

        });

    });


    /* =====================================================
       PERSONAL SECTION
    ===================================================== */

    const personalNext =
        document.getElementById("personalNext");


    if (personalNext) {

        personalNext.addEventListener("click", () => {

            showScreen(currentScreen + 1);

        });

    }


    /* =====================================================
       LOVE JOURNEY
    ===================================================== */

    const loveNext =
        document.getElementById("loveNext");

    const journeyNext =
        document.getElementById("journeyNext");

    const comfortNext =
        document.getElementById("comfortNext");

    const memoryNext =
        document.getElementById("memoryNext");

    const confessionNext =
        document.getElementById("confessionNext");

    const responseNext =
        document.getElementById("responseNext");

    const lastNext =
        document.getElementById("lastNext");


    /* -----------------------------------------------------
       Personal Part 2
    ----------------------------------------------------- */

    if (loveNext) {

        loveNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });

    }


    /* -----------------------------------------------------
       Her Journey
    ----------------------------------------------------- */

    if (journeyNext) {

        journeyNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });

    }


    /* -----------------------------------------------------
       Comfort
    ----------------------------------------------------- */

    if (comfortNext) {

        comfortNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });

    }


    /* -----------------------------------------------------
       Memory
    ----------------------------------------------------- */

    if (memoryNext) {

        memoryNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });

    }


    /* -----------------------------------------------------
       Confession Intro
    ----------------------------------------------------- */

    if (confessionNext) {

        confessionNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });

    }


    /* -----------------------------------------------------
       Main Confession
    ----------------------------------------------------- */

    if (responseNext) {

        responseNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });

    }


    /* -----------------------------------------------------
       Response
    ----------------------------------------------------- */

    if (lastNext) {

        lastNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    showScreen(0);

});