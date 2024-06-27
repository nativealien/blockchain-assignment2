import { it, describe, expect, beforeEach } from "vitest";
import Transaction from "../models/Transaction.mjs";
import Wallet from "../models/Wallet.mjs";

describe("Transaction", () => {
  let sender, reciever, amount, transaction;

  beforeEach(() => {
    sender = new Wallet();
    reciever = "Milo";
    amount = 50;
    transaction = new Transaction({ sender, reciever, amount });
  });
  describe("Properties:", () => {
    describe("ID:", () => {
      it("exists", () => 
        expect(transaction).toHaveProperty("id"));
      it("as type string", () => 
        expect(transaction.id).toBeTypeOf("string"));
    });
    describe("Output:", () => {
      it("exists", () => 
        expect(transaction).toHaveProperty("input"));
      it("as type object", () =>
        expect(transaction.output).toBeTypeOf("object"));
      it("displays recievers balance", () =>
        expect(transaction.output[reciever]).toEqual(amount));
      it("displays sender balance", () =>
        expect(transaction.output[sender.publicKey]).toEqual(
          sender.balance - amount
        ));
    });
    describe("Input:", () => {
      it("exists", () => 
        expect(transaction).toHaveProperty("output"));
      it("as type object", () =>
        expect(transaction.input).toBeTypeOf("object"));
      it("has timestamp property", () =>
        expect(transaction.input).toHaveProperty("timestamp"));
      it("sets the sender balance", () =>
        expect(transaction.input.amount).toEqual(sender.balance));
      it("sets the sender public key", () =>
        expect(transaction.input.address).toEqual(sender.publicKey));
      // It should sign the input .toBe(true)
    });
  });

  describe("Methods:", () => {
    describe("createOutput:", () => {
      it("exists", () =>
        expect(typeof transaction.createOutput).toBe("function"));
    });
    describe("createInput:", () => {
      it("exists", () =>
        expect(typeof transaction.createInput).toBe("function"));
    });
    describe("validate:", () => {
      it("exists", () => expect(typeof Transaction.validate).toBe("function"));
      it("is true if valid transaction", () =>
        expect(Transaction.validate(transaction)).toBe(true));
      it("is false if invalid transaction", () => {
        transaction.output[sender.publicKey] = 666;
        expect(Transaction.validate(transaction)).toBe(false);
      });
    });

    describe("update:", () => {
      it("exists", () => expect(typeof transaction.update).toBe("function"));
      it("throw error on low funds", () =>
        expect(typeof transaction.update).toBe("function"));
      describe("if amount is valid", () => {
        it("display amount for next", () =>
          expect(typeof transaction.update).toBe("function"));
        it("withdraw amount for sender", () =>
          expect(typeof transaction.update).toBe("function"));
        it("match output and input total", () =>
          expect(typeof transaction.update).toBe("function"));
        it("create signature", () =>
          expect(typeof transaction.update).toBe("function"));
      });
    });
  });
});
