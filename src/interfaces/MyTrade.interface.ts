export type CommodityType = 'corn' | 'wheat' | 'soybeans' | 'canola';

export declare namespace MyTradeNamespace {
	export interface Type {
		id: string;
		type: string;
	}

	export interface User {
		id: string;
		username: string;
		firstName: string;
		lastName: string;
		email: string;
		primaryPhone: string;
		alternativePhone: string;
		tradingName: string;
		type: Type;
	}

	export interface Type2 {
		id: string;
		type: string;
	}

	export interface User2 {
		id: string;
		username: string;
		firstName: string;
		lastName: string;
		email: string;
		primaryPhone: string;
		alternativePhone: string;
		tradingName: string;
		type: Type2;
	}

	export interface WeightUnitType {
		id: string;
		type: string;
	}

	export interface DisplayWeightUnitType {
		id: string;
		type: string;
	}

	export interface PriceType {
		id: string;
		type: string;
	}

	export interface Grade {
		id: string;
		grade: string;
	}

	export interface Category {
		id: string;
		name: CommodityType;
	}

	export interface Commodity {
		id: string;
		type: string;
		grade: Grade;
		future?: any;
		category: Category;
	}

	export interface OfferType {
		id: string;
		type: string;
	}

	export interface Currency {
		id: string;
		countryName: string;
		currencyName: string;
		currency: string;
		currencyNumber: number;
		currencyMonetaryUnit: number;
	}

	export interface Address {
		id: string;
		name: string;
		address: string;
		postcode: string;
		latitude: number;
		longitude: number;
		place: string;
		region: string;
		country: string;
		types?: any;
	}

	export interface DistanceUnitType {
		id: string;
		type: string;
	}

	export interface DeliveryMethod {
		id: string;
		method: string;
	}

	export interface Status {
		id: string;
		status: string;
	}

	export interface Offer {
		id: string;
		user: User2;
		volume: number;
		weightUnitType: WeightUnitType;
		displayWeightUnitType: DisplayWeightUnitType;
		price: number;
		priceType: PriceType;
		commodity: Commodity;
		offerType: OfferType;
		distance: number;
		comments: string;
		currency: Currency;
		address: Address;
		destination?: any;
		distanceUnitType: DistanceUnitType;
		deliveryMethod: DeliveryMethod;
		startDateTime: Date;
		endDateTime: Date;
		status: Status;
		modifiedAt: Date;
		createdAt: Date;
		deliveryStartDateTime: Date;
		deliveryEndDateTime: Date;
		deliveries: Deliveries[];
		basis?: any;
		cropYear: number;
		minPartialFillVolume?: any;
		priceTon: number;
		priceBushel: number;
		volumeTon: number;
		volumeBushel: number;
		basisTon?: any;
		basisBushel?: any;

		displayPrice?: number;
	}

	export interface Address2 {
		id: string;
		name: string;
		address: string;
		postcode: string;
		latitude: number;
		longitude: number;
		place: string;
		region: string;
		country: string;
		types?: any;
	}

	export interface Deliveries {
		deliveryDate: string;
		contract?: any;
		tradingName: string;
		address: Address;
		carrier?: any;
		truckId?: any;
		ticketId: string;
		commodity: Commodity;
		grade: Grade;
		volume: number;
		moisture: number;
		testWeight: number;

		dryingCost?: number;
		discount?: number;
		checkoffCost?: number;

		price?: number;
	}

	export interface RootObject {
		id: string;
		user: User;
		offer: Offer;
		address: Address2;
		deliveries?: Deliveries[];
		createdAt: Date;
		modifiedAt: Date;
	}
}
