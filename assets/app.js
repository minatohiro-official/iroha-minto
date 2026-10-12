'use strict';
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 620) closeMenu(); });
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => { element.classList.add('ready'); observer.observe(element); });
}
const estimateForm = document.querySelector('#estimate-form');
if (estimateForm) {
  const prices = [4980, 12800, 24800];
  const names = ['ライト', 'スタンダード', 'プレミアム'];
  const plan = document.querySelector('#plan');
  const support = document.querySelector('#support');
  const options = [...estimateForm.querySelectorAll('input[name="option"]')];
  const format = number => number.toLocaleString('ja-JP');
  const queryPlan = new URLSearchParams(window.location.search).get('plan');
  if (['0', '1', '2'].includes(queryPlan)) plan.value = queryPlan;
  let summaryText = '';
  function calculate() {
    const index = Number(plan.value);
    const selected = options.filter(option => option.checked);
    const rows = [[names[index], prices[index]], ...selected.map(option => [option.dataset.label, Number(option.value)])];
    const total = rows.reduce((sum, row) => sum + row[1], 0);
    document.querySelector('#total').textContent = format(total);
    document.querySelector('#monthly').textContent = format(Number(support.value));
    const breakdown = document.querySelector('#estimate-breakdown');
    breakdown.replaceChildren();
    rows.forEach(([label, amount]) => {
      const row = document.createElement('div'); row.className = 'breakdown-row';
      const name = document.createElement('span'); name.textContent = label;
      const value = document.createElement('span'); value.textContent = `${format(amount)}円`;
      row.append(name, value); breakdown.append(row);
    });
    const variable = selected.some(option => option.dataset.variable === 'true');
    document.querySelector('#estimate-variable').textContent = variable ? '「〜」の項目は最低参考価格で計算しています。独自ドメイン等の実費は別途必要です。' : '詳細な仕様・作業量により金額が変わる場合があります。';
    document.querySelector('#copy-status').textContent = '';
    summaryText = ['イロハミント 概算見積もり（税込）', ...rows.map(([label, value]) => `${label}: ${format(value)}円`), `制作費目安: ${format(total)}円`, `任意の月額サポート: ${format(Number(support.value))}円 / 月`, '各オプション1件分。実費別途。正式見積もり・契約金額ではありません。受付準備中。'].join('\n');
  }
  estimateForm.addEventListener('change', calculate);
  estimateForm.addEventListener('submit', event => event.preventDefault());
  document.querySelector('#copy-estimate').addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(summaryText);
      status.textContent = '見積もり内容をコピーしました。';
    } catch {
      status.textContent = 'コピーできませんでした。下の内容を選択してコピーしてください。';
      const fallback = document.createElement('textarea');
      fallback.value = summaryText; fallback.readOnly = true; fallback.rows = 10;
      fallback.style.width = '100%'; fallback.setAttribute('aria-label', 'コピー用の見積もり内容');
      status.append(fallback); fallback.focus(); fallback.select();
    }
  });
  calculate();
}

// Lazy, real-site device previews. Each iframe receives the selected viewport width.
document.querySelectorAll('.device-preview').forEach(preview => {
  const buttons = [...preview.querySelectorAll('[data-device][data-width]')];
  const stage = preview.querySelector('.preview-stage');
  const device = preview.querySelector('.preview-device');
  const frame = preview.querySelector('iframe');
  const status = preview.querySelector('.preview-status');
  let selected = buttons.find(button => button.dataset.device === 'pc');
  let started = false;
  let loaded = false;
  const closeButton = preview.querySelector('.preview-close');
  function stop() {
    if (!started) return;
    started = false;
    loaded = false;
    frame.removeAttribute('src');
    preview.querySelector('.preview-static').hidden = false;
    preview.querySelector('.preview-live').hidden = true;
    closeButton.hidden = true;
    selected = buttons.find(button => button.dataset.device === 'pc');
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button === selected)));
    status.textContent = 'PCの画面を掲載しています。ボタンから、各画面サイズのプレビューを開けます。';
  }
  closeButton.addEventListener('click', stop);
  document.addEventListener('iroha-preview-start', event => { if (event.detail !== preview) stop(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  function layout() {
    if (!started) return;
    const width = Number(selected.dataset.width);
    const height = Number(selected.dataset.height);
    const border = selected.dataset.device === 'phone' ? 10 : selected.dataset.device === 'pc' ? 6 : 9;
    const scale = Math.min(1, Math.max(0.1, (stage.clientWidth - 36) / (width + border * 2)));
    frame.style.width = `${width}px`;
    frame.style.height = `${height}px`;
    device.style.width = `${width}px`;
    device.style.height = `${height}px`;
    device.dataset.device = selected.dataset.device;
    device.style.transform = `translateX(-${(width + border * 2) * scale / 2}px) scale(${scale})`;
    stage.style.height = `${(height + border * 2) * scale + 40}px`;
  }
  function announce() {
    status.textContent = loaded ? `${selected.textContent}の画面サイズで表示中です。プレビュー内をスクロールしてご覧ください。` : '実際のサイトを読み込んでいます。表示されない場合は「別タブでサイトを開く」をご利用ください。';
  }
  frame.addEventListener('load', () => { if (started) { loaded = true; announce(); } });
  buttons.forEach(button => button.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('iroha-preview-start', { detail: preview }));
    selected = button;
    closeButton.hidden = false;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    preview.querySelector('.preview-static').hidden = true;
    preview.querySelector('.preview-live').hidden = false;
    if (!started) {
      started = true;
      frame.src = preview.dataset.site;
      frame.loading = 'eager';
    }
    layout();
    announce();
  }));
  if ('ResizeObserver' in window) new ResizeObserver(layout).observe(stage);
  else window.addEventListener('resize', layout);
});

// Keep plan details open on larger screens and compact on phones.
const planDetails = [...document.querySelectorAll('.plan-inclusions')];
if (planDetails.length) {
  const phonePlans = window.matchMedia('(max-width: 620px)');
  const syncPlanDetails = () => { planDetails.forEach(detail => { detail.open = !phonePlans.matches; }); };
  syncPlanDetails();
  phonePlans.addEventListener?.('change', syncPlanDetails);
}
