function toggleText(element) {
  const text = element.querySelector('.text-answer');
  text.classList.toggle('text-answer-open');
  if (!text.classList.contains('text-answer-open')) {
  text.style.height = '0px';
} else {
  text.style.height = text.scrollHeight + 'px';
}
  const cross = element.querySelector('.cross');
  cross.classList.toggle('cross-active');
}

const targetDate = new Date("2026-07-04T13:00:00").getTime();

function splitNumber(num) {
  return String(num).padStart(2, '0').split('');
}

function renderDigits(id, value) {
  const container = document.getElementById(id);
  const newDigits = splitNumber(value);

  if (!container.children.length) {
    newDigits.forEach(d => {
      const div = document.createElement("div");
      div.className = "digit";
      div.innerHTML = `<div class="num">${d}</div>`;
      container.appendChild(div);
    });
    container.dataset.value = value;
    return;
  }

  const oldDigits = container.dataset.value.split('');

  newDigits.forEach((digit, i) => {
    const digitBox = container.children[i];

    if (oldDigits[i] !== digit) {
      const oldEl = digitBox.querySelector(".num");

      oldEl.classList.add("out-down");

      const newEl = document.createElement("div");
      newEl.className = "num in-from-top";
      newEl.textContent = digit;

      digitBox.appendChild(newEl);

      setTimeout(() => {
        digitBox.innerHTML = `<div class="num">${digit}</div>`;
      }, 450);
    }
  });

  container.dataset.value = newDigits.join('');
}

function updateTimer() {
  const now = new Date().getTime();
  const diff = now - targetDate;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  renderDigits("days", d);
  renderDigits("hours", h);
  renderDigits("minutes", m);
  renderDigits("seconds", s);
}

setInterval(updateTimer, 1000);
updateTimer();