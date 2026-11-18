import { type FlagName, PFlag } from '@porsche-design-system/components-react/ssr';

type FlagProps = {
  name: FlagName;
};

/** A decorative flag in front of a heading or text, sized like the text around it. */
export const Flag = ({ name }: FlagProps) => <PFlag className="me-static-sm" name={name} size="inherit" />;
