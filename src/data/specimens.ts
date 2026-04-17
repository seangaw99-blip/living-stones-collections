import type { Specimen } from '@/types/specimen';

export const specimens: Specimen[] = [
  {
    slug: 'azurite-nodule-morocco',
    name: 'Azurite nodule',
    origin: 'Morocco',
    weight: '214g',
    dimensions: '7 x 5 x 4 cm',
    price: 4800,
    status: 'available',
    tags: ['rare'],
    images: ['/specimens/azurite.jpg'],
    description:
      'A dense, fully formed azurite nodule with rich cobalt-blue surfaces. The structure is unusually compact for a specimen of this origin.',
    formationNotes:
      'Deep blue copper carbonate. Formed over millennia through the weathering of copper ore deposits. One specimen available.',
    createdAt: '2026-04-10',
  },
  {
    slug: 'celestite-cluster-madagascar',
    name: 'Celestite cluster',
    origin: 'Madagascar',
    weight: '520g',
    dimensions: '12 x 9 x 6 cm',
    price: 6500,
    status: 'available',
    tags: ['collector-grade'],
    images: ['/specimens/celestite.jpg'],
    description:
      'Pale blue orthorhombic crystals in a radiating cluster formation. The crystal faces are exceptionally clear with minimal inclusions.',
    formationNotes:
      'Strontium sulfate mineral, commonly found in sedimentary rock formations. The pale blue coloration is characteristic of the Madagascar locality.',
    createdAt: '2026-04-08',
  },
  {
    slug: 'rhodochrosite-stalactite-argentina',
    name: 'Rhodochrosite stalactite slice',
    origin: 'Argentina',
    weight: '180g',
    dimensions: '10 x 8 x 1.2 cm',
    price: 9200,
    status: 'available',
    tags: ['rare', 'collector-grade'],
    images: ['/specimens/rhodochrosite.jpg'],
    description:
      'A polished cross-section through a rhodochrosite stalactite, revealing concentric bands of deep rose and ivory. From the Capillitas mine.',
    formationNotes:
      'Manganese carbonate mineral with characteristic banded pattern formed through slow deposition in hydrothermal cavities. Each band represents a distinct growth period.',
    createdAt: '2026-04-05',
  },
  {
    slug: 'malachite-cluster-congo',
    name: 'Malachite cluster',
    origin: 'Democratic Republic of Congo',
    weight: '890g',
    dimensions: '14 x 11 x 8 cm',
    price: 12500,
    status: 'available',
    tags: ['1-left'],
    images: ['/specimens/malachite.jpg'],
    description:
      'A dense fibrous malachite cluster with alternating bands of light and dark green. The silky luster across the botryoidal surfaces is exceptional.',
    formationNotes:
      'Copper carbonate hydroxide mineral. This specimen formed in the oxidation zone of a copper deposit. The banding reflects subtle changes in chemistry during formation.',
    createdAt: '2026-03-28',
  },
  {
    slug: 'amethyst-cathedral-uruguay',
    name: 'Amethyst cathedral',
    origin: 'Uruguay',
    weight: '3200g',
    dimensions: '28 x 18 x 14 cm',
    price: 22000,
    status: 'available',
    tags: ['collector-grade'],
    images: ['/specimens/amethyst.jpg'],
    description:
      'A deep violet amethyst geode with particularly saturated crystal points. The cavity is fully lined with uniform crystals of consistent color.',
    formationNotes:
      'Purple variety of quartz, colored by iron impurities and natural irradiation. Formed within volcanic basalt flows over millions of years.',
    createdAt: '2026-03-20',
  },
  {
    slug: 'pyrite-sun-peru',
    name: 'Pyrite sun',
    origin: 'Peru',
    weight: '340g',
    dimensions: '11 x 11 x 2 cm',
    price: 5400,
    status: 'sold',
    tags: ['rare'],
    images: ['/specimens/pyrite.jpg'],
    description:
      'A disc-shaped pyrite concretion with a radiating crystal structure. These flat, circular formations are rare and highly sought by collectors.',
    formationNotes:
      'Iron sulfide mineral in a rare disc-shaped formation caused by radial crystal growth in a confined horizontal space within coal seams.',
    createdAt: '2026-03-10',
  },
];
