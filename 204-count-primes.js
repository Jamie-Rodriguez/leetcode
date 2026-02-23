/*
	204. Count Primes
	Medium

	Given an integer `n`, _return the number of prime numbers that are strictly less than `n`_.

	Example 1:
		Input: n = 10
		Output: 4
		Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.

	Example 2:
		Input: n = 0
		Output: 0

	Example 3:
		Input: n = 1
		Output: 0

	Constraints:
		- 0 <= n <= 5 * 10^6
*/


/**
 * Time-complexity analysis
 * ========================
 *
 * Given we established for each **prime** `p` processed by the outer loop,
 * the inner loop executes exactly ⌊n/p⌋ - (p - 1) times.
 *
 * The total work done by the sieve is the sum of this quantity over all
 * primes p ≤ √n:
 * 	T(n) = Σ_{p ∈ ℙ, p ≤ √n} (⌊n/p⌋ − p + 1)
 *
 * We can separate this into two independent sums:
 * 	T(n) = Σ_{p ∈ ℙ, p ≤ √n} ⌊n/p⌋ - Σ_{p ∈ ℙ, p ≤ √n} (p - 1)
 *
 * The second sum is the sum of all primes up to √n, minus the count of primes
 * up to √n.
 * By the prime number theorem, there are approximately √n/(log(√n)) primes
 * up to √n, and their average value is roughly √n/2.
 * This makes the second sum approximately O(n/(log(n))), which turns out to
 * be negligible compared to the first sum.
 *
 * So the dominant term is
 * 	T(n) ≈ Σ_{p ∈ ℙ, p ≤ √n} ⌊n/p⌋
 *
 * Since the floor function satisfies n/p - 1 < ⌊n/p⌋ ≤ n/p
 * 	T(n) = O(Σ_{p ∈ ℙ, p ≤ √n} n/p)
 * 	     = O(n ⋅ Σ_{p ∈ ℙ, p ≤ √n} 1/p)
 *
 * Mertens' second theorem (1874) establishes that:
 * 	Σ_{p ∈ ℙ, p ≤ x} 1/p = log(log(x)) + M + O(1/log(x))
 * where M is the Meissel–Mertens constant.
 * The important takeaway is that this sum grows as O(log(log(x)))
 * i.e. the Meissel–Mertens constant and the error term O(1/log(x)) are dwarfed
 * by O(log(log(x))).
 *
 * Substituting x = √n into Mertens' second theorem, we get:
 * 	Σ_{p ∈ ℙ, p ≤ √n} 1/p = log(log(√n))
 *
 * Since
 * 	log(log(√n)) = log(½ ⋅ log(n))
 * 	             = log(log(n)) - log(2)
 * For analysing the Big-O asymptotic behaviour:
 * 	log(log(√n)) = O(log(log(n)))
 * Therefore
 * 	Σ_{p ∈ ℙ, p ≤ √n} 1/p = O(log(log(n)))
 *
 * Substituting this result back into the original equation, we get
 * 	T(n) = O(n ⋅ Σ_{p ∈ ℙ, p ≤ √n} 1/p)
 * 	     = O(n ⋅ log(log(n)))
 */
/**
 * @param {number} n
 * @return {number}
 */
function countPrimes(n) {
	// This problem is just the Sieve of Eratosthenes

	// Because problem states 0 <= n <= 5 * 10^6
	if (n < 2)
		return 0

	// 0 = not prime, 1 = prime
	/**
	 * By initializing every entry to 1 (i.e. assumed prime),
	 * the algorithm's job becomes purely subtractive -
	 * it only needs to identify and remove composites.
	 */
	const isPrime = new Uint8Array(n + 1).fill(1)
	isPrime[0] = 0
	isPrime[1] = 0
	// Prevent multiple recalculations
	const sqrtN = Math.floor(Math.sqrt(n))

	for (let i = 2; i <= sqrtN; i++) {
		if (isPrime[i]) {
			/**
			 * Mark all multiples of prime number i as composite.
			 * Start at i² because smaller multiples
			 * (i*2, i*3, ..., i*(i-1))
			 * have already been marked by smaller primes.
			 */
			/**
			 * This inner loop runs from i² to n, incrementing by i each time
			 * i.e.
			 * 	i², i² + i, i² + 2i, i² + 3i, ...
			 * Now, for range [a, b], the number of multiples of d are
			 * 	= ⌊b/d⌋ - ⌊(a - 1)/d⌋
			 * Our series is slightly different, so substituting
			 * 	= ⌊n/i⌋ - ⌊(i² - 1)/i⌋
			 * 	= ⌊n/i⌋ - (i - 1)
			 */
			for (let j = i * i; j <= n; j += i)
				isPrime[j] = 0
		}
	}

	const primes = []

	for (let i = 2; i < n; i++)
		if (isPrime[i])
			primes.push(i)

	return primes.length
}


console.assert(countPrimes(10) === 4)
console.assert(countPrimes(0) === 0)
console.assert(countPrimes(1) === 0)
