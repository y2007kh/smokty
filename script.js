
document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       💖 1. قلب الكلمات
    ===================================================== */

    let canvasInitialized = false;

    function initLoveHeartCanvas() {
        if (canvasInitialized) return;

        const canvas = document.getElementById("loveHeartCanvas");
        if (!canvas) {
            console.warn("loveHeartCanvas مش موجود في HTML");
            return;
        }

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
                y: -(13 * Math.cos(t)
                    - 5 * Math.cos(2 * t)
                    - 2 * Math.cos(3 * t)
                    - Math.cos(4 * t))
            };
        }

        const particles = [];
        const totalParticles = 420;

        for (let i = 0; i < totalParticles; i++) {
            particles.push({
                angle: Math.random() * Math.PI * 2,
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
                    p.alpha = Math.min(
                        p.maxAlpha,
                        p.alpha + p.speed
                    );
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
       💖 2. القلوب المتطايرة
    ===================================================== */

    let heartsInterval = null;

    function startFloatingHearts() {
        let heartsContainer = document.querySelector(".hearts-container");

        if (!heartsContainer) {
            heartsContainer = document.createElement("div");
            heartsContainer.className = "hearts-container";
            document.body.appendChild(heartsContainer);
        }

        heartsContainer.style.display = "block";

        if (heartsInterval !== null) return;

        const symbols = ["💖", "🌸", "✨", "💕", "🌹", "💗"];

        heartsInterval = setInterval(() => {
            const heart = document.createElement("span");

            heart.className = "floating-heart";
            heart.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            heart.style.left = Math.random() * 95 + "vw";
            heart.style.animationDuration =
                (5 + Math.random() * 3) + "s";
            heart.style.fontSize =
                (16 + Math.random() * 14) + "px";

            heartsContainer.appendChild(heart);

            heart.addEventListener(
                "animationend",
                () => heart.remove(),
                { once: true }
            );

            // حماية من تراكم العناصر في الذاكرة
            if (heartsContainer.children.length > 60) {
                heartsContainer.firstElementChild?.remove();
            }
        }, 350);
    }

    /* =====================================================
       🎵 3. إعداد الأغاني بدون afterDoor
    ===================================================== */

    const MUSIC = {
        confession: "rose.mp3",
        memory: "B.m4a"
    };

    const screens = document.querySelectorAll(".screen");
    const startBtn = document.getElementById("startBtn");
    const lovePage = document.getElementById("love-page");

    const roseSound = document.getElementById("roseSound");
    const confessionAudio = document.getElementById("confessionAudio");
    const memoryAudio = document.getElementById("memoryAudio");

    const lyricsContainer = document.getElementById("lyricsContainer");
    const lyricsText = document.getElementById("lyricsText");
    const toggleAudioBtn = document.getElementById("toggleAudioBtn");

    let currentScreen = 0;
    let confessionPlayed = false;

    if (confessionAudio) {
        confessionAudio.src = MUSIC.confession;
    }

    if (memoryAudio) {
        memoryAudio.src = MUSIC.memory;
    }

    // إزالة الاعتماد على أغنية afterDoor نهائيًا.
    // نخفي زر التحكم القديم لو كان خاصًا بالأغنية المحذوفة.
    if (toggleAudioBtn) {
        toggleAudioBtn.hidden = true;
        toggleAudioBtn.onclick = null;
    }

    function unlockIOSAudio() {
        [roseSound, confessionAudio, memoryAudio].forEach((audio) => {
            if (!audio) return;

            // محاولة فك قيود الصوت بعد ضغطة المستخدم.
            const promise = audio.play();

            if (promise && typeof promise.then === "function") {
                promise.then(() => {
                    audio.pause();
                    try {
                        audio.currentTime = 0;
                    } catch (_) {}
                }).catch(() => {
                    // المتصفح قد يمنع التشغيل الصامت؛ التشغيل عند الحاجة.
                });
            }
        });
    }

    function stopAllMusic() {
        [roseSound, confessionAudio, memoryAudio].forEach((audio) => {
            if (!audio) return;
            audio.pause();

            try {
                audio.currentTime = 0;
            } catch (_) {}
        });

        hideLyrics();
    }

    function playMusic(audio) {
        if (!audio) return;

        audio.volume = 0.9;

        const promise = audio.play();

        if (promise && typeof promise.catch === "function") {
            promise.catch((error) => {
                console.warn("تعذر تشغيل الصوت:", error);
            });
        }
    }

    function showLyrics(text) {
        if (lyricsContainer && lyricsText) {
            lyricsText.textContent = text;
            lyricsContainer.classList.add("show");
        }
    }

    function hideLyrics() {
        if (lyricsContainer) {
            lyricsContainer.classList.remove("show");
        }
    }

    /* =====================================================
       📱 4. الانتقال بين الشاشات
    ===================================================== */

    function showScreen(index) {
        if (index < 0 || index >= screens.length) return;

        screens.forEach((screen) => {
            screen.classList.remove("active");
        });

        const nextScreen = screens[index];

        if (nextScreen) {
            nextScreen.style.display = "";
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
    } else {
        console.error("زر startBtn مش موجود في HTML");
    }

    /* =====================================================
       ⭐ 5. اللغز الأول: النجوم
    ===================================================== */

    const puzzleStars = document.querySelectorAll(".puzzle-star");
    const puzzleFeedback = document.getElementById("puzzleFeedback");
    const puzzleNext = document.getElementById("puzzleNext");

    puzzleStars.forEach((star) => {
        star.addEventListener("click", () => {
            if (puzzleNext?.classList.contains("show")) return;

            if (star.classList.contains("different")) {
                star.classList.add("correct");

                if (puzzleFeedback) {
                    puzzleFeedback.textContent =
                        "حتى في وسط ألف نجمة... عيني مش بتشوف غيرك ✨❤";
                    puzzleFeedback.classList.add("show");
                }

                puzzleNext?.classList.add("show");
            } else {
                star.classList.add("wrong");

                setTimeout(() => {
                    star.classList.remove("wrong");
                }, 400);
            }
        });
    });

    /* =====================================================
       🔤 6. اللغز الثاني: الحروف المخفية
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
                codeLetters[index].textContent = item.dataset.letter || "";
                codeLetters[index].classList.add("revealed");
            }

            if (foundItems === hiddenItems.length) {
                hiddenArea?.classList.add("completed");

                if (codeFeedback) {
                    codeFeedback.textContent =
                        "كل حرف بيجمعنا... بيكمل الجزء الناقص في قلبي 🧩💖";
                    codeFeedback.classList.add("show");
                }

                codeNext?.classList.add("show");
            }
        });
    });

    /* =====================================================
       🌹 7. لغز الوردة
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

            // لا نشغّل afterDoor. الوردة تظل تفاعلية.
            interactiveRose.classList.add("bloom");
            roseHint?.classList.add("hide");

            setTimeout(() => {
                roseMessage?.classList.add("show");

                if (roseLyricsBox) {
                    roseLyricsBox.style.display = "block";
                }
            }, 600);

            setTimeout(() => {
                roseNextBtn?.classList.add("show");
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
       🔐 8. اللغز الرابع: الرقم السري
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
    let lockCheckVersion = 0;

    function updateLockDisplay() {
        if (lockDigit1) lockDigit1.textContent = enteredCode[0] || "_";
        if (lockDigit2) lockDigit2.textContent = enteredCode[1] || "_";
        if (lockDigit3) lockDigit3.textContent = enteredCode[2] || "_";

        if (enteredCode.length === 3) {
            checkLock();
        }
    }

    function checkLock() {
        const version = ++lockCheckVersion;

        if (enteredCode === correctCode) {
            lockSolved = true;

            if (lockFeedback) {
                lockFeedback.textContent = "اتفتح! 🔓✨";
                lockFeedback.classList.add("show");
            }

            lockBox?.classList.add("unlocked");
            lockNext?.classList.add("show");

            lockNumbers.forEach((number) => {
                number.disabled = true;
            });

        } else {
            if (lockFeedback) {
                lockFeedback.textContent = "تاريخنا المميز 🗝❤";
                lockFeedback.classList.add("show");
            }

            lockBox?.classList.add("wrong");

            setTimeout(() => {
                if (version !== lockCheckVersion || lockSolved) return;

                lockBox?.classList.remove("wrong");
                enteredCode = "";

                if (lockFeedback) {
                    lockFeedback.classList.remove("show");
                }

                updateLockDisplay();
            }, 700);
        }
    }

    lockNumbers.forEach((number) => {
        number.addEventListener("click", () => {
            if (lockSolved || enteredCode.length >= 3) return;

            enteredCode += number.dataset.number || "";
            updateLockDisplay();
        });
    });

    if (lockClear) {
        lockClear.addEventListener("click", () => {
            if (lockSolved) return;

            lockCheckVersion++;
            enteredCode = "";

            lockBox?.classList.remove("wrong");
            lockFeedback?.classList.remove("show");

            updateLockDisplay();
        });
    }

    /* =====================================================
       ➡️ 9. أزرار الانتقال بين الألغاز
    ===================================================== */

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
            showScreen(currentScreen + 1);
        });
    }

    /* =====================================================
       🚪 10. لغز الأبواب
    ===================================================== */

    const doors = document.querySelectorAll(".door");
    const doorsContainer = document.querySelector(".doors");
    const doorFeedback = document.getElementById("doorFeedback");
    const doorNext = document.getElementById("doorNext");

    doors.forEach((door) => {
        door.addEventListener("click", () => {
            if (doorsContainer?.classList.contains("completed")) return;

            if (door.dataset.door === "rose") {
                door.classList.add("correct");
                doorsContainer?.classList.add("completed");

                if (doorFeedback) {
                    doorFeedback.textContent =
                        "كُلُّ إتجاه إلى عَينكِ يأخُذني\n" +
                        "مِن أينَ أعبرُ يا كُلُّ اتجاهاتي؟";

                    doorFeedback.classList.add("show");
                }

                doorNext?.classList.add("show");

                // لا نشغّل afterDoorAudio.
                stopAllMusic();

            } else {
                door.classList.add("wrong");

                if (doorFeedback) {
                    doorFeedback.textContent =
                        "كل الطرق في الآخر بتؤدي لقلبك 🚪💖";
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
            startFloatingHearts();
            stopAllMusic();
            openLovePage();
        });
    }

    /* =====================================================
       💗 11. فتح الصفحة الأخيرة
    ===================================================== */

    function openLovePage() {
        screens.forEach((screen) => {
            screen.classList.remove("active");
            screen.style.display = "none";
        });

        if (lovePage) {
            lovePage.classList.add("visible");
        }

        document.body.classList.add("love-page-open");

        window.scrollTo(0, 0);
    }

    /* =====================================================
       🎵 12. أغنية الذكرى
    ===================================================== */

    const memoryMusicBtn = document.getElementById("memoryMusicBtn");

    if (memoryMusicBtn) {
        memoryMusicBtn.addEventListener("click", () => {
            if (!memoryAudio) return;

            if (memoryAudio.paused) {
                stopAllMusic();
                playMusic(memoryAudio);
                memoryMusicBtn.textContent = "❚❚";
            } else {
                memoryAudio.pause();
                memoryMusicBtn.textContent = "▶";
            }
        });

        if (memoryAudio) {
            memoryAudio.addEventListener("ended", () => {
                memoryMusicBtn.textContent = "▶";
            });
        }
    }

    /* =====================================================
       💖 13. تشغيل أغنية الاعتراف ورسم القلب
    ===================================================== */

    function setupConfessionSection() {
        const confession = document.getElementById("confession");
        if (!confession) return;

        if (!("IntersectionObserver" in window)) {
            initLoveHeartCanvas();
            return;
        }

        const confessionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    initLoveHeartCanvas();

                    if (!confessionPlayed) {
                        confessionPlayed = true;
                        stopAllMusic();
                        playMusic(confessionAudio);
                    }
                });
            },
            { threshold: 0.3 }
        );

        confessionObserver.observe(confession);
    }

    setupConfessionSection();

    /* =====================================================
       ✨ 14. ظهور عناصر القصة تدريجيًا
    ===================================================== */

    const storyBlocks = document.querySelectorAll(".story-block");

    if ("IntersectionObserver" in window) {
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
    } else {
        storyBlocks.forEach((block) => {
            block.classList.add("in-view");
        });
    }

});
