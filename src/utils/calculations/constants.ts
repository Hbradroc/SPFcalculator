export const FILTER_STATES = {
  clean: {
    pressureDropFactor: 1,
    efficiencyFactor: 1
  },
  dirty: {
    pressureDropFactor: 2,
    efficiencyFactor: 0.9
  }
};

export const VALIDATION_LIMITS = {
  minLoad: 70,
  maxLoad: 100,
  pressureTolerancePercent: 10
};