(() => {
  'use strict';
  const config = window.OPEN_CONFIG;
  const $ = id => document.getElementById(id);
  const selection = new Set();
  const drafts = new Map();
  const form = $('registration-form');
  const menu = $('menu');
  const dialog = $('review-dialog');
  $('menu-toggle').addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    $('menu-toggle').setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    $('menu-toggle').setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      menu.classList.remove('open');
      $('menu-toggle').setAttribute('aria-expanded','false');
    }
  });
  $('maps-link').href = config.maps;
  $('waze-link').href = `https://waze.com/ul?ll=${config.latitude},${config.longitude}&navigate=yes`;
  $('map').src = `https://maps.google.com/maps?q=${config.latitude},${config.longitude}&z=17&output=embed`;

  function clearError() {
    $('form-error').hidden = true;
    form.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));
  }
  function showError(message, field) {
    const error = $('form-error');
    error.textContent = message;
    error.hidden = false;
    if (field) { field.setAttribute('aria-invalid','true'); field.focus(); }
    else error.focus();
  }
  function selectedCategories() { return config.categories.filter(c => selection.has(c.id)); }
  function updateCount() {
    const n = selection.size;
    $('category-count').textContent = n ? `${n} categoria${n === 1 ? '' : 's'} selecionada${n === 1 ? '' : 's'}` : 'Nenhuma categoria selecionada';
    $('teams-fieldset').hidden = n === 0;
  }
  function makeInput(id, title, value, required) {
    const label = document.createElement('label');
    label.textContent = title;
    const input = document.createElement('input');
    input.id = id; input.name = id; input.type = 'text'; input.maxLength = 100;
    input.autocomplete = 'off'; input.required = required; input.value = value;
    input.placeholder = 'Nome completo do atleta';
    label.append(input);
    return {label, input};
  }
  function addTeam(category) {
    const state = drafts.get(category.id) || {one:'', two:'', pending:false};
    drafts.set(category.id, state);
    const card = document.createElement('section');
    card.className = 'team-card'; card.id = `team-${category.id}`;
    card.setAttribute('aria-label', `Atletas: ${category.name}`);
    const heading = document.createElement('div'); heading.className = 'team-heading';
    const title = document.createElement('h4'); title.textContent = category.name;
    const remove = document.createElement('button'); remove.type = 'button';
    remove.className = 'remove-category'; remove.textContent = 'Remover';
    remove.setAttribute('aria-label', `Remover categoria ${category.name}`);
    remove.addEventListener('click', () => {
      const option = $(`cat-${category.id}`);
      option.checked = false; toggleCategory(category, false); option.focus();
    });
    heading.append(title,remove);
    const date = document.createElement('p'); date.className = 'field-help'; date.textContent = category.schedule + (category.id === 'kids' ? ' • Um atleta Kids e um adulto' : '');
    const row = document.createElement('div'); row.className = 'input-grid';
    const one = makeInput(`${category.id}-one`, category.id === 'kids' ? 'Atleta Kids *' : 'Atleta 1 *', state.one, true);
    const two = makeInput(`${category.id}-two`, category.id === 'kids' ? 'Atleta adulto *' : 'Atleta 2 *', state.two, !state.pending);
    const choice = document.createElement('label'); choice.className = 'partner-choice';
    const checkbox = document.createElement('input'); checkbox.type = 'checkbox';
    checkbox.id = `${category.id}-pending`; checkbox.checked = state.pending;
    const text = document.createElement('span'); text.textContent = 'Dupla a escolher (ainda não tenho parceiro)';
    function updatePartner() {
      two.input.disabled = state.pending; two.input.required = !state.pending;
      two.input.placeholder = state.pending ? 'Dupla a escolher' : 'Nome completo do atleta';
      two.input.value = state.pending ? '' : state.two;
      two.label.firstChild.textContent = state.pending ? (category.id === 'kids' ? 'Atleta adulto: dupla a escolher' : 'Atleta 2: dupla a escolher') : (category.id === 'kids' ? 'Atleta adulto *' : 'Atleta 2 *');
      two.input.removeAttribute('aria-invalid');
    }
    checkbox.addEventListener('change', () => { state.pending = checkbox.checked; updatePartner(); clearError(); });
    one.input.addEventListener('input', () => { state.one = one.input.value; clearError(); });
    two.input.addEventListener('input', () => { state.two = two.input.value; clearError(); });
    updatePartner();
    choice.append(checkbox,text); row.append(one.label,two.label); card.append(heading,date,row,choice);
    // Keep chosen categories in the same order as the quick selection, without rebuilding inputs.
    const following = config.categories.slice(config.categories.indexOf(category) + 1).find(c => selection.has(c.id));
    $('teams').insertBefore(card, following ? $(`team-${following.id}`) : null);
  }
  function toggleCategory(category, checked) {
    clearError();
    if (checked) { selection.add(category.id); addTeam(category); }
    else { selection.delete(category.id); $(`team-${category.id}`)?.remove(); }
    updateCount();
  }
  config.categories.forEach(category => {
    const label = document.createElement('label'); label.className = 'category-option';
    const checkbox = document.createElement('input'); checkbox.type = 'checkbox';
    checkbox.id = `cat-${category.id}`; checkbox.name = 'categories'; checkbox.value = category.id;
    const name = document.createElement('span'); name.textContent = category.name;
    checkbox.addEventListener('change', () => toggleCategory(category,checkbox.checked));
    label.append(checkbox,name); $('category-options').append(label);
  });
  function clean(value) { return value.trim().replace(/\s+/g,' '); }
  function validate() {
    clearError();
    if (!selection.size) { showError('Selecione pelo menos uma categoria.', $('cat-kids')); return false; }
    for (const category of selectedCategories()) {
      const state = drafts.get(category.id);
      if (clean(state.one).length < 2) { showError(`Informe o nome do Atleta 1 em ${category.name}.`, $(`${category.id}-one`)); return false; }
      if (!state.pending && clean(state.two).length < 2) { showError(`Informe o Atleta 2 em ${category.name} ou marque “Dupla a escolher”.`, $(`${category.id}-two`)); return false; }
      if (!state.pending && clean(state.one).toLocaleLowerCase('pt-BR') === clean(state.two).toLocaleLowerCase('pt-BR')) { showError(`Os dois atletas de ${category.name} precisam ser pessoas diferentes.`, $(`${category.id}-two`)); return false; }
    }
    if (clean($('responsible').value).length < 2) { showError('Informe o nome do responsável pela inscrição.', $('responsible')); return false; }
    const digits = $('phone').value.replace(/\D/g,'');
    if (!/^(?:55)?[1-9][0-9][0-9]{8,9}$/.test(digits)) { showError('Informe um telefone válido com DDD, por exemplo (74) 99999-9999.', $('phone')); return false; }
    return true;
  }
  function buildMessage() {
    const lines = ['*SOLICITAÇÃO DE INSCRIÇÃO*', '*5º Open do Jacombina 2026*', '19 a 22 de novembro • Jacombina Sport Bar', '', `*Responsável:* ${clean($('responsible').value)}`, `*WhatsApp de contato:* ${clean($('phone').value)}`, '', '*CATEGORIAS E ATLETAS*'];
    for (const category of selectedCategories()) {
      const state = drafts.get(category.id);
      lines.push('', `*Categoria:* ${category.name}`, `*Programação:* ${category.schedule}`, `${clean(state.one)}/${state.pending ? 'Dupla' : clean(state.two)}`);
    }
    lines.push('', 'Gostaria de confirmar a disponibilidade e receber as orientações de pagamento.');
    if ($('notes').value.trim()) lines.push('', `*Observações:* ${$('notes').value.trim()}`);
    return lines.join('\n');
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;
    const message = buildMessage();
    $('review-content').textContent = message;
    $('send-whatsapp').href = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open','');
  });
  function closeReview() { if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open'); }
  $('close-review').addEventListener('click', closeReview);
  $('edit-review').addEventListener('click', closeReview);
  dialog.addEventListener('click', e => { if (e.target === dialog) { const box = dialog.getBoundingClientRect(); if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) closeReview(); } });
  // No automatic sending, storage, analytics, or payment. The visitor confirms in WhatsApp.
})();
