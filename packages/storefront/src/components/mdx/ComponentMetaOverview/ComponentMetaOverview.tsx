'use client';

import type { ComponentMeta, EventMeta, SlotMeta } from '@porsche-design-system/component-meta';
import { componentMeta, type PropMeta } from '@porsche-design-system/component-meta';
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
import { getFlags } from '@/utils/getFlags';

const tagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x));

export const ComponentMetaOverview = () => {
  const [showAllValues, setShowAllValues] = useState(false);
  // The props toggled individually, which show the opposite of what the switch sets for all.
  const [toggledProps, setToggledProps] = useState<ReadonlySet<string>>(new Set());

  const handleSwitchUpdate = (e: CustomEvent<SwitchUpdateEventDetail>) => {
    setShowAllValues(e.detail.checked);
    setToggledProps(new Set());
  };

  const toggleProp = (id: string) =>
    setToggledProps((previous) => {
      const next = new Set(previous);
      if (!next.delete(id)) {
        next.add(id);
      }
      return next;
    });

  const getProps = (tagName: TagName, filterProps?: keyof PropMeta) => {
    return Object.entries(componentMeta[tagName as TagName].propsMeta ?? {}).filter(([_, value]) =>
      filterProps ? value[filterProps] : true
    );
  };

  const formatAllowedValues = ({ allowedValues, deprecatedValues, isDeprecated }: PropMeta): ReactNode => {
    if (Array.isArray(allowedValues)) {
      return allowedValues
        .map((value) => ({
          key: `${value}`,
          value: value === null ? 'undefined' : value,
          isDeprecated: !!isDeprecated || !!deprecatedValues?.includes(`${value}`),
        }))
        .map(({ key, value, isDeprecated: isValueDeprecated }) => (
          <Fragment key={key}>
            – {isValueDeprecated ? `${value} 🚫` : value}
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
        <PTableHeadCell key={tagName} aria-hidden={tagName === '' ? 'true' : undefined}>
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
            {getProps(tagName, filterProps).map(([propName, propMeta]) => {
              const id = `${columnName}-${tagName}-${propName}`;
              const isExpanded = showAllValues !== toggledProps.has(id);
              return (
                <Fragment key={propName}>
                  <code className="inline-block my-static-xs">
                    <button
                      type="button"
                      className="cursor-pointer text-start hover:text-contrast-medium rounded-sm focus-visible:outline-focus outline outline-solid outline-transparent outline-offset-2"
                      aria-expanded={isExpanded}
                      onClick={() => toggleProp(id)}
                    >
                      {propName} {getFlags(propMeta)}
                    </button>
                    {isExpanded && <div>{formatAllowedValues(propMeta)}</div>}
                  </code>
                  <br />
                </Fragment>
              );
            })}
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
        <PSwitch onUpdate={handleSwitchUpdate} checked={showAllValues}>
          Show all prop values
        </PSwitch>
      </div>

      <PTable
        className="[--p-table-scroll-indicator-top:64px] [--p-table-scroll-indicator-bottom:64px]"
        sticky={true}
        caption="Component Overview"
      >
        <PTableHead>
          <PTableRow>{renderTableHead()}</PTableRow>
        </PTableHead>
        <PTableBody>
          {renderBoolean('isDelegatingFocus')}
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
