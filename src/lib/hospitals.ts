import type { ImageMetadata } from 'astro';
import bangkokHospital from '../../assets/hospitals/bangkok-hospital.png';
import kluaynamthai from '../../assets/hospitals/kluaynamthai.png';
import phyathaiSriracha from '../../assets/hospitals/phyathai-sriracha.png';
import piyavate from '../../assets/hospitals/piyavate.png';
import praram9 from '../../assets/hospitals/praram-9.png';
import samitivej from '../../assets/hospitals/samitivej.png';
import vejthani from '../../assets/hospitals/vejthani.png';

export interface Hospital {
  /** Official English name; also the logo's alt text on every locale. */
  name: string;
  /** Logo trimmed to its artwork, so every logo renders at the same height. */
  logo: ImageMetadata;
  /** Official website. Without it the logo is shown but is not a link. */
  href?: string;
}

export const hospitals: Hospital[] = [
  { name: 'Piyavate Hospital', logo: piyavate, href: 'https://piyavate.com/en/' },
  {
    name: 'Phyathai Sriracha Hospital',
    logo: phyathaiSriracha,
    href: 'https://www.phyathai.com/th',
  },
  { name: 'Bangkok Hospital', logo: bangkokHospital, href: 'https://www.bangkokhospital.com/th' },
  {
    name: 'Samitivej Hospitals',
    logo: samitivej,
    href: 'https://samitivejchinatown.com/en/home',
  },
  { name: 'Vejthani Hospital', logo: vejthani, href: 'https://www.vejthani.com/' },
  { name: 'Praram 9 Hospital', logo: praram9, href: 'https://praram9.com/th' },
  { name: 'Kluaynamthai Hospital', logo: kluaynamthai, href: 'https://kluaynamthai.com/' },
];
