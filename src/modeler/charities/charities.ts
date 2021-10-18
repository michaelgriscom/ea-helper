interface GiveDirectlyMetrics {
  name: string;
  grantSizeUsd: number;
  householdSize: number;
  efficiencyRate: number;
  grantAmountInvested: number;
  grantInvestmentReturnAnnual: number;
}

type Unit = "percent" | "count" | "USD" | "years";

interface MetricValue {
  source: string;
  value: number;
}

type MetricType = "";

interface Metric {
  metricType: MetricType;
  value: MetricValue;
  description: string;
  unit: Unit;
}

interface Charity {
  name: string;
  metrics: Metric[];
}

interface ImpactMetric {
  name: string;
  unit: Unit;
  description?: string;
}

const impactMetrics: ImpactMetric[] = [
  {
    name: "Human Lives Saved",
    unit: "count",
  },
  {
    name: "QALYs",
    unit: "years",
  },
  {
    name: "Education years",
    unit: "years",
  },
  {
    name: "Animal Lives Saved",
    unit: "count",
  },
  {
    name: "Economic Impact",
    unit: "USD",
  }
]


const GiveDirectlyCharity : Charity = {
  name: 'Give Directly',
  metrics: [
  //   {
  //     metricType:
  //   }
  ]
}

const livesSavedPer20000 = {
  drc: {
    under5: 10.323,
    fivePlus: 2.451,
  },
  guinea: {
    under5: 10.918,
    fivePlus: 3.369,
  },
  togo: {
    under5: 4.634,
    fivePlus: 7.010,
  },
  uganda: {
    under5: 9.144,
    fivePlus: 2.188,
  },
  nigeria: {
    under5: 10.462,
    fivePlus: 8.355,
  }

}

const amf2021 = {

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
