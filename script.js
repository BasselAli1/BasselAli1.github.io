// Hero typing effect — cycles through what the systems do
(function () {
  var target = document.getElementById('typeText');
  if (!target) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var phrases = ['query.', 'answer.', 'connect.', 'deploy.'];

  if (prefersReduced) {
    target.textContent = phrases[0];
    return;
  }

  var phraseIndex = 0;
  var charIndex = 0;
  var deleting = false;
  var pause = 1100;
  var typeSpeed = 65;
  var deleteSpeed = 35;

  function tick() {
    var current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      target.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, pause);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      target.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 200);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  tick();
})();

// Scroll reveal for project cards
(function () {
  var items = document.querySelectorAll('.project');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach(function (el) { observer.observe(el); });
})();
