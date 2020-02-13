import mocha from 'mocha';
import { expect } from 'chai';
import { generateContractPDF } from '../functions/contract';
import { generateInvoicePDF } from '../functions/invoice';
import { sampleSettlement } from './sampledata';

describe('given a completed trade/settlement', () => {

    it('should generate contract successfully', async () => {
        const generatedPdf = generateContractPDF(sampleSettlement)
        expect(generatedPdf).to.not.null;
    })

    it('should generate invoice successfully', async () => {
        const generatedPdf = generateInvoicePDF(sampleSettlement)
        expect(generatedPdf).to.not.null;
    })
})