'use client';

import { getFlags } from '@/utils/getFlags';
import { type PropMeta, componentMeta } from '@porsche-design-system/component-meta';
import type { ComponentMeta } from '@porsche-design-system/component-meta';
import type { EventMeta, SlotMeta } from '@porsche-design-system/component-meta/src';
import {
  PSwitch,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
  type SwitchUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';
import type { TagName } from '@porsche-design-system/shared';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { Fragment, type ReactNode, useState } from 'react';

const tagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x));

export const ComponentMetaOverview = () => {
  const [checked, setChecked] = useState(false);
  const handleSwitchUpdate = (e: CustomEvent<SwitchUpdateEventDetail>) => {
    setChecked(e.detail.checked);
    const divs: HTMLDivElement[] = Array.from(document.querySelectorAll('.toggleable'));
    for (const div of divs) {
      div.classList[checked ? 'add' : 'remove']('hidden');
    }
  };

  const getProps = (tagName: TagName, filterProps?: keyof PropMeta) => {
    return Object.entries(componentMeta[tagName as TagName].propsMeta ?? {}).filter(([_, value]) =>
      filterProps ? value[filterProps] : true
    );
  };

  const formatAllowedValues = (allowedValues: PropMeta['allowedValues'], isDeprecated: boolean): ReactNode => {
    if (Array.isArray(allowedValues)) {
      return allowedValues
        .map((value) => (value === null ? 'undefined' : value))
        .map((value) => (isDeprecated ? `${value} 🚫` : value))
        .map((value) => (
          <Fragment key={value}>
            – {value}
            <br />
          </Fragment>
        ));
    }

    if (typeof allowedValues === 'object') {
      return Object.entries(allowedValues).map(([key, val]) => {
        if (Array.isArray(val)) {
          val = val.map((v) => (v === null ? 'undefined' : v)).join(' | ');
        }
        return (
          <Fragment key={key}>
            {`- ${key}: ${val}`}
            <br />
          </Fragment>
        );
      });
    }

    return (
      <Fragment key={allowedValues}>
        – {allowedValues}
        <br />
      </Fragment>
    );
  };

  const renderTableHead = () => {
    return ['', ...tagNames].map((tagName) => {
      const { isDeprecated, isExperimental } = componentMeta[tagName as TagName] || {};
      return (
        <PTableHeadCell key={tagName} aria-hidden={tagName ? undefined : true}>
          {tagName} {isDeprecated ? ' 🚫' : ''} {isExperimental ? ' 🧪' : ''}
        </PTableHeadCell>
      );
    });
  };

  const renderBoolean = (prop: keyof ComponentMeta) => {
    return (
      <PTableRow>
        <PTableCell className="align-top">{prop}</PTableCell>
        {tagNames.map((tagName) => (
          <PTableCell key={tagName}>{componentMeta[tagName as TagName][prop] ? '✅' : ''}</PTableCell>
        ))}
      </PTableRow>
    );
  };

  const renderArray = (prop: keyof ComponentMeta) => {
    return (
      <PTableRow>
        <PTableCell className="align-top">{prop}</PTableCell>
        {tagNames.map((tagName) => (
          <PTableCell key={tagName} className="align-top">
            {(componentMeta[tagName as TagName][prop] as string[])?.map((string) => (
              <Fragment key={string}>
                {string}
                <br />
              </Fragment>
            ))}
          </PTableCell>
        ))}
      </PTableRow>
    );
  };

  const renderProps = (columnName: string, filterProps?: keyof PropMeta) => {
    return (
      <PTableRow>
        <PTableCell className="align-top">{columnName}</PTableCell>
        {tagNames.map((tagName) => (
          <PTableCell key={tagName} className="align-top">
            {getProps(tagName, filterProps).map(([propName, propMeta]) => (
              <Fragment key={propName}>
                <code className="inline-block my-static-xs">
                  <span
                    className="hover:text-contrast-medium cursor-pointer"
                    onClick={(e) => (e.currentTarget.nextElementSibling as HTMLElement).classList.toggle('hidden')}
                  >
                    {propName} {getFlags(propMeta)}
                  </span>
                  <div className="toggleable hidden">
                    {formatAllowedValues(propMeta.allowedValues, !!propMeta.isDeprecated)}
                  </div>
                </code>
                <br />
              </Fragment>
            ))}
          </PTableCell>
        ))}
      </PTableRow>
    );
  };

  const renderComponentMeta = (columnName: string, getMeta: (tagName: TagName) => [string, SlotMeta | EventMeta][]) => {
    return (
      <PTableRow>
        <PTableCell className="align-top">{columnName}</PTableCell>
        {tagNames.map((tagName) => (
          <PTableCell key={tagName} className="align-top">
            {getMeta(tagName).map(([eventName, eventMeta]) => (
              <Fragment key={eventName}>
                <code className="inline-block my-static-xs">
                  {eventName} {getFlags(eventMeta)}
                </code>
                <br />
              </Fragment>
            ))}
          </PTableCell>
        ))}
      </PTableRow>
    );
  };

  return (
    <div>
      <div className="flex justify-between mb-static-md">
        <div>
          🛠 = breakpointCustomizable
          <br />🚫 = deprecated
          <br />🧪 = experimental
        </div>
        <PSwitch onUpdate={handleSwitchUpdate} checked={checked}>
          Show all prop values
        </PSwitch>
      </div>

      <PTable caption="Component Overview">
        <PTableHead>
          <PTableRow>{renderTableHead()}</PTableRow>
        </PTableHead>
        <PTableBody>
          {renderBoolean('isDelegatingFocus')}
          {renderBoolean('isThemeable')}
          {renderProps('props')}
          {renderProps('requiredProps', 'isRequired')}
          {renderComponentMeta('eventNames', (tagName) => Object.entries(componentMeta[tagName].eventsMeta ?? {}))}
          {renderComponentMeta('namedSlots', (tagName) =>
            Object.entries(componentMeta[tagName].slotsMeta ?? {}).filter(([slotName]) => slotName)
          )}
          {renderArray('nestedComponents')}
        </PTableBody>
      </PTable>
    </div>
  );
};
