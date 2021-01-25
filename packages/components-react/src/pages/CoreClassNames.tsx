import { useState } from 'react';
import { PButton, PButtonProps } from '@porsche-design-system/components-react';

const SOME_CLASS_1 = 'someClass1';
const SOME_CLASS_2 = 'someClass2';

type PropType = {
  id: string;
};

const Button = ({ id }: PropType): JSX.Element => {
  const [counter, setCounter] = useState(0);
  const props: PButtonProps = {
    className: counter % 2 === 0 ? SOME_CLASS_1 + ' ' + SOME_CLASS_2 : SOME_CLASS_1,
    onClick: () => {
      setCounter((prevState) => prevState + 1);
    },
  };

  return (
    <PButton id={id} {...props}>
      Some label {counter}
    </PButton>
  );
};

export const CoreClassNamesPage = (): JSX.Element => {
  return (
    <>
      <Button id="button1" />
      <Button id="button2" />
    </>
  );
};
