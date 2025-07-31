// zodiac.ts
export interface ZodiacSign {
  name: string;
  slug: string;
  image: string;
  dateRange: string;
}

export const zodiacSigns: ZodiacSign[] = [
  {
    name: "Bélier",
    slug: "belier",
    image: "/assets/zodiac/belier.webp",
    dateRange: "21 mars - 19 avril",
  },
  {
    name: "Taureau",
    slug: "taureau",
    image: "/assets/zodiac/taureau.webp",
    dateRange: "20 avril - 20 mai",
  },
  {
    name: "Gémeaux",
    slug: "gemeaux",
    image: "/assets/zodiac/gemeaux.webp",
    dateRange: "21 mai - 20 juin",
  },
  {
    name: "Cancer",
    slug: "cancer",
    image: "/assets/zodiac/cancer.webp",
    dateRange: "21 juin - 22 juillet",
  },
  {
    name: "Lion",
    slug: "lion",
    image: "../assets/zodiac/lion.webp",
    dateRange: "23 juillet - 22 août",
  },
  {
    name: "Vierge",
    slug: "vierge",
    image: "/assets/zodiac/vierge.webp",
    dateRange: "23 août - 22 septembre",
  },
  {
    name: "Balance",
    slug: "balance",
    image: "/assets/zodiac/balance.webp",
    dateRange: "23 septembre - 22 octobre",
  },
  {
    name: "Scorpion",
    slug: "scorpion",
    image: "/assets/zodiac/scorpion.webp",
    dateRange: "23 octobre - 21 novembre",
  },
  {
    name: "Sagittaire",
    slug: "sagittaire",
    image: "/assets/zodiac/sagittaire.webp",
    dateRange: "23 novembre - 21 décembre",
  },
  {
    name: "Capricorne",
    slug: "capricorne",
    image: "/assets/zodiac/capricorne.webp",
    dateRange: "22 décembre - 19 janvier",
  },
  {
    name: "Verseau",
    slug: "verseau",
    image: "/assets/zodiac/verseau.webp",
    dateRange: "20 janvier - 18 février",
  },
  {
    name: "Poissons",
    slug: "poissons",
    image: "/assets/zodiac/poisson.webp",
    dateRange: "20 février - 20 mars",
  },
];
