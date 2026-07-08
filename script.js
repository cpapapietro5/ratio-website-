// ---------- Nav scroll state ----------
const nav = document.getElementById("nav");
if (nav) {
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}

// ---------- Waitlist forms ----------
// TODO: wire this up to a real email service (e.g. Netlify Forms, Mailchimp, ConvertKit).
// For now, submissions are just logged to the console.
function handleWaitlistSubmit(formId, inputId, successId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById(inputId);
    const email = input.value.trim();

    if (!email) return;

    console.log("[Ratiō waitlist] New signup:", {
      email,
      source: formId,
      timestamp: new Date().toISOString(),
    });

    const success = document.getElementById(successId);
    form.classList.add("hidden");
    if (success) success.classList.add("visible");
    input.value = "";
  });
}

handleWaitlistSubmit("waitlist-form", "waitlist-email", "form-success");
handleWaitlistSubmit("waitlist-form-2", "waitlist-email-2", "form-success-2");

// ---------- Mobile nav menu ----------
const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");

function closeMobileMenu() {
  if (!navToggle || !mobileMenu) return;
  mobileMenu.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu.classList.contains("open")) return;
    if (!mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });
}
