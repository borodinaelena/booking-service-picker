import type { CategoryFilterOption } from "../types";

type CategoryFilterChipsProps = {
	options: CategoryFilterOption[];
	selectedCategoryKey: string;
	onSelectCategory: (categoryKey: string) => void;
};

function joinClasses(...classes: Array<string | false | undefined>) {
	return classes.filter(Boolean).join(" ");
}

export function CategoryFilterChips({
	options,
	selectedCategoryKey,
	onSelectCategory,
}: CategoryFilterChipsProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{options.map((option) => {
				const isActive = selectedCategoryKey === option.key;

				return (
					<button
						key={option.key}
						type="button"
						aria-pressed={isActive}
						onClick={() => onSelectCategory(option.key)}
						className={joinClasses(
							"rounded-full border px-4 py-1.5 text-xs font-medium tracking-[0.12em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-100",
							isActive
								? "border-zinc-600 bg-zinc-700/70 text-zinc-50"
								: "border-zinc-900 bg-zinc-900/65 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200",
						)}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}