interface GiveDirectlyMetrics {
  name: string;
  grantSizeUsd: number;
  householdSize: number;
  efficiencyRate: number;
  grantAmountInvested: number;
  grantInvestmentReturnAnnual: number;
}

export const giveDirectly2021: GiveDirectlyMetrics = {
  // Source
  // https://docs.google.com/spreadsheets/d/1B1fODKVbnGP4fejsZCVNvBm5zvI1jC7DhkaJpFk6zfo/edit#gid=1680005064
  name: "Give Directly",
  grantSizeUsd: 1000,
  householdSize: 4.7,
  efficiencyRate: 0.83,
  grantAmountInvested: 0.39,
  grantInvestmentReturnAnnual: 0.1,
};

function giveDirectlyInvestmentReturn(
  metrics: GiveDirectlyMetrics,
  amount: number
) {
  const grantAmount = amount * metrics.efficiencyRate;
  const grantPerPerson = grantAmount / metrics.householdSize;
  const investedAmount = grantPerPerson * metrics.grantAmountInvested;
  const investmentReturns =
    investedAmount * metrics.grantInvestmentReturnAnnual;
  return investmentReturns;
}

//  efficiencyRate: (date: Date) => {
//     // Source:
//     //
//     https://docs.google.com/spreadsheets/d/1L03SQuAeRRfjyuxy20QIJByOx6PEzyJ-x4edz2fSiQ4/edit#gid=537899494
//     if (date <= new Date("2016/08")) {
//       return 0.823;
//     }

//     if (date <= new Date('2017/08')) {
//       return .805;
//     }

//     if (date <= new Date("2018/03")) {
//       return 0.868;
//     }

//     return 0.83;
//   }
