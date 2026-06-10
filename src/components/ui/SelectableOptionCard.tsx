"use client";

type SelectableOptionCardProps = {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
  description?: string;
  metaPrimary?: string;
  metaSecondary?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  colorScheme?: "default" | "dark";
  id?: string;
  className?: string;
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SelectableOptionCardSkeleton({
  className,
  id,
  colorScheme = "default",
}: Pick<SelectableOptionCardProps, "className" | "id" | "colorScheme">) {
  const isDarkScheme = colorScheme === "dark";

  return (
    <div
      id={id}
      aria-busy="true"
      aria-label="Loading option"
      className={joinClasses(
        "w-full rounded-xl border p-4",
        isDarkScheme ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          <div
            className={joinClasses(
              "h-5 w-2/3 animate-pulse rounded",
              isDarkScheme ? "bg-zinc-700" : "bg-zinc-200",
            )}
          />
          <div
            className={joinClasses(
              "h-4 w-full animate-pulse rounded",
              isDarkScheme ? "bg-zinc-800" : "bg-zinc-100",
            )}
          />
        </div>
        <div
          className={joinClasses(
            "h-5 w-12 shrink-0 animate-pulse rounded",
            isDarkScheme ? "bg-zinc-700" : "bg-zinc-200",
          )}
        />
      </div>
    </div>
  );
}

export function SelectableOptionCard({
  title,
  isSelected,
  onSelect,
  description,
  metaPrimary,
  metaSecondary,
  isLoading = false,
  isDisabled = false,
  colorScheme = "default",
  id,
  className,
}: SelectableOptionCardProps) {
  if (isLoading) {
    return <SelectableOptionCardSkeleton id={id} className={className} colorScheme={colorScheme} />;
  }

  const hasMeta = Boolean(metaPrimary ?? metaSecondary);
  const isDarkScheme = colorScheme === "dark";

  function handleClick() {
    if (isDisabled) {
      return;
    }

    onSelect();
  }

  return (
    <button
      type="button"
      id={id}
      aria-pressed={isSelected}
      disabled={isDisabled}
      onClick={handleClick}
      className={joinClasses(
        "w-full rounded-xl border p-4 text-left transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        isDarkScheme ? "focus-visible:outline-zinc-200" : "focus-visible:outline-zinc-950",
        isSelected
          ? isDarkScheme
            ? "border-zinc-500 bg-zinc-800"
            : "border-zinc-950 bg-zinc-50 ring-1 ring-zinc-950"
          : isDarkScheme
            ? "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
            : "border-zinc-200 bg-white hover:border-zinc-400",
        isDisabled &&
          (isDarkScheme
            ? "cursor-not-allowed opacity-50 hover:border-zinc-800"
            : "cursor-not-allowed opacity-50 hover:border-zinc-200"),
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <span
              aria-hidden="true"
              className={joinClasses(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                isSelected
                  ? isDarkScheme
                    ? "border-zinc-100 bg-zinc-100"
                    : "border-zinc-950 bg-zinc-950"
                  : isDarkScheme
                    ? "border-zinc-600"
                    : "border-zinc-300",
              )}
            >
              {isSelected ? (
                <span
                  className={joinClasses(
                    "h-1.5 w-1.5 rounded-full",
                    isDarkScheme ? "bg-zinc-900" : "bg-white",
                  )}
                />
              ) : null}
            </span>
            <div className="min-w-0 flex-1">
              <p className={joinClasses("font-medium", isDarkScheme ? "text-zinc-100" : "text-zinc-950")}>{title}</p>
              {description ? (
                <p
                  className={joinClasses(
                    "mt-1 text-sm leading-relaxed",
                    isDarkScheme ? "text-zinc-400" : "text-zinc-600",
                  )}
                >
                  {description}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {hasMeta ? (
          <div className="shrink-0 text-right">
            {metaPrimary ? (
              <p className={joinClasses("font-medium", isDarkScheme ? "text-zinc-100" : "text-zinc-950")}>
                {metaPrimary}
              </p>
            ) : null}
            {metaSecondary ? (
              <p className={joinClasses("mt-0.5 text-sm", isDarkScheme ? "text-zinc-500" : "text-zinc-500")}>
                {metaSecondary}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </button>
  );
}

export type { SelectableOptionCardProps };
