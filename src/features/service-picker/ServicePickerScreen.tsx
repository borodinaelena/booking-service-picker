"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SelectableOptionCard } from "@/components/ui";
import type { SelectedAddOnId } from "@/types";

import {
	allCategoryKey,
	allCategoryLabel,
	emptyServiceNameLabel,
	emptyTotalDurationLabel,
	formatCurrency,
	formatDuration,
} from "./constants";
import { AddOnOptionRow } from "./components/AddOnOptionRow";
import { CategoryFilterChips } from "./components/CategoryFilterChips";
import { useAddOnsQuery, useServicesQuery } from "./queries";
import type { CategoryFilterOption } from "./types";

const compactPriceFormatter = new Intl.NumberFormat("en-US", {
	maximumFractionDigits: 0,
});
const noExtraAddOnId = "none";
const noExtraAddOnLabel = "no extra";

function joinClasses(...classes: Array<string | false | undefined>) {
	return classes.filter(Boolean).join(" ");
}

export function ServicePickerScreen() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { data: services = [], isLoading: isServicesLoading } = useServicesQuery();
	const { data: addOns = [], isLoading: isAddOnsLoading } = useAddOnsQuery();

	const selectedCategoryParam = searchParams.get("category");
	const selectedServiceIdParam = searchParams.get("serviceId");
	const selectedAddOnIdParam = searchParams.get("addOnId");

	function updateSearchParams(paramUpdates: Record<string, string | null>) {
		const nextSearchParams = new URLSearchParams(searchParams.toString());

		Object.entries(paramUpdates).forEach(([paramKey, paramValue]) => {
			if (!paramValue) {
				nextSearchParams.delete(paramKey);
				return;
			}

			nextSearchParams.set(paramKey, paramValue);
		});

		const nextQueryString = nextSearchParams.toString();
		const nextUrl = nextQueryString ? `${pathname}?${nextQueryString}` : pathname;
		router.replace(nextUrl, { scroll: false });
	}

	const categoryFilterOptions: CategoryFilterOption[] = [
		{ key: allCategoryKey, label: allCategoryLabel },
		...Array.from(new Set(services.map(({ category }) => category))).map((category) => ({
			key: category,
			label: category,
		})),
	];
	const categoryKeys = new Set(categoryFilterOptions.map(({ key }) => key));
	const selectedCategoryKey =
		selectedCategoryParam && categoryKeys.has(selectedCategoryParam)
			? selectedCategoryParam
			: allCategoryKey;

	const selectedServiceCandidate =
		selectedServiceIdParam === null
			? null
			: services.find(({ id }) => id === selectedServiceIdParam) ?? null;
	const selectedService =
		selectedServiceCandidate &&
		(selectedCategoryKey === allCategoryKey || selectedServiceCandidate.category === selectedCategoryKey)
			? selectedServiceCandidate
			: null;

	const isNoExtraSelected = selectedService ? selectedAddOnIdParam === noExtraAddOnId : false;
	const selectedAddOnCandidate =
		selectedAddOnIdParam === null || selectedAddOnIdParam === noExtraAddOnId
			? null
			: addOns.find(({ id }) => id === selectedAddOnIdParam) ?? null;
	const selectedAddOn = selectedService ? selectedAddOnCandidate : null;
	const selectedAddOnId: SelectedAddOnId = selectedAddOn?.id ?? null;
	const totalDurationMinutes =
		(selectedService?.durationMinutes ?? 0) + (selectedAddOn?.durationMinutes ?? 0);
	const totalPrice = (selectedService?.price ?? 0) + (selectedAddOn?.price ?? 0);

	const visibleServices =
		selectedCategoryKey === allCategoryKey
			? services
			: services.filter(({ category }) => category === selectedCategoryKey);
	const displayedServiceName = selectedService?.name ?? emptyServiceNameLabel;
	const displayedTotalDuration = selectedService ? `${totalDurationMinutes}min` : emptyTotalDurationLabel;
	const displayedTotalPriceAmount = selectedService ? totalPrice : 0;
	const displayedTotalPriceDigits = compactPriceFormatter.format(displayedTotalPriceAmount);

	function handleCategorySelect(nextCategoryKey: string) {
		const nextCategoryParam = nextCategoryKey === allCategoryKey ? null : nextCategoryKey;

		if (!selectedService) {
			updateSearchParams({ category: nextCategoryParam });
			return;
		}

		const isSelectedServiceVisible =
			nextCategoryKey === allCategoryKey || selectedService.category === nextCategoryKey;

		if (isSelectedServiceVisible) {
			updateSearchParams({ category: nextCategoryParam });
			return;
		}

		updateSearchParams({
			category: nextCategoryParam,
			serviceId: null,
			addOnId: null,
		});
	}

	function handleServiceSelect(serviceId: string) {
		updateSearchParams({ serviceId });
	}

	function handleAddOnSelect(addOnId: string) {
		if (!selectedService) {
			return;
		}

		if (selectedAddOnId === addOnId) {
			updateSearchParams({ addOnId: null });
			return;
		}

		updateSearchParams({ addOnId });
	}

	function handleNoExtraSelect() {
		if (!selectedService) {
			return;
		}

		updateSearchParams({ addOnId: noExtraAddOnId });
	}

	return (
		<main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(139,92,246,0.09),transparent_26%),radial-gradient(circle_at_25%_0%,rgba(250,204,21,0.14),transparent_16%),radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.08),transparent_22%)]"
			/>

			<div className="relative mx-auto w-full max-w-[1240px] px-4 py-5 sm:px-6 sm:py-7">
				<div className="relative overflow-hidden rounded-[32px] border border-zinc-800/80 bg-zinc-950/95 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
					<div className="absolute left-0 top-0 h-[2px] w-[46%] bg-gradient-to-r from-zinc-200/80 via-zinc-300/30 to-transparent" />

					<div className="grid lg:grid-cols-[1.35fr_1fr]">
						<section className="border-zinc-800/80 p-6 sm:p-8 lg:border-r lg:p-10">
							<div className="space-y-6">
								<div className="space-y-4">
									<h1 className="font-semibold lowercase tracking-tight text-zinc-50 sm:text-6xl/[1.02]">
										choose your service
									</h1>

									<CategoryFilterChips
										options={categoryFilterOptions}
										selectedCategoryKey={selectedCategoryKey}
										onSelectCategory={handleCategorySelect}
									/>
								</div>

								<div className="max-h-[58vh] space-y-2 overflow-y-auto pr-1 sm:pr-2">
									{isServicesLoading ? (
										<div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-4 py-5 text-sm text-zinc-500">
											loading services...
										</div>
									) : null}

									{visibleServices.map((service) => (
										<SelectableOptionCard
											key={service.id}
											title={service.name}
											description={service.description}
											metaPrimary={formatCurrency(service.price)}
											metaSecondary={formatDuration(service.durationMinutes)}
											isSelected={selectedService?.id === service.id}
											onSelect={() => handleServiceSelect(service.id)}
											colorScheme="dark"
											className="rounded-2xl border-zinc-900 bg-zinc-900/60"
										/>
									))}

									{visibleServices.length === 0 && !isServicesLoading ? (
										<div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-4 py-5 text-sm text-zinc-500">
											no services available for this category yet
										</div>
									) : null}
								</div>
							</div>
						</section>

						<section className="p-6 sm:p-8 lg:p-10">
							<div className="flex h-full flex-col">
								<div className="space-y-6">
									<h2 className="text-4xl font-semibold lowercase tracking-tight text-zinc-50 sm:text-5xl">
										{displayedServiceName}
									</h2>

									<div className="space-y-3">
										<p className="text-sm lowercase tracking-[0.26em] text-zinc-500">add-ons</p>
										<div className="space-y-1">
											{isAddOnsLoading ? (
												<div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-4 py-5 text-sm text-zinc-500">
													loading add-ons...
												</div>
											) : null}

											<AddOnOptionRow
												name={noExtraAddOnLabel}
												durationMinutes={0}
												price={0}
												isSelected={isNoExtraSelected}
												onSelect={handleNoExtraSelect}
												isDisabled={!selectedService}
											/>

											{addOns.map((addOn) => (
												<AddOnOptionRow
													key={addOn.id}
													name={addOn.name}
													durationMinutes={addOn.durationMinutes}
													price={addOn.price}
													isSelected={selectedAddOn?.id === addOn.id}
													onSelect={() => handleAddOnSelect(addOn.id)}
													isDisabled={!selectedService}
												/>
											))}

											{addOns.length === 0 && !isAddOnsLoading ? (
												<div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-4 py-5 text-sm text-zinc-500">
													no add-ons available right now
												</div>
											) : null}

											{selectedService && !selectedAddOn && !isNoExtraSelected ? (
												<p aria-live="polite" className="px-1 pt-1 text-sm text-zinc-500">
													no add-on selected
												</p>
											) : null}

											{selectedService && isNoExtraSelected ? (
												<p aria-live="polite" className="px-1 pt-1 text-sm text-zinc-500">
													no extra selected
												</p>
											) : null}
										</div>
									</div>
								</div>

								<div className="mt-auto space-y-4 pt-8">
									<div className="flex items-end justify-between gap-4">
										<p className="text-2xl/[1.2] font-medium text-zinc-400 sm:text-3xl/[1.2]">{displayedTotalDuration}</p>
										<div className="flex items-end gap-1.5 text-zinc-50 sm:gap-2">
											<span className="pb-1 text-3xl font-medium text-zinc-400 sm:text-4xl">$</span>
											<span className="text-6xl/[0.9] font-semibold sm:text-7xl/[0.9]">{displayedTotalPriceDigits}</span>
										</div>
									</div>

									<button
										type="button"
										disabled={!selectedService}
										className={joinClasses(
											"inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-base font-semibold lowercase transition",
											"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300",
											selectedService
												? "bg-emerald-800 text-emerald-50 hover:bg-emerald-700"
												: "cursor-not-allowed bg-zinc-800 text-zinc-500",
										)}
									>
										select service
									</button>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</main>
	);
}