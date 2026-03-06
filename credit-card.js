
const cardEl = document.getElementById('card');
const numInput = document.getElementById('number');
const nameInput = document.getElementById('name');
const monthSel = document.getElementById('month');
const yearSel = document.getElementById('year');
const cvvInput = document.getElementById('cvv');

const numberDisplay = document.getElementById('card-number-display');
const nameDisplay = document.getElementById('card-name');
const expiryDisplay = document.getElementById('card-expiry');
const cvvDisplay = document.getElementById('card-cvv-display');
const sigBox = document.getElementById('sig-box');
const brand = document.getElementById('card-brand');


for(let m=1;m<=12;m++){
  monthSel.innerHTML += `<option value="${String(m).padStart(2,'0')}">${String(m).padStart(2,'0')}</option>`;
}
const yearNow = new Date().getFullYear();
for(let y=0;y<12;y++){
  const yy = yearNow+y;
  yearSel.innerHTML += `<option value="${String(yy).slice(-2)}">${yy}</option>`;
}

function groupCardNumber(raw){
  const nums = raw.replace(/\D/g,'').slice(0,16);
  const groups = [];
  for(let i=0;i<4;i++) groups.push(nums.slice(i*4,(i+1)*4).padEnd(4,'#'));
  return groups;
}
function detectCardBrand(num){
  num=num.replace(/\s/g,'');
  if(/^4/.test(num)) return 'VISA';
  if(/^5[1-5]/.test(num)) return 'MASTERCARD';
  if(/^6/.test(num)) return 'DISCOVER';
  if(/^3[47]/.test(num)) return 'AMEX';
  return 'CARD';
}

function updateNumberDisplay(){
  const groups = groupCardNumber(numInput.value);
  numberDisplay.querySelectorAll('.grp').forEach((n,i)=>{
    n.textContent = groups[i] || '####';
  });
  brand.textContent = detectCardBrand(numInput.value);
}
function updateName(){
  nameDisplay.textContent = nameInput.value ? nameInput.value.toUpperCase() : 'FULL NAME';
  sigBox.textContent = nameInput.value ? nameInput.value.toUpperCase() : 'SIGNATURE';
}
function updateExpiry(){
  const m = monthSel.value, y = yearSel.value;
  expiryDisplay.textContent = (m&&y)?`${m}/${y}`:'MM/YY';
}
function updateCVV(){
  const v = cvvInput.value.replace(/\D/g,'').slice(0,4);
  cvvDisplay.textContent = v ? v.replace(/./g,'•') : '•••';
  color:red;
 
}

numInput.addEventListener('input', ()=>{
  numInput.value = numInput.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim();
  updateNumberDisplay();
});
nameInput.addEventListener('input', updateName);
monthSel.addEventListener('change', updateExpiry);
yearSel.addEventListener('change', updateExpiry);
cvvInput.addEventListener('input', updateCVV);

cvvInput.addEventListener('focus', ()=> cardEl.classList.add('is-flipped'));
cvvInput.addEventListener('blur', ()=> cardEl.classList.remove('is-flipped'));

updateNumberDisplay(); updateName(); updateExpiry(); updateCVV();

document.getElementById('submit-btn').addEventListener('click', e=>{
  e.preventDefault();
  alert('Demo Submit — Card simulated. Do not use real card data.');
});
