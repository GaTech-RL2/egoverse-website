// Globe locations data - edit this file to add/modify collection locations
// Each location has: name (displayed), lat, lng, and contribution (count)
// The contribution value determines the size of the label/dot on the globe
// Large countries show individual cities; small countries are aggregated
const GLOBE_LOCATIONS = [
  // US Academic/Research locations
  { name: "Atlanta, GA", lat: 33.749, lng: -84.388, contribution: 350 },
  { name: "Stanford, CA", lat: 37.4275, lng: -122.1697, contribution: 320 },
  { name: "San Diego, CA", lat: 32.7157, lng: -117.1611, contribution: 280 },
  { name: "San Francisco, CA", lat: 37.7749, lng: -122.4194, contribution: 200 },
  { name: "Albuquerque, NM", lat: 35.0844, lng: -106.6504, contribution: 150 },
  // Europe
  { name: "Zurich, Switzerland", lat: 47.3769, lng: 8.5417, contribution: 250 },
  // Other locations
  { name: "Banjarmasin, Indonesia", lat: -3.3587, lng: 114.6247, contribution: 480 },
  { name: "Semarang, Indonesia", lat: -7.0896, lng: 110.3767, contribution: 353 },
  { name: "Denpasar, Indonesia", lat: -8.7163, lng: 115.2118, contribution: 342 },
  { name: "Toronto, Canada", lat: 43.7106, lng: -79.329, contribution: 284 },
  { name: "Bogor, Indonesia", lat: -6.6461, lng: 106.8407, contribution: 195 },
  { name: "Surabaya, Indonesia", lat: -7.3378, lng: 112.7873, contribution: 178 },
  { name: "Colombia", lat: 4.2772, lng: -74.623, contribution: 175 },
  { name: "Banjarbaru, Indonesia", lat: -3.4629, lng: 114.7945, contribution: 171 },
  { name: "Makassar, Indonesia", lat: -5.1885, lng: 119.4369, contribution: 168 },
  { name: "Argentina", lat: -33.0305, lng: -64.2055, contribution: 166 },
  { name: "Bekasi, Indonesia", lat: -6.337, lng: 106.9885, contribution: 162 },
  { name: "Cagayan de Oro, Philippines", lat: 8.3945, lng: 124.5966, contribution: 155 },
  { name: "Reçan, Kosovo", lat: 42.1718, lng: 20.8156, contribution: 144 },
  { name: "Ho Chi Minh City, Vietnam", lat: 10.7326, lng: 106.6264, contribution: 143 },
  { name: "Richmond Hill, Canada", lat: 43.8533, lng: -79.3854, contribution: 119 },
  { name: "Planjane, Kosovo", lat: 42.1769, lng: 20.8387, contribution: 117 },
  { name: "Tangerang, Indonesia", lat: -6.2349, lng: 106.6991, contribution: 114 },
  { name: "Hải An Ward, Vietnam", lat: 20.8204, lng: 106.7107, contribution: 82 },
  { name: "Kenya", lat: -1.2872, lng: 36.7623, contribution: 79 },
  { name: "Lubinjë e Poshtme, Kosovo", lat: 42.1345, lng: 20.8575, contribution: 73 },
  { name: "South Tangerang, Indonesia", lat: -6.3515, lng: 106.7658, contribution: 70 },
  { name: "Lubinjë e Epërme, Kosovo", lat: 42.1457, lng: 20.8626, contribution: 69 },
  { name: "Brampton, Canada", lat: 43.7152, lng: -79.6901, contribution: 65 },
];
