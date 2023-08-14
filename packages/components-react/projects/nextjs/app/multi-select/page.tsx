/* Auto Generated File */
import type { NextPage } from 'next';
import { PMultiSelect, PMultiSelectOption } from '@porsche-design-system/components-react/ssr';

const MultiSelectPage: NextPage = (): JSX.Element => {
  const style = `
    @media only screen and (min-width: 760px) {
      #app,
      :host {
        display: grid;
        grid-template-columns: repeat(2, 50%);
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render basic multi select">
        <PMultiSelect name="name" label="Some Label" description="Some description">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <PMultiSelectOption value="d">Option D</PMultiSelectOption>
          <PMultiSelectOption value="e">Option E</PMultiSelectOption>
          <PMultiSelectOption value="f">Option F</PMultiSelectOption>
        </PMultiSelect>
      </div>
    </>
  );
};

export default MultiSelectPage;
