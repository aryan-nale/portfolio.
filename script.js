// ===== MATRIX =====
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const letters = "01アイウエオカキクケコサシスセソ";
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({ length: columns }, () => Math.random() * -100);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.globalAlpha = Math.random() * 0.5 + 0.3;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        ctx.globalAlpha = 1;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener("resize", () => {
    resizeCanvas();
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * -100);
});

// ===== TYPING =====
const typingText = [
    "> SYSTEM BOOTING...",
    "> LOADING MODULES...",
    "> VERIFYING ACCESS...",
    "> ACCESS GRANTED ✔",
    "> WELCOME TO MY PORTFOLIO."
];

const typingElement = document.getElementById("typingText");
let lineIndex = 0;
let charIndex = 0;
let fullText = typingText.join("\n");
let displayText = "";

function typeCharacter() {
    if (charIndex < fullText.length) {
        displayText += fullText.charAt(charIndex);
        typingElement.textContent = displayText;
        charIndex++;
        const delay = fullText.charAt(charIndex - 1) === "\n" ? 400 : 55;
        setTimeout(typeCharacter, delay);
    }
}

typeCharacter();

// ===== LOADER & ENTER =====
const btn = document.getElementById("enterBtn");
const overlay = document.getElementById("overlay");
const box = document.querySelector(".box");
const loader = document.getElementById("loader");
const mainContent = document.querySelector(".main-content");

// Lock scroll on start
document.documentElement.classList.add("locked");

// After 11s: hide loader, show button
setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.5s ease";
    setTimeout(() => { loader.style.display = "none"; }, 500);
    btn.style.display = "inline-block";
}, 11000);

// Enter button click
btn.addEventListener("click", () => {
    box.classList.add("box-exit");

    setTimeout(() => {
        overlay.classList.add("fade-out");
        document.documentElement.classList.remove("locked");
        document.body.classList.add("start");

        if (mainContent) {
            mainContent.style.display = "block";
        }
    }, 700);
});

// ===== NAVBAR =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
    });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(0,0,0,0.95)";
    } else {
        navbar.style.background = "rgba(0,0,0,0.85)";
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ===== SCROLL ANIMATIONS (MOBILE & DESKTOP ENHANCED) =====
const isMobileDevice = window.innerWidth <= 768 || 'ontouchstart' in window;

const observerOptions = {
    threshold: isMobileDevice ? 0.02 : 0.08,
    rootMargin: isMobileDevice ? "0px 0px 60px 0px" : "0px 0px -20px 0px"
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");

            // Auto-play videos in view
            const video = entry.target.querySelector("video");
            if (video) {
                video.play().catch(() => {});
            }
            if (isMobileDevice) {
                // Keep element visible once revealed on mobile to prevent flickering
                scrollObserver.unobserve(entry.target);
            }
        } else if (!isMobileDevice) {
            entry.target.classList.remove("show");
            const video = entry.target.querySelector("video");
            if (video) {
                video.pause();
            }
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll(".section").forEach(section => {
    section.classList.add("hidden");
    scrollObserver.observe(section);
});

// Observe project fadein-left / fadein-right separately
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-active");
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translate(0, 0)";
            const video = entry.target.querySelector("video");
            if (video) video.play().catch(() => {});
            if (isMobileDevice) {
                fadeObserver.unobserve(entry.target);
            }
        } else if (!isMobileDevice) {
            entry.target.classList.remove("fade-in-active");
            entry.target.style.opacity = "";
            entry.target.style.transform = "";
            const video = entry.target.querySelector("video");
            if (video) video.pause();
        }
    });
}, { threshold: isMobileDevice ? 0.02 : 0.08, rootMargin: isMobileDevice ? "0px 0px 60px 0px" : "0px 0px -20px 0px" });

document.querySelectorAll(".fadein-left, .fadein-right").forEach(el => {
    fadeObserver.observe(el);
});

// Observe about cards with stagger
const infoCards = document.querySelectorAll(".info-cards .card");
infoCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
    scrollObserver.observe(card);
});

// ===== CERTIFICATE SECTION =====
const viewBtn = document.getElementById("viewBtn");
const certList = document.getElementById("certList");

viewBtn.addEventListener("click", () => {
    certList.classList.toggle("active");
    viewBtn.textContent = certList.classList.contains("active")
        ? "▲ Hide Certificates"
        : "View All Certificates";
});

// ===== CERTIFICATE SLIDER TOUCH =====
const sliderTrack = document.querySelector(".slider-track");
if (sliderTrack) {
    sliderTrack.addEventListener("touchstart", () => {
        sliderTrack.style.animationPlayState = "paused";
    }, { passive: true });

    sliderTrack.addEventListener("touchend", () => {
        sliderTrack.style.animationPlayState = "running";
    }, { passive: true });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section[id]");

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            if (entry.isIntersecting) {
                document.querySelectorAll(".nav-links a").forEach(a => {
                    a.style.color = "rgba(0,255,0,0.7)";
                    a.style.fontWeight = "normal";
                    a.style.textShadow = "none";
                });
                link.style.color = "#00ff00";
                link.style.fontWeight = "bold";
                link.style.textShadow = "0 0 8px rgba(0, 255, 0, 0.4)";
            }
        }
    });
}, { threshold: 0.15, rootMargin: "-20% 0px -50% 0px" });

sections.forEach(section => navObserver.observe(section));

// ===== LANGUAGE SKILLS ANIMATION =====
const langBars = document.querySelectorAll(".lang-bar-fill");

const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute("data-width");
            entry.target.style.width = width;
        } else {
            entry.target.style.width = "0";
        }
    });
}, { threshold: 0.5 });

langBars.forEach(bar => langObserver.observe(bar));

// ===== CONTACT FORM AJAX SUBMISSION =====
const contactForm = document.querySelector(".contact-form");
const submitBtn = document.querySelector(".submit-btn");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Basic Validation
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();
        
        if (!name || !email || !message) {
            alert("Please fill out all required fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i>&nbsp; SENDING...";
        submitBtn.style.pointerEvents = "none";

        try {
            const response = await fetch("https://formsubmit.co/ajax/aaryannale0612@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _honey: contactForm.querySelector('input[name="_honey"]').value,
                    _captcha: "false",
                    _template: "box"
                })
            });

            if (response.ok) {
                submitBtn.innerHTML = "<i class='bx bx-check'></i>&nbsp; SENT SUCCESSFULLY";
                submitBtn.style.color = "#00ff00";
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.pointerEvents = "auto";
                    submitBtn.style.color = "";
                }, 4000);
            } else {
                throw new Error("Failed to send");
            }
        } catch (error) {
            submitBtn.innerHTML = "<i class='bx bx-x'></i>&nbsp; ERROR SENDING";
            submitBtn.style.color = "#ff4444";
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.pointerEvents = "auto";
                submitBtn.style.color = "";
            }, 4000);
        }
    });
}

// ===== SCROLL PROGRESS BAR =====
const scrollProgressBar = document.getElementById("scrollProgressBar");
if (scrollProgressBar) {
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        scrollProgressBar.style.width = `${scrolled}%`;
    });
}

// ===== AI CHATBOT LOGIC =====
const chatbotToggleBtn = document.getElementById("chatbotToggleBtn");
const chatbotCloseBtn = document.getElementById("chatbotCloseBtn");
const chatbotResetBtn = document.getElementById("chatbotResetBtn");
const chatbotWindow = document.getElementById("chatbotWindow");
const chatbotBody = document.getElementById("chatbotBody");
const chatbotForm = document.getElementById("chatbotForm");
const chatbotInput = document.getElementById("chatbotInput");
const chatChips = document.getElementById("chatChips");

// Toggle Chat Window
if (chatbotToggleBtn && chatbotWindow) {
    chatbotToggleBtn.addEventListener("click", () => {
        chatbotWindow.classList.toggle("chatbot-closed");
        chatbotWindow.classList.toggle("chatbot-open");
        if (chatbotWindow.classList.contains("chatbot-open")) {
            chatbotInput.focus();
        }
    });

    if (chatbotCloseBtn) {
        chatbotCloseBtn.addEventListener("click", () => {
            chatbotWindow.classList.add("chatbot-closed");
            chatbotWindow.classList.remove("chatbot-open");
        });
    }

    if (chatbotResetBtn) {
        chatbotResetBtn.addEventListener("click", () => {
            chatbotBody.innerHTML = `
                <div class="chat-msg bot-msg">
                    <div class="chat-avatar"><i class='bx bx-bot'></i></div>
                    <div class="chat-text">
                        👋 Hi! I am <strong>TRISHUL AI</strong>, the intelligent assistant for Aryan Nale. Ask me anything about Aryan's skills, robotics projects, CAD, resume, or contact details!
                    </div>
                </div>
                <div class="chat-chips-container" id="chatChips">
                    <span class="chat-chip" data-query="Who is Aryan?">👤 About Aryan</span>
                    <span class="chat-chip" data-query="What are Aryan's skills?">💪 Skills</span>
                    <span class="chat-chip" data-query="Show me projects">🚀 Projects</span>
                    <span class="chat-chip" data-query="Tell me about Resume">📄 Resume</span>
                    <span class="chat-chip" data-query="How to contact Aryan?">📬 Contact</span>
                </div>
            `;
            attachChipListeners();
        });
    }
}

// Attach listeners to suggestion chips
function attachChipListeners() {
    document.querySelectorAll(".chat-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            const query = chip.getAttribute("data-query");
            if (query) {
                handleUserMessage(query);
            }
        });
    });
}
attachChipListeners();

// Handle Form Submit
if (chatbotForm) {
    chatbotForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = chatbotInput.value.trim();
        if (text) {
            handleUserMessage(text);
            chatbotInput.value = "";
        }
    });
}

function handleUserMessage(userMsg) {
    // Hide existing chips
    const currentChips = document.querySelector(".chat-chips-container");
    if (currentChips) {
        currentChips.style.display = "none";
    }

    // Append User Message
    appendMessage(userMsg, "user-msg", "<i class='bx bx-user'></i>");

    // Show Typing Indicator
    const typingMsg = document.createElement("div");
    typingMsg.className = "chat-msg bot-msg typing-msg";
    typingMsg.innerHTML = `
        <div class="chat-avatar"><i class='bx bx-bot'></i></div>
        <div class="chat-text typing-indicator">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>
    `;
    chatbotBody.appendChild(typingMsg);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;

    // Simulate AI thinking response delay
    setTimeout(() => {
        if (typingMsg.parentNode) {
            typingMsg.parentNode.removeChild(typingMsg);
        }
        const reply = generateBotResponse(userMsg);
        appendMessage(reply, "bot-msg", "<i class='bx bx-bot'></i>");
    }, 600);
}

function appendMessage(text, msgType, avatarIcon) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${msgType}`;
    msgDiv.innerHTML = `
        <div class="chat-avatar">${avatarIcon}</div>
        <div class="chat-text">${text}</div>
    `;
    chatbotBody.appendChild(msgDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function generateBotResponse(input) {
    const query = input.toLowerCase();

    if (query.includes("who") || query.includes("about") || query.includes("aryan") || query.includes("student") || query.includes("bio")) {
        return "<strong>Aryan Nale</strong> is a 1st-Year Mechanical Engineering student passionate about robotics, web development, CAD modeling, and automation. He loves building practical real-world engineering solutions!";
    }
    if (query.includes("skill") || query.includes("python") || query.includes("cad") || query.includes("solidwork") || query.includes("fusion") || query.includes("c++") || query.includes("language")) {
        return "🛠️ <strong>Aryan's Core Skills:</strong><br>• <strong>CAD & Design:</strong> Fusion 360, SolidWorks, AutoCAD<br>• <strong>Programming:</strong> Python, C, C++, HTML5/CSS3, JavaScript<br>• <strong>Robotics & AI:</strong> ROS 1 & 2, OpenCV, Arduino, SQL<br>• <strong>Languages:</strong> English (99%), Marathi (99%), Hindi (99%), German (60%)";
    }
    if (query.includes("project") || query.includes("work") || query.includes("car") || query.includes("lock") || query.includes("plant") || query.includes("club") || query.includes("rmc")) {
        return "🚀 <strong>Featured Projects:</strong><br>1. 🌐 <strong>College RMC Club Website</strong> - Modern responsive UI & event showcase<br>2. 💼 <strong>Modern Portfolio</strong> - Matrix themed interactive website<br>3. 🔒 <strong>Automated Door Lock System</strong> - Keypad & Servo password security<br>4. 🌱 <strong>Automated Plant Monitoring</strong> - Smart soil moisture & irrigation<br>5. 🚗 <strong>RC Bluetooth Car</strong> - Arduino & HC-05 wireless control";
    }
    if (query.includes("resume") || query.includes("cv") || query.includes("download") || query.includes("education") || query.includes("batch")) {
        return "📄 <strong>Resume Overview:</strong><br>• <strong>Degree:</strong> Mechanical Engineering (Batch 2025-2029)<br>• <strong>Highlights:</strong> 5+ Projects, 5+ Certifications, Robotics & CAD expertise.<br>You can click <strong>'DOWNLOAD RESUME'</strong> in the Resume section on the page!";
    }
    if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("mail") || query.includes("call") || query.includes("instagram") || query.includes("linkedin") || query.includes("github")) {
        return "📬 <strong>Get in Touch with Aryan:</strong><br>• 📞 <strong>Phone:</strong> +91 81778 90775<br>• ✉️ <strong>Email:</strong> aaryannale0612@gmail.com<br>• 💬 <strong>Socials:</strong> WhatsApp, Instagram (@a.s.n._012), LinkedIn, GitHub (aryan-nale)";
    }
    if (query.includes("certificate") || query.includes("cert") || query.includes("award") || query.includes("internship")) {
        return "📜 <strong>Certificates:</strong><br>• Python Certificate (Intellipaat)<br>• Microsoft SQL Certificate<br>• Robotics Internship Certificate<br>• Robotics Project & Course Completion Certificates";
    }
    if (query.includes("hi") || query.includes("hello") || query.includes("hey") || query.includes("greetings")) {
        return "👋 Hello there! I am <strong>TRISHUL AI</strong>. How can I assist you with Aryan's portfolio today?";
    }
    if (query.includes("robot") || query.includes("robotics") || query.includes("ros") || query.includes("automation")) {
        return "🤖 <strong>Robotics & Automation:</strong><br>Aryan works with ROS 1 & 2, OpenCV computer vision, and Arduino hardware controllers to build smart autonomous systems!";
    }

    return "🤖 I'm TRISHUL AI! Ask me about:<br>• Aryan's <strong>skills</strong> & <strong>CAD</strong> experience<br>• <strong>Projects</strong> (RC Car, Door Lock, Plant Monitor)<br>• <strong>Resume</strong> & <strong>Certificates</strong><br>• <strong>Contact info</strong> & phone/email";
}

// ===== SMOOTH 3D TILT EFFECT ON CARDS (DESKTOP ONLY) =====
if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.card, .skill-card, .resume-preview, .project-vidbox, .lang-box').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerY) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
