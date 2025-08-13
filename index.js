const links = document.querySelectorAll('.nav-links a');
const pages = document.querySelectorAll('.web-section .pages');

function activatePage(pageId) {
  pages.forEach(page => page.classList.remove('active'));
  const targetPage = document.querySelector(`.pages#${pageId}`);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  links.forEach(link => link.classList.remove('active'));
  const targetLink = document.querySelector(`.nav-links a[href="#${pageId}"]`);
  if (targetLink) {
    targetLink.classList.add('active');
  }
}

window.addEventListener('load', () => {
  document.getElementById('current-year').innerText = `${new Date().getFullYear()}`;
  const hash = window.location.hash.substring(1) || 'home';
  activatePage(hash);
});

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    activatePage(targetId);
    window.history.pushState({}, '', `#${targetId}`);
  });
});