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

// ===== AI CHATBOT LOGIC (v4.12 - OPENAI ENHANCED) =====
const chatbotToggleBtn = document.getElementById("chatbotToggleBtn");
const chatbotCloseBtn = document.getElementById("chatbotCloseBtn");
const chatbotResetBtn = document.getElementById("chatbotResetBtn");
const chatbotSettingsBtn = document.getElementById("chatbotSettingsBtn");
const chatbotSettingsPanel = document.getElementById("chatbotSettingsPanel");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const saveKeyBtn = document.getElementById("saveKeyBtn");
const clearKeyBtn = document.getElementById("clearKeyBtn");
const openaiKeyInput = document.getElementById("openaiKeyInput");
const openaiModelSelect = document.getElementById("openaiModelSelect");
const chatbotStatusText = document.getElementById("chatbotStatusText");

const chatbotWindow = document.getElementById("chatbotWindow");
const chatbotBody = document.getElementById("chatbotBody");
const chatbotForm = document.getElementById("chatbotForm");
const chatbotInput = document.getElementById("chatbotInput");

// Update status text on load
function updateStatusIndicator() {
    const savedKey = localStorage.getItem("openai_api_key");
    const savedModel = localStorage.getItem("openai_model") || "gpt-4o-mini";
    if (chatbotStatusText) {
        if (savedKey && savedKey.trim().startsWith("sk-")) {
            chatbotStatusText.innerHTML = `ONLINE &nbsp;|&nbsp; OPENAI (${savedModel})`;
        } else {
            chatbotStatusText.innerHTML = `ONLINE &nbsp;|&nbsp; TRISHUL AI v4.12 READY`;
        }
    }
}
updateStatusIndicator();

// Settings Panel Logic
if (chatbotSettingsBtn && chatbotSettingsPanel) {
    chatbotSettingsBtn.addEventListener("click", () => {
        chatbotSettingsPanel.classList.toggle("chatbot-settings-closed");
        chatbotSettingsPanel.classList.toggle("chatbot-settings-open");
        const savedKey = localStorage.getItem("openai_api_key") || "";
        const savedModel = localStorage.getItem("openai_model") || "gpt-4o-mini";
        if (openaiKeyInput) openaiKeyInput.value = savedKey;
        if (openaiModelSelect) openaiModelSelect.value = savedModel;
    });

    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener("click", () => {
            chatbotSettingsPanel.classList.add("chatbot-settings-closed");
            chatbotSettingsPanel.classList.remove("chatbot-settings-open");
        });
    }

    if (saveKeyBtn) {
        saveKeyBtn.addEventListener("click", () => {
            const key = openaiKeyInput ? openaiKeyInput.value.trim() : "";
            const model = openaiModelSelect ? openaiModelSelect.value : "gpt-4o-mini";
            if (key) {
                localStorage.setItem("openai_api_key", key);
            } else {
                localStorage.removeItem("openai_api_key");
            }
            localStorage.setItem("openai_model", model);
            updateStatusIndicator();
            chatbotSettingsPanel.classList.add("chatbot-settings-closed");
            chatbotSettingsPanel.classList.remove("chatbot-settings-open");
            appendMessage(`✅ <strong>OpenAI Settings Saved!</strong> Using model: <code>${model}</code>.`, "bot-msg", "<i class='bx bx-check-circle'></i>");
        });
    }

    if (clearKeyBtn) {
        clearKeyBtn.addEventListener("click", () => {
            localStorage.removeItem("openai_api_key");
            if (openaiKeyInput) openaiKeyInput.value = "";
            updateStatusIndicator();
            appendMessage(`🗑️ <strong>OpenAI API Key cleared.</strong> Switched to built-in TRISHUL AI v4.12 trained offline engine.`, "bot-msg", "<i class='bx bx-info-circle'></i>");
        });
    }
}

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
                        👋 Hi! I am <strong>TRISHUL AI v4.12</strong>, the intelligent assistant for Aryan Nale. Ask me anything about Aryan's skills, robotics projects, CAD, resume, or contact details!
                    </div>
                </div>
                <div class="chat-chips-container" id="chatChips">
                    <span class="chat-chip" data-query="Who is Aryan?">👤 About Aryan</span>
                    <span class="chat-chip" data-query="What are Aryan's skills?">💪 Skills & CAD</span>
                    <span class="chat-chip" data-query="Show me projects">🚀 5 Projects</span>
                    <span class="chat-chip" data-query="Tell me about Resume">📄 Resume</span>
                    <span class="chat-chip" data-query="How to contact Aryan?">📬 Contact</span>
                    <span class="chat-chip" data-query="OpenAI Settings">⚙️ OpenAI API</span>
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
            if (query === "OpenAI Settings") {
                if (chatbotSettingsBtn) chatbotSettingsBtn.click();
            } else if (query) {
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

// Conversation History for OpenAI context
let chatHistory = [];

async function handleUserMessage(userMsg) {
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

    const apiKey = localStorage.getItem("openai_api_key");
    const model = localStorage.getItem("openai_model") || "gpt-4o-mini";

    let reply = "";

    if (apiKey && apiKey.trim().startsWith("sk-")) {
        try {
            reply = await fetchOpenAIReponse(userMsg, apiKey, model);
        } catch (err) {
            console.warn("OpenAI API call failed, falling back to offline engine:", err);
            reply = generateOfflineResponse(userMsg) + `<br><small style="color:rgba(255,180,0,0.8);">⚠️ (OpenAI API call failed: ${err.message}. Showing offline answer)</small>`;
        }
    } else {
        // Use trained offline engine with artificial delay
        await new Promise(res => setTimeout(res, 500));
        reply = generateOfflineResponse(userMsg);
    }

    // Remove typing indicator
    if (typingMsg.parentNode) {
        typingMsg.parentNode.removeChild(typingMsg);
    }

    appendMessage(reply, "bot-msg", "<i class='bx bx-bot'></i>");
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

// Fetch live response from OpenAI API
async function fetchOpenAIReponse(userInput, apiKey, model) {
    const systemPrompt = `You are TRISHUL AI v4.12, the official assistant for Aryan Nale's engineering portfolio.
Keep answers friendly, clear, professional, concise, and formatted using HTML tags (like <strong>, <ul>, <li>, <br>).

Portfolio Knowledge Base for Aryan Nale:
- Name: Aryan Nale
- Background: 1st/2nd Year Mechanical Engineering Student (Batch 2025-2029).
- Interests: Mechanical Engineering, Robotics, Web Development, Automation, 3D CAD Modeling.
- CAD Skills: Fusion 360, SolidWorks, AutoCAD.
- Programming Skills: Python (75%), C, C++, Microsoft SQL, ROS 1 & ROS 2, OpenCV (Computer Vision), HTML5/CSS3, JavaScript.
- Languages: English (99%), Marathi (99%), Hindi (99%), German (60%).
- 5 Key Projects:
  1. College RMC Club Website (HTML/CSS/JS)
  2. Modern Matrix Portfolio (HTML/CSS/Canvas)
  3. Automated Door Lock System (Arduino, Keypad, Servo, C++)
  4. Automated Plant Monitoring (Arduino, Soil moisture sensor, C++)
  5. RC Bluetooth Car (Arduino, HC-05/HC-35, C++)
- Certifications: Python (Intellipaat), MS SQL, Power BI, Robotics Internship, Robotics Project & Course Completion.
- Contact Info: Phone (+91 81778 90775), Email (aaryannale0612@gmail.com), WhatsApp, Instagram (@a.s.n._012), GitHub (aryan-nale), LinkedIn (aryan-nale-0612asn).`;

    chatHistory.push({ role: "user", content: userInput });
    if (chatHistory.length > 8) chatHistory = chatHistory.slice(-8);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: "system", content: systemPrompt },
                ...chatHistory
            ],
            max_tokens: 350,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error ? errorData.error.message : `HTTP status ${response.status}`);
    }

    const data = await response.json();
    const botReply = data.choices[0].message.content;
    chatHistory.push({ role: "assistant", content: botReply });
    return botReply;
}

// Deep Trained Offline NLP Engine (Version 4.12)
function generateOfflineResponse(input) {
    const query = input.toLowerCase();

    if (query.includes("who") || query.includes("about") || query.includes("aryan") || query.includes("student") || query.includes("bio") || query.includes("background")) {
        return `<strong>Aryan Nale</strong> is a Mechanical Engineering student (Batch 2025-2029) passionate about <strong>Robotics, 3D CAD modeling, Web Development, and Automation</strong>.<br><br>He focuses on bridging hardware engineering with smart software logic to construct real-world solutions!
        <div class="chat-action-group">
          <a class="chat-action-btn" onclick="document.querySelector('#about').scrollIntoView({behavior:'smooth'})"><i class='bx bx-user'></i> About Section</a>
          <a class="chat-action-btn" onclick="document.querySelector('#contact').scrollIntoView({behavior:'smooth'})"><i class='bx bx-envelope'></i> Contact Aryan</a>
        </div>`;
    }

    if (query.includes("skill") || query.includes("cad") || query.includes("solidwork") || query.includes("fusion") || query.includes("autocad") || query.includes("python") || query.includes("c++") || query.includes("language") || query.includes("ros") || query.includes("opencv")) {
        return `🛠️ <strong>Aryan's Core Technical Skills (v4.12):</strong>
        <ul>
          <li><strong>3D CAD & Modeling:</strong> Fusion 360, SolidWorks, AutoCAD</li>
          <li><strong>Programming & DB:</strong> Python (75%), C/C++, HTML5/CSS3, JavaScript, Microsoft SQL</li>
          <li><strong>Robotics & AI:</strong> ROS 1 & 2, OpenCV, Arduino R3, Sensors, Automation</li>
          <li><strong>Languages:</strong> English (99%), Marathi (99%), Hindi (99%), German (60%)</li>
        </ul>
        <div class="chat-action-group">
          <a class="chat-action-btn" onclick="document.querySelector('#skills').scrollIntoView({behavior:'smooth'})"><i class='bx bx-laptop'></i> View Skills Section</a>
        </div>`;
    }

    if (query.includes("project") || query.includes("work") || query.includes("car") || query.includes("lock") || query.includes("plant") || query.includes("club") || query.includes("rmc")) {
        return `🚀 <strong>Aryan's Featured Projects (5 Core Projects):</strong>
        <ol>
          <li>🌐 <strong>College RMC Club Website</strong> - Modern event & club portal</li>
          <li>💼 <strong>Cyber Matrix Portfolio</strong> - Interactive UI with TRISHUL AI v4.12</li>
          <li>🔒 <strong>Automated Door Lock System</strong> - Keypad & Servo security (Arduino)</li>
          <li>🌱 <strong>Automated Plant Monitoring</strong> - Soil moisture & auto watering</li>
          <li>🚗 <strong>RC Bluetooth Car</strong> - Arduino & HC-05/35 wireless vehicle</li>
        </ol>
        <div class="chat-action-group">
          <a class="chat-action-btn" onclick="document.querySelector('#projects').scrollIntoView({behavior:'smooth'})"><i class='bx bx-code-alt'></i> Explore All Projects</a>
        </div>`;
    }

    if (query.includes("resume") || query.includes("cv") || query.includes("download") || query.includes("education") || query.includes("batch")) {
        return `📄 <strong>Resume & Academic Profile:</strong><br>
        • <strong>Degree:</strong> Mechanical Engineering (Batch 2025-2029)<br>
        • <strong>Highlights:</strong> 5+ Projects, 5+ Certifications, CAD & Robotics Expertise.<br><br>
        <div class="chat-action-group">
          <a class="chat-action-btn" href="YOUR_RESUME.pdf" download="Aryan_Nale_Resume.pdf"><i class='bx bx-download'></i> Download Resume</a>
          <a class="chat-action-btn" onclick="document.querySelector('#resume').scrollIntoView({behavior:'smooth'})"><i class='bx bx-file'></i> View Resume Section</a>
        </div>`;
    }

    if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("mail") || query.includes("call") || query.includes("instagram") || query.includes("linkedin") || query.includes("github") || query.includes("whatsapp")) {
        return `📬 <strong>Contact Details for Aryan Nale:</strong><br>
        • 📞 <strong>Phone:</strong> +91 81778 90775<br>
        • ✉️ <strong>Email:</strong> aaryannale0612@gmail.com<br><br>
        <div class="chat-action-group">
          <a class="chat-action-btn" href="tel:+918177890775"><i class='bx bxs-phone'></i> Call</a>
          <a class="chat-action-btn" href="https://wa.me/918177890775" target="_blank"><i class='bx bxl-whatsapp'></i> WhatsApp</a>
          <a class="chat-action-btn" href="mailto:aaryannale0612@gmail.com"><i class='bx bxl-gmail'></i> Email</a>
          <a class="chat-action-btn" href="https://github.com/aryan-nale" target="_blank"><i class='bx bxl-github'></i> GitHub</a>
          <a class="chat-action-btn" href="https://www.linkedin.com/in/aryan-nale-0612asn" target="_blank"><i class='bx bxl-linkedin'></i> LinkedIn</a>
        </div>`;
    }

    if (query.includes("certificate") || query.includes("cert") || query.includes("award") || query.includes("internship")) {
        return `📜 <strong>Verified Certifications:</strong><br>
        • Python Certificate (Intellipaat)<br>
        • Microsoft SQL Certificate (Intellipaat)<br>
        • Power BI Certificate (Intellipaat)<br>
        • Robotics Internship Certificate (EGIC0303)<br>
        • Robotics Project & Course Certificates (EGPC1458 / EGCC1589)<br>
        <div class="chat-action-group">
          <a class="chat-action-btn" onclick="document.querySelector('#certifications').scrollIntoView({behavior:'smooth'})"><i class='bx bx-award'></i> View Certificates</a>
        </div>`;
    }

    if (query.includes("openai") || query.includes("gpt") || query.includes("key") || query.includes("version") || query.includes("4.12") || query.includes("ai")) {
        return `🤖 <strong>TRISHUL AI v4.12 Specs:</strong><br>
        • <strong>Engine:</strong> OpenAI Powered (supports live API calls via OpenAI key or offline dataset)<br>
        • <strong>Capabilities:</strong> Instant portfolio queries, interactive section navigation, direct contact triggers, and custom prompt responses.<br>
        Click <strong>OpenAI Settings (⚙️)</strong> in the top header to configure your API key!`;
    }

    if (query.includes("hi") || query.includes("hello") || query.includes("hey") || query.includes("greetings")) {
        return "👋 Hello! I am <strong>TRISHUL AI v4.12</strong>, the intelligent assistant for Aryan Nale. How can I assist you with Aryan's engineering portfolio today?";
    }

    if (query.includes("robot") || query.includes("robotics") || query.includes("ros") || query.includes("automation")) {
        return "🤖 <strong>Robotics & Automation Focus:</strong><br>Aryan specializes in ROS 1 & 2, OpenCV vision algorithms, Arduino controllers, and smart sensor automation for autonomous robotics development!";
    }

    return `🤖 <strong>TRISHUL AI v4.12 Ready!</strong><br>Ask me about:<br>
    • <strong>Aryan's Bio & Engineering Focus</strong><br>
    • <strong>CAD (Fusion 360, SolidWorks, AutoCAD) & Coding Skills</strong><br>
    • <strong>5 Featured Projects</strong> (RC Car, Plant Monitor, Door Lock)<br>
    • <strong>Resume, Certifications & Contact Details</strong>`;
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
