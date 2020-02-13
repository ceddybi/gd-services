import { MyTradeNamespace } from "../interfaces/MyTrade.interface";

export const sampleSettlement: MyTradeNamespace.RootObject = {
    "id": "277baf02-2651-415b-8947-8593007bee7d",
    "user": {
        "id": "9effa938-fec0-4259-9bab-cdb8e9f6f5e8",
        "username": "gd-laura",
        "firstName": "Laura",
        "lastName": "Mann",
        "email": "laura@graindiscovery.com",
        "primaryPhone": "416-456-7968",
        "alternativePhone": "647-888-9301",
        "tradingName": "gd-laura",
        "type": {
            "id": "5f640364-298a-49bf-ae0c-6046f6356971",
            "type": "TRADER"
        }
    },
    "offer": {
        "id": "48003777-10f3-4a0c-a336-8606d47775f6",
        displayPrice: 0,
        "user": {
            "id": "f41e865d-aa93-4ff4-bbd0-8c1acfad8c4f",
            "username": "green-xx",
            "firstName": "Green",
            "lastName": "Robot",
            "email": "ceddymuhoza@gmail.com",
            "primaryPhone": "4168369962",
            "alternativePhone": "",
            "tradingName": "Green Inc",
            "type": {
                "id": "5f640364-298a-49bf-ae0c-6046f6356971",
                "type": "TRADER"
            }
        },
        "volume": 258450.92,
        "weightUnitType": {
            "id": "79748a36-2b04-11e9-b210-d663bd873d93",
            "type": "MT"
        },
        "displayWeightUnitType": {
            "id": "79748ce8-2b04-11e9-b210-d663bd873d93",
            "type": "BU"
        },
        "price": 166.76,
        "priceType": {
            "id": "00c5d2c4-7374-454f-927e-ccb5815a72b7",
            "type": "CASH"
        },
        "commodity": {
            "id": "5721d077-24f5-4200-b29b-70b52cfe821d",
            "type": "Organic",
            "grade": {
                "id": "999ee51a-724d-4707-a3e7-86553d58b3d3",
                "grade": "2"
            },
            "future": null,
            "category": {
                "id": "00380a57-8221-4900-a662-21641c3deb9a",
                "name": "Corn",
            }
        },
        "offerType": {
            "id": "46244fa5-84f7-4259-9a48-38c0495d9547",
            "type": "BID"
        },
        "distance": 1.0,
        "comments": "",
        "currency": {
            "id": "96d31286-5008-11e9-8647-d663bd873d93",
            "countryName": "CANADA",
            "currencyName": "Canadian Dollar",
            "currency": "CAD",
            "currencyNumber": 124,
            "currencyMonetaryUnit": 2
        },
        "address": {
            "id": "472327f2-d7dd-4f16-b71b-5035a758549e",
            "name": "461 King St W",
            "address": "461 King St W",
            "postcode": "M5V 1K4",
            "latitude": 43.644455,
            "longitude": -79.3960876,
            "place": "Toronto",
            "region": "Ontario",
            "country": "Canada",
            "types": null
        },
        "destination": null,
        "distanceUnitType": {
            "id": "8b4331b8-2b09-11e9-b210-d663bd873d93",
            "type": "KM"
        },
        "deliveryMethod": {
            "id": "dfb21aab-005b-49c4-b6e8-b77efa9a1d1d",
            "method": "Delivery"
        },
        "startDateTime": new Date("2020-01-21T21:03:41.523"),
        "endDateTime": null,
        "status": {
            "id": "fdbbfe62-a93b-4b94-be67-7349aaf47f19",
            "status": "COMPLETED"
        },
        "modifiedAt": new Date("2020-01-24T16:51:50.002+0000"),
        "createdAt": new Date("2020-01-21T21:03:56.901+0000"),
        "deliveryStartDateTime": new Date("2020-01-22T05:00:00"),
        "deliveryEndDateTime": new Date("2021-06-30T04:00:00"),
        "basis": null,
        "cropYear": 2019,
        "minPartialFillVolume": null,
        "priceTon": 6565.0,
        "priceBushel": 166.76,
        "volumeTon": 6565.0,
        "volumeBushel": 258450.92,
        "basisTon": null,
        "basisBushel": null
    },
    "address": {
        "id": "411b10b7-f502-4653-997b-b0876a14f66d",
        "name": "The Office",
        "address": "461 King St. West",
        "postcode": "M5V1K4",
        "latitude": 43.6444206,
        "longitude": -79.3961029,
        "place": "The Office",
        "region": "Ontario",
        "country": "Canada",
        "types": null
    },
    "deliveries": [
        // @ts-ignore
        {
            "id": "08459783-eaed-4975-985d-3b7831713cb6",
            "volume": 91451.864,
            "notes": null,
            "ticketId": "234234",
            "truckId": null,
            "dryingCost": 0.0,
            "discount": 0.0,
            "checkoffCost": 0.0,
            "deliveryDate": "2020-01-22",
            // "weightUnitType": {
            //     "id": "79748a36-2b04-11e9-b210-d663bd873d93",
            //     "type": "MT"
            // },
            // "displayWeightUnit": {
            //     "id": "79748ce8-2b04-11e9-b210-d663bd873d93",
            //     "type": "BU"
            // },
            "testWeight": 23.0,
            "moisture": 0.01,
            "protein": 0.03,
            "externalId": null,
            "commodity": null,
            "productGrade": null,
            "comments": null,
            "cropYear": null
        }
    ],
    "createdAt": new Date("2020-01-24T16:28:25.601+0000"),
    "modifiedAt": new Date("2020-01-24T16:51:50.000+0000")
}