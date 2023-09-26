// Starter data
const user = {
    name: 'Vittorio',
    surname: 'Sole',
    unit: 'EUR',
    transactions: [
        { id: 1, value: -12.5, description: 'Pizzeria' },
        { id: 2, value: 1500, description: 'Stipendio' },
        { id: 3, value: -350, description: 'Rata auto' },
        { id: 4, value: -3000, description: 'Azzeramento' }
    ]
}

// Selectors
const userName = document.querySelector('.user-name');
const userBalance = document.querySelector('.user-balance');
const footerBalanceTotal = document.querySelector('#balance-total');
const footerBalancePositive = document.querySelector('#balance-positive');
const footerBalanceNegative = document.querySelector('#balance-negative');
const transactionsContainer = document.querySelector('#transactions');
const unitSelect = document.querySelector('#unit');
const transactionValue = document.querySelector('#transaction-value');
const transactionDescription = document.querySelector('#transaction-description');
const addTransactionBtn = document.querySelector('#add-transaction');
const dataErrorModal = document.querySelector('#data-error-modal');
const closeModalBtns = document.querySelectorAll('.modal-close');

// Listeners
document.addEventListener('DOMContentLoaded', setStarterData);
addTransactionBtn.addEventListener('click', addTransaction);
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.parentElement.classList.remove('active');
    })
});

// Functions
function setStarterData() {
    userName.innerText = `${user.name} ${user.surname}`;
    setBalances();
    user.transactions.forEach(transaction => { renderTransaction(transaction); })
}

function addTransaction() {
    if (!(transactionValue.value.match(/[1-4]/g))) {
        transactionValue.value = '';
        transactionDescription.value = '';
        openModal('#data-error-modal');
        return false
    }

    let transaction = {
        id: user.transactions.length + 1,
        value: Number(transactionValue.value),
        description: transactionDescription.value,
    };
    user.transactions.push(transaction);
    transactionValue.value = '';
    transactionDescription.value = '';
    setBalances();
    clearTransactionContainer();
    user.transactions.forEach(element => { renderTransaction(element); })
}

function setBalances() {
    let values = [];
    let balance, positiveBalance, negativeBalance;
    user.transactions.forEach(transaction => { values.push(transaction.value); });
    balance = values.reduce((acc, value) => acc + value, 0);
    positiveBalance = values.filter(v => v > 0).reduce((acc, value) => acc + value, 0);
    negativeBalance = values.filter(v => v < 0).reduce((acc, value) => acc + value, 0);
    userBalance.innerText = `${balance} ${user.unit}`;
    footerBalanceTotal.innerText = `${balance} ${user.unit}`;
    footerBalanceNegative.innerText = `${negativeBalance} ${user.unit}`;
    footerBalancePositive.innerText = `${positiveBalance} ${user.unit}`;
    if (balance > 0) {
        userBalance.classList.remove('negative');
        footerBalanceTotal.classList.remove('negative');
        userBalance.classList.add('positive');
        footerBalanceTotal.classList.add('positive');
    } else {
        userBalance.classList.remove('positive');
        footerBalanceTotal.classList.remove('positive');
        userBalance.classList.add('negative');
        footerBalanceTotal.classList.add('negative');
        openModal('#negative-balance-modal');
    }
}

function renderTransaction(transaction) {
    let element = `
        <div class="transaction ${transaction.value > 0 ? 'positive' : 'negative'}">
            <i class="fa fa-solid ${transaction.value > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}"></i>
            <div class="transaction-text">
                <p class="transaction__description">${transaction.description}</p>
                <p class="transaction__value">${Math.abs(transaction.value)} ${user.unit}</p>
            </div>
        </div>`;
    transactionsContainer.insertAdjacentHTML('beforeend', element);
}

function clearTransactionContainer() {
    while (transactionsContainer.firstChild) {
        transactionsContainer.removeChild(transactionsContainer.firstChild);
    }
}

function openModal(modalId) {
    const modal = document.querySelector(modalId);
    modal.classList.add('active');
}