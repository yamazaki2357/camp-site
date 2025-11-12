// 共通部分（header, footer）を読み込む関数
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
    }
  } catch (error) {
    console.error(`Error loading component from ${filePath}:`, error);
  }
}

// ページ読み込み時に共通部分を挿入
document.addEventListener('DOMContentLoaded', async function() {
  await loadComponent('header-placeholder', 'includes/header.html');
  await loadComponent('footer-placeholder', 'includes/footer.html');

  // ナビゲーションのアクティブ状態を設定
  setActiveNav();

  // トップへ戻るボタンを設置
  setupBackToTop();
});

// 現在のページに応じてナビゲーションのアクティブ状態を設定
function setActiveNav() {
  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
  const navLinks = document.querySelectorAll('.site-nav a');

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(/\/index\.html$/, '/');
    if (currentPath === linkPath) {
      link.classList.add('active');
    }
  });
}

// トップへ戻るボタン
function setupBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'トップへ戻る');
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5l7 7-1.41 1.41L13 9.83V19h-2V9.83L6.41 13.41 5 12z"/></svg>';
  document.body.appendChild(btn);

  function toggle() {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 目次（TOC）を自動生成する関数
function generateTOC() {
  const content = document.querySelector('.post-content');
  const tocContainer = document.querySelector('.table-of-contents ul');

  if (!content || !tocContainer) return;

  const headings = content.querySelectorAll('h2');

  if (headings.length === 0) {
    const tocElement = document.querySelector('.table-of-contents');
    if (tocElement) tocElement.style.display = 'none';
    return;
  }

  headings.forEach((heading, index) => {
    // 見出しにIDを付与
    const id = `heading-${index}`;
    heading.id = id;

    // 目次リストアイテムを作成
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.textContent = heading.textContent;
    li.appendChild(a);
    tocContainer.appendChild(li);
  });
}

// スムーズスクロール
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 記事ページの場合、TOCを生成
  if (document.querySelector('.post-content')) {
    generateTOC();
  }
});
