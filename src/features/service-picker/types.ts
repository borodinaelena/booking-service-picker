export type AddOnOptionRowProps = {
	name: string;
	durationMinutes: number;
	price: number;
	isSelected: boolean;
	onSelect: () => void;
	isDisabled?: boolean;
};

export type CategoryFilterOption = {
	key: string;
	label: string;
};