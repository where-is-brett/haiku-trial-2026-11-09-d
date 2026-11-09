// tests/categories.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CATEGORIES, SHOP_CATEGORIES, categoryOf } from '../src/lib/categories.js';

const SHOPS = [
  ['Greenbarrow Fresh', 'groceries'],
  ['Pennywhistle Market', 'groceries'],
  ['Lowtide Grocers', 'groceries'],
  ['Harvest Lane Foods', 'groceries'],
  ['Pasta, Pizza & Co', 'eating_out'],
  ['Kestrel Coffee Bar', 'eating_out'],
  ['Saltbush Noodle House', 'eating_out'],
  ['Ember Grill', 'eating_out'],
  ['Waverly Fuel Stop', 'transport'],
  ['Tramline Fares', 'transport'],
  ['Lantern Rideshare', 'transport'],
  ['Northgate Parking', 'transport'],
  ['Brightfield Power', 'bills'],
  ['Clearwater Utilities', 'bills'],
  ['Skyline Broadband', 'bills'],
  ['Hollis Insurance', 'bills'],
  ['Marlowe Homewares', 'shopping'],
  ['Quillon Books', 'shopping'],
  ['Fernhill Outfitters', 'shopping'],
  ['Pixel Parade Tech', 'shopping'],
  ['Larkspur Pharmacy', 'health'],
  ['Elmgrove Physio', 'health'],
  ['Cobalt Dental', 'health'],
  ['Sunnyvale Optical', 'health'],
  ['Brightwave Payroll', 'income'],
  ['Tidepool Interest', 'income'],
  ['Oakridge Dividends', 'income'],
];

test('CATEGORIES has the eight keys and labels, in order', () => {
  assert.deepEqual(CATEGORIES, [
    { key: 'groceries', label: 'Groceries' },
    { key: 'eating_out', label: 'Eating out' },
    { key: 'transport', label: 'Transport' },
    { key: 'bills', label: 'Bills' },
    { key: 'shopping', label: 'Shopping' },
    { key: 'health', label: 'Health' },
    { key: 'income', label: 'Income' },
    { key: 'other', label: 'Other' },
  ]);
});

test('each shop name maps to its category', () => {
  for (const [shop, category] of SHOPS) {
    assert.equal(categoryOf(shop), category, shop);
  }
});

test('the shop table holds exactly the spec rows', () => {
  assert.deepEqual(SHOP_CATEGORIES, Object.fromEntries(SHOPS));
});

test('matching ignores case', () => {
  assert.equal(categoryOf('greenbarrow fresh ref 1021'), 'groceries');
});

test('a shop name with extra text still matches', () => {
  assert.equal(categoryOf('Greenbarrow Fresh REF 1021'), 'groceries');
});

test('a description with no shop name gives other', () => {
  assert.equal(categoryOf('Unknown Shop 99'), 'other');
});

test('an empty description gives other', () => {
  assert.equal(categoryOf(''), 'other');
});

test('a missing description gives other and does not throw', () => {
  assert.equal(categoryOf(null), 'other');
  assert.equal(categoryOf(undefined), 'other');
});

test('a description with two shop names gives the one earlier in the table', () => {
  assert.equal(categoryOf('Ember Grill and Greenbarrow Fresh'), 'groceries');
  assert.equal(categoryOf('Waverly Fuel Stop and Ember Grill'), 'eating_out');
});

test('surrounding spaces and tabs around a shop name still match', () => {
  assert.equal(categoryOf('  Ember Grill\t'), 'eating_out');
});

test('an all-caps description with punctuation matches its shop', () => {
  assert.equal(categoryOf('PASTA, PIZZA & CO 0042'), 'eating_out');
});
