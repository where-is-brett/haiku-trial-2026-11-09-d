// src/lib/categories.js

// The spending categories, in the order they are shown.
export const CATEGORIES = [
  { key: 'groceries', label: 'Groceries' },
  { key: 'eating_out', label: 'Eating out' },
  { key: 'transport', label: 'Transport' },
  { key: 'bills', label: 'Bills' },
  { key: 'shopping', label: 'Shopping' },
  { key: 'health', label: 'Health' },
  { key: 'income', label: 'Income' },
  { key: 'other', label: 'Other' },
];

// Each shop name mapped to its category key, checked in this order.
export const SHOP_CATEGORIES = {
  'Greenbarrow Fresh': 'groceries',
  'Pennywhistle Market': 'groceries',
  'Lowtide Grocers': 'groceries',
  'Harvest Lane Foods': 'groceries',
  'Pasta, Pizza & Co': 'eating_out',
  'Kestrel Coffee Bar': 'eating_out',
  'Saltbush Noodle House': 'eating_out',
  'Ember Grill': 'eating_out',
  'Waverly Fuel Stop': 'transport',
  'Tramline Fares': 'transport',
  'Lantern Rideshare': 'transport',
  'Northgate Parking': 'transport',
  'Brightfield Power': 'bills',
  'Clearwater Utilities': 'bills',
  'Skyline Broadband': 'bills',
  'Hollis Insurance': 'bills',
  'Marlowe Homewares': 'shopping',
  'Quillon Books': 'shopping',
  'Fernhill Outfitters': 'shopping',
  'Pixel Parade Tech': 'shopping',
  'Larkspur Pharmacy': 'health',
  'Elmgrove Physio': 'health',
  'Cobalt Dental': 'health',
  'Sunnyvale Optical': 'health',
  'Brightwave Payroll': 'income',
  'Tidepool Interest': 'income',
  'Oakridge Dividends': 'income',
};

// Returns the category key for a description: the first shop name it contains,
// ignoring case, or 'other' when none match.
export function categoryOf(description) {
  if (!description) return 'other';
  const text = String(description).toLowerCase();
  for (const [shop, category] of Object.entries(SHOP_CATEGORIES)) {
    if (text.includes(shop.toLowerCase())) return category;
  }
  return 'other';
}
