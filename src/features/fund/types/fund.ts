type Profitability = Readonly<{
  YTD: number;
  oneYear: number;
  threeYears: number;
  fiveYears: number;
}>

type Currency = 'USD' | 'EUR';

type Category = 'GLOBAL' | 'TECH' | 'HEALTH' | 'MONEY_MARKET';

export type Fund = Readonly<{
  id: string;
  name: string;
  currency: Currency;
  symbol: string;
  value: number;
  category: Category;
  profitability: Profitability;
}>;