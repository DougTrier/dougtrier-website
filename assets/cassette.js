// Flip the cassette and the page theme together. No requests or persistence.
(() => {
  const button = document.getElementById('cassette-flip');
  if (!button) return;
  const front = button.querySelector('.tape-a');
  const back = button.querySelector('.tape-b');
  const label = button.querySelector('[data-flip-label]');
  const status = document.getElementById('cassette-status');
  const grid = document.querySelector('.project-grid');
  const cards = grid ? Array.from(grid.children) : [];
  const orderLabel = document.querySelector('[data-project-order]');
  function orderProjects(side) {
    // Move the existing cards so visual, reading, and keyboard orders agree.
    cards.sort((a, b) =>
      Number(a.dataset.mixSide !== side) - Number(b.dataset.mixSide !== side) ||
      Number(a.dataset.trackNumber) - Number(b.dataset.trackNumber)
    );
    cards.forEach(card => grid.appendChild(card));
    if (orderLabel) orderLabel.textContent = side === 'B' ? 'Side B / Play first' : 'Side A / Business first';
  }
  orderProjects(button.getAttribute('aria-pressed') === 'true' ? 'B' : 'A');
  document.documentElement.dataset.theme = button.getAttribute('aria-pressed') === 'true' ? 'play' : 'business';
  button.disabled = false;
  button.addEventListener('click', () => {
    const flipped = button.getAttribute('aria-pressed') !== 'true';
    document.documentElement.dataset.theme = flipped ? 'play' : 'business';
    orderProjects(flipped ? 'B' : 'A');
    button.classList.toggle('is-flipped', flipped);
    button.setAttribute('aria-pressed', String(flipped));
    front.setAttribute('aria-hidden', String(flipped));
    back.setAttribute('aria-hidden', String(!flipped));
    const current = flipped ? 'Side B, Play' : 'Side A, Business';
    const next = flipped ? 'Side A, Business' : 'Side B, Play';
    button.setAttribute('aria-label', `Showing ${current}. Flip to ${next}.`);
    label.textContent = flipped ? 'Flip to Side A — Business' : 'Flip to Side B — Play';
    status.textContent = flipped ? 'Side B — Play. Retro page theme. Play apps listed first.' : 'Side A — Business. Professional page theme. Business apps listed first.';
  });
})();
