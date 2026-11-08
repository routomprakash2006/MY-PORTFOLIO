
const body = document.body;
const header = document.getElementById('header');
const progressBar = document.getElementById('progressBar');
const backTop = document.getElementById('backTop');
const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const themeToggle = document.getElementById('themeToggle');
const typingText = document.getElementById('typingText');
const current = (location.pathname.split('/').pop() || 'index.html');

const roles = [
  'Diploma Engineering Trainee at NALCO',
  'IT Student & Developer',
  'Software Development Enthusiast',
  'Networking & Hardware Learner',
  'AI & Technology Enthusiast'
];

let roleIndex = 0, charIndex = 0, deleting = false;

function typeRole() {
  const role = roles[roleIndex];
  typingText.textContent = role.slice(0, charIndex);

  if (!deleting && charIndex < role.length) {
    charIndex++;
    setTimeout(typeRole, 80);
  } else if (!deleting && charIndex === role.length) {
    deleting = true;
    setTimeout(typeRole, 1500);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeRole, 42);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 350);
  }
}
if (typingText) typeRole();

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeToggle.textContent = '☀';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const dark = body.classList.contains('dark');
  localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  themeToggle.textContent = dark ? '☀' : '☾';
});

function handleScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${docHeight ? (scrollTop / docHeight) * 100 : 0}%`;

  header.classList.toggle('scrolled', scrollTop > 20);
  backTop.classList.toggle('show', scrollTop > 500);

}
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  a.classList.toggle('active', href === current || (current === '' && href === 'index.html'));
});
window.addEventListener('scroll', handleScroll);
handleScroll();

backTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

