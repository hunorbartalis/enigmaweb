const typewriters = document.querySelectorAll('.typewriter');
typewriters.forEach(target => {
  const text = target.textContent;
  target.textContent = '';
  let isTyping = false;
  let timeout; // keep a reference to the timeout for clearing

  function startTypewriter() {
    if (isTyping) return; // If already typing, exit
    isTyping = true;
    let i = 0;
    const speed = 65;
    function typeWriter() {
      if (i < text.length) {
        target.textContent += text.charAt(i);
        i++;
        timeout = setTimeout(typeWriter, speed);
      } else {
        isTyping = false; // Reset flag when typing completes
      }
    }
    typeWriter(); // start immediately without delay
  }

  function resetTypewriter() {
    clearTimeout(timeout); // clear any ongoing timeouts
    target.textContent = '';
    isTyping = false;
  }

  // Intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startTypewriter();
      } else {
        resetTypewriter();
      }
    });
  }, { threshold: 0.1 }); // at least 10% of the section is in view

  observer.observe(target);
});
