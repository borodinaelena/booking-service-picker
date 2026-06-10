import type { Meta, StoryObj } from "@storybook/react";

import { SelectableOptionCard } from "./SelectableOptionCard";

const baseArgs = {
  title: "Deep tissue massage",
  description: "Focused pressure to release chronic muscle tension.",
  metaPrimary: "$85",
  metaSecondary: "60 min",
  isSelected: false,
  onSelect: () => {},
};

const meta = {
  title: "UI/SelectableOptionCard",
  component: SelectableOptionCard,
  args: baseArgs,
  decorators: [
    (Story) => (
      <div className="max-w-md font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectableOptionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    title: "Express consultation",
    description: undefined,
    metaPrimary: undefined,
    metaSecondary: undefined,
  },
};

export const WithDescription: Story = {
  args: baseArgs,
};

export const WithoutDescription: Story = {
  args: {
    ...baseArgs,
    description: undefined,
  },
};

export const LongTitle: Story = {
  args: {
    ...baseArgs,
    title:
      "Premium full-body therapeutic massage with aromatherapy and hot stone add-on preparation",
  },
};

export const LongDescription: Story = {
  args: {
    ...baseArgs,
    description:
      "A comprehensive session combining deep tissue work, assisted stretching, and targeted pressure techniques designed for athletes and people with chronic tension in the neck, shoulders, and lower back.",
  },
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    isDisabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    ...baseArgs,
    isSelected: true,
    isDisabled: true,
  },
};
