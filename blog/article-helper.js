// Nexus Performance Marketing — Article Page Helper & Scrollspy
document.addEventListener("DOMContentLoaded", () => {
  // 1. Reading Progress Bar
  const progressBar = document.getElementById("readingProgress");
  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  // 2. Table of Contents Scrollspy
  const tocItems = document.querySelectorAll(".toc-item");
  const sections = document.querySelectorAll(".article-section");

  if (sections.length > 0 && tocItems.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            tocItems.forEach((item) => {
              const link = item.querySelector("a");
              if (link && link.getAttribute("href") === `#${id}`) {
                item.classList.add("active");
              } else {
                item.classList.remove("active");
              }
            });
          }
        });
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  // 3. Mobile TOC Accordion Toggle
  const mobileTocToggle = document.getElementById("mobileTocToggle");
  const mobileTocContent = document.getElementById("mobileTocContent");

  if (mobileTocToggle && mobileTocContent) {
    mobileTocToggle.addEventListener("click", () => {
      const isOpen = mobileTocContent.classList.toggle("open");
      mobileTocToggle.setAttribute("aria-expanded", String(isOpen));
      mobileTocToggle.querySelector(".toc-arrow").textContent = isOpen ? "▲" : "▼";
    });
  }

  // 4. Share Links: Copy Link Action with Toast Notification
  const copyBtn = document.getElementById("copyLinkBtn");
  const toast = document.getElementById("copyToast");

  if (copyBtn) {
    copyBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(window.location.href);
        if (toast) {
          toast.classList.add("show");
          setTimeout(() => {
            toast.classList.remove("show");
          }, 2400);
        }
      } catch (err) {
        // Fallback for older browsers
        const temp = document.createElement("input");
        temp.value = window.location.href;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        if (toast) {
          toast.classList.add("show");
          setTimeout(() => {
            toast.classList.remove("show");
          }, 2400);
        }
      }
    });
  }
});
