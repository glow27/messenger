export function render(query, block) {
  const root = document.querySelector(query);

  root.innerHTML = "";

  // Можно завязаться на реализации вашего класса Block

  root.append(block.getContent());

  block.dispatchComponentDidMount();
}
