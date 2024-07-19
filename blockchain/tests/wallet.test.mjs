import { it, describe, expect, beforeEach } from 'vitest';
import { verifySign } from '../utils/crypto-utils.mjs';
import Wallet from '../models/Wallet.mjs';
import Transaction from '../models/Transaction.mjs';

describe('Wallet', () => {
    let wallet;
    beforeEach(() => {
      wallet = new Wallet();
    });

    describe('Properties', () => {
        describe('balance', () => {
            it('exists', () => 
                expect(wallet).toHaveProperty('balance'))
        })
        describe('keys', () => {
            it('exists', () => 
                expect(wallet).toHaveProperty('keys'))
        })
        describe('publicKey', () => {
            it('exists', () => 
                expect(wallet).toHaveProperty('publicKey'))
        })
    })

    describe('Methods', () => {
        describe('sign', () => {
            let data = "dum data"

            it('exists', () => 
                expect(typeof wallet.sign).toBe('function'))
            it('verifys signature', () => {
                const verification = verifySign({
                    publicKey: wallet.publicKey, 
                    data,
                    signature: wallet.sign(data)})
                expect(verification).toBe(true)})
            it('wont verify faulty signature', () => {
                const verification = verifySign({
                    publicKey: wallet.publicKey, 
                    data,
                    signature: new Wallet().sign(data)})
                expect(verification).toBe(false)})
        })
        describe('transaction', () => {
            it('exists', () => 
                expect(typeof wallet.transaction).toBe('function'))
            it('if unsuficient funds throws error', () => {
                expect(() => wallet.transaction({amount: 2000, receiver: 'Jultomten'})).toThrow('Insufficient funds...')
            })
            describe('if transaction is valid', () => {
                let transaction, amount, receiver;
                beforeEach(() => {
                    amount = 10;
                    receiver = 'Hanna';
                    transaction = wallet.transaction({amount, receiver})})

                it('should create Transaction object', () => 
                    expect(transaction).toBeInstanceOf(Transaction))
                it('should match wallet input', () => 
                    expect(transaction.input.address).toEqual(wallet.publicKey))
                it('should output the amount to receiver', () => 
                    expect(transaction.output.receiver.amount).toEqual(amount));
            })
        })
    })
})
  