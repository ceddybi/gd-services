import PDFDocument from 'pdfkit';
import { MyTradeNamespace } from '../../interfaces/MyTrade.interface';

const GOVERNMENT_TAX = 0.13;
const GD_FEE = 0;

const bushels = {
    'corn': 39.3680,
    'wheat': 36.7437,
    'soybeans': 36.7437,
    'barley': 45.9296,
    'canola': 44.0920,
};

const conversion = (value, commodity, baseUnit,  targetUnit, price) => {

    if (commodity in bushels) {
        if (baseUnit === 'BU' && targetUnit === 'MT'){
            return (price ? value * bushels[commodity] : value / bushels[commodity]);
        }
        else if (baseUnit === 'MT' && targetUnit === 'BU'){
            return (price ? value / bushels[commodity] : value * bushels[commodity]);
        }
    }
};

export const generateInvoicePDF = async (trade: MyTradeNamespace.RootObject): Buffer => {

    const drying_fee = trade.deliveries.reduce((acc, curr) => acc + curr.dryingCost * curr.volume, 0);
    const discount = trade.deliveries.reduce((acc, curr) => acc + curr.discount * curr.volume, 0);
    const checkoff_fee = trade.deliveries.reduce((acc, curr) => acc + curr.checkoffCost * curr.volume, 0);
    const total_drying_tax = drying_fee * GOVERNMENT_TAX;
    const total_checkoff_tax = checkoff_fee * GOVERNMENT_TAX;
    const volume = trade.deliveries.reduce((acc, curr) => acc + curr.volume, 0);

    trade.deliveries = trade.deliveries.map((delivery) => {
        delivery.price = trade.offer.price - (delivery.dryingCost + delivery.discount + delivery.checkoffCost);
        delivery.commodity = trade.offer.commodity.type as any;

        // override trade with value
        // @ts-ignore
        delivery.grade = trade.offer.commodity.grade.grade;
        return delivery;
    });


    const netAmountElevators = drying_fee + discount + checkoff_fee;
    const netAmountGovernment = total_drying_tax + total_checkoff_tax;
    const netAmountGD = volume * GD_FEE;
    const settlement = (volume*trade.offer.price) - netAmountElevators - netAmountGovernment - netAmountGD;

    const buyer = trade.offer.offerType.id === '46244fa5-84f7-4259-9a48-38c0495d9547' ? trade.offer.user : trade.user;
    const seller = trade.offer.offerType.id === '46244fa5-84f7-4259-9a48-38c0495d9547' ? trade.user : trade.offer.user;

    const doc = new PDFDocument();
    doc.image('../../images/logo.png', 470, 35, {
        fit: [50, 50],
        align: 'center',
        valign: 'top'
    });

    doc.image('../../images/GanaraskaLogo.jpg', 70, 35, {
        fit: [120, 120],
        align: 'center',
        valign: 'top'
    });

    doc.fillColor('black')
        .fontSize(12)
        .text('Settlement Statement', 280, 45)
        .fontSize(10);

    doc.moveTo(70, 100) // set the current point
        .lineTo(550, 100) // draw a line                         // draw another line
        .stroke();

    doc.fillColor('black')
        .text(`Settlement #:  ${trade.id}`, 400, 120)
        .moveDown(0.5);
    doc.text(`Date: ${new Date().toISOString().slice(0, 10)}`);

    doc.font('Helvetica-Bold')
        .text('Buyer', 100, 200)
        .moveDown(0.5);
    doc.font('Helvetica').text(buyer.tradingName);
    doc.font('Helvetica')
        .text(`${buyer.firstName} ${buyer.lastName}`)
        .moveDown(0.2);
    doc.text(buyer.primaryPhone).moveDown(0.2);
    doc.text(buyer.email);

    doc.font('Helvetica-Bold')
        .text('Seller', 300, 200)
        .moveDown(0.5);
    doc.font('Helvetica').text(seller.tradingName);
    doc.font('Helvetica')
        .text(`${seller.firstName} ${seller.lastName}`)
        .moveDown(0.2);
    doc.text(seller.primaryPhone).moveDown(0.2);
    doc.text(seller.email);

    doc.font('Helvetica-Bold').fontSize(15).text('Commodity Details', 100, 290).fontSize(10);
    doc.moveTo(100, 305) // set the current point
        .lineTo(550, 305) // draw a line                         // draw another line
        .stroke();
    let distance = 320;
    doc.text('Commodity', 100, distance);
    doc.text('Grade', 220, distance);
    doc.text('Total Volume', 300, distance);
    doc.text('Price', 400, distance).font('Helvetica');

    doc.text(trade.offer.commodity.category.name, 100, distance+20);
    doc.text(trade.offer.commodity.grade.grade, 220, distance+20);

    doc.text(volume.toFixed(3) + (trade.offer.displayWeightUnitType.type === 'MT' ? ' MT' : ' Bu'), 300, distance+20);
    doc.text((conversion(volume, trade.offer.commodity.category.name.toLowerCase(),trade.offer.displayWeightUnitType.type , trade.offer.displayWeightUnitType.type ==='MT' ? 'BU' : 'MT', false)).toFixed(3) + (trade.offer.displayWeightUnitType.type === 'MT' ? ' Bu' : ' MT'), 300, distance+40);


    doc.text('$' + trade.offer.price.toFixed(2) + (trade.offer.displayWeightUnitType.type === 'MT' ? ' /MT' : ' /Bu'), 400, distance+20);
    doc.text('$' + (conversion(trade.offer.price, trade.offer.commodity.category.name.toLowerCase(), trade.offer.displayWeightUnitType.type , trade.offer.displayWeightUnitType.type ==='MT' ? 'BU' : 'MT', true)).toFixed(2) + (trade.offer.displayWeightUnitType.type === 'MT' ? '/Bu' : '/MT'), 400, distance+40);

    doc.text(`Net Amount: $${(trade.offer.price*volume).toFixed(2)}`, 100, distance + 60);

    distance += 90;

    doc.moveTo(100, distance)
        .font('Helvetica-Bold').fontSize(15)
        .text('Elevator Charges', 100, distance-5).fontSize(10);
    doc.moveTo(100, distance+15) // set the current point
        .lineTo(550, distance+15) // draw a line                         // draw another line
        .stroke();

    distance += 20;

    doc.text('Drying Fee', 100, distance);
    doc.text('Discount', 250, distance);
    doc.text('Checkoff Fee', 400, distance);

    distance += 15;

    doc.font('Helvetica').text(drying_fee.toFixed(2), 100, distance);
    doc.text(discount.toFixed(2), 250, distance);
    doc.text(checkoff_fee.toFixed(2), 400, distance);
    distance += 20;
    doc.text(`Net Amount: -$${netAmountElevators.toFixed(2)}`, 100, distance);

    distance += 40;

    doc.font('Helvetica-Bold').fontSize(15).text('Government Fees', 100, distance).fontSize(10);
    doc.moveTo(100, distance+15) // set the current point
        .lineTo(550, distance+15) // draw a line                         // draw another line
        .stroke();
    distance += 20;
    doc.text('Total Drying Tax', 100, distance);
    doc.text('Total Checkoff Tax', 250, distance);

    distance += 15;
    doc.font('Helvetica').text(total_drying_tax.toFixed(2), 100, distance);
    doc.text(total_checkoff_tax.toFixed(2), 250, distance);

    distance += 20;
    doc.text(`Net Amount: $${netAmountGovernment.toFixed(2)}`, 100, distance);

    distance += 40;
    doc.font('Helvetica-Bold').fontSize(15)
        .text('Grain Discovery Fee: $0.00 / Mt', 100, distance).fontSize(10)
        .moveDown(0.5);
    doc.moveTo(100, distance+15) // set the current point
        .lineTo(550, distance+15) // draw a line                         // draw another line
        .stroke();
    distance += 20;
    doc.font('Helvetica').text(`Net Grain Discovery Fee: $${netAmountGD.toFixed(2)}`, 100, distance);

    distance += 35;
    doc.fontSize(13).text(`Total Settlement: $${settlement.toFixed(2)}`, 400, distance);


    // Deliveries page
    doc.addPage();

    doc.font('Helvetica-Bold').fontSize(15).text('Deliveries', 100, 50).fontSize(10);
    doc.moveTo(100, 65) // set the current point
        .lineTo(550, 65) // draw a line                         // draw another line
        .stroke();
    let dist = 75;
    doc.text('Delivery Date', 100, dist);
    doc.text('Volume', 200, dist);
    doc.text('Price', 300, dist).font('Helvetica');

    trade.deliveries.map((delivery) => {
        dist += 20;
        return (
            doc.text(delivery.deliveryDate, 100, dist),
            doc.text(delivery.volume.toFixed(3) + (trade.offer.displayWeightUnitType.type === 'MT' ? ' MT' : ' Bu'), 200, dist),
            doc.text('$' + delivery.price.toFixed(2) + (trade.offer.displayWeightUnitType.type === 'MT' ? ' /MT' : ' /Bu'), 300, dist)
        );
    });


    doc.end();

    let rev: Buffer = await new Promise((resolve, reject) => {
        let bufs = [];

        doc.on('data', function(d) {
            bufs.push(d);
        });

        let buffer;
        doc.on('end', function() {
            buffer = Buffer.concat(bufs);
            return resolve(buffer);
        });
    });

    return rev;
};
