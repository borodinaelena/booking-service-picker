export type Service = {
	id: string;
	name: string;
	description: string;
	durationMinutes: number;
	price: number;
	category: string;
};

export type AddOn = {
	id: string;
	name: string;
	durationMinutes: number;
	price: number;
};

export type SelectedServiceId = Service["id"] | null;
export type SelectedAddOnId = AddOn["id"] | null;

export type ServicePickerSelectionState = {
	selectedServiceId: SelectedServiceId;
	selectedAddOnId: SelectedAddOnId;
};