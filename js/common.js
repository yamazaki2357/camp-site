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
  await loadComponent('header-placeholder', '/includes/header.html');
  await loadComponent('footer-placeholder', '/includes/footer.html');

  // ナビゲーションのアクティブ状態を設定
  setActiveNav();
});

// 現在のページに応じてナビゲーションのアクティブ状態を設定
function setActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.site-nav a');

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath || (currentPath === '/' && linkPath.includes('index.html'))) {
      link.style.fontWeight = '700';
      link.style.textDecoration = 'underline';
    }
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
