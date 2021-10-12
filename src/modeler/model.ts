interface ModelParameters {
  investmentGrowthRateAnnual: number;
  monetaryInflationAnnual: number;
}

export const defaultParameters: ModelParameters = {
  investmentGrowthRateAnnual: 0.07,
  monetaryInflationAnnual: 0.03,
};
