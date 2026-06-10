import { formatCurrency } from "../constants";
import type { AddOnOptionRowProps } from "../types";

function joinClasses(...classes: Array<string | false | undefined>) {
	return classes.filter(Boolean).join(" ");
}

export function AddOnOptionRow({
	name,
	durationMinutes,
	price,
	isSelected,
	onSelect,
	isDisabled = false,
}: AddOnOptionRowProps) {
	return (
		<button
			type="button"
			disabled={isDisabled}
			onClick={onSelect}
			className={joinClasses(
				"flex w-full items-center justify-between gap-3 rounded-xl px-1 py-2 text-left transition",
				"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-100",
				isDisabled ? "cursor-not-allowed opacity-40" : "hover:bg-zinc-900/70",
			)}
		>
			<div className="flex min-w-0 items-center gap-3">
				<span
					aria-hidden="true"
					className={joinClasses(
						"flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
						isSelected ? "border-zinc-100 bg-zinc-100" : "border-zinc-700",
					)}
				>
					{isSelected ? <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" /> : null}
				</span>
				<p className="truncate text-xl/[1.2] font-medium text-zinc-100 sm:text-2xl/[1.2]">{name}</p>
			</div>

			<p className="shrink-0 text-sm text-zinc-500 sm:text-base">
				{durationMinutes} min / <span className="font-semibold text-zinc-100">{formatCurrency(price)}</span>
			</p>
		</button>
	);
}