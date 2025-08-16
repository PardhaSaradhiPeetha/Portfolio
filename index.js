import { submitDataToSheet } from "./userdatasheet.js";

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
  const hash = window.location.hash.substring(1);
  if (hash) {
    showPage(hash);
  } else {
    window.location.hash = 'home';
    showPage('home');
  }

  loadCountry();
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
async function validation() {
  const username = document.getElementById('username').value.trim();
  const userprofession = document.getElementById('userprofession').value.trim();
  const useremail = document.getElementById('useremail').value.trim();
  const usercountry = document.getElementById('selectCountry').value.trim();
  const usermobileno = document.getElementById('usermobileno').value.trim();
  const usermessage = document.getElementById('usermessage').value.trim();

  const displayMsg = document.getElementById('formmsg');

  // Basic validation
  if (!username || !userprofession || !useremail || !usercountry || !usermobileno || !usermessage) {
    displayMsg.textContent = "Fill all the fields.";
    displayMsg.style.color = "red";
    return false;
  }

  let messageUser = '';
  let isValid = true;

  if (username.length < 5) {
    messageUser += 'Name must be at least 5 characters long.\n';
    isValid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(useremail)) {
    messageUser += 'Please enter a valid email address.\n';
    isValid = false;
  }

  if (!/^(\+?\d{1,3}[- ]?)?\d{10}$/.test(usermobileno)) {
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

  // Prepare data to match sheet headers exactly
  const data = {
    username: username,
    userprofession: userprofession,
    useremail: useremail,
    country: usercountry,
    mobile_number: usermobileno,
    usermessage: usermessage,
    Date: new Date().toLocaleString() // optional, if your sheet has a Date column
  };

  try {
    const response = await fetch("https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();

    if (result.result === "success") {
      displayMsg.textContent = "✅ Message sent successfully!";
      displayMsg.style.color = "green";
      document.querySelector('.contact-form').reset();
    } else {
      displayMsg.textContent = "❌ Error: " + result.error;
      displayMsg.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    displayMsg.textContent = "❌ Network error. Try again!";
    displayMsg.style.color = "red";
  }
}


const sendBtn = document.getElementById('send-btn');
sendBtn.addEventListener('click', validation);

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
  document.getElementById('formmsg').innerText = '';
});

// Country Code Fetch using first.org API
function loadCountry() {
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
}