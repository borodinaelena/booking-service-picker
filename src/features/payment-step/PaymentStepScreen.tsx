"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { useAddOnsQuery, useServicesQuery } from "@/features/service-picker/queries";
import { formatDuration } from "@/features/service-picker/constants";

const noExtraAddOnId = "none";
const tipOptions = [
	{ label: "no tip", value: "no-tip", rate: 0 },
	{ label: "15%", value: "15", rate: 0.15 },
	{ label: "18%", value: "18", rate: 0.18 },
	{ label: "20%", value: "20", rate: 0.2 },
	{ label: "custom", value: "custom", rate: 0, isDisabled: true },
] as const;
const paymentMethodOptions = ["google pay", "apple pay"];
const bookingFeeAmount = 2.25;
const paymentCurrencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
const paymentAmountDigitsFormatter = new Intl.NumberFormat("en-US", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

function joinClasses(...classes: Array<string | false | undefined>) {
	return classes.filter(Boolean).join(" ");
}

export function PaymentStepScreen() {
	const searchParams = useSearchParams();
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethodOptions[0]);
	const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(true);
	const [selectedTipOptionValue, setSelectedTipOptionValue] = useState("15");
	const { data: services = [], isLoading: isServicesLoading } = useServicesQuery();
	const { data: addOns = [], isLoading: isAddOnsLoading } = useAddOnsQuery();

	const selectedServiceIdParam = searchParams.get("serviceId");
	const selectedAddOnIdParam = searchParams.get("addOnId");
	const selectedService =
		selectedServiceIdParam === null
			? null
			: services.find(({ id }) => id === selectedServiceIdParam) ?? null;
	const isNoExtraSelected = selectedService ? selectedAddOnIdParam === noExtraAddOnId : false;
	const selectedAddOn =
		selectedService && selectedAddOnIdParam !== null && selectedAddOnIdParam !== noExtraAddOnId
			? addOns.find(({ id }) => id === selectedAddOnIdParam) ?? null
			: null;
	const selectedTipOption =
		tipOptions.find(({ value }) => value === selectedTipOptionValue) ?? tipOptions[1];
	const serviceAmount = selectedService?.price ?? 0;
	const addOnAmount = selectedAddOn?.price ?? 0;
	const subtotalAmount = serviceAmount + addOnAmount;
	const tipAmount = subtotalAmount * selectedTipOption.rate;
	const fallbackSearchParams = new URLSearchParams(searchParams.toString());
	fallbackSearchParams.delete("serviceId");
	fallbackSearchParams.delete("addOnId");
	const fallbackQueryString = fallbackSearchParams.toString();
	const fallbackPickerHref = fallbackQueryString ? `/?${fallbackQueryString}` : "/";
	const backToPickerHref = searchParams.toString() ? `/?${searchParams.toString()}` : "/";
	const totalDurationMinutes =
		(selectedService?.durationMinutes ?? 0) + (selectedAddOn?.durationMinutes ?? 0);
	const totalPrice = serviceAmount + addOnAmount + tipAmount + bookingFeeAmount;
	const displayedTotalPriceDigits = paymentAmountDigitsFormatter.format(totalPrice);
	const confirmBookingLabel =
		selectedPaymentMethod === "apple pay" ? "book with apple pay" : "book appointment";
	const selectedPaymentMethodLabel =
		selectedPaymentMethod === "google pay" ? "Google Pay" : "Apple Pay";
	const selectedPaymentMethodIconSrc =
		selectedPaymentMethod === "google pay" ? "/icons/google-logo.svg" : "/icons/apple-logo.svg";

	if (isServicesLoading || isAddOnsLoading) {
		return (
			<main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50">
				<div className="relative mx-auto w-full max-w-[1240px] px-4 py-8 sm:px-6 sm:py-10">
					<div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/95 px-6 py-8 text-sm text-zinc-500 sm:px-8">
						loading payment step...
					</div>
				</div>
			</main>
		);
	}

	if (!selectedService) {
		return (
			<main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50">
				<div className="relative mx-auto w-full max-w-[1240px] px-4 py-8 sm:px-6 sm:py-10">
					<div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/95 px-6 py-8 sm:px-8">
						<h1 className="text-3xl font-semibold lowercase tracking-tight text-zinc-50 sm:text-4xl">
							set up payment method
						</h1>
						<p className="mt-4 text-base text-zinc-400">no valid service selected yet</p>
						<Link
							href={fallbackPickerHref}
							className="mt-6 inline-flex rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium lowercase text-zinc-100 transition hover:border-zinc-500"
						>
							back to service picker
						</Link>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(139,92,246,0.09),transparent_26%),radial-gradient(circle_at_25%_0%,rgba(250,204,21,0.14),transparent_16%),radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.08),transparent_22%)]"
			/>

			<div className="relative mx-auto w-full max-w-[1240px] px-4 py-8 sm:px-6 sm:py-10">
				<div className="overflow-hidden rounded-[36px] border border-zinc-800/80 bg-zinc-950/95 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
					<div className="h-[2px] w-full bg-gradient-to-r from-zinc-300/60 via-zinc-300/20 to-transparent" />
					<div className="px-6 pt-4 sm:px-8 lg:px-10 lg:pt-5">
						<Link
							href={backToPickerHref}
							className="inline-flex text-sm lowercase text-zinc-400 transition hover:text-zinc-200"
						>
							back
						</Link>
					</div>
					<div className="grid lg:grid-cols-[1.35fr_1fr]">
						<section className="space-y-9 px-6 pb-8 pt-3 sm:px-8 sm:pb-10 sm:pt-4 lg:px-10 lg:pb-12 lg:pt-6">
							<div>
								<h1 className="text-4xl font-semibold lowercase tracking-tight text-zinc-50 sm:text-5xl/[1.02]">
									set up payment method
								</h1>
							</div>

							<div className="space-y-8">
								<div className="space-y-3">
									<p className="text-xs lowercase tracking-[0.24em] text-zinc-500">payment method</p>
									<button
										type="button"
										aria-expanded={isPaymentMethodOpen}
										onClick={() => setIsPaymentMethodOpen(!isPaymentMethodOpen)}
										className={joinClasses(
											"flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/70 px-5 py-4 text-left",
											"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-100",
										)}
									>
										<span className="flex items-center gap-3">
											<Image
												src={selectedPaymentMethodIconSrc}
												alt=""
												width={18}
												height={18}
												className="h-[18px] w-[18px]"
												aria-hidden="true"
											/>
											<span className="text-sm leading-none text-zinc-100">{selectedPaymentMethodLabel}</span>
										</span>
										<span aria-hidden="true" className="text-zinc-500">
											{isPaymentMethodOpen ? "^" : "v"}
										</span>
									</button>

									{isPaymentMethodOpen ? (
										<div className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-6">
											<div>
												<p className="text-xs lowercase tracking-[0.24em] text-zinc-500">digital wallets</p>
												<div className="mt-4 space-y-3">
													{paymentMethodOptions.map((paymentMethodOption) => {
														const optionLabel =
															paymentMethodOption === "google pay" ? "Google Pay" : "Apple Pay";

														return (
															<button
																key={paymentMethodOption}
																type="button"
																onClick={() => setSelectedPaymentMethod(paymentMethodOption)}
																className={joinClasses(
																	"flex w-full items-center justify-between rounded-lg px-1 py-2 text-left transition",
																	"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-100",
																	"hover:bg-zinc-900/70",
																)}
															>
																<div className="flex items-center gap-3">
																	<Image
																		src={paymentMethodOption === "google pay" ? "/icons/google-logo.svg" : "/icons/apple-logo.svg"}
																		alt=""
																		width={18}
																		height={18}
																		className="h-[18px] w-[18px]"
																		aria-hidden="true"
																	/>
																	<span className="text-sm leading-none text-zinc-100">{optionLabel}</span>
																</div>
																<span
																	aria-hidden="true"
																	className={joinClasses(
																		"flex h-7 w-7 items-center justify-center rounded-full border",
																		selectedPaymentMethod === paymentMethodOption
																			? "border-zinc-100 bg-zinc-100"
																			: "border-zinc-700",
																	)}
																>
																	{selectedPaymentMethod === paymentMethodOption ? (
																		<span className="h-2.5 w-2.5 rounded-full bg-zinc-950" />
																	) : null}
																</span>
															</button>
														);
													})}
												</div>
											</div>

											<div>
												<p className="text-xs lowercase tracking-[0.24em] text-zinc-500">saved cards</p>
												<button
													type="button"
													disabled
													className={joinClasses(
														"mt-4 inline-flex cursor-not-allowed items-center gap-3 rounded-lg px-1 py-2 text-sm leading-none text-zinc-500",
													)}
												>
													<span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-2xl text-zinc-500">
														+
													</span>
													<span>add new</span>
												</button>
											</div>
										</div>
									) : null}
								</div>

								<div className="space-y-3">
									<p className="text-xs lowercase tracking-[0.24em] text-zinc-500">tip option</p>
									<div className="flex flex-wrap gap-2 sm:gap-3">
										{tipOptions.map((tipOption) => (
											<button
												key={tipOption.value}
												type="button"
												disabled={tipOption.isDisabled}
												aria-pressed={selectedTipOption.value === tipOption.value}
												onClick={() => setSelectedTipOptionValue(tipOption.value)}
												className={joinClasses(
													"min-w-[96px] rounded-full border px-4 py-2.5 text-sm font-medium lowercase transition",
													"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-100",
													tipOption.isDisabled
														? "cursor-not-allowed border-zinc-900 bg-zinc-900/40 text-zinc-600"
														: selectedTipOption.value === tipOption.value
														? "border-zinc-600 bg-zinc-800 text-zinc-50"
														: "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700",
												)}
											>
												{tipOption.label}
											</button>
										))}
									</div>
									<p className="text-xs text-zinc-500">custom tip not available in this demo</p>
								</div>

								<div className="space-y-3">
									<p className="text-xs lowercase tracking-[0.24em] text-zinc-500">cancellation policy</p>
									<button
										type="button"
										className={joinClasses(
											"flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/70 px-5 py-4 text-left",
											"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-100",
										)}
									>
										<span className="text-sm text-zinc-300">cancel free 24h ahead</span>
										<span className="text-sm text-zinc-100">no charge</span>
									</button>
								</div>
							</div>
						</section>

						<section className="border-zinc-800/80 p-6 sm:p-8 lg:border-l lg:p-10">
							<div className="flex h-full flex-col">
								<div className="space-y-2">
									<p className="text-4xl font-semibold lowercase tracking-tight text-zinc-50 sm:text-5xl/[1.02]">
										{selectedService.name}
									</p>
									<p className="text-base text-zinc-500">
										{selectedAddOn ? selectedAddOn.name : isNoExtraSelected ? "no extra" : "no add-on selected"}
									</p>
								</div>

								<p className="mt-8 text-4xl font-medium lowercase tracking-tight text-zinc-50 sm:text-5xl">
									fr may 22 • 10 <span className="text-zinc-400">am</span>
								</p>

								<div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/65 p-4 sm:p-5">
									<div className="space-y-2 text-sm sm:text-base">
										<div className="flex items-center justify-between text-zinc-300">
											<span>services</span>
											<span className="font-medium text-zinc-100">{paymentCurrencyFormatter.format(serviceAmount)}</span>
										</div>
										<div className="flex items-center justify-between text-zinc-300">
											<span>add-ons</span>
											<span className="font-medium text-zinc-100">{paymentCurrencyFormatter.format(addOnAmount)}</span>
										</div>
										<div className="flex items-center justify-between text-zinc-300">
											<span>{`tip (${selectedTipOption.label})`}</span>
											<span className="font-medium text-zinc-100">{paymentCurrencyFormatter.format(tipAmount)}</span>
										</div>
										<div className="flex items-center justify-between text-zinc-300">
											<span>booking fee</span>
											<span className="font-medium text-zinc-100">{paymentCurrencyFormatter.format(bookingFeeAmount)}</span>
										</div>
									</div>
									<p className="mt-4 border-t border-zinc-800 pt-3 text-sm text-zinc-500">
										balance of {paymentCurrencyFormatter.format(totalPrice)} after your appointment
									</p>
								</div>

								<div className="mt-auto pt-10">
									<div className="mb-4 flex items-end justify-between">
										<p className="text-2xl font-medium lowercase text-zinc-400 sm:text-3xl">{formatDuration(totalDurationMinutes)}</p>
										<div className="flex items-end gap-1 text-zinc-50 sm:gap-1.5">
											<span className="pb-0.5 text-2xl font-medium text-zinc-400 sm:text-3xl">$</span>
											<span className="text-4xl/[0.9] font-semibold sm:text-5xl/[0.9]">{displayedTotalPriceDigits}</span>
										</div>
									</div>
									<button
										type="button"
										className="inline-flex w-full items-center justify-center rounded-full bg-zinc-100 px-6 py-4 text-base font-semibold lowercase text-zinc-950 transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-100"
									>
										{confirmBookingLabel}
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