export interface Author {
  name: string;
  role: string;
  bio: string;
  slug: string;
}

const authors: Record<string, Author> = {
  'JusRental Team': {
    name: 'JusRental Team',
    role: 'Real Estate Experts',
    bio: 'The JusRental editorial team brings years of Bangalore real estate experience, helping tenants and owners navigate the rental market with verified insights and local expertise.',
    slug: 'jusrental-team',
  },
  'Shamique': {
    name: 'Shamique',
    role: 'Founder & CEO, JusRental',
    bio: 'Shamique founded JusRental to make renting in Bangalore transparent and hassle-free. With deep roots in the city\'s real estate market, he leads the team in curating verified, zero-brokerage rental listings.',
    slug: 'shamique',
  },
};

const defaultAuthor = authors['JusRental Team'];

export function getAuthor(name: string): Author {
  return authors[name] ?? defaultAuthor;
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}
