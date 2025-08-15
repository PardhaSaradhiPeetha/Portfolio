function showPage(targetId) {
  const pages = document.querySelectorAll('.pages');
  const links = document.querySelectorAll('.navbar .nav-links a');
  const pageTitle = document.getElementById('page-title');
  pages.forEach(page => page.classList.remove('active'));
  links.forEach(link => link.classList.remove('active'));
  document.getElementById(targetId).classList.add('active');
  console.log(targetId);
  pageTitle.innerText = `${targetId.charAt(0).toUpperCase() + targetId.substring(1)}`;
  const activeLink = document.querySelector(`.navbar .nav-links a[href="#${targetId}"]`);
  if (activeLink) activeLink.classList.add('active');
}

window.addEventListener('load', () => {
  document.getElementById('current-year').textContent = new Date().getFullYear();
  showPage('home');
  window.location.hash = 'home';
});

const links = document.querySelectorAll('.navbar .nav-links a');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    showPage(targetId);
    window.location.hash = targetId;
  });
});

// Contact Validation
function validation(event) {
  const username = document.getElementById('username').value.trim();
  const useremail = document.getElementById('useremail').value.trim();
  const usercountry = document.getElementById('selectCountry').value.trim();
  const userphno = document.getElementById('userphno').value.trim();
  const usermessage = document.getElementById('usermessage').value.trim();

  const displayMsg = document.getElementById('formmsg');

  let isValid = true;
  let messageUser = '';

  // Basic empty check
  if (!username || !useremail || !usercountry || !userphno || !usermessage) {
    displayMsg.textContent = "Fill all the fields.";
    displayMsg.style.color = "red";
    return false;
  }

  if (username.length < 3) {
    messageUser += 'Name must be at least 3 characters long.\n';
    isValid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(useremail)) {
    messageUser += 'Please enter a valid email address.\n';
    isValid = false;
  }

  if (!/^(\+?\d{1,3}[- ]?)?\d{10}$/.test(userphno)) {
    messageUser += 'Please enter a valid mobile number.\n';
    isValid = false;
  }

  if (usermessage.length < 5) {
    messageUser += 'Message must be at least 5 characters long.\n';
    isValid = false;
  }

  if (!isValid) {
    displayMsg.textContent = messageUser;
    displayMsg.style.color = "red";
    return false;
  }

  displayMsg.textContent = "Message Sent Successfully!";
  displayMsg.style.color = "green";
}
// Country Code Fetch using first.org API
const select = document.getElementById("selectCountry");

fetch("https://api.first.org/data/v1/countries")
  .then(response => response.json())
  .then(result => {
    const countries = Object.entries(result.data)
      .map(([code, details]) => ({ code, name: details.country }))
      .sort((a, b) => a.name.localeCompare(b.name));

    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country.code;
      option.textContent = country.name;
      select.appendChild(option);
    });
  })
  .catch(error => console.error("Error fetching countries:", error));