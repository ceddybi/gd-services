import express from 'express';
import PDFDocument from 'pdfkit';
import moment from 'moment';
import { MyTradeNamespace } from '../interfaces/MyTrade.interface';

const bushels = {
    'corn': 39.3680,
    'wheat': 36.7437,
    'soybeans': 36.7437,
    'barley': 45.9296,
    'canola': 44.0920,
};

export const generateContractPDF = async (tradeBody: MyTradeNamespace.RootObject, res?: express.Response): Promise<Buffer | void> => {
    const trade = tradeBody.offer;

    // use passed volume or offer.volume
    // @ts-ignore
    // const volume = tradeBody.volume ? tradeBody.volume : trade.volume;
    let price = trade.displayPrice;
    let buyer: any = {};
    let seller: any = {};
    if(trade.displayWeightUnitType.type !== trade.weightUnitType.type && trade.commodity.category.name.toLowerCase() in bushels){
        if (trade.displayWeightUnitType.type === 'MT') {
            price = trade.displayPrice / bushels[trade.commodity.category.name.toLowerCase()];
        } else if (trade.displayWeightUnitType.type === 'BU') {
            price = trade.displayPrice * bushels[trade.commodity.category.name.toLowerCase()];
        }
    }


    if(trade.offerType.type === 'ASK') {
        buyer.address = tradeBody.address;
        buyer.userInfo = tradeBody.user;
        seller.address = tradeBody.offer.address;
        seller.userInfo = tradeBody.offer.user;
    }
    else {
        buyer.address = tradeBody.offer.address;
        buyer.userInfo = tradeBody.offer.user;
        seller.address = tradeBody.address;
        seller.userInfo = tradeBody.user;
    }

    console.log(tradeBody);

    const deliveryMethod = trade.deliveryMethod.method === 'Delivery' ? 'Delivery' : 'Pickup';
    const doc = new PDFDocument();

    doc.image(__dirname+'/../images/ganaraska.jpg', 70, 35, {
        fit: [160, 160],
        align: 'center',
        valign: 'top' as any
    });

    doc.font('Helvetica-Bold')
        .fillColor('black')
        .fontSize(16)
        .text('Grain Contract', 390, 45)
        .fontSize(10).moveDown(0.5);

    doc.font('Helvetica')
        .text(`Contract#:   ${trade.id.substring(0,8)}`);
    doc.text(`Contract Date:    ${moment.utc(tradeBody.createdAt).subtract(5, 'hours').format('DD-MMM-YYYY HH:mm')}`);

    doc.font('Helvetica-Bold')
        .fontSize(12)
        .text('BUYER', 100, 160).moveDown(0.5);
    doc.font('Helvetica').fontSize(10).text(buyer.userInfo.tradingName);
    if(buyer.address) {
        doc.font('Helvetica')
            .fontSize(10)
            .text(buyer.address.address);
        doc.text(`${buyer.address.place}, ${buyer.address.region},`);
        doc.text(buyer.address.country).moveDown(1);
    }
    doc.font('Helvetica')
        .fontSize(10)
        .text('Phone: ' + buyer.userInfo.primaryPhone);
    doc.text('Email: ' + buyer.userInfo.email);
    doc.text('Contact: ' + buyer.userInfo.firstName + ' ' + buyer.userInfo.lastName);

    doc.font('Helvetica-Bold')
        .fontSize(12)
        .text('SELLER', 370, 160).moveDown(0.5);
    doc.font('Helvetica').fontSize(10).text(seller.userInfo.tradingName);
    if(seller.address) {
        doc.font('Helvetica')
            .fontSize(10)
            .text(seller.address.address);
        doc.text(`${seller.address.place}, ${seller.address.region},`);
        doc.text(seller.address.country).moveDown(1);
    }
    doc.font('Helvetica')
        .fontSize(10)
        .text('Phone: ' + seller.userInfo.primaryPhone);
    doc.text('Email: ' + seller.userInfo.email);
    doc.text('Contact: ' + seller.userInfo.firstName + ' ' + seller.userInfo.lastName);

    doc.text('The Buyer and Seller agree to transact this contract subject to the following Terms and Conditions:', 100, 300).moveDown(1.2);

    doc.font('Helvetica-Bold').fontSize(12).text('COMMODITY', 100, 325);
    doc.font('Helvetica').fontSize(10).text('Commodity:     ' + trade.commodity.type + ' ' + trade.commodity.category.name);
    doc.text('Crop Year:        ' + trade.cropYear);
    doc.text('Grade:              ' + trade.commodity.grade.grade);

    doc.font('Helvetica-Bold').fontSize(12).text('TOTAL QUANTITY', 370, 325);
    doc.font('Helvetica').fontSize(10).text(`Bushels:     ${trade.volumeBushel}`);
    doc.text(`Tonnes:     ${trade.volumeTon}`);


    doc.fontSize(12)
        .font('Helvetica-Bold')
        .text(`${deliveryMethod.toUpperCase()} DETAILS`, 100, 400)
        .fontSize(10);
    doc.font('Helvetica').text(`Location:            ${trade.destination ? trade.destination.address : trade.address.address}`);
    doc.text('Delivery Start:    ' + moment(trade.deliveryStartDateTime).format('DD-MMM-YYYY'));
    doc.text('Delivery End:      ' + moment(trade.deliveryEndDateTime).format('DD-MMM-YYYY'));

    console.log(trade);

    doc.fontSize(12)
        .font('Helvetica-Bold')
        .text('PRICING', 100, 475)
        .fontSize(10);
    if (trade.priceType.type === 'BASIS'){
        doc.font('Helvetica').text('Basis:');
        doc.text('CBOT:').moveDown(0.5);
    }

    doc.font('Helvetica').text('Contract Price:').moveDown(0.5);
    doc.text('Date Priced:');
    doc.text('Currency:');

    doc.fontSize(12)
        .font('Helvetica-Bold')
        .text('BUSHELS', 200, 475)
        .fontSize(10);
    if (trade.priceType.type === 'BASIS'){
        doc.font('Helvetica').text(`$${trade.basisBushel}`);
        doc.text(`$${(trade.priceBushel - trade.basisBushel).toFixed(2)} (${(trade.commodity.future.month)})`).moveDown(0.5);
    }
    doc.font('Helvetica').text(`$${trade.priceBushel}`).moveDown(0.5);
    doc.text(moment.utc(tradeBody.createdAt).subtract(5, 'hours').format('DD-MMM-YYYY HH:mm'));
    doc.text('CAD');

    doc.fontSize(12)
        .font('Helvetica-Bold')
        .text('TONNES', 320, 475)
        .fontSize(10);
        if (trade.priceType.type === 'BASIS') {
            doc.font('Helvetica').text(`$${trade.basisTon}`);
            doc.text(`$${(trade.priceTon - trade.basisTon).toFixed(2)}`).moveDown(0.5);
        }
        doc.font('Helvetica').text(`$${trade.priceTon}`).moveDown(0.5);

    if (trade.priceType.type === 'BASIS') {
        doc.moveTo(100, 515) // set the current point
            .lineTo(510, 515) // draw a line
            .stroke();
    }

    doc.fontSize(8).text(
        "Contract was executed by the Grain Discovery marketplace with both parties adhering to the terms and conditions as stipulated in the terms and conditions. Additional Terms: Payment will be made within 10 working days of completion of this contract. Failure to promptly notify Ganaraska Grain of any discrepancies, objectionn, or disagreement with the terms and conditions shall indicate acceptance of this contract.",
        100,600
    );

    doc.end();

    if(res){
        // return response to response
        doc.on('data', function(d) {
            res.write(d);
        });

        doc.on('end', function() {
            res.end();
        });
        return;
    }

    // return promise
    let rev: Buffer = await new Promise((resolve, reject) => {
        let bufs = [];

        doc.on('data', function(d) {
            bufs.push(d);
        });

        let buffer: Buffer | PromiseLike<Buffer>;
        doc.on('end', function() {
            buffer = Buffer.concat(bufs);
            return resolve(buffer);
        });
    });

    return rev;
};
