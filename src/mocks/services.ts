import type { Service } from "@/types";

export const services = [
	{
		id: "service-precision-fade",
		name: "Precision Fade",
		description: "Skin fade with a clean lineup and styling finish.",
		durationMinutes: 45,
		price: 45,
		category: "Haircut",
	},
	{
		id: "service-classic-cut",
		name: "Classic Cut",
		description: "A timeless haircut with scissor detailing and style advice.",
		durationMinutes: 30,
		price: 35,
		category: "Haircut",
	},
	{
		id: "service-beard-shape",
		name: "Beard Shape & Trim",
		description: "Beard shaping, neckline cleanup, and oil finish.",
		durationMinutes: 25,
		price: 28,
		category: "Beard",
	},
	{
		id: "service-grooming-package",
		name: "Grooming Package",
		description: "Haircut and beard trim bundled into one appointment.",
		durationMinutes: 70,
		price: 68,
		category: "Package",
	},
] satisfies Service[];