import { buildLegacyTheme } from 'sanity'

/**
 * Studio chrome aligned with the public site palette (warm cream, forest, earth-red, gold).
 */
export const mayanLeagueStudioTheme = buildLegacyTheme({
  '--brand-primary': '#df0712',
  '--focus-color': '#f2a51f',
  '--main-navigation-color': '#242424',
  '--main-navigation-color--inverted': '#f8f2f2',
  '--default-button-color': '#4f4945',
  '--default-button-primary-color': '#df0712',
  '--default-button-success-color': '#4f4945',
  '--default-button-warning-color': '#c9781f',
  '--default-button-danger-color': '#df0712',
})
