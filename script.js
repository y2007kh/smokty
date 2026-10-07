document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       🎵 أسماء ملفات الأغاني
       ضع الملفات بجانب index.html
    ===================================================== */

    const MUSIC = {
        confession: "A.m4a",
        memory: "B.m4a",
        afterDoor: "C.m4a"
    };


    /* =====================================================
       🎯 عناصر الشاشات
    ===================================================== */

    const screens = document.querySelectorAll(".screen");
    const lovePage = document.getElementById("love-page");

    let currentScreen = 0;


    /* =====================================================
       🔘 الأزرار
    ===================================================== */

    const startBtn = document.getElementById("startBtn");

    const puzzleNext = document.getElementById("puzzleNext");
    const codeNext = document.getElementById("codeNext");
    const roseNext = document.getElementById("roseNext");
    const lockNext = document.getElementById("lockNext");
    const doorNext = document.getElementById("doorNext");


    /* =====================================================
       🎵 الصوت
    ===================================================== */

    const confessionAudio = document.getElementById("confessionAudio");
    const memoryAudio = document.getElementById("memoryAudio");
    const afterDoorAudio = document.getElementById("afterDoorAudio");
    const roseSound = document.getElementById("roseSound");

    if (confessionAudio) {
        confessionAudio.src = MUSIC.confession;
        confessionAudio.preload = "auto";
        confessionAudio.playsInline = true;
    }

    if (memoryAudio) {
        memoryAudio.src = MUSIC.memory;
        memoryAudio.preload = "auto";
        memoryAudio.playsInline = true;
    }

    if (afterDoorAudio) {
        afterDoorAudio.src = MUSIC.afterDoor;
        afterDoorAudio.preload = "auto";
        afterDoorAudio.playsInline = true;
    }


    /* =====================================================
       🎵 التحكم في الموسيقى
    ===================================================== */

    function stopAllMusic() {

        const audios = [
            confessionAudio,
            memoryAudio,
            afterDoorAudio,
            roseSound
        ];

        audios.forEach(audio => {

            if (!audio) return;

            audio.pause();

            try {
                audio.currentTime = 0;
            } catch (error) {}

        });
    }


    function playAudio(audio) {

        if (!audio) return;

        stopAllMusic();

        const promise = audio.play();

        if (promise !== undefined) {
            promise.catch(() => {
                console.log("Audio playback was blocked.");
            });
        }
    }


    /* =====================================================
       🍎 Safari / iPhone Audio Unlock
       
       أول ضغطة من المستخدم تسمح للمتصفح
       بتجهيز ملفات الصوت.
    ===================================================== */

    let audioUnlocked = false;

    function unlockAudio() {

        if (audioUnlocked) return;

        audioUnlocked = true;

        const audios = [
            confessionAudio,
            memoryAudio,
            afterDoorAudio,
            roseSound
        ];

        audios.forEach(audio => {

            if (!audio) return;

            const oldMuted = audio.muted;

            audio.muted = true;

            const promise = audio.play();

            if (promise !== undefined) {

                promise
                    .then(() => {

                        audio.pause();

                        try {
                            audio.currentTime = 0;
                        } catch (error) {}

                        audio.muted = oldMuted;

                    })
                    .catch(() => {

                        audio.muted = oldMuted;

                    });

            } else {

                audio.pause();

                try {
                    audio.currentTime = 0;
                } catch (error) {}

                audio.muted = oldMuted;
            }

        });
    }


    /* =====================================================
       🔄 الانتقال بين الشاشات
    ===================================================== */

    function showScreen(index) {

        if (!screens[index]) return;

        screens.forEach(screen => {
            screen.classList.remove("active");
        });

        screens[index].classList.add("active");

        currentScreen = index;

        try {
            screens[index].scrollTo({
                top: 0,
                behavior: "auto"
            });
        } catch (error) {}

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }


    /* =====================================================
       🚀 البداية
    ===================================================== */

    if (startBtn) {

        startBtn.addEventListener("click", () => {

            // مهم جداً لـ Safari / iPhone
            unlockAudio();

            showScreen(1);

        });

    }


    /* =====================================================
       ⭐ LEVEL 1
       مين المختلف؟
    ===================================================== */

    const puzzleStars = document.querySelectorAll(".puzzle-star");
    const puzzleFeedback = document.getElementById("puzzleFeedback");

    let puzzleSolved = false;

    puzzleStars.forEach(star => {

        star.addEventListener("click", () => {

            if (puzzleSolved) return;

            if (star.classList.contains("different")) {

                puzzleSolved = true;

                star.classList.add("found");

                if (puzzleFeedback) {
                    puzzleFeedback.textContent = "لقيتيها 👀🤍";
                    puzzleFeedback.classList.add("success");
                }

                if (puzzleNext) {
                    puzzleNext.classList.add("show");
                }

            } else {

                star.classList.add("wrong");

                setTimeout(() => {
                    star.classList.remove("wrong");
                }, 450);

                if (puzzleFeedback) {
                    puzzleFeedback.textContent = "لأ... بصي كويس 👀";
                    puzzleFeedback.classList.remove("success");
                }

            }

        });

    });


    /* =====================================================
       ➡️ من LEVEL 1 إلى LEVEL 2
    ===================================================== */

    if (puzzleNext) {

        puzzleNext.addEventListener("click", () => {

            showScreen(2);

        });

    }


    /* =====================================================
       🔐 LEVEL 2
       الحروف المخفية
    ===================================================== */

    const hiddenItems = document.querySelectorAll(".hidden-item");
    const codeLetters = document.querySelectorAll(".code-letter");
    const codeFeedback = document.getElementById("codeFeedback");

    let foundLetters = [];

    hiddenItems.forEach(item => {

        item.addEventListener("click", () => {

            if (item.classList.contains("found")) return;

            const letter = item.dataset.letter;

            if (!letter) return;

            item.classList.add("found");

            foundLetters.push(letter);

            const currentIndex = foundLetters.length - 1;

            if (codeLetters[currentIndex]) {
                codeLetters[currentIndex].textContent = letter;
                codeLetters[currentIndex].classList.add("revealed");
            }

            if (foundLetters.length === 3) {

                if (codeFeedback) {
                    codeFeedback.textContent = "تمام... عرفتي الحروف كلها 🤍";
                    codeFeedback.classList.add("success");
                }

                if (codeNext) {
                    codeNext.classList.add("show");
                }

            }

        });

    });


    /* =====================================================
       ➡️ من LEVEL 2 إلى LEVEL 3
    ===================================================== */

    if (codeNext) {

        codeNext.addEventListener("click", () => {

            showScreen(3);

        });

    }


    /* =====================================================
       🌹 LEVEL 3
       الوردة
    ===================================================== */

    const interactiveRose = document.getElementById("interactiveRose");
    const roseHint = document.getElementById("roseHint");
    const roseMessage = document.getElementById("roseMessage");

    let roseOpened = false;

    if (interactiveRose) {

        interactiveRose.addEventListener("click", () => {

            if (roseOpened) return;

            roseOpened = true;

            interactiveRose.classList.add("bloom");

            if (roseHint) {
                roseHint.style.opacity = "0";
            }

            // صوت الوردة
            if (roseSound) {

                const promise = roseSound.play();

                if (promise !== undefined) {
                    promise.catch(() => {});
                }

            }

            setTimeout(() => {

                if (roseMessage) {
                    roseMessage.classList.add("show");
                }

            }, 600);


            setTimeout(() => {

                if (roseNext) {
                    roseNext.classList.add("show");
                }

            }, 1800);

        });

    }


    /* =====================================================
       ➡️ من LEVEL 3 إلى LEVEL 4
    ===================================================== */

    if (roseNext) {

        roseNext.addEventListener("click", () => {

            showScreen(4);

        });

    }


    /* =====================================================
       🔢 LEVEL 4
       القفل الرقمي
       
       🌙 + 🌙 = 4
       🌙 + ⭐ = 8
       ⭐ + ⭐ = 7

       الحل = 487
    ===================================================== */

    const lockNumbers = document.querySelectorAll(".lock-number");

    const lockDigit1 = document.getElementById("lockDigit1");
    const lockDigit2 = document.getElementById("lockDigit2");
    const lockDigit3 = document.getElementById("lockDigit3");

    const lockClear = document.getElementById("lockClear");
    const lockFeedback = document.getElementById("lockFeedback");
    const lockBox = document.querySelector(".lock-box");

    let lockCode = "";
    const correctCode = "487";
    let lockSolved = false;


    function updateLockDisplay() {

        const digits = [
            lockDigit1,
            lockDigit2,
            lockDigit3
        ];

        digits.forEach((digit, index) => {

            if (!digit) return;

            if (lockCode[index]) {
                digit.textContent = lockCode[index];
                digit.classList.add("filled");
            } else {
                digit.textContent = "_";
                digit.classList.remove("filled");
            }

        });

    }


    lockNumbers.forEach(button => {

        button.addEventListener("click", () => {

            if (lockSolved) return;

            if (lockCode.length >= 3) return;

            const number = button.dataset.number;

            if (number === undefined) return;

            lockCode += number;

            updateLockDisplay();


            // بعد إدخال 3 أرقام
            if (lockCode.length === 3) {

                if (lockCode === correctCode) {

                    lockSolved = true;

                    if (lockFeedback) {
                        lockFeedback.textContent = "اتفتحت 🤍";
                        lockFeedback.classList.add("success");
                    }

                    if (lockBox) {
                        lockBox.classList.add("unlocked");
                    }

                    if (lockNext) {
                        lockNext.classList.add("show");
                    }

                    lockNumbers.forEach(btn => {
                        btn.disabled = true;
                    });

                } else {

                    if (lockFeedback) {
                        lockFeedback.textContent = "مش ده... جربي تاني 👀";
                        lockFeedback.classList.remove("success");
                    }

                    if (lockBox) {
                        lockBox.classList.add("wrong");
                    }

                    setTimeout(() => {

                        lockCode = "";

                        updateLockDisplay();

                        if (lockBox) {
                            lockBox.classList.remove("wrong");
                        }

                    }, 700);

                }

            }

        });

    });


    /* =====================================================
       🧹 مسح القفل
    ===================================================== */

    if (lockClear) {

        lockClear.addEventListener("click", () => {

            if (lockSolved) return;

            lockCode = "";

            updateLockDisplay();

            if (lockFeedback) {
                lockFeedback.textContent = "";
            }

        });

    }


    /* =====================================================
       ➡️ من LEVEL 4 إلى LEVEL 5
    ===================================================== */

    if (lockNext) {

        lockNext.addEventListener("click", () => {

            showScreen(5);

        });

    }


    /* =====================================================
       🚪 LEVEL 5
       اختيار الباب
       
       الباب الصحيح = الوردة 🌹
    ===================================================== */

    const doors = document.querySelectorAll(".door");
    const doorFeedback = document.getElementById("doorFeedback");

    let correctDoorSelected = false;

    doors.forEach(door => {

        door.addEventListener("click", () => {

            if (correctDoorSelected) return;

            const selectedDoor = door.dataset.door;

            if (selectedDoor === "rose") {

                correctDoorSelected = true;

                door.classList.add("completed");

                if (doorFeedback) {
                    doorFeedback.textContent = "أيوه... ده هو الطريق الصح 🌹🤍";
                    doorFeedback.classList.add("success");
                }

                if (doorNext) {
                    doorNext.classList.add("show");
                }

            } else {

                door.classList.add("wrong");

                setTimeout(() => {
                    door.classList.remove("wrong");
                }, 500);

                if (doorFeedback) {
                    doorFeedback.textContent = "مش ده 👀 جربي باب تاني.";
                    doorFeedback.classList.remove("success");
                }

            }

        });

    });


    /* =====================================================
       ❤️ فتح صفحة الحب
    ===================================================== */

    function openLovePage() {

        // إخفاء كل المراحل
        screens.forEach(screen => {

            screen.classList.remove("active");

            screen.style.display = "none";

        });


        // إظهار صفحة الحب
        if (lovePage) {

            lovePage.classList.add("visible");

        }


        // السماح بالـ scroll
        document.body.classList.add("love-page-open");


        // إيقاف أي صوت سابق
        stopAllMusic();


        // تشغيل أغنية ما بعد الباب
        if (afterDoorAudio) {

            const promise = afterDoorAudio.play();

            if (promise !== undefined) {

                promise.catch(() => {

                    console.log("After-door audio was blocked.");

                });

            }

        }


        // العودة لأعلى الصفحة
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });

    }


    /* =====================================================
       ➡️ زر الباب الأخير
    ===================================================== */

    if (doorNext) {

        doorNext.addEventListener("click", () => {

            openLovePage();

        });

    }


    /* =====================================================
       🎵 زر موسيقى الذكريات
    ===================================================== */

    const memoryMusicBtn = document.getElementById("memoryMusicBtn");

    if (memoryMusicBtn && memoryAudio) {

        memoryMusicBtn.addEventListener("click", () => {

            if (memoryAudio.paused) {

                stopAllMusic();

                const promise = memoryAudio.play();

                if (promise !== undefined) {

                    promise.catch(() => {
                        console.log("Memory audio was blocked.");
                    });

                }

                memoryMusicBtn.textContent = "❚❚";

            } else {

                memoryAudio.pause();

                memoryMusicBtn.textContent = "▶";

            }

        });


        memoryAudio.addEventListener("ended", () => {

            memoryMusicBtn.textContent = "▶";

        });

    }


    /* =====================================================
       💗 تشغيل أغنية الاعتراف
       
       عند الوصول إلى confession
    ===================================================== */

    const confessionSection = document.getElementById("confession");

    let confessionPlayed = false;


    if (confessionSection && confessionAudio) {

        const confessionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !confessionPlayed
                    ) {

                        confessionPlayed = true;

                        playAudio(confessionAudio);

                    }

                });

            },
            {
                threshold: 0.45
            }
        );


        confessionObserver.observe(confessionSection);

    }


    /* =====================================================
       ✨ ظهور عناصر القصة أثناء الـ Scroll
    ===================================================== */

    const storyBlocks = document.querySelectorAll(".story-block");


    if (storyBlocks.length > 0) {

        const storyObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        storyObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


        storyBlocks.forEach(block => {

            storyObserver.observe(block);

        });

    }


    /* =====================================================
       🧹 عند انتهاء أغنية الاعتراف
    ===================================================== */

    if (confessionAudio) {

        confessionAudio.addEventListener("ended", () => {

            // لا نفعل شيئاً هنا
            // حتى تظل الصفحة هادئة بعد انتهاء الأغنية

        });

    }


    /* =====================================================
       🚪 البداية
    ===================================================== */

    showScreen(0);

});