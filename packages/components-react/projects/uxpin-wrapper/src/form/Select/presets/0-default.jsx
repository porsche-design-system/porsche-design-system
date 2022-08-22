import { Select } from '../Select';

const options = [1, 2, 3].map((i) => `Option ${i}`);

export default <Select uxpId="select" label="Choose the right option" options={options} />;
