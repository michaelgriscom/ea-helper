import chance from 'chance';
import _ from 'lodash';
import {useState} from 'react';
import {DateAmount} from '../impact/impactCalculations';

export interface Donation extends DateAmount {
  id: string;
  charity: keyof typeof charityInfo;
  amount: number;
  source: string;
  date: Date;
}

type Charity = keyof typeof charityInfo;

export type GroupableFields = 'charity'|'source';
export const charityInfo = {
  'givedirectly': {
    friendlyName: 'GiveDirectly',
  },
  'amf': {
    friendlyName: 'Against Malaria Foundation',
  },
  'vitaminA': {
    friendlyName: 'Vitamin A Supplementation',
  },
};

function generateData(seed: number): Donation[] {
  const rand = new chance(seed);
  const startDate = new Date('2016/08/05');
  const endDate = new Date();
  const donationCount = rand.integer({min: 30, max: 50});
  const charities = Object.keys(charityInfo);
  const sources = ['Credit Card', 'DAF', 'Employer Match'];

  const donations: Donation[] = _.times(donationCount, () => {
    const charity = rand.pickone(charities) as Charity;
    const source = rand.pickone(sources);
    const date =
      rand.date({min: startDate, max: endDate, string: false}) as Date;
    const amount = rand.floating({fixed: 2, min: 100, max: 1000});
    return {
      id: rand.guid(), charity, date, amount,
      source
    }
  });

  return donations;
}

function sortDonations(donations: Donation[]): Donation[] {
  return donations.sort((d1, d2) => d1.date.valueOf() - d2.date.valueOf());
}

export function useDonations() {
  const donationData = generateData(0);
  const sortedDonations = sortDonations(donationData);
  const [donations, setDonations] = useState(sortedDonations);

  return donations;
}
