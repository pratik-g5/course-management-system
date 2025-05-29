const blacklistedCountries = ['North Korea', 'Iran', 'Pakistan', 'Turkey'];

function getPriceByLocation(basePrice, location) {
  switch (location) {
    case 'India':
      return { currency: 'INR', price: basePrice * 80 }; // Example: INR conversion
    case 'USA':
      return { currency: 'USD', price: basePrice * 1.5 };
    default:
      return { currency: 'USD', price: basePrice };
  }
}

function isBlacklistedLocation(location) {
  return blacklistedCountries.includes(location);
}

module.exports = {
  getPriceByLocation,
  isBlacklistedLocation,
};
