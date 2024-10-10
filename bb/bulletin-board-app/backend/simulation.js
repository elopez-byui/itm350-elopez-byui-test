class BankAccount {
    constructor(initialBalance) {
      this.balance = initialBalance;
    }
  
    deposit(amount) {
      this.balance += amount;
      return this.balance;
    }
  
    withdraw(amount) {
      if (amount > this.balance) {
        throw new Error('Insufficient funds');
      }
      this.balance -= amount;
      return this.balance;
    }
  
    getBalance() {
      return this.balance;
    }
  }
  
  function simulateBankOperations(account, days) {
    for (let day = 1; day <= days; day++) {
      console.log(`Day ${day}:`);
      
      // Simular depósito aleatorio
      const deposit = Math.floor(Math.random() * 1000);
      console.log(`  Depositing $${deposit}`);
      account.deposit(deposit);
  
      // Simular retiro aleatorio
      const withdrawalAttempt = Math.floor(Math.random() * 1500);
      try {
        console.log(`  Attempting to withdraw $${withdrawalAttempt}`);
        account.withdraw(withdrawalAttempt);
      } catch (error) {
        console.log(`  ${error.message}`);
      }
  
      console.log(`  Current balance: $${account.getBalance()}`);
      console.log();
    }
  }
  
  // Ejecutar la simulación
  const account = new BankAccount(1000);
  simulateBankOperations(account, 7);