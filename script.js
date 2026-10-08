document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
        💖 إنشاء قلوب متطايرة في الخلفية
    ===================================================== */
    let heartsInterval = null;

    function startFloatingHearts() {
        if (heartsInterval) return;

        const heartsContainer = document.createElement("div");
        heartsContainer.classList.add("hearts-container");
        document.body.appendChild(heartsContainer);

        const heartSymbols = ["💖", "🌸", "✨", "💕", "🌹", "💗"];

        heartsInterval = setInterval(() => {
            const heart = document.createElement("span");
            heart.classList.add("floating-heart");
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 3 + 4 + "s";
            heart.style.fontSize = Math.random() * 10 + 16 + "px";

            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 7000);
        }, 450);
    }

    /* =====================================================
        🎵 أسماء ملفات الأغاني والتنسيق الجديد
    ===================================================== */

    const MUSIC = {
        confession: "rose.mp3", // تم التبديل هنا
        memory: "B.m4a",
        afterDoor: "C.m4a"
    };

    const roseLyrics = [
        { time: 0,   text: "لا برتاح في ليلة ولا بنساك... 🌸" },
        { time: 5.5, text: "ولا لقيت نهاية..." },
        { time: 8.5, text: "ولو حتى ببعد ببقى معاك..." },
        { time: 11.5, text: "ومانتش معايا... 💕" },
        { time: 14.5, text: "لا برتاح في ليلة ولا بنساك..." },
        { time: 17.5, text: "ولا لقيت نهاية..." },
        { time: 19.5, text: "ولو حتى ببعد ببقى معاك... 🌹" },
        { time: 21.5, text: "ومانتش معايا..." }
    ];

    const roseSound = document.getElementById("roseSound");
    if (roseSound) roseSound.src = "A.m4a"; // تم التبديل هنا للوردة

    const roseLyricsText = document.getElementById("roseLyricsText");

    if (roseSound && roseLyricsText) {
        roseSound.addEventListener("timeupdate", () => {
            const currentTime = roseSound.currentTime;
            
            let currentLine = roseLyrics[0].text;
            for (let i = 0; i < roseLyrics.length; i++) {
                if (currentTime >= roseLyrics[i].time) {
                    currentLine = roseLyrics[i].text;
                } else {
                    break;
                }
            }

            if (roseLyricsText.textContent !== currentLine) {
                roseLyricsText.classList.add("lyric-fade");
                setTimeout(() => {
                    roseLyricsText.textContent = currentLine;
                    roseLyricsText.classList.remove("lyric-fade");
                }, 150);
            }
        });
    }

    /* =====================================================
        العناصر الأساسية
    ===================================================== */

    const screens = document.querySelectorAll(".screen");
    const startBtn = document.getElementById("startBtn");
    const lovePage = document.getElementById("love-page");

    const confessionAudio = document.getElementById("confessionAudio");
    const memoryAudio = document.getElementById("memoryAudio");
    const afterDoorAudio = document.getElementById("afterDoorAudio");

    const lyricsContainer = document.getElementById("lyricsContainer");
    const lyricsText = document.getElementById("lyricsText");
    const toggleAudioBtn = document.getElementById("toggleAudioBtn");

    let currentScreen = 0;
    let confessionPlayed = false;

    if (confessionAudio) confessionAudio.src = MUSIC.confession;
    if (memoryAudio) memoryAudio.src = MUSIC.memory;
    if (afterDoorAudio) afterDoorAudio.src = MUSIC.afterDoor;

    function unlockIOSAudio() {
        [roseSound, confessionAudio, memoryAudio, afterDoorAudio].forEach((audio) => {
            if (audio) {
                audio.play().then(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }).catch(() => {});
            }
        });
    }

    function stopAllMusic() {
        [roseSound, confessionAudio, memoryAudio, afterDoorAudio].forEach((audio) => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
        hideLyrics();
    }

    function playMusic(audio) {
        if (!audio) return;
        audio.volume = 0.85;
        const promise = audio.play();
        if (promise !== undefined) {
            promise.catch((err) => {
                console.log("Audio play blocked:", err);
            });
        }
    }

    function showLyrics(text) {
        if (lyricsContainer && lyricsText) {
            lyricsText.textContent = text;
            lyricsContainer.classList.add("show");
            if (toggleAudioBtn) toggleAudioBtn.textContent = "❚❚ إيقاف";
        }
    }

    function hideLyrics() {
        if (lyricsContainer) {
            lyricsContainer.classList.remove("show");
        }
    }

    if (toggleAudioBtn) {
        toggleAudioBtn.addEventListener("click", () => {
            if (afterDoorAudio.paused) {
                afterDoorAudio.play();
                toggleAudioBtn.textContent = "❚❚ إيقاف";
            } else {
                afterDoorAudio.pause();
                toggleAudioBtn.textContent = "▶ تشغيل";
            }
        });
    }

    function showScreen(index) {
        if (index < 0 || index >= screens.length) return;

        screens.forEach((screen) => {
            screen.classList.remove("active");
        });

        const nextScreen = screens[index];
        if (nextScreen) {
            nextScreen.classList.add("active");
            nextScreen.scrollTop = 0;
            currentScreen = index;
        }
    }

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            unlockIOSAudio();
            showScreen(1);
        });
    }

    /* =====================================================
        Puzzle 1
    ===================================================== */

    const puzzleStars = document.querySelectorAll(".puzzle-star");
    const puzzleFeedback = document.getElementById("puzzleFeedback");
    const puzzleNext = document.getElementById("puzzleNext");

    puzzleStars.forEach((star) => {
        star.addEventListener("click", () => {
            if (puzzleNext && puzzleNext.classList.contains("show")) return;

            if (star.classList.contains("different")) {
                star.classList.add("correct");
                if (puzzleFeedback) {
                    puzzleFeedback.textContent = "حتى في وسط ألف نجمة... عيني مش بتشوف غيرك ✨❤";
                    puzzleFeedback.classList.add("show");
                }
                if (puzzleNext) puzzleNext.classList.add("show");
            } else {
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

    const hiddenItems = document.querySelectorAll(".hidden-item");
    const codeLetters = document.querySelectorAll(".code-letter");
    const codeFeedback = document.getElementById("codeFeedback");
    const codeNext = document.getElementById("codeNext");
    const hiddenArea = document.querySelector(".hidden-items");

    let foundItems = 0;

    hiddenItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            if (item.classList.contains("found")) return;

            item.classList.add("found");
            foundItems++;

            if (codeLetters[index]) {
                codeLetters[index].textContent = item.dataset.letter;
                codeLetters[index].classList.add("revealed");
            }

            if (foundItems === hiddenItems.length) {
                if (hiddenArea) hiddenArea.classList.add("completed");
                if (codeFeedback) {
                    codeFeedback.textContent = "كل حرف بيجمعنا... بيكمل الجزء الناقص في قلبي 🧩💖";
                    codeFeedback.classList.add("show");
                }
                if (codeNext) codeNext.classList.add("show");
            }
        });
    });

    /* =====================================================
        Level 3 — الوردة 🌹
    ===================================================== */

    const interactiveRose = document.getElementById("interactiveRose");
    const roseHint = document.getElementById("roseHint");
    const roseMessage = document.getElementById("roseMessage");
    const roseNextBtn = document.getElementById("roseNextBtn");
    const roseLyricsBox = document.getElementById("roseLyricsBox");

    let roseOpened = false;

    if (interactiveRose) {
        interactiveRose.addEventListener("click", () => {
            if (roseOpened) return;
            roseOpened = true;

            startFloatingHearts();

            if (roseSound) {
                roseSound.currentTime = 0;
                roseSound.play().catch(() => {});
            }

            interactiveRose.classList.add("bloom");
            if (roseHint) roseHint.classList.add("hide");

            setTimeout(() => {
                if (roseMessage) roseMessage.classList.add("show");
                if (roseLyricsBox) roseLyricsBox.style.display = "block";
            }, 600);

            setTimeout(() => {
                if (roseNextBtn) roseNextBtn.classList.add("show");
            }, 1800);
        });
    }

    // الانتقال للمرحلة الرابعة مباشرة وبترتيب صحيح
    if (roseNextBtn) {
        roseNextBtn.addEventListener("click", () => {
            if (roseSound) roseSound.pause();
            showScreen(currentScreen + 1);
        });
    }

    /* =====================================================
        Puzzle 4 - الرقم السري
    ===================================================== */

    const lockNumbers = document.querySelectorAll(".lock-number");
    const lockDigit1 = document.getElementById("lockDigit1");
    const lockDigit2 = document.getElementById("lockDigit2");
    const lockDigit3 = document.getElementById("lockDigit3");
    const lockClear = document.getElementById("lockClear");
    const lockFeedback = document.getElementById("lockFeedback");
    const lockNext = document.getElementById("lockNext");
    const lockBox = document.querySelector(".lock-box");

    let enteredCode = "";
    const correctCode = "487";
    let lockSolved = false;

    lockNumbers.forEach((number) => {
        number.addEventListener("click", () => {
            if (lockSolved || enteredCode.length >= 3) return;
            enteredCode += number.dataset.number;
            updateLockDisplay();
        });
    });

    function updateLockDisplay() {
        if (lockDigit1) lockDigit1.textContent = enteredCode[0] || "_";
        if (lockDigit2) lockDigit2.textContent = enteredCode[1] || "_";
        if (lockDigit3) lockDigit3.textContent = enteredCode[2] || "_";

        const digits = [lockDigit1, lockDigit2, lockDigit3];
        digits.forEach((digit, index) => {
            if (digit) {
                if (enteredCode[index]) {
                    digit.classList.add("filled");
                } else {
                    digit.classList.remove("filled");
                }
            }
        });

        if (enteredCode.length === 3) {
            checkLock();
        }
    }

    function checkLock() {
        if (enteredCode === correctCode) {
            lockSolved = true;
            if (lockFeedback) {
                lockFeedback.textContent = "اتفتح! 🔓✨";
                lockFeedback.classList.add("show");
            }
            if (lockBox) lockBox.classList.add("unlocked");
            if (lockNext) lockNext.classList.add("show");

            lockNumbers.forEach((number) => {
                number.disabled = true;
            });
        } else {
            if (lockFeedback) {
                lockFeedback.textContent = "ركزي في تاريخ أصلح فيه كل حاجة في حياتي... تاريخنا المميز 🗝❤";
                lockFeedback.classList.add("show");
            }
            if (lockBox) lockBox.classList.add("wrong");

            setTimeout(() => {
                if (lockBox) lockBox.classList.remove("wrong");
                enteredCode = "";
                updateLockDisplay();
            }, 700);
        }
    }

    if (lockClear) {
        lockClear.addEventListener("click", () => {
            if (lockSolved) return;
            enteredCode = "";
            if (lockFeedback) lockFeedback.classList.remove("show");
            updateLockDisplay();
        });
    }

    if (puzzleNext) puzzleNext.addEventListener("click", () => showScreen(currentScreen + 1));
    if (codeNext) codeNext.addEventListener("click", () => showScreen(currentScreen + 1));
    if (lockNext) lockNext.addEventListener("click", () => showScreen(currentScreen + 1));

    /* =====================================================
        Puzzle 5 - الأبواب 🚪
    ===================================================== */

    const doors = document.querySelectorAll(".door");
    const doorsContainer = document.querySelector(".doors");
    const doorFeedback = document.getElementById("doorFeedback");
    const doorNext = document.getElementById("doorNext");

    doors.forEach((door) => {
        door.addEventListener("click", () => {
            if (doorsContainer && doorsContainer.classList.contains("completed")) return;

            const selectedDoor = door.dataset.door;

            if (selectedDoor === "rose") {
                door.classList.add("correct");
                if (doorsContainer) doorsContainer.classList.add("completed");
                if (doorFeedback) {
                    doorFeedback.textContent = `كُلُّ إتجاه إلى عَينكِ يأخُذني\nمِن أينَ أعبرُ يا كُلُّ اتجاهاتي؟`;
                    doorFeedback.classList.add("show");
                }
                if (doorNext) doorNext.classList.add("show");

                stopAllMusic();
                playMusic(afterDoorAudio);
                showLyrics("🎵 تفاصيل الأغنية...");

            } else {
                door.classList.add("wrong");
                if (doorFeedback) {
                    doorFeedback.textContent = `مهما كانت الطرق والخيارات... كل الطرق في الآخر بتؤدي لقلبك 🚪💖`;
                    doorFeedback.classList.add("show");
                }
                setTimeout(() => {
                    door.classList.remove("wrong");
                }, 500);
            }
        });
    });

    if (doorNext) {
        doorNext.addEventListener("click", () => {
            stopAllMusic();
            openLovePage();
        });
    }

    function openLovePage() {
        showScreenWithoutTransition();
        if (lovePage) lovePage.classList.add("visible");
        document.body.classList.add("love-page-open");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }

    function showScreenWithoutTransition() {
        screens.forEach((screen) => {
            screen.classList.remove("active");
            screen.style.display = "none";
        });
    }

    /* =====================================================
        الأغنية الثانية (Memory)
    ===================================================== */

    const memoryMusicBtn = document.getElementById("memoryMusicBtn");

    if (memoryMusicBtn) {
        memoryMusicBtn.addEventListener("click", () => {
            if (memoryAudio.paused) {
                stopAllMusic();
                playMusic(memoryAudio);
                memoryMusicBtn.textContent = "❚❚";
            } else {
                memoryAudio.pause();
                memoryMusicBtn.textContent = "▶";
            }
        });
    }

    /* =====================================================
        الأغنية الأولى (الاعتراف في السكرول)
    ===================================================== */

    let confessionObserver = null;

    function setupConfessionMusic() {
        const confession = document.getElementById("confession");
        if (!confession) return;

        confessionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !confessionPlayed) {
                        stopAllMusic();
                        playMusic(confessionAudio);
                        confessionPlayed = true;
                    }
                });
            },
            { threshold: 0.45 }
        );

        confessionObserver.observe(confession);
    }

    setupConfessionMusic();

    /* =====================================================
        ظهور عناصر الصفحة تدريجيًا
    ===================================================== */

    const storyBlocks = document.querySelectorAll(".story-block");

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                }
            });
        },
        { threshold: 0.12 }
    );

    storyBlocks.forEach((block) => {
        revealObserver.observe(block);
    });
});
