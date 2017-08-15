let { test } = require('./ingvisim.util')

test('123', 123)
test('999', 999)
test('abc', 999)
test('1.23', 1.23)

test('0xFF', 255)
test('0o11', 8)
test('0b11', 3)

test("5 + 2", 7)
test("5 - 1.5", 3.5)
test("5*3", 15)
test("5 /  2", 2.5)

test('10', 10);
test('x = 10', 10);
test('x', 10);
test('x * 2', 20);
test('x * 0x2', 20);