document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const resultEl = document.getElementById('result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultEl.textContent = ''; // Clear any previous results

    const formData = new FormData(form);
    const payload = {
      senderCompany: formData.get('senderCompany'),
      senderName: formData.get('senderName'),
      senderEmail: formData.get('senderEmail'),
      senderSMS: formData.get('senderSMS'),
      inquiryType: formData.get('inquiryType'), // Single selected value from dropdown
      htmlContent: formData.get('htmlContent')
    };

    try {
      const response = await fetch('https://long-pond-b1d7.ethan-1ea.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      resultEl.textContent = '✅ Your message was sent successfully!';
      form.reset();
    } catch (err) {
      resultEl.textContent = '❌ Error: ' + err.message;
    }
  });
});
