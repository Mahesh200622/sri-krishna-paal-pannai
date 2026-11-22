import murukkuImg from '../assets/images/modern_crispy_murukku_1794554102762.jpg';
import dairyMilkChocolatesImg from '../assets/images/modern_dairy_chocolates_1794554104855.jpg';
import chilledRoseMilkImg from '../assets/images/modern_rose_choco_milk_1794554100203.jpg';

// Real cropped in-store photos from uploaded Menu Highlights & Studio Sheets
import realFilterCoffeeImg from '../assets/real/filter_coffee.jpg';
import realGingerTeaImg from '../assets/real/ginger_tea.jpg';
import realCoffeeAndTeaNightImg from '../assets/real/coffee_and_tea_night.jpg';
import realSukkuCoffeeImg from '../assets/real/sukku_coffee.jpg';
import realPanaKarkanduImg from '../assets/real/pana_karkandu_milk_tea.jpg';
import realGarlicVadaImg from '../assets/real/garlic_vada.jpg';
import realPopcornImg from '../assets/real/popcorn.jpg';
import realMasalaChaiImg from '../assets/real/masala_chai.jpg';
import realSamosaImg from '../assets/real/samosa.jpg';
import realOrganicSugarImg from '../assets/real/organic_sugar.jpg';
import realCakeImg from '../assets/real/cake.jpg';
import realMasalaMilkImg from '../assets/real/masala_milk.jpg';
import realVadaiAndTeaImg from '../assets/real/vadai_and_tea.jpg';
import realVadaiImg from '../assets/real/vadai.jpg';
import realMasalaVadasImg from '../assets/real/masala_vadas.jpg';
import realPaniyaramImg from '../assets/real/paniyaram.jpg';
import realOrangeJuiceImg from '../assets/real/orange_juice.jpg';
import realNormalPlainTeaImg from '../assets/real/normal_plain_tea.jpg';
import realNormalPlainMilkImg from '../assets/real/normal_plain_milk.jpg';
import realPalmSugarMilkImg from '../assets/real/palm_sugar_milk.jpg';
import realSamnonMilkImg from '../assets/real/samnon_milk.jpg';
import realBadamMilkImg from '../assets/real/badam_milk.jpg';
import realBadamMilkAndVadaImg from '../assets/real/badam_milk_and_vada.jpg';
import realCrispyChipsImg from '../assets/real/crispy_chips.jpg';
import realTapiocaChipsImg from '../assets/real/tapioca_chips.jpg';

export const BUSINESS_INFO = {
  name: 'Sri Krishna Pannai Paal',
  tamilTitle: 'ஸ்ரீ கிருஷ்ணா பண்ணை பால்',
  tagline: 'A Taste of Tradition, Freshness in Every Sip.',
  heroSubtitle:
    'Experience the goodness of fresh farm milk, traditional sweets, refreshing beverages and delicious native snacks.',
  hours: 'Open 24 Hours / 7 Days',
  shortLocation: 'Sattur, Tamil Nadu',
  addressLines: [
    'Sri Krishna Pannai Paal,',
    'Peddureddipatti, Uppathur Road (Uppathur Vilakku),',
    'Mulliseval, Sattur,',
    'Virudhunagar District,',
    'Tamil Nadu – 626205.',
  ],
  fullAddress:
    'Sri Krishna Pannai Paal, Peddureddipatti, Uppathur Road (Uppathur Vilakku), Mulliseval, Sattur, Virudhunagar District, Tamil Nadu – 626205',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Sri+Krishna+Pannai+Paal%2C+Peddureddipatti%2C+Uppathur+Road%2C+Mulliseval%2C+Sattur%2C+Tamil+Nadu+626205',
  googleDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Sri+Krishna+Pannai+Paal%2C+Peddureddipatti%2C+Uppathur+Road%2C+Mulliseval%2C+Sattur%2C+Tamil+Nadu+626205',
  googleEmbedUrl:
    'https://maps.google.com/maps?q=Sri+Krishna+Pannai+Paal,+Peddureddipatti,+Uppathur+Road,+Mulliseval,+Sattur,+Tamil+Nadu+626205&t=&z=14&ie=UTF8&iwloc=&output=embed',
  primaryAsset: '/assets/aistudio/k_e75d453c.jpeg',
  exteriorAsset: '/assets/aistudio/unnamed_24b01392.webp',
} as const;

export type MenuCategoryId =
  | 'all'
  | 'dairy-beverages'
  | 'traditional-sweets'
  | 'savouries-snacks'
  | 'bakery-food';

export type ArtMotif =
  | 'milk'
  | 'coffee'
  | 'tea'
  | 'sukku'
  | 'badam'
  | 'palkova'
  | 'peda'
  | 'halwa'
  | 'vadai'
  | 'paniyaram'
  | 'murukku'
  | 'seedai'
  | 'laddu'
  | 'snacks'
  | 'bakery-puffs'
  | 'bakery-buns'
  | 'bakery-tiffin';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategoryId, 'all'>;
  categoryLabel: string;
  description: string;
  servingNote: string;
  motif: ArtMotif;
  imageSrc: string;
  signature?: boolean;
}

export const MENU_CATEGORIES: { id: MenuCategoryId; label: string }[] = [
  { id: 'all', label: 'All Offerings' },
  { id: 'dairy-beverages', label: 'Dairy & Hot Beverages' },
  { id: 'traditional-sweets', label: 'Traditional Sweets' },
  { id: 'savouries-snacks', label: 'Savouries & Native Snacks' },
  { id: 'bakery-food', label: 'Bakery & Food Items' },
];

export const MENU_ITEMS: MenuItem[] = [
  // Category 1: Dairy & Hot Beverages
  {
    id: 'normal-plain-milk',
    name: 'Normal Plain Milk',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Wholesome, frothy farm-fresh hot milk poured straight from the boiler for a clean, comforting highway refreshment.',
    servingNote: 'Served hot 24/7',
    motif: 'milk',
    imageSrc: realNormalPlainMilkImg,
  },
  {
    id: 'fresh-filter-coffee',
    name: 'Filter Coffee',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Authentic South Indian degree coffee brewed from aromatic roasted grounds and blended with frothy thick farm milk in a classic davara-tumbler.',
    servingNote: 'Traditional frothy pour',
    motif: 'coffee',
    imageSrc: realFilterCoffeeImg,
    signature: true,
  },
  {
    id: 'coffee-and-tea',
    name: 'Coffee and Tea',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Freshly brewed hot filter coffee and milk tea served round the clock for overnight bus passengers and highway travellers in Sattur.',
    servingNote: '24/7 highway counter pour',
    motif: 'coffee',
    imageSrc: realCoffeeAndTeaNightImg,
  },
  {
    id: 'masala-tea',
    name: 'Masala Chai',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Robust tea simmered with whole cardamom, crushed ginger, and rich farm milk for a comforting highway refreshment.',
    servingNote: 'Brewed fresh round the clock',
    motif: 'tea',
    imageSrc: realMasalaChaiImg,
  },
  {
    id: 'ginger-tea',
    name: 'Ginger Tea',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Freshly brewed hot tea infused with aromatic crushed ginger and rich farm milk to refresh road travellers.',
    servingNote: 'Fresh ginger infusion',
    motif: 'tea',
    imageSrc: realGingerTeaImg,
  },
  {
    id: 'normal-plain-tea',
    name: 'Normal Plain Tea',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Classic smooth South Indian milk tea with a balanced brew served piping hot in a glass cup.',
    servingNote: 'All-day classic cup',
    motif: 'tea',
    imageSrc: realNormalPlainTeaImg,
  },
  {
    id: 'sukku-coffee',
    name: 'Sukku Coffee',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Time-honoured dried ginger and spice herbal decoction crafted to soothe late-night and early-morning travellers.',
    servingNote: 'Traditional herbal warmth',
    motif: 'sukku',
    imageSrc: realSukkuCoffeeImg,
  },
  {
    id: 'pana-karkandu-milk-tea',
    name: 'Pana Karkandu Milk Tea',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Wholesome hot milk and tea gently sweetened with traditional palm sugar candy (panangkarkandu) for soothing natural warmth.',
    servingNote: 'Palm candy milk speciality',
    motif: 'milk',
    imageSrc: realPanaKarkanduImg,
    signature: true,
  },
  {
    id: 'palm-sugar-milk',
    name: 'Palm Sugar Milk',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Steaming, frothy farm-fresh milk blended with pure unrefined palm sugar for rich caramel warmth without refined sweetness.',
    servingNote: 'Naturally sweetened milk',
    motif: 'milk',
    imageSrc: realPalmSugarMilkImg,
  },
  {
    id: 'samnon-milk',
    name: 'Samnon Milk',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Creamy hot farm milk gently simmered with fragrant whole green cardamom pods for soothing natural aroma.',
    servingNote: 'Cardamom-infused warm milk',
    motif: 'milk',
    imageSrc: realSamnonMilkImg,
  },
  {
    id: 'masala-milk',
    name: 'Masala Milk',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Creamy hot farm milk enriched with crushed pepper, cardamom, and traditional spices—beloved by commuters.',
    servingNote: 'Spiced evening favourite',
    motif: 'milk',
    imageSrc: realMasalaMilkImg,
  },
  {
    id: 'badam-milk',
    name: 'Badam Milk',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Silky golden farm milk enriched with finely ground almonds, fragrant cardamom, and saffron strands.',
    servingNote: 'Served warm or chilled',
    motif: 'badam',
    imageSrc: realBadamMilkImg,
    signature: true,
  },
  {
    id: 'badam-milk-vada',
    name: 'Badam Milk - Vada',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Our comforting highway pairing of golden saffron-almond badam milk served alongside a hot, freshly fried lentil vadai.',
    servingNote: 'Classic highway pairing',
    motif: 'badam',
    imageSrc: realBadamMilkAndVadaImg,
  },
  {
    id: 'chilled-flavoured-dairy-milk',
    name: 'Rose Milk & Chocolate Farm Milk',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Refreshing chilled South Indian rose milk and rich cold chocolate milk blended with thick, creamy farm milk.',
    servingNote: 'Served chilled day and night',
    motif: 'milk',
    imageSrc: chilledRoseMilkImg,
  },
  {
    id: 'orange-juice',
    name: 'Orange Juice',
    category: 'dairy-beverages',
    categoryLabel: 'Dairy & Hot Beverages',
    description:
      'Freshly pressed chilled citrus orange juice served cool in tall glasses for daytime highway stops.',
    servingNote: 'Fresh chilled juice',
    motif: 'badam',
    imageSrc: realOrangeJuiceImg,
  },

  // Category 2: Traditional Sweets
  {
    id: 'organic-sugar',
    name: 'Organic Sugar Bag (Naattu Sakkarai)',
    category: 'traditional-sweets',
    categoryLabel: 'Traditional Sweets',
    description:
      'In-house packed Sri Krishna Pannai Paal natural cane jaggery powder (Naattu Sakkarai) for pure traditional home sweetening.',
    servingNote: 'In-store packed takeaway',
    motif: 'palkova',
    imageSrc: realOrganicSugarImg,
  },

  // Category 3: Savouries & Native Snacks
  {
    id: 'vadai',
    name: 'Vadai',
    category: 'savouries-snacks',
    categoryLabel: 'Savouries & Native Snacks',
    description:
      'Crisp golden ulundu vadais with a fluffy, tender centre and whole black peppercorns, fried fresh throughout the day.',
    servingNote: 'Served crisp and hot',
    motif: 'vadai',
    imageSrc: realVadaiImg,
    signature: true,
  },
  {
    id: 'masala-vadas',
    name: 'Masala Vadas',
    category: 'savouries-snacks',
    categoryLabel: 'Savouries & Native Snacks',
    description:
      'Crunchy golden chana dal masala vadas seasoned with onions, curry leaves, and whole spices, served hot on paper plates.',
    servingNote: 'Fresh spiced batch',
    motif: 'vadai',
    imageSrc: realMasalaVadasImg,
    signature: true,
  },
  {
    id: 'hot-vadai',
    name: 'Vadai and Black Coffee or Tea',
    category: 'savouries-snacks',
    categoryLabel: 'Savouries & Native Snacks',
    description:
      'Crisp golden lentil vadais with a tender centre, freshly fried and paired wonderfully with hot tea or filter coffee.',
    servingNote: 'Served crisp and warm',
    motif: 'vadai',
    imageSrc: realVadaiAndTeaImg,
  },
  {
    id: 'garlic-vada',
    name: 'Garlic Vada',
    category: 'savouries-snacks',
    categoryLabel: 'Savouries & Native Snacks',
    description:
      'Aromatic spiced garlic lentil vadais fried golden and crisp, served hot alongside steaming tea on paper plates.',
    servingNote: 'Crispy spiced batch',
    motif: 'vadai',
    imageSrc: realGarlicVadaImg,
  },
  {
    id: 'paniyaram',
    name: 'Paniyaram',
    category: 'savouries-snacks',
    categoryLabel: 'Savouries & Native Snacks',
    description:
      'Golden-seared traditional batter dumplings cooked in seasoned moulds for a comforting savoury or sweet bite on the road.',
    servingNote: 'Fresh batch preparation',
    motif: 'paniyaram',
    imageSrc: realPaniyaramImg,
  },
  {
    id: 'samosa',
    name: 'Samosa',
    category: 'savouries-snacks',
    categoryLabel: 'Savouries & Native Snacks',
    description:
      'Flaky, golden-fried triangular pastry pockets stuffed with spiced potato and onion filling—served on banana leaf with evening snacks.',
    servingNote: 'Freshly fried daily',
    motif: 'vadai',
    imageSrc: realSamosaImg,
  },
  {
    id: 'murukku',
    name: 'Murukku',
    category: 'savouries-snacks',
    categoryLabel: 'Savouries & Native Snacks',
    description:
      'Hand-twirled crunchy rice and lentil spirals seasoned with cumin and sesame for long journeys and family sharing.',
    servingNote: 'Crisp & travel-friendly',
    motif: 'murukku',
    imageSrc: murukkuImg,
    signature: true,
  },
  {
    id: 'popcorn',
    name: 'Popcorn',
    category: 'savouries-snacks',
    categoryLabel: 'Savouries & Native Snacks',
    description:
      'Light, crisp ready-to-carry popcorn packs stocked fresh at our snack counter for families and kids on road trips.',
    servingNote: 'Travel snack packs',
    motif: 'snacks',
    imageSrc: realPopcornImg,
  },
  {
    id: 'crispy-chips',
    name: 'Chips and Salsa',
    category: 'savouries-snacks',
    categoryLabel: 'Savouries & Native Snacks',
    description:
      'Crisp, airy wheel fryums served with a tangy tomato-chilli dipping salsa for a bright, crunchy snack beside evening tea.',
    servingNote: 'Crunchy tea-time dipper',
    motif: 'snacks',
    imageSrc: realCrispyChipsImg,
  },
  {
    id: 'tapioca-chips',
    name: 'Tapioca Chips',
    category: 'savouries-snacks',
    categoryLabel: 'Savouries & Native Snacks',
    description:
      'Light, crisp fried tapioca snacks paired with spicy red dipping chutney for classic South Indian crunch on the highway.',
    servingNote: 'Freshly packed & crisp',
    motif: 'snacks',
    imageSrc: realTapiocaChipsImg,
  },

  // Category 4: Bakery & Food Items
  {
    id: 'fresh-cake',
    name: 'Happy Birthday Cake',
    category: 'bakery-food',
    categoryLabel: 'Bakery & Food Items',
    description:
      'Fresh cream celebration cakes crafted with whipped frosting and cherries for birthdays, family gatherings, and custom takeaway orders.',
    servingNote: 'Fresh bakery counter',
    motif: 'bakery-buns',
    imageSrc: realCakeImg,
  },
  {
    id: 'dairy-milk-chocolates',
    name: 'Dairy Milk & Milk Chocolates',
    category: 'bakery-food',
    categoryLabel: 'Bakery & Food Items',
    description:
      'Creamy Dairy Milk chocolate bars, milk chocolate squares, and family-friendly travel treats stocked fresh at our bakery counter.',
    servingNote: 'Bakery & confectionery counter',
    motif: 'bakery-buns',
    imageSrc: dairyMilkChocolatesImg,
  },
];

export interface SpecialHighlight {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: 'milk' | 'award' | 'coffee' | 'wheat' | 'clock';
  imageSrc: string;
}

export const SPECIAL_HIGHLIGHTS: SpecialHighlight[] = [
  {
    id: 'farm-milk',
    number: '01',
    title: 'Fresh & Thick Farm Milk',
    description:
      'Rich, pure, naturally creamy farm milk prepared carefully to preserve wholesome dairy flavour in every glass.',
    iconName: 'milk',
    imageSrc: realNormalPlainMilkImg,
  },
  {
    id: 'filter-coffee',
    number: '02',
    title: 'Freshly Brewed Filter Coffee',
    description:
      'Fragrant South Indian filter coffee pulled fresh and finished with steaming, frothy farm milk.',
    iconName: 'coffee',
    imageSrc: realFilterCoffeeImg,
  },
  {
    id: 'native-snacks',
    number: '03',
    title: 'Delicious Native Snacks',
    description:
      'Hot Vadai, Masala Vadas, Paniyaram, Samosa, and crunchy Murukku crafted for authentic southern taste.',
    iconName: 'wheat',
    imageSrc: realMasalaVadasImg,
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  type: 'photo' | 'crop-exterior' | 'editorial-plate';
  imageSrc?: string;
  imageClassName?: string;
  aspectClass: string;
  motif?: ArtMotif;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'official-emblem-storefront',
    title: 'Official Brand Crest & Sattur Storefront',
    category: 'Brand Identity & Exterior',
    caption:
      'Original Sri Krishna Pannai Paal emblem featuring the modern wood-and-glass A-frame storefront in Sattur.',
    type: 'photo',
    imageSrc: BUSINESS_INFO.primaryAsset,
    aspectClass: 'aspect-square',
  },
  {
    id: 'aframe-pavilion-closeup',
    title: 'A-Frame Storefront & Illuminated Signboard',
    category: 'Exterior Architecture',
    caption:
      'Evening view of the Sri Krishna Pannai Paal wood-and-glass A-frame storefront with illuminated Tamil signage and outdoor seating in Sattur.',
    type: 'crop-exterior',
    imageSrc: BUSINESS_INFO.exteriorAsset,
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'dairy-beverages-plate',
    title: 'Thick Farm Milk & Filter Coffee Craft',
    category: 'Dairy & Beverages',
    caption:
      'Signature farm milk, degree filter coffee, masala tea, sukku coffee, and badam milk served fresh round the clock.',
    type: 'editorial-plate',
    aspectClass: 'aspect-[4/3]',
    motif: 'coffee',
  },
  {
    id: 'traditional-sweets-plate',
    title: 'Slow-Simmered Palkova & Halwa Heritage',
    category: 'Traditional Sweets',
    caption:
      'Rich milk-based delicacies including Sattur favourite Palkova, Paal Peda, and Tirunelveli-style Halwa.',
    type: 'editorial-plate',
    aspectClass: 'aspect-[3/4]',
    motif: 'palkova',
  },
  {
    id: 'native-snacks-plate',
    title: 'Hot Vadai, Paniyaram & Native Savouries',
    category: 'Savouries & Snacks',
    caption:
      'Freshly prepared hot snacks and crisp travel packs including Murukku, Seedai, and wholesome Kambu Laddu.',
    type: 'editorial-plate',
    aspectClass: 'aspect-[4/3]',
    motif: 'murukku',
  },
  {
    id: 'bakery-hospitality-plate',
    title: 'In-House Bakery & 24/7 Highway Lounge',
    category: 'Bakery & Stopover',
    caption:
      'Fresh bakery items, spacious roadside and in-car parking, and a clean wheelchair-accessible entrance.',
    type: 'editorial-plate',
    aspectClass: 'aspect-[4/3]',
    motif: 'bakery-puffs',
  },
];

export const TRAVELLER_HIGHLIGHTS = [
  {
    title: 'Rich and thick milk',
    detail: 'Praised for wholesome farm-fresh body, natural creaminess, and consistent quality.',
  },
  {
    title: 'Delicious tea and palkova',
    detail: 'A favourite pairing for road travellers seeking authentic southern warmth and sweetness.',
  },
  {
    title: 'Convenient 24/7 availability',
    detail: 'Reliable day-and-night hospitality whether at dawn, dusk, or midnight.',
  },
  {
    title: 'Spacious parking',
    detail: 'Easy roadside access with generous room for cars and travelling families.',
  },
];

export const FACILITIES = [
  {
    title: 'Spacious Roadside Parking',
    description: 'Generous parking space directly alongside Uppathur Road for effortless stops.',
  },
  {
    title: 'In-Car Parking Service',
    description: 'Pull in comfortably with convenient in-car parking access for families and quick breaks.',
  },
  {
    title: 'Wheelchair-Accessible Entrance',
    description: 'Thoughtful step-free entry designed to welcome every traveller and elder comfortably.',
  },
];
