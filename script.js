document.addEventListener("DOMContentLoaded", () => {
    
    /* =====================================================
       💖 تأثير قلب الكلمات (ثابت، محدد بوضوح، ظهور تدريجي ورا بعض، دوران عكس عقارب الساعة)
    ===================================================== */
 const canvas = document.getElementById("loveHeartCanvas");
if (!canvas) return;

const ctx = canvas.getContext("2d");
if (!ctx) return;

canvasInitialized = true;

const size = 500;
canvas.width = size;
canvas.height = size;

const phrases = [
    "أنا بحبك", "I love you", "Te amo", "Je t'aime",
    "Ich liebe dich", "Ti amo", "Seni seviyorum",
    "القلب بيحبك", "Kocham cię", "Я тебя люблю",
    "사랑해", "Aku cinta kamu", "أنا بحبك",
    "I love you", "Te amo", "Je t'aime"
];

function getHeartPoint(t) {
    return {
        x: 16 * Math.sin(t) ** 3,
        y: -(13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t))
    };
}

const particles = [];
const totalParticles = 420;

for (let i = 0; i < totalParticles; i++) {
    const angle = Math.random() * Math.PI * 2;

    particles.push({
        angle,
        factor: Math.sqrt(Math.random()),
        text: phrases[Math.floor(Math.random() * phrases.length)],
        alpha: 0,
        maxAlpha: 0.65 + Math.random() * 0.35,
        speed: 0.012 + Math.random() * 0.012,
        size: 7 + Math.random() * 3,
        delay: i * 2
    });
}

let frame = 0;
let rotation = 0;

function animate() {
    ctx.clearRect(0, 0, size, size);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    frame++;
    rotation -= 0.0007;

    particles.forEach((p) => {
        if (frame > p.delay && p.alpha < p.maxAlpha) {
            p.alpha = Math.min(p.maxAlpha, p.alpha + p.speed);
        }

        if (p.alpha <= 0) return;

        const point = getHeartPoint(p.angle + rotation);
        const x = size / 2 + point.x * 12 * p.factor;
        const y = size / 2 + point.y * 12 * p.factor;

        ctx.font = `bold ${p.size}px Tahoma, sans-serif`;
        ctx.fillStyle = `rgba(255, 75, 115, ${p.alpha})`;
        ctx.fillText(p.text, x, y);
    });

    requestAnimationFrame(animate);
}

animate();
}


    /* =====================================================
        💖 إنشاء قلوب متطايرة في الخلفية (تظهر بانتظام في الصفحة الأخيرة)
    ===================================================== */
 if (!heartsContainer) {
    heartsContainer = document.createElement("div");
    heartsContainer.className = "hearts-container";
    document.body.appendChild(heartsContainer);
}

heartsContainer.style.display = "block";

if (heartsInterval) return;

const heartSymbols = ["💖", "🌸", "✨", "💕", "🌹", "💗"];

heartsInterval = setInterval(() => {
    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = Math.random() * 95 + "vw";
    heart.style.animationDuration = (5 + Math.random() * 3) + "s";
    heart.style.fontSize = (16 + Math.random() * 14) + "px";

    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", () => heart.remove(), {
        once: true
    });
}, 350);

    /* =====================================================
        🎵 أسماء ملفات الأغاني وإصلاح مشكلة الآيفون
    ===================================================== */

    const MUSIC = {
        confession: "rose.mp3", 
        memory: "B.m4a",
        afterDoor: "A.m4a"
    };

    const roseLyrics = [
        { time: 0,   text: "لا برتاح في ليلة ولا بنساك... 🌸" },
        { time: 3, text: "ولا لقيت نهاية..." },
        { time: 6.5, text: "ولو حتى ببعد ببقى معاك..." },
        { time: 9, text: "ومانتش معايا... 💕" },
        { time: 13, text: "لا برتاح في ليلة ولا بنساك..." },
        { time: 17, text: "ولا لقيت نهاية..." },
        { time: 19, text: "ولو حتى ببعد ببقى معاك... 🌹" },
        { time: 21.5, text: "ومانتش معايا..." }
    ];

    const roseSound = document.getElementById("roseSound");
    if (roseSound) roseSound.src = MUSIC.afterDoor;

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

    // دالة فك قفل الصوت لأجهزة الآيفون
    function unlockIOSAudio() {
        [roseSound, confessionAudio, memoryAudio, afterDoorAudio].forEach((audio) => {
            if (audio) {
                audio.play().then(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }).catch((e) => console.log("Audio unlock error:", e));
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
        audio.volume = 0.9;
        audio.play().catch((err) => {
            console.log("iOS Audio play blocked:", err);
        });
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
        screens.forEach((screen) => screen.classList.remove("active"));
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
        Puzzle 1 (النجوم)
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
                setTimeout(() => star.classList.remove("wrong"), 400);
            }
        });
    });

    /* =====================================================
        Puzzle 2 (الحروف المخفية)
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
        Level 3 (الوردة)
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
            if (roseSound) {
                roseSound.currentTime = 0;
                playMusic(roseSound);
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

    if (roseNextBtn) {
        roseNextBtn.addEventListener("click", () => {
            if (roseSound) roseSound.pause();
            showScreen(currentScreen + 1);
        });
    }

    /* =====================================================
        Puzzle 4 (الرقم السري)
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
        if (enteredCode.length === 3) checkLock();
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
            lockNumbers.forEach((n) => n.disabled = true);
        } else {
            if (lockFeedback) {
                lockFeedback.textContent = "تاريخنا المميز 🗝❤";
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
        Puzzle 5 (الأبواب)
    ===================================================== */
    const doors = document.querySelectorAll(".door");
    const doorsContainer = document.querySelector(".doors");
    const doorFeedback = document.getElementById("doorFeedback");
    const doorNext = document.getElementById("doorNext");

    doors.forEach((door) => {
        door.addEventListener("click", () => {
            if (doorsContainer && doorsContainer.classList.contains("completed")) return;
            if (door.dataset.door === "rose") {
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
                    doorFeedback.textContent = `كل الطرق في الآخر بتؤدي لقلبك 🚪💖`;
                    doorFeedback.classList.add("show");
                }
                setTimeout(() => door.classList.remove("wrong"), 500);
            }
        });
    });

    if (doorNext) {
        doorNext.addEventListener("click", () => {
            // تفعيل القلوب المتطايرة فوراً وبشكل دائم عند الخروج من الأبواب للنهاية
            startFloatingHearts(); 
            stopAllMusic();
            openLovePage();
        });
    }

    function openLovePage() {
        screens.forEach((screen) => {
            screen.classList.remove("active");
            screen.style.display = "none";
        });
        if (lovePage) lovePage.classList.add("visible");
        document.body.classList.add("love-page-open");
        window.scrollTo({ top: 0, behavior: "instant" });
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
        🎵 تشغيل أغنية الاعتراف وتفعيل تأثير القلب عند الوصول للقسم
    ===================================================== */
    function setupConfessionSection() {
        const confession = document.getElementById("confession");
        if (!confession) return;

        const confessionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        initLoveHeartCanvas(); // تفعيل رسم القلب بالثبات والظهور التدريجي المتسلسل

                        if (!confessionPlayed) {
                            stopAllMusic();
                            playMusic(confessionAudio);
                            confessionPlayed = true;
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        confessionObserver.observe(confession);
    }

    setupConfessionSection();

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

    storyBlocks.forEach((block) => revealObserver.observe(block));
});
