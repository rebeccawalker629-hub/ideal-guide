const fields = {
  averageOrder: document.getElementById('averageOrder'),
  purchaseFrequency: document.getElementById('purchaseFrequency'),
  customerLifetime: document.getElementById('customerLifetime'),
  activeCustomers: document.getElementById('activeCustomers'),
};

const results = {
  ltv: document.getElementById('ltvResult'),
  annual: document.getElementById('annualResult'),
  total: document.getElementById('totalResult'),
};

const dollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function numericValue(input) {
  return Math.max(Number(input.value) || 0, 0);
}

function updateCalculator() {
  const averageOrder = numericValue(fields.averageOrder);
  const purchaseFrequency = numericValue(fields.purchaseFrequency);
  const customerLifetime = numericValue(fields.customerLifetime);
  const activeCustomers = numericValue(fields.activeCustomers);
  const annualValue = averageOrder * purchaseFrequency;
  const lifetimeValue = annualValue * customerLifetime;
  const totalValue = lifetimeValue * activeCustomers;

  results.annual.textContent = dollars.format(annualValue);
  results.ltv.textContent = dollars.format(lifetimeValue);
  results.total.textContent = dollars.format(totalValue);
}

Object.values(fields).forEach((field) => field.addEventListener('input', updateCalculator));
updateCalculator();
