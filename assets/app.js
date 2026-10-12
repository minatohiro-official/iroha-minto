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
