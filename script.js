document.addEventListener("DOMContentLoaded", () => {
    
    /* =====================================================
       💖 تأثير قلب الكلمات (ثابت، محدد بوضوح، ظهور تدريجي ورا بعض، دوران عكس عقارب الساعة)
    ===================================================== */
    let canvasInitialized = false;

    function initLoveHeartCanvas() {
        if (canvasInitialized) return;
        canvasInitialized = true;

        const canvas = document.getElementById("loveHeartCanvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        canvas.width = 400;
        canvas.height = 400;

        const phrases = [
            "أنا بحبك", "Te amo", "I love you", "Ich liebe dich", 
            "Seni seviyorum", "Je t'aime", "Amo te", "bmoot feky", 
            "Kocham cię", "Я тебя люблю", "사랑해", "Aku cinta kamu",
            "Miluj tě", "Jeg elsker dig","smokah"," 君を愛してる", "Σ' αγαπώ", "Ti amo",
            "أنا بحبك", "I love you", "Te amo", "Je t'aime"
        ];

        // معادلة إحداثيات القلب الرياضية المضبوطة بدقة وثبات لإظهار شكل القلب بوضوح
    

       

// معادلة تحدد المساحة الداخلية للقلب

const particles = [];

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const heartScale = 9.8;
const fontSize = 9;
const wordGap = 4;

ctx.font = `bold ${fontSize}px Tahoma`;
ctx.textAlign = "center";
ctx.textBaseline = "middle";

// عبارات متنوعة، مع كلمات قصيرة لملء الفراغات
const lovePhrases = [
    "أنا بحبك", "I love you", "Te amo",
    "Je t'aime", "Ti amo", "بحبك",
    "smokah", "يا دكتورتي", "قلبي ليكي",
    "My love", "حبيبتي", "يا روحي",
    "Seni seviyorum", "Ich liebe dich",
    "أنتِ قلبي", "Forever", "يا قمري",
    "Amo te", "كلّي ليكي", "وحشتيني",
    "Kocham cię", "Mon amour", "يا سموكتي",
    "بحب قلبك", "يا أجمل حاجة", "روحي",
    "사랑해", "Aku cinta kamu", "يا حبيبتي",
    "Ты моя любовь", "معاكي", "لآخر العمر",
    "I choose you", "كل يوم بحبك أكتر"
];

let phraseIndex = 0;

function getHeartPoint(t) {
    const x = 16 * Math.sin(t) ** 3;

    const y = -(
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t)
    );

    return {
        x: centerX + x * heartScale,
        y: centerY + y * heartScale + 5
    };
}

function nextPhrase(maxWidth = Infinity) {
    // جرّب العبارات القصيرة لو المساحة ضيقة
    for (let i = 0; i < lovePhrases.length; i++) {
        const text = lovePhrases[phraseIndex % lovePhrases.length];
        phraseIndex++;

        if (ctx.measureText(text).width <= maxWidth) {
            return text;
        }
    }

    return "♥";
}

function addParticle(text, x, y, order) {
    particles.push({
        text,
        x,
        y,
        alpha: 0,
        delay: order * 12,
        maxAlpha: 0.94
    });
}

// ==================================================
// المرحلة الأولى: محيط القلب
// يبدأ من النقطة العلوية، ثم اليمين، ثم الشمال
// ==================================================

const outline = [];
const steps = 1600;

for (let i = 0; i <= steps; i++) {
    const t = (Math.PI * 2 * i) / steps;
    outline.push(getHeartPoint(t));
}

// نحسب طول المحيط التقريبي
const lengths = [0];

for (let i = 1; i < outline.length; i++) {
    const dx = outline[i].x - outline[i - 1].x;
    const dy = outline[i].y - outline[i - 1].y;

    lengths.push(lengths[i - 1] + Math.hypot(dx, dy));
}

const perimeter = lengths[lengths.length - 1];
const outlineCount = Math.floor(perimeter / 15);
let outlineOrder = 0;

for (let n = 0; n < outlineCount; n++) {
    const target = (n / outlineCount) * perimeter;

    let low = 0;
    let high = lengths.length - 1;

    while (low < high) {
        const mid = Math.floor((low + high) / 2);

        if (lengths[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    const i = Math.max(1, low);
    const a = outline[i - 1];
    const b = outline[i];

    const segment = lengths[i] - lengths[i - 1];
    const ratio = segment > 0
        ? (target - lengths[i - 1]) / segment
        : 0;

    const x = a.x + (b.x - a.x) * ratio;
    const y = a.y + (b.y - a.y) * ratio;

    const text = nextPhrase(55);

    addParticle(text, x, y, outlineOrder++);
}

// ==================================================
// المرحلة الثانية: ملء القلب بالكامل
// نستخدم المضلع نفسه لمعرفة حدود كل صف
// ==================================================

const outlineDuration = outlineOrder * 17;
const fillRows = [];
const topY = Math.min(...outline.map(p => p.y));
const bottomY = Math.max(...outline.map(p => p.y));

// نحدد المساحة الداخلية لكل صف أفقي
for (let y = Math.ceil(topY + 5); y < bottomY - 3; y += 10) {
    const intersections = [];

    for (let i = 1; i < outline.length; i++) {
        const a = outline[i - 1];
        const b = outline[i];

        if ((a.y <= y && b.y > y) || (b.y <= y && a.y > y)) {
            const ratio = (y - a.y) / (b.y - a.y);
            intersections.push(a.x + ratio * (b.x - a.x));
        }
    }

    intersections.sort((a, b) => a - b);

    if (intersections.length >= 2) {
        fillRows.push({
            y,
            left: intersections[0] + 5,
            right: intersections[intersections.length - 1] - 5
        });
    }
}

// نبدأ من الحواف ونتجه إلى الداخل
// ونتبادل بين النصفين قدر الإمكان
let fillOrder = 0;

fillRows.forEach((row, rowIndex) => {
    const middle = centerX;
    const sections = [
        { left: middle + 3, right: row.right },
        { left: row.left, right: middle - 3 }
    ];

    // عكس ترتيب الجانبين في كل صف
    if (rowIndex % 2 === 1) sections.reverse();

    sections.forEach(section => {
        const width = section.right - section.left;

        if (width < 14) return;

        let x = section.left;
        let safety = 0;

        while (x < section.right - 4 && safety++ < 40) {
            const available = section.right - x;
            const text = nextPhrase(available);
            const textWidth = ctx.measureText(text).width;

            if (textWidth > available) break;

            addParticle(
                text,
                x + textWidth / 2,
                row.y,
                outlineDuration / 17 + fillOrder++
            );

            x += textWidth + wordGap;
        }
    });
});

// ==================================================
// الظهور الرومانسي البطيء
// ==================================================

let frameCount = 0;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = `bold ${fontSize}px Tahoma`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    frameCount++;

    for (const p of particles) {
        if (frameCount >= p.delay && p.alpha < p.maxAlpha) {
            p.alpha = Math.min(p.maxAlpha, p.alpha + 0.035);
        }

        if (p.alpha > 0) {
            ctx.fillStyle = `rgba(225, 105, 150, ${p.alpha})`;
            ctx.fillText(p.text, p.x, p.y);
        }
    }

    if (particles.some(p => p.alpha < p.maxAlpha)) {
        requestAnimationFrame(animate);
    }
}

animate();

}
function butterflies(x, y) {
    for (let i = 0; i < 8; i++) {
        const b = document.createElement("img");

        b.src = "butterfly.png";
        b.className = "butterfly";

        b.style.position = "fixed";
        b.style.left = `${x}px`;
        b.style.top = `${y}px`;
        b.style.width = "28px";
        b.style.height = "28px";
        b.style.objectFit = "contain";
        b.style.pointerEvents = "none";
        b.style.zIndex = "99999";

        document.body.appendChild(b);

        const angle = (Math.PI * 2 * i) / 8;
        const distance = 100 + Math.random() * 80;
        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance - 35;

        b.animate([
            {
                transform: "translate(-50%, -50%) scale(0.2)",
                opacity: 0
            },
            {
                transform: "translate(-50%, -50%) scale(1)",
                opacity: 1,
                offset: 0.15
            },
            {
                transform: `translate(calc(-50% + ${moveX}px),
                    calc(-50% + ${moveY}px)) scale(0.6) rotate(180deg)`,
                opacity: 0
            }
        ], {
            duration: 1800,
            easing: "ease-out",
            fill: "forwards"
        });

        setTimeout(() => b.remove(), 1900);
    }
}

document.addEventListener("click", (e) => {
    if (!e.target.closest("button")) return;

    butterflies(e.clientX, e.clientY);
});
    /* =====================================================
        💖 إنشاء قلوب متطايرة في الخلفية (تظهر بانتظام في الصفحة الأخيرة)
    ===================================================== */


  
let heartsInterval = null;

function startFloatingHearts() {
    let container = document.querySelector(".hearts-container");

    if (!container) {
        container = document.createElement("div");
        container.className = "hearts-container";
        document.body.appendChild(container);
    }

    container.style.display = "block";

    if (heartsInterval !== null) return;

    const symbols = ["🤍", "💕", "💗", "🌸", "✨", "🌹"];

    function createHeart() {
        const heart = document.createElement("span");

        heart.className = "floating-heart";
        heart.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.left = Math.random() * 96 + "vw";
        heart.style.fontSize = (18 + Math.random() * 16) + "px";
        heart.style.animationDuration = (5 + Math.random() * 3) + "s";

        container.appendChild(heart);

        heart.addEventListener("animationend", () => {
            heart.remove();
        }, { once: true });
    }

    // إظهار قلوب فورًا بدل انتظار أول فترة
    for (let i = 0; i < 12; i++) {
        createHeart();
    }

    heartsInterval = setInterval(createHeart, 350);
}


    /* =====================================================
        🎵 أسماء ملفات الأغاني وإصلاح مشكلة الآيفون
    ===================================================== */

    const MUSIC = {
        confession: "rose.mp3", 
        memory: "B.m4a",
        afterDor: "A.m4a"
        afterDoor: "N.m4a"
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
    if (roseSound) roseSound.src = MUSIC.afterDor;

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
    const audioList = [
        roseSound,
        confessionAudio,
        memoryAudio,
        afterDoorAudio
    ].filter(Boolean);

    audioList.forEach((audio) => {
        const originalMuted = audio.muted;
        audio.muted = true;

        const promise = audio.play();

        if (promise && typeof promise.then === "function") {
            promise.then(() => {
                audio.pause();
                audio.currentTime = 0;
                audio.muted = originalMuted;
            }).catch(() => {
                audio.muted = originalMuted;
            });
        } else {
            audio.pause();
            audio.currentTime = 0;
            audio.muted = originalMuted;
        }
    });
}

 function stopAllMusic() {
    [roseSound, confessionAudio, memoryAudio, afterDoorAudio]
        .filter(Boolean)
        .forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });

    hideLyrics();
}

function playMusic(audio) {
    if (!audio) return;

    stopAllMusic();
    audio.volume = 0.9;

    audio.play().catch((err) => {
        console.log("Audio playback blocked:", err);
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
/* =====================================================
   Puzzle 4 (الرقم السري + الاستعانة بصديق)
===================================================== */

const lockNumbers = document.querySelectorAll(".lock-number");
const lockDigit1 = document.getElementById("lockDigit1");
const lockDigit2 = document.getElementById("lockDigit2");
const lockDigit3 = document.getElementById("lockDigit3");
const lockClear = document.getElementById("lockClear");
const lockFeedback = document.getElementById("lockFeedback");
const lockNext = document.getElementById("lockNext");
const askFriendBtn = document.getElementById("askFriendBtn");
if (askFriendBtn) {
    askFriendBtn.addEventListener("click", () => {
        const phone = "201068685560";

        const message = encodeURIComponent(
            "رقم القفل موجود قدامك يا دكتوره 487 🔐"
        );

        const whatsappURL =
            `https://wa.me/${phone}?text=${message}`;

        window.open(whatsappURL, "_blank");
    });
}
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

    if (enteredCode.length === 3) {
        checkLock();
    }
}

function checkLock() {
    if (lockSolved) return;

    if (enteredCode === correctCode) {
        lockSolved = true;

        if (lockFeedback) {
            lockFeedback.textContent = "اتفتح! 🔓✨";
            lockFeedback.classList.add("show");
        }

        if (lockBox) {
            lockBox.classList.remove("wrong");
            lockBox.classList.add("unlocked");
        }

        // إخفاء زر الاستعانة بصديق
        if (askFriendBtn) {
            askFriendBtn.style.display = "none";
        }

        // إظهار زر الاستمرار
        if (lockNext) {
            lockNext.classList.add("show");
        }

        lockNumbers.forEach((number) => {
            number.disabled = true;
        });

    } else {
        if (lockFeedback) {
            lockFeedback.textContent = "مش هو الرقم 😅 جرّبي تاني!";
            lockFeedback.classList.add("show");
        }

        // إظهار زر الاستعانة بصديق
        if (askFriendBtn) {
            askFriendBtn.style.display = "inline-flex";
        }

        if (lockBox) {
            lockBox.classList.add("wrong");
        }

        setTimeout(() => {
            if (lockBox) {
                lockBox.classList.remove("wrong");
            }

            if (lockSolved) return;

            enteredCode = "";
            updateLockDisplay();
        }, 700);
    }
}

if (lockClear) {
    lockClear.addEventListener("click", () => {
        if (lockSolved) return;

        enteredCode = "";

        if (lockFeedback) {
            lockFeedback.classList.remove("show");
        }

        updateLockDisplay();
    });
}

if (puzzleNext) {
    puzzleNext.addEventListener("click", () => {
        showScreen(currentScreen + 1);
    });
}

if (codeNext) {
    codeNext.addEventListener("click", () => {
        showScreen(currentScreen + 1);
    });
}


if (lockNext) {
    lockNext.addEventListener("click", () => {
        // فتح صفحة الحب الطويلة بعد حل القفل
        startFloatingHearts();
        stopAllMusic();
        openLovePage();
    });
}

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
                    doorFeedback.textContent = `عيناك سحرٌ مترفٌ كاد يُهلكني
 فمَن ذا الذي عن جمال عيناك 
يصبرُ 🚪💖`;
                    doorFeedback.classList.add("show");
                }
                setTimeout(() => door.classList.remove("wrong"), 500);
            }
        });
    });

   
if (doorNext) {
    doorNext.addEventListener("click", () => {
        // إيقاف أغنية الباب والانتقال إلى اللغز الأول
        stopAllMusic();
        showScreen(currentScreen + 1);
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

    storyBlocks.forEach((block) => {
        revealObserver.observe(block);
    });

    /* =====================================================
        ⬇️ إظهار السهم و Contact عند الوصول لآخر محتوى
    ===================================================== */

    const downArrow = document.getElementById("downArrow");
    const contactUs = document.getElementById("contactUs");

    function showContact() {
        if (downArrow) {
            downArrow.hidden = false;
            downArrow.classList.add("contact-visible");
        }

        if (contactUs) {
            contactUs.hidden = false;
            contactUs.classList.add("contact-visible");
        }
    }

    // نخفي العنصرين في البداية
    if (downArrow) downArrow.hidden = true;
    if (contactUs) contactUs.hidden = true;

    // نراقب آخر صندوق محتوى في الصفحة

const finalSection = document.querySelector("#love-page .final-love");
if (finalSection) {
    const contactObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    showContact();
                    contactObserver.disconnect();
                }
            });
        },
        {
            threshold: 0.9
        }
    );
    contactObserver.observe(finalSection);
}
            
});
