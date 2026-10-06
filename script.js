document.addEventListener("DOMContentLoaded", () => {
    const screens = document.querySelectorAll(".screen");
    const startBtn = document.getElementById("startBtn");
    const restartBtn = document.getElementById("restartBtn");
    let currentScreen = 0;
    /* =========================================
       إظهار شاشة معينة
    ========================================= */
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
    /* =========================================
       البداية
    ========================================= */
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            showScreen(1);
        });
    }
    /* =========================================
       أزرار الانتقال الخاصة بالمراحل
    ========================================= */
    const nextButtons = document.querySelectorAll(".next-btn");
    nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });
    });
    /* =========================================
       إعادة التجربة
    ========================================= */
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            showScreen(0);
        });
    }
    /* =========================================
       Puzzle 1 - مين المختلف؟
    ========================================= */
    const puzzleStars =
        document.querySelectorAll(".puzzle-star");
    const puzzleFeedback =
        document.getElementById("puzzleFeedback");
    const puzzleNext =
        document.getElementById("puzzleNext");
    puzzleStars.forEach((star) => {
        star.addEventListener("click", () => {
            /* لو اللغز اتحل بالفعل */
            if (puzzleNext.classList.contains("show")) {
                return;
            }
            /* الإجابة الصحيحة */
            if (star.classList.contains("different")) {
                star.classList.add("correct");
                puzzleFeedback.textContent =
                    "لقيتيها! 👀✨";
                puzzleFeedback.classList.add("show");
                puzzleNext.classList.add("show");
            }
            /* إجابة غلط */
            else {
                star.classList.add("wrong");
                setTimeout(() => {
                    star.classList.remove("wrong");
                }, 400);
            }
        });
    });
    /* =========================================
       Puzzle 2 - الحاجات المخفية
    ========================================= */
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
            /* منع الضغط مرتين */
            if (item.classList.contains("found")) {
                return;
            }
            /* تحديد العنصر كمكتشف */
            item.classList.add("found");
            foundItems++;
            /* إظهار الحرف */
            codeLetters[index].textContent =
                item.dataset.letter;
            codeLetters[index].classList.add("revealed");
            /* اكتشاف الثلاثة */
            if (foundItems === hiddenItems.length) {
                hiddenArea.classList.add("completed");
                codeFeedback.textContent =
                    "كده الكلمة اكتملت... ✨";
                codeFeedback.classList.add("show");
                codeNext.classList.add("show");
            }
        });
    });
    /* =========================================
       Puzzle 3 - ترتيب الرموز
    ========================================= */
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
            /* لو خلص اللغز */
            if (currentSymbolIndex >= correctOrder.length) {
                return;
            }
            const selectedSymbol =
                symbol.dataset.symbol;
            /* هل الرمز المختار هو المطلوب؟ */
            if (
                selectedSymbol ===
                correctOrder[currentSymbolIndex]
            ) {
                symbolSlots[currentSymbolIndex].textContent =
                    symbol.textContent;
                symbolSlots[currentSymbolIndex]
                    .classList.add("filled");
                /* إخفاء الرمز من الاختيارات */
                symbol.classList.add("used");
                currentSymbolIndex++;
                /* خلصنا اللغز */
                if (
                    currentSymbolIndex ===
                    correctOrder.length
                ) {
                    symbolPuzzle.classList.add("completed");
                    symbolFeedback.textContent =
                        "أهو كده 👀✨ الترتيب صح!";
                    symbolFeedback.classList.add("show");
                    symbolNext.classList.add("show");
                }
            }
            /* اختيار غلط */
            else {
                symbolFeedback.textContent =
                    "لأ... جربي تاني 👀";
                symbolFeedback.classList.add("show");
                symbol.classList.add("wrong-symbol");
                setTimeout(() => {
                    symbol.classList.remove(
                        "wrong-symbol"
                    );
                }, 400);
            }
        });
    });
    /* =========================================
       Puzzle 4 - Secret Lock
    ========================================= */
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
    /* الكود الصحيح */
    const correctCode = "487";
    /* الضغط على الأرقام */
    lockNumbers.forEach((number) => {
        number.addEventListener("click", () => {
            /* أقصى حاجة 3 أرقام */
            if (enteredCode.length >= 3) {
                return;
            }
            enteredCode += number.dataset.number;
            updateLockDisplay();
        });
    });
    /* تحديث شاشة القفل */
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
            } else {
                digit.classList.remove("filled");
            }
        });
        /* لما يدخل 3 أرقام */
        if (enteredCode.length === 3) {
            checkLock();
        }
    }
    /* فحص الكود */
    function checkLock() {
        if (enteredCode === correctCode) {
            lockFeedback.textContent =
                "اتفتح! 🔓✨";
            lockFeedback.classList.add("show");
            lockBox.classList.add("unlocked");
            lockNext.classList.add("show");
            /* منع الضغط على الأرقام */
            lockNumbers.forEach((number) => {
                number.disabled = true;
            });
        }
        else {
            lockFeedback.textContent =
                "الاجابه ديما بتبقا قدام عينينا واحنا مش عارفين";
            lockFeedback.classList.add("show");
            lockBox.classList.add("wrong");
            setTimeout(() => {
                lockBox.classList.remove("wrong");
                enteredCode = "";
                updateLockDisplay();
            }, 700);
        }
    }
    /* زر المسح */
    if (lockClear) {
        lockClear.addEventListener("click", () => {
            enteredCode = "";
            lockFeedback.classList.remove("show");
            updateLockDisplay();
        });
    }
    /* =========================================
       Puzzle 5 - The Doors
    ========================================= */
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
            /* لو خلص اللغز */
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
            if (selectedDoor === "rose") {
                door.classList.add("correct");
                doorsContainer.classList.add("completed");
                doorFeedback.textContent =
`كُلُّ إتجاه إلى عَينكِ يأخُذني
مِن أينَ أعبرُ يا كُلُّ اتجاهاتي؟`;
                doorFeedback.classList.add("show");
                doorNext.classList.add("show");
            }
            /* =================================
               الباب الغلط
            ================================= */
            else {
                door.classList.add("wrong");
                doorFeedback.textContent =
`لا تَسْأَليني هَلْ أُحِبُّهُما ؟
عَيْناكِ إنّي مِنهُما لَهُما`;
                doorFeedback.classList.add("show");
                setTimeout(() => {
                    door.classList.remove("wrong");
                }, 500);
            }
        });
    });
    /* =========================================
       PERSONAL MESSAGE
    ========================================= */
    const personalNext =
        document.getElementById("personalNext");
    if (personalNext) {
        personalNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });
    }
    /* =========================================
       FINAL LOVE JOURNEY
    ========================================= */
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
    /* Personal Part 2 */
    if (loveNext) {
        loveNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });
    }
    /* Her Journey */
    if (journeyNext) {
        journeyNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });
    }
    /* Comfort */
    if (comfortNext) {
        comfortNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });
    }
    /* Memory */
    if (memoryNext) {
        memoryNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });
    }
    /* Confession Intro */
    if (confessionNext) {
        confessionNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });
    }
    /* Main Confession */
    if (responseNext) {
        responseNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });
    }
    /* Response */
    if (lastNext) {
        lastNext.addEventListener("click", () => {
            showScreen(currentScreen + 1);
        });
    }
});