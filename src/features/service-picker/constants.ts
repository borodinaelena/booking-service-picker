export const allCategoryKey = "all";
export const allCategoryLabel = "All";
export const emptyServiceNameLabel = "choose your service";
export const emptyTotalDurationLabel = "--";

const currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
	return currencyFormatter.format(amount);
}

export function formatDuration(minutes: number) {
	return `${minutes} min`;
}