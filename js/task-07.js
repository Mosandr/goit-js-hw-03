// Напиши скрипт управления личным кабинетом интернет банка.
// Есть объект account в котором необходимо реализовать методы для работы с балансом и историей транзакций.

/*
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 */
const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

let id = 0;

/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */

const account = {
  // Текущий баланс счета
  balance: 0,

  // История транзакций
  transactions: [],

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {
    const transaction = {
      id: (id += 1),
      type: type,
      amount: amount,
    };
    return transaction;
  },

  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    this.transactions.push(this.createTransaction(amount, Transaction.DEPOSIT));
    this.balance += amount;
    console.log(`Операция успешна! Ваш счет пополнен на ${amount}!`);
  },

  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {
    const newTransaction = this.createTransaction(amount, Transaction.WITHDRAW);
    if (amount > this.balance) {
      console.log(`Снятие суммы ${amount} невозможно. Недостаточно средств!`);
      return;
    }
    this.balance -= amount;
    this.transactions.push(newTransaction);
    console.log(`Операция успешна! ${amount} снято с вашего счета`);
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    return this.balance;
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {
    const transactionsList = this.transactions;
    for (const transaction of transactionsList) {
      if (transaction.id === id) {
        const { ...transactionCopy } = transaction;
        return transactionCopy;
      }
    }
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {
    let total = 0;
    for (const transaction of this.transactions) {
      if (transaction.type === type) total += transaction.amount;
    }

    return total;
  },
};

/* Проверка работоспособности   */

// account.deposit(100);
// account.withdraw(20);
// account.deposit(15);
// account.deposit(45);
// account.withdraw(30);
// account.withdraw(15);

// console.log(account);
// console.log(account.getBalance());

// const transactionCopy = account.getTransactionDetails(5);
// transactionCopy.amount = 300;
// console.log(transactionCopy);

// console.log(account);
// console.log(account.getTransactionTotal(Transaction.DEPOSIT));
// console.log(account.getTransactionTotal(Transaction.WITHDRAW));
