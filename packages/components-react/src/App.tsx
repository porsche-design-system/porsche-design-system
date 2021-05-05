import { PTableGenerics } from '@porsche-design-system/components-react';

type Person = {
  firstName: string;
  lastName: string;
  company: string;
  phoneNumber: string;
  dateOfBirth: string;
  location: string;
};

const head = ['First name', 'Last name', 'Company', 'Phone', 'Birthday', 'Location'];
const data: Person[] = [
  {
    // id: '202829625',
    firstName: 'John',
    lastName: 'Locke',
    company: '',
    phoneNumber: '123123121',
    dateOfBirth: '1981-06-12',
    location: 'Boston',
  },
  {
    // id: '202829625',
    firstName: 'Matthias',
    lastName: 'Kainer',
    company: 'Company',
    phoneNumber: '',
    dateOfBirth: '1981-06-12',
    location: 'Bretten',
  },
  {
    // id: '202829625',
    firstName: 'John',
    lastName: 'Locke',
    company: '',
    phoneNumber: '123123121',
    dateOfBirth: '1981-06-12',
    location: 'Boston',
  },
  {
    // id: '202829625',
    firstName: 'Matthias',
    lastName: 'Kainer',
    company: 'Company',
    phoneNumber: '',
    dateOfBirth: '1981-06-12',
    location: 'Bretten',
  },
  {
    // id: '202829625',
    firstName: 'John',
    lastName: 'Locke',
    company: '',
    phoneNumber: '123123121',
    dateOfBirth: '1981-06-12',
    location: 'Boston',
  },
];

export const App = (): JSX.Element => {
  const renderRow = ({ firstName, lastName, company, phoneNumber, dateOfBirth, location }: any): string =>
    `<tr>
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${company}</td>
      <td># ${phoneNumber}</td>
      <td>† ${dateOfBirth}</td>
      <td>${location} (Germany)</td>
    </tr>`;

  return <PTableGenerics head={head} data={data} renderRow={renderRow} />;
};
