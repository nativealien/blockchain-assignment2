import { it, describe, expect, beforeEach } from 'vitest';
import Transaction from '../models/Transaction.mjs';

describe('Transaction', () => {
    let transaction;

    beforeEach( () => {
        transaction = new Transaction()
    })

    describe('Properties', () => {
        it('should have a propertie id', () => {
            expect(transaction).toHaveProperty('id')
        })
    })
})