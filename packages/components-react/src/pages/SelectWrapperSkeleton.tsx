/* Auto Generated File */
import { componentsReady, PSelectWrapper } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const SelectWrapperSkeletonPage = (): JSX.Element => {
  useEffect(() => {
    componentsReady().then(() => {
      document.querySelectorAll('p-select-wrapper').forEach((select) => {
        select.classList.remove('hydrated');
      });
    });
  }, []);

  return (
    <>
      <div className="playground light" title="should render select skeleton with label">
        <PSelectWrapper label="Some label">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render select skeleton with label on dark theme">
        <PSelectWrapper label="Some label" theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render select skeleton with description">
        <PSelectWrapper description="Some description">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render select skeleton with description on dark theme">
        <PSelectWrapper description="Some description" theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render select skeleton with label and description">
        <PSelectWrapper label="Some label" description="Some description">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render select skeleton with label and description on dark theme">
        <PSelectWrapper label="Some label" description="Some description" theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div className="playground light" title="should render select skeleton without label and without description">
        <PSelectWrapper label="Some label" description="Some description" hideLabel={true}>
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
      <div className="playground dark" title="should render select skeleton without label and without description on dark theme">
        <PSelectWrapper label="Some label" description="Some description" hideLabel={true} theme="dark">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>
    </>
  );
};
