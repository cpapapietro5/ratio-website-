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

// ---------- Waitlist forms (Netlify Forms) ----------
function encodeFormData(form) {
  return new URLSearchParams(new FormData(form)).toString();
}

function handleWaitlistSubmit(formId, successId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitButton = form.querySelector("button[type=submit]");
    const originalLabel = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Joining…";

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData(form),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Form submission failed: " + response.status);
        const success = document.getElementById(successId);
        form.reset();
        form.classList.add("hidden");
        if (success) success.classList.add("visible");
      })
      .catch((error) => {
        console.error("[Ratiō waitlist] Submission error:", error);
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
        alert("Something went wrong submitting the form. Please try again in a moment.");
      });
  });
}

handleWaitlistSubmit("waitlist-form", "form-success");
handleWaitlistSubmit("waitlist-form-2", "form-success-2");

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
