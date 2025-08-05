import type {
  MultiSelectOptgroup,
  MultiSelectOption,
} from '../../components/multi-select/multi-select/multi-select-utils';
import type { SelectOptgroup, SelectOption } from '../../components/select/select/select-utils';

export const updateFilterResults = (
  options: (SelectOption | MultiSelectOption)[],
  optgroups: (SelectOptgroup | MultiSelectOptgroup)[],
  filterValue: string
): { hasFilterResults: boolean } => {
  const value = filterValue.toLowerCase();

  for (const option of options) {
    const matches = option.textContent.toLowerCase().includes(value);
    // Use display none to preserve hidden state
    option.style.display = matches ? 'block' : 'none';
  }

  for (const optgroup of optgroups) {
    const visibleOptions = Array.from(optgroup.children).some(
      (child) => (child as HTMLPSelectOptionElement).style.display !== 'none'
    );
    (optgroup as HTMLOptGroupElement).style.display = visibleOptions ? 'block' : 'none';
  }

  return { hasFilterResults: options.some((option) => option.style.display !== 'none' && !option.hidden) };
};
