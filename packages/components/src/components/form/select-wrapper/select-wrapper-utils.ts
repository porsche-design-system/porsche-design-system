export type OptionMap = {
  readonly key: number;
  readonly value: string;
  readonly disabled: boolean;
  readonly hidden: boolean;
  readonly initiallyHidden: boolean;
  readonly selected: boolean;
  readonly highlighted: boolean;
};

export const applyFilterOnOptionMaps = (optionMaps: OptionMap[], searchString: string): OptionMap[] => {
  const lowerCaseSearchString = searchString.toLowerCase();

  return optionMaps.map((item) => ({
    ...item,
    hidden: !item.initiallyHidden && !item.value.toLowerCase().includes(lowerCaseSearchString),
  }));
};
