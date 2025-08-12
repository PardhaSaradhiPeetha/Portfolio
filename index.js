const links = document.querySelectorAll('.nav-links a');
const indicator = document.querySelector('.indicator');

function moveIndicator(el) {
  const rect = el.getBoundingClientRect();
  const navRect = el.closest('.navbar').getBoundingClientRect();

  indicator.style.transform = `translateX(${rect.left - navRect.left}px)`;
  indicator.style.width = `${rect.width}px`;

  links.forEach(link => link.classList.remove('active'));
  el.classList.add('active');
}

window.addEventListener('load', () => {

    document.getElementById('current-year').innerText = `${ new Date().getFullYear()}`;

  const home = document.querySelector('.nav-links a[href="#home"]');
  if (home) moveIndicator(home);
});

links.forEach(link => {
  link.addEventListener('click', e => {
    moveIndicator(link);
  });
});

