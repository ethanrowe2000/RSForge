document.addEventListener('DOMContentLoaded', () => {
  // Contact form code
  const form = document.getElementById('contactForm');
  const resultEl = document.getElementById('result');

  if (form && resultEl) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      resultEl.textContent = '';

      const formData = new FormData(form);
      const payload = {
        senderCompany: formData.get('senderCompany'),
        senderName: formData.get('senderName'),
        senderEmail: formData.get('senderEmail'),
        senderSMS: formData.get('senderSMS'),
        inquiryType: formData.get('inquiryType'),
        htmlContent: formData.get('htmlContent')
      };

      try {
        const response = await fetch('https://long-pond-b1d7.ethan-1ea.workers.dev/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        await response.json();
        resultEl.textContent = '✅ Your message was sent successfully!';
        form.reset();
      } catch (err) {
        resultEl.textContent = '❌ Error: ' + err.message;
      }
    });
  }

  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      // Toggle nav visibility
      navLinks.classList.toggle('show');

      // Toggle hamburger animation class
      hamburger.classList.toggle('active');

      // Update aria-expanded attribute for accessibility
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
    });

    navItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
