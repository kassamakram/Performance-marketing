const fs = require('fs');
const path = require('path');
const { articlesData } = require('./articles-data.js');

const blogDir = __dirname;

function renderCard(art) {
  return `
          <a href="/blog/${art.slug}/" class="article-card" data-category="${art.category}">
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
          </a>`;
}

articlesData.forEach(art => {
  // If slug is performance-marketing-data-growth, we can re-generate or ensure consistency
  const articleFolder = path.join(blogDir, art.slug);
  if (!fs.existsSync(articleFolder)) {
    fs.mkdirSync(articleFolder, { recursive: true });
  }

  // Related articles (pick 3)
  const related = (art.relatedSlugs || [])
    .map(slug => articlesData.find(a => a.slug === slug))
    .filter(Boolean);
  
  // If fewer than 3, fill with other articles
  if (related.length < 3) {
    articlesData.forEach(a => {
      if (a.slug !== art.slug && !related.includes(a) && related.length < 3) {
        related.push(a);
      }
    });
  }

  const relatedHtml = related.map(renderCard).join('\n');

  const tocHtml = (art.toc || []).map((t, idx) => `
            <li class="toc-item${idx === 0 ? ' active' : ''}"><a href="#${t.id}">${t.title}</a></li>`).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${art.title} — Nexus Insights</title>
  <meta name="description" content="${art.metaDescription || art.excerpt}">
  <link rel="canonical" href="/blog/${art.slug}/">

  <!-- Open Graph / Social Meta -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="/blog/${art.slug}/">
  <meta property="og:title" content="${art.title}">
  <meta property="og:description" content="${art.excerpt}">
  <meta property="og:image" content="${art.image}">
  <meta property="article:published_time" content="2026-09-24T09:00:00Z">
  <meta property="article:section" content="${art.category}">
  <meta property="article:author" content="${art.author}">

  <!-- Twitter Meta -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${art.title}">
  <meta name="twitter:description" content="${art.excerpt}">
  <meta name="twitter:image" content="${art.image}">

  <!-- Schema.org Article Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${art.title.replace(/"/g, '\\"')}",
    "description": "${(art.metaDescription || art.excerpt).replace(/"/g, '\\"')}",
    "image": "${art.image}",
    "datePublished": "2026-09-24T09:00:00Z",
    "dateModified": "2026-09-24T09:00:00Z",
    "author": {
      "@type": "Organization",
      "name": "${art.author}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nexus",
      "logo": {
        "@type": "ImageObject",
        "url": "/assets/icon-1.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "/blog/${art.slug}/"
    }
  }
  </script>

  <!-- Fonts (Matching existing Nexus typography) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&display=swap" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="/components/header-footer.css">
  <link rel="stylesheet" href="/blog/blog.css">
</head>
<body>

  <!-- Top Reading Progress Indicator -->
  <div class="reading-progress-bar" id="readingProgress" aria-hidden="true"></div>

  <!-- Shared Nexus Header -->
  <div id="shared-header"></div>

  <main id="main-content">

    <!-- ================= 1. ARTICLE HERO ================= -->
    <header class="article-hero">
      <div class="wrap">
        
        <!-- Breadcrumbs Navigation -->
        <nav class="article-breadcrumbs" aria-label="Breadcrumbs">
          <a href="/">Home</a>
          <span class="sep">/</span>
          <a href="/blog/">Insights</a>
          <span class="sep">/</span>
          <span>${art.category}</span>
        </nav>

        <!-- Eyebrow -->
        <div class="article-hero-eyebrow">
          ${art.category} <b>/</b> INSIGHTS
        </div>

        <!-- Large Title -->
        <h1 class="article-hero-title">
          ${art.title}
        </h1>

        <!-- Concise Article Introduction -->
        <p class="article-hero-lede">
          ${art.excerpt}
        </p>

        <!-- Metadata -->
        <div class="article-hero-meta">
          <span>${art.date}</span>
          <span>&bull;</span>
          <span>${art.readingTime}</span>
          <span>&bull;</span>
          <span class="author">By ${art.author}</span>
        </div>

      </div>
    </header>

    <!-- ================= 2. ARTICLE FEATURED IMAGE ================= -->
    <section class="wrap">
      <div class="article-featured-image-wrap">
        <img class="article-featured-image" src="${art.image}" alt="${art.title}">
        <div class="article-featured-caption">
          <span>Figure 1.0 &mdash; Nexus ${art.category} Performance Analysis</span>
          <span>Performance Intelligence</span>
        </div>
      </div>
    </section>

    <!-- ================= 3. TWO-COLUMN ARTICLE CONTENT LAYOUT ================= -->
    <div class="wrap article-layout">

      <!-- LEFT COLUMN: Sticky Table of Contents & Share Area (Desktop) -->
      <aside class="article-sidebar" aria-label="Article Navigation &amp; Sharing">
        
        <div class="toc-card">
          <div class="toc-heading">CONTENTS</div>
          <ul class="toc-list" id="desktopToc">${tocHtml}
          </ul>
        </div>

        <div class="share-block">
          <div class="share-label">SHARE INSIGHT</div>
          <div class="share-links">
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fnexus.agency%2Fblog%2F${art.slug}" target="_blank" rel="noopener noreferrer" class="share-btn" aria-label="Share on LinkedIn">
              <span>LinkedIn</span>
            </a>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(art.title)}&url=https%3A%2F%2Fnexus.agency%2Fblog%2F${art.slug}" target="_blank" rel="noopener noreferrer" class="share-btn" aria-label="Share on X">
              <span>X (Twitter)</span>
            </a>
            <button type="button" class="share-btn" id="copyLinkBtn" aria-label="Copy article link to clipboard">
              <span>Copy link</span>
            </button>
          </div>
        </div>

      </aside>

      <!-- RIGHT COLUMN: Article Content -->
      <article class="article-content">

        <!-- Mobile Collapsible Table of Contents -->
        <button class="mobile-toc-toggle" id="mobileTocToggle" type="button" aria-expanded="false" aria-controls="mobileTocContent">
          <span>Table of Contents</span>
          <span class="toc-arrow" aria-hidden="true">&#9660;</span>
        </button>
        <div class="mobile-toc-content" id="mobileTocContent">
          <div class="toc-card">
            <ul class="toc-list">${tocHtml}
            </ul>
          </div>
        </div>

        <!-- Main Body Content -->
        ${art.content}

      </article>

    </div>

    <!-- ================= 4. RELATED ARTICLES ================= -->
    <section class="related-section">
      <div class="wrap">
        
        <div class="related-header">
          <div class="eyebrow">KEEP READING</div>
          <h2>More Insights</h2>
        </div>

        <div class="articles-grid">
${relatedHtml}
        </div>

      </div>
    </section>

    <!-- ================= 5. FINAL ARTICLE CTA ================= -->
    <section class="cta" id="contact">
      <div class="wrap">
        <span class="eyebrow">READY FOR YOUR NEXT GROWTH MOVE?</span>
        <div class="cta-in">
          <div>
            <h2>Let's Build What's Next.</h2>
            <p>Nexus combines strategy, media, creative, and measurement to help brands turn marketing investment into measurable growth.</p>
            <p class="strong">Let's talk about where your marketing spend should go next.</p>
          </div>
          <div class="acts">
            <a class="btn" href="/contact/">Let's Talk Growth <span class="ar">&rarr;</span></a>
            <a class="btn ghost" href="/services/">See Our Services <span class="ar">&rarr;</span></a>
          </div>
        </div>
      </div>
      <div class="ghost-type">SCALABLE GROWTH</div>
    </section>

  </main>

  <!-- Toast Notification for Link Copying -->
  <div class="copy-toast" id="copyToast" role="status" aria-live="polite">Article link copied to clipboard</div>

  <!-- Shared Nexus Footer -->
  <div id="shared-footer"></div>

  <!-- Scripts -->
  <script src="/components/components.js"></script>
  <script src="/blog/article-helper.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(articleFolder, 'index.html'), html.trim());
  console.log(`Generated: blog/${art.slug}/index.html`);
});
console.log('All articles generated successfully!');
