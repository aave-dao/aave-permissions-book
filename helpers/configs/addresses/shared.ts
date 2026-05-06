/**
 * Shared addresses that appear across multiple networks with the same name.
 * These are centralized here to avoid duplication in network-specific configs.
 */
export const SHARED_ADDRESSES: Record<string, string> = {
  // Deployer - appears on all networks
  '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',

  // Merit - cleanup admin on most networks
  '0xdeadD8aB03075b7FBA81864202a2f59EE25B312b': 'Merit',

  // ACI Automation - appears on most networks
  '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',

  // AFC - finance risk council on most networks
  '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'AFC',

  // ACI Safe - emission admin on most networks
  '0xac140648435d03f784879cd789130F22Ef588Fcd': 'ACI Safe',

  // MASIV Safe - emission admin
  '0xdef1FA4CEfe67365ba046a7C630D6B885298E210': 'MASIV Safe',

  // Aave Protocol Embassy
  '0xAA43203167317DeeF8288095C44b84a686918d2E': 'APE Assets',
  '0xa9e777D56C0Ad861f6a03967E080e767ad8D39b6': 'APE Voting',

  // Aave Liquidity Committee
  '0xA1c93D2687f7014Aaf588c764E3Ce80aF016229b': 'ALC',
  '0xAAB6f926DCDaE536F54ce58478Dbc1a0d0f98871': 'ALC Incentive',
  '0xAA484Ba6a7f51f00A3f82a11e73b741AE1dEAB58': 'ALC Voting',

  // Frontier
  '0xCDb4fA6ba08bF1FB7Aa9fDf6002E78EDc431a642': 'Frontier',

  // MERIT & AHAB
  '0xAA870e4B82deaDa3727235f34183Ec9B728714C8': 'Merit Incentives',
  '0xAA2461f0f0A3dE5fEAF3273eAe16DEF861cf594e': 'Ahab',

  // Aave Finance Committee
  '0xAA12BAd4a501d45A5b771e49C2Fd415BA8BFc79d': 'AFC CEX Earn',
  '0xaa7A1910BA79B6A2E385ebA26185aA2dCB9B8eAd': 'AFC CEX Earn Incentive',

  // Aave v4 Security
  '0xAAf400e4Bbc38B5E2136C1a36946Bf841A357307': 'Aave v4 Security SAFE',

  // Aave Automation Cancel SAFE
  '0x441E4053fDDF1e1a77a39d00309Af389096d4124': 'Aave Automation Cancel SAFE',
};

/**
 * Merges network-specific addresses with shared addresses.
 * Network-specific addresses take precedence over shared addresses.
 *
 * @param networkSpecific - Network-specific address names
 * @returns Merged address names object
 */
export const mergeAddressNames = (
  networkSpecific: Record<string, string>,
): Record<string, string> => ({
  ...SHARED_ADDRESSES,
  ...networkSpecific,
});
