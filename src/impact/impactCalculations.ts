import _ from 'lodash';

import {Donation} from '../donations/useDonations';
import {amf2021, giveDirectly2021} from '../modeler/charities/charities';

export interface DateAmount {
  date: Date;
  amount: number;
}

interface Impact extends DateAmount {
}

export function CalculateSum(amounts: DateAmount[]) {
  return _.sumBy(amounts, amount => amount.amount);
}

export function GroupByCharity(donations: Donation[]) {
  return _.groupBy(donations, (donation) => donation.charity);
}

export function CalculateSums(donations: Donation[]) {
  return _(donations)
    .groupBy(donation => donation.charity)
    .map((group, charity) => ({
      id: charity,
      value: _.sumBy(group, group => group.amount)
    })).value();
}

type ImpactPerYear = Impact[];

export function getLifeImpact(
    amf: typeof amf2021, donations: Donation[]): ImpactPerYear {
  return donations.map((donation) => {
    const livesSaved = donation.amount / amf.costPerLifeSaved.value;
    return {date: donation.date, amount: livesSaved};
  });
}

export function getEconomicImpact(
  giveDirectly: typeof giveDirectly2021,
  donations: Donation[]): ImpactPerYear {
  const rawImpact =
      donations.flatMap((donation) => getRawImpact(giveDirectly, donation));
  const investmentImpact =
    donations.flatMap((donation) => getInvestmentImpact(giveDirectly, donation));
  return rawImpact.concat(investmentImpact);
}

function getRawImpact(
  giveDirectly: typeof giveDirectly2021, donation: Donation): ImpactPerYear {
  return [{
    date: donation.date,
    amount: donation.amount * giveDirectly.efficiencyRate,
  }];
}

  function getInvestmentImpact(
      giveDirectly: typeof giveDirectly2021,
      donation: Donation): ImpactPerYear {
    const investedAmount = donation.amount * giveDirectly.efficiencyRate *
      giveDirectly.grantAmountInvested;
    const impact: ImpactPerYear = [];
    for (let yearsLater = 1; yearsLater <= giveDirectly.investmentReturnYears;
         yearsLater++) {
      const returns = calculateCompoundInterest(
        investedAmount, giveDirectly.grantInvestmentReturnAnnual, yearsLater);
      const date = new Date(donation.date.getFullYear() + yearsLater, 0, 0);
      impact.push({
        date,
        amount: returns,
      });
    }

    return impact;
  }

  function calculateCompoundInterest(
      principal: number, ratePerPeriod: number, numberOfPeriods: number) {
    return principal * (Math.pow(1 + ratePerPeriod, numberOfPeriods) - 1);
  }
