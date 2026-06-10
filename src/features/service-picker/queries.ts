import { useQuery } from "@tanstack/react-query";

import { addOns, services } from "@/mocks";
import type { AddOn, Service } from "@/types";

export const servicePickerQueryKeys = {
	services: ["service-picker", "services"] as const,
	addOns: ["service-picker", "add-ons"] as const,
};

function fetchServices(): Promise<Service[]> {
	return Promise.resolve(services);
}

function fetchAddOns(): Promise<AddOn[]> {
	return Promise.resolve(addOns);
}

export function useServicesQuery() {
	return useQuery({
		queryKey: servicePickerQueryKeys.services,
		queryFn: fetchServices,
	});
}

export function useAddOnsQuery() {
	return useQuery({
		queryKey: servicePickerQueryKeys.addOns,
		queryFn: fetchAddOns,
	});
}