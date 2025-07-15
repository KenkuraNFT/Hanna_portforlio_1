// Mobile nav toggle
document.querySelector('.burger').onclick = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.header__nav');
    
    // ナビゲーションの開閉
    document.body.classList.toggle('nav-open');
    
    // ハンバーガーボタンの状態を更新
    const isOpen = document.body.classList.contains('nav-open');
    burger.setAttribute('aria-expanded', isOpen);
    
    // スクロール位置を記憶
    const scrollPosition = window.scrollY;
    if (isOpen) {
        document.body.style.top = `-${scrollPosition}px`;
    } else {
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }
};

// ナビゲーションリンクの処理
const navLinks = document.querySelectorAll('.nav-link');

// ナビゲーションリンククリック時の自動閉じ
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        document.querySelector('.burger').setAttribute('aria-expanded', 'false');
    });
});

// ページ間のナビゲーションとアクティブリンク
navLinks.forEach(link => {
    if (location.pathname.endsWith(link.getAttribute('href'))) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// ENTERボタンのクリックイベント
const enterBtn = document.querySelector('.enter-btn');
if (enterBtn) {
    enterBtn.addEventListener('click', () => {
        window.location.href = 'gallery.html';
    });
}

// スクロール時のヘッダーの固定
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for reveal animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

// Reveal elements
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(element => revealObserver.observe(element));

// Scroll Spy for navigation
const scrollSpy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const links = document.querySelectorAll('.nav-link');
            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.5 });

const sections = document.querySelectorAll('section');
sections.forEach(section => scrollSpy.observe(section));

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 6px rgba(0,0,0,.06)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Back to top button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// モーダルの開閉処理
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');
const modalImage = document.querySelector('.modal__image');
const modalTitle = document.querySelector('.modal__title');
const modalClose = document.querySelector('.modal__close');

// モーダルの閉じる処理
function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    const currentItem = document.querySelector('.gallery__item[aria-expanded="true"]');
    if (currentItem) {
        currentItem.setAttribute('aria-expanded', 'false');
    }
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ESCキーでモーダルを閉じる
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// URLパラメータからカテゴリを取得
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get('category') || 'all';

// カテゴリフィルターの処理
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryContainer = document.querySelector('.gallery__container');

// 初期状態のフィルター設定
filterButtons.forEach(button => {
    if (button.dataset.category === categoryParam) {
        button.classList.add('active');
        filterGallery(categoryParam);
    }
});

// フィルターボタンのクリックイベント
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 現在のアクティブなボタンのクラスを削除
        document.querySelector('.filter-btn.active')?.classList.remove('active');
        
        // クリックしたボタンにアクティブクラスを追加
        button.classList.add('active');
        
        // カテゴリに基づいてアイテムをフィルター
        const category = button.dataset.category;
        filterGallery(category);
    });
});

// ギャラリーのフィルター関数
function filterGallery(category) {
    const items = galleryContainer.querySelectorAll('.gallery__item');
    
    items.forEach(item => {
        if (category === 'all') {
            item.style.display = 'block';
        } else {
            const itemCategory = item.dataset.category;
            item.style.display = itemCategory === category ? 'block' : 'none';
        }
    });
}

// ギャラリー画像のクリックイベント
const galleryItems = document.querySelectorAll('.gallery__item');

galleryItems.forEach(item => {
    const img = item.querySelector('img');
    const figcaption = item.querySelector('figcaption');
    
    item.addEventListener('click', () => {
        // 画像とタイトルをモーダルに設定
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = figcaption.textContent;
        
        // モーダルを表示
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        item.setAttribute('aria-expanded', 'true');
        
        // モーダルが表示された後、画像を中央に配置
        setTimeout(() => {
            modalImage.style.maxWidth = '90vw';
            modalImage.style.maxHeight = '90vh';
            modalImage.style.margin = 'auto';
        }, 100);
    });
});

// Populate skills
const skillsContainer = document.querySelector('.skills');
const skills = [
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg', text: 'Photoshop' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg', text: 'Illustrator' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', text: 'Figma' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg', text: 'JavaScript' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg', text: 'HTML5' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg', text: 'CSS3' }
];

skillsContainer.innerHTML = skills.map(skill => `
    <div class="skill-item">
        <img src="${skill.icon}" alt="${skill.text}" loading="lazy">
        <span>${skill.text}</span>
    </div>
`).join('');

// Form submission
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message!');
        contactForm.reset();
    });
}

// 🔧 FIX: stop injecting accent color on hover / touch
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    // Remove all event listeners
    link.onmouseenter = null;
    link.onmouseleave = null;
    link.ontouchstart = null;
    link.ontouchend = null;
    link.ontouchmove = null;
});
