# jest-repro-2024-09

Minimal repro for Jest bug report.

## Pre-requisites

- [nvm](https://github.com/nvm-sh/nvm)

## Ensure using the correct version of node and install dependencies

```
nvm install
nvm use

npm install
```

## Run the function directly in node:

```
npm run node
```

Expected output:

```
> jest-bug-repro@1.0.0 node
> node repro.js

didThrowSyntaxError? true
```

## Run the same function in jest:

```
npm run test
```

Expected output:

```
> jest-bug-repro@1.0.0 test
> jest

 FAIL  ./test.js
  jest bug
    ✕ repro (18 ms)

  ● jest bug › repro

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      3 | describe('jest bug', () => {
      4 |     it('repro', async () => {
    > 5 |         expect(await repro.didThrowSyntaxError()).toBe(true);
        |                                                   ^
      6 |     });
      7 | });
      8 |

      at Object.toBe (test.js:5:51)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

## Confirm the problem:

- When run under node, the function returns true
- When run under jest, the function returns false

