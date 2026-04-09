/**
 * Shared addresses that appear across multiple networks with the same name.
 * These are centralized here to avoid duplication in network-specific configs.
 */
export const SHARED_ADDRESSES: Record<string, string> = {
  // Deployer - appears on all networks
  '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',

  // CleanUp Admin - appears on most networks
  '0xdeadD8aB03075b7FBA81864202a2f59EE25B312b': 'CleanUp Admin',

  // ACI Automation - appears on most networks
  '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',

  // Finance Risk Council - appears on most networks
  '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council',

  // ACI Safe - emission admin on most networks
  '0xac140648435d03f784879cd789130F22Ef588Fcd': 'ACI Safe',

  // MASIV Safe - emission admin
  '0xdef1FA4CEfe67365ba046a7C630D6B885298E210': 'MASIV Safe',
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
