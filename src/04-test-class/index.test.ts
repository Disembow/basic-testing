// import _ from 'lodash';

import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

enum Args {
  balance1 = 1000,
  balance2 = 2000,
  more = 1500,
  less = 500,
  deposit = 500,
  random = 21,
}

describe('BankAccount', () => {
  let account: BankAccount;
  let secondAccount: BankAccount;

  beforeEach(() => {
    account = getBankAccount(Args.balance1);
    secondAccount = getBankAccount(Args.balance2);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(Args.balance1);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(Args.more)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(Args.more, secondAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(Args.more, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(account.deposit(Args.deposit).getBalance()).toBe(
      Args.balance1 + Args.deposit,
    );
  });

  test('should withdraw money', () => {
    expect(account.withdraw(Args.less).getBalance()).toBe(
      Args.balance1 - Args.less,
    );
  });

  test('should transfer money', () => {
    expect(account.transfer(Args.less, secondAccount).getBalance()).toBe(
      Args.balance1 - Args.less,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(account, 'fetchBalance')
      .mockImplementation(() => Promise.resolve(21));

    const result = await account.fetchBalance();

    expect(result).toBe(21);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(account, 'fetchBalance')
      .mockImplementation(() => Promise.resolve(Args.random));

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(Args.random);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(account, 'fetchBalance')
      .mockImplementation(() => Promise.resolve(null));

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
