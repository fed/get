import test from 'ava';
import get from '.';

// Test cases borrowed from:
// https://github.com/mickhansen/dottie.js/blob/master/test/get.test.js
// https://github.com/jonschlinkert/get-value/blob/master/test/units.js

const data = {
  'foo': {
    'bar': 'baz'
  },
  'zoo': 'lander',
  'false': {
    'value': false
  },
  'null': {
    'value': null
  },
  'nullvalue': null
};

test('should return undefined if value is undefined', t => {
  t.is(get(undefined, 'foo'), undefined);
  t.is(get(undefined, 'foo'), undefined);
});

test('should return undefined if key is undefined', t => {
  t.is(get(data, undefined), undefined);
  t.is(get(data, null), undefined);
  t.is(get(data, undefined, 'default'), 'default');
});

test('should get first-level values', t => {
  t.is(get(data, 'zoo'), 'lander');
  t.is(get(data, 'zoo'), 'lander');
});

test('should get nested-level values', t => {
  t.is(get(data, 'foo.bar'), 'baz');
});

test('should get nested-level values multiple times', t => {
  t.is(get(data, 'foo.bar'), 'baz');
  t.is(get(data, 'foo.bar'), 'baz');
  t.is(get(data, 'foo.bar'), 'baz');
  t.is(get(data, 'foo.bar'), 'baz');
});

test('should return undefined if not found', t => {
  t.is(get(data, 'foo.zoo.lander'), undefined);
});

test('should return false values properly', t => {
  t.is(get(data, 'false.value'), false);
});

test('should return the default value passed in if not found', t => {
  t.is(get(data, 'foo.zoo.lander', 'novalue'), 'novalue');
});

test('should return null if the value is null and not undefined', t => {
  t.is(get(data, 'null.value'), null);
});

test('should return undefined if accessing a child property of a null value', t => {
  t.is(get(data, 'nullvalue.childProp'), undefined);
  t.is(get(data, 'null.value.childProp'), undefined);
});

test('should return undefined if accessing a child property of a string value', t => {
  t.is(get(data, 'foo.bar.baz.yapa'), undefined);
});
