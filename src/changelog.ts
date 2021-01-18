// Use this file to show what you did in the Dashborad
// We could use the git log or something but i think it's better to do it manually
// since it might be too technical or too much info for a non-techie to take in

import { parseISO } from 'date-fns'

export interface Change {
  date: Date
  change: string
  authorGithubHandle?: string // optional if you're a sucker for praise (and bug reports)
}

export const changelog: ReadonlyArray<Change> = [
  {
    date: '2021-01-25',
    change:
      'Inventory now shows Total Valuation, Deduction and calculation details for valuations',
    authorGithubHandle: 'rasmusguterstam',
  },
  {
    date: '2020-12-04',
    change: 'Add basic support for Danish market',
    authorGithubHandle: 'vonElfvin',
  },
  {
    date: '2020-12-03',
    change: 'Update Questions form and Account Entry form',
    authorGithubHandle: 'vonElfvin',
  },
  {
    date: '2020-12-03',
    change: 'Fix GSR navigation link',
    authorGithubHandle: 'vonElfvin',
  },
  {
    date: '2020-11-24',
    change: 'Add ability to remove a monthly entry from a member',
    authorGithubHandle: 'vonElfvin',
  },
  {
    date: '2020-11-23',
    change:
      'Add ability "monthly entries" to a member\'s account, to be used to automate object insurances',
    authorGithubHandle: 'vonElfvin',
  },
  {
    date: '2020-11-17',
    change:
      'Unsign tool now notifies if the ssn was signed or not on unsigning',
    authorGithubHandle: 'fredrikareschoug',
  },
  {
    date: '2020-10-13',
    change:
      "Use your your keyboard's up and down arrow keys to navigate the member search and claims list",
    authorGithubHandle: 'palmenhq',
  },
  {
    date: '2020-10-13',
    change: 'Add the changelog',
    authorGithubHandle: 'palmenhq',
  },
].map((change) => ({ ...change, date: parseISO(change.date) }))
