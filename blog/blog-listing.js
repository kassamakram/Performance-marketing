// Nexus Performance Marketing — Blog Listing Controller
document.addEventListener("DOMContentLoaded", () => {
  // Support dynamic ?slug=... navigation if used
  const urlParams = new URLSearchParams(window.location.search);
  const slugParam = urlParams.get("slug") || urlParams.get("article");
  if (slugParam) {
    window.location.href = `/blog/${slugParam}/`;
    return;
  }

  const gridContainer = document.getElementById("articlesGrid");
  const countIndicator = document.getElementById("articleCount");
  const categoryPills = document.querySelectorAll(".cat-pill");

  if (!gridContainer || typeof articlesData === "undefined") return;

  // Filter out the main featured article for the standard grid, or show all non-featured
  const nonFeaturedArticles = articlesData.filter(a => !a.featured);

  function renderArticles(selectedCategory = "ALL") {
    gridContainer.innerHTML = "";

    const filtered = selectedCategory === "ALL" 
      ? nonFeaturedArticles 
      : nonFeaturedArticles.filter(a => a.category.toUpperCase() === selectedCategory.toUpperCase());

    if (countIndicator) {
      countIndicator.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? 'Insight' : 'Insights'}`;
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; border: 1px dashed var(--line); border-radius: 6px; background: #FAF9F7;">
          <p style="font-size: 15px; color: var(--muted); font-weight: 600; margin: 0 0 14px;">No articles found in this category yet.</p>
          <button class="btn sm" onclick="window.nexusFilterCategory('ALL')">View All Insights <span class="ar">&rarr;</span></button>
        </div>
      `;
      return;
    }

    filtered.forEach((art, index) => {
      const card = document.createElement("a");
      card.href = `/blog/${art.slug}/`;
      card.className = "article-card";
      card.setAttribute("data-category", art.category);
      card.setAttribute("aria-label", art.title);

      card.innerHTML = `
        <div class="article-card-thumb">
          <img src="${art.image}" alt="${art.title}" loading="lazy">
        </div>
        <div class="article-card-body">
          <div class="article-card-eyebrow">
            <span class="num">${art.number} <b>/</b></span>
            <span>${art.category}</span>
          </div>
          <h3 class="article-card-title">${art.title}</h3>
          <p class="article-card-excerpt">${art.excerpt}</p>
          <div class="article-card-footer">
            <span>${art.date} &bull; ${art.readingTime}</span>
            <span class="arrow">&rarr;</span>
          </div>
        </div>
      `;

      gridContainer.appendChild(card);
    });
  }

  // Category filtering interaction
  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const category = pill.getAttribute("data-category") || "ALL";
      renderArticles(category);

      // Smooth scroll if category was clicked when scrolled past filter
      const filterSection = document.querySelector(".category-nav-section");
      if (filterSection) {
        const rect = filterSection.getBoundingClientRect();
        if (rect.top < 0) {
          filterSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Global helper for resetting filters
  window.nexusFilterCategory = function(catName) {
    categoryPills.forEach(p => {
      if (p.getAttribute("data-category") === catName) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });
    renderArticles(catName);
  };

  // Initial render
  renderArticles("ALL");
});
