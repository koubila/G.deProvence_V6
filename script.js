document.addEventListener('DOMContentLoaded', async () => {
  // Chargement des pays
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
    const countries = await response.json();
    
    const select = document.getElementById('zone');
    const frenchNames = countries
      .map(country => country.name.common?.fr || country.name.common)
      .sort();
    
    frenchNames.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Erreur chargement pays:', error);
  }
});

// Toggle menu mobile
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Gestion des sous-menus sur mobile (au clic)
document.querySelectorAll('.has-subnav > a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 960) {
            const parentLi = this.parentElement;
            parentLi.classList.toggle('active');
            
            const subLinks = parentLi.querySelectorAll('.subnav a');
            subLinks.forEach(sub => {
                sub.addEventListener('click', () => {
                    setTimeout(() => {
                        document.getElementById('navLinks').classList.remove('active');
                    }, 300);
                });
            });
        }
    });
});

// Smooth scroll avec compensation de la navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (window.innerWidth <= 960) {
            if (!this.parentElement.classList.contains('has-subnav')) {
                 document.getElementById('navLinks').classList.remove('active');
            }
        }

        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    });
});

// Formulaire de contact
const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

if(form) {
    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const data = new FormData(form);

        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.reset();
            successMessage.style.display = "block";
            successMessage.scrollIntoView({ behavior: "smooth" });
        } else {
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    });
}