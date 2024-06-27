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
})
  