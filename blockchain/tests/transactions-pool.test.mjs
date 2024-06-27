import { it, describe, expect, beforeEach } from "vitest";
import Transaction from "../models/Transaction.mjs";
import TransactionPool from "../models/TransactionPool.mjs";
import Wallet from "../models/Wallet.mjs";

describe("TransactionPool", () => {
  let pool, transaction, sender;
  sender = new Wallet();

  beforeEach(() => {
    transaction = new Transaction({
      sender,
      reciever: "Theo",
      amount: 100,
    });
    pool = new TransactionPool();
  });

  describe("Properties", () => {
    describe("transactions", () => {
      it("should exist", () => 
        expect(pool).toHaveProperty("transactions"));
    });
  });
  describe("Methods", () => {
    describe("addTransaction", () => {
      it("should add transaction to the pool", () => {
        pool.addTransaction(transaction);
        expect(pool.transactions[transaction.id]).toBe(transaction);
      });
    });
    describe("checkTransaction", () => {
      it("should return transaction based on address", () => {
        pool.addTransaction(transaction);
        expect(pool.checkTransaction({ address: sender.publicKey })).toBe(
          transaction
        );
      });
    });
  });
});
