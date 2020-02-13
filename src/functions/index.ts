import express, { Express } from 'express';
import bodyParser from 'body-parser';
import isEmpty from 'lodash/isEmpty';
import { generateContractPDF } from './contract';
import { generateInvoicePDF } from './invoice';
import { sampleSettlement } from '../test/sampledata';

const app = express();
app.use(bodyParser.json());

app.get('/', async (req: any, res: { json: (arg0: { alive: boolean; }) => void; }) => {
    return res.json({ alive: true });
});


app.get('/demo/contract', async (req: Express.Request, res: Express.Response) => {
    const data = await generateContractPDF(sampleSettlement);
    // @ts-ignore
    res.send(data);
});

app.get('/demo/invoice', async (req: Express.Request, res: Express.Response) => {
    const data = await generateContractPDF(sampleSettlement);
    // @ts-ignore
    res.send(data);
});

app.post('/', async (req: { body: any; }, res: { json: (arg0: { success: boolean; }) => void; }) => {
    // Grab the text parameter.
    const payload = req.body;

    console.log('Request', JSON.stringify(payload));

    if(isEmpty(payload)){
        return res.json({ success: false });
    }

    return res.json({ success: true });
});

export default app;