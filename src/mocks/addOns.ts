import type { AddOn } from "@/types";

export const addOns = [
	{
		id: "addon-hot-towel",
		name: "hot towel finish",
		durationMinutes: 10,
		price: 12,
	},
	{
		id: "addon-wash-style",
		name: "wash & style",
		durationMinutes: 15,
		price: 15,
	},
	{
		id: "addon-beard-treatment",
		name: "beard treatment",
		durationMinutes: 12,
		price: 18,
	},
	{
		id: "addon-eyebrow-cleanup",
		name: "eyebrow cleanup",
		durationMinutes: 8,
		price: 10,
	},
] satisfies AddOn[];