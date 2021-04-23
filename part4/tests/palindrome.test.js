const palindrome = require('../utils/For_Testing').palindrome;

test('palindrome of a', () => {
	const result = palindrome('a');

	expect(result).toBe('a');
});

test('palindrome of react', () => {
	const result = palindrome('react');

	expect(result).toBe('tcaer');
});

test('palindrom of releveler', () => {
	const result = palindrome('releveler');

	expect(result).toBe('releveler');
});
