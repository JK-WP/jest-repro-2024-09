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
    ✕ should pass (19 ms)
    ✓ should fail (1 ms)

  ● jest bug › should pass

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      3 | describe('jest bug', () => {
      4 |     it('should pass', async () => {
    > 5 |         expect(await repro.didThrowSyntaxError()).toBe(true);
        |                                                   ^
      6 |     });
      7 |
      8 |     it('should fail', async () => {

      at Object.toBe (test.js:5:51)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
```

## Confirm the problems:

- When run under node, the function returns true
- When run under jest, the function returns false (so that `should pass` fails)
- When comparing the thrown Error using `jest.toEqual`, (which is admittedly not best practice),
  the comparison succeeds even where the error message does not match (so that `should fail` passes).

## Available workaround:

This turns out to be a known problem, which is discussed at some length in issue
[#2549](https://github.com/jestjs/jest/issues/2549),
and appears related to the implementation which jest uses to isolate the context of each test.

There is a library available,
[jest-environment-node-single-context](https://www.npmjs.com/package/jest-environment-node-single-context),
which provides a new test environment which sacrifices that isolation to provide the expected behavior.

This can be confirmed to address both of these problems by modifying `package.json` file to switch the
jest runner to use this patched environment:

```diff
   "jest": {
-    "testEnvironment": "node" 
+    "testEnvironment": "jest-environment-node-single-context"
  } 
```

With that test environment, a run of the tests will show the expected behavior:

```
> jest-bug-repro@1.0.0 test
> jest

 FAIL  ./test.js
  jest bug
    ✓ should pass (17 ms)
    ✕ should fail (2 ms)

  ● jest bug › should fail

    expect(received).rejects.toEqual(expected) // deep equality

    Expected: [SyntaxError: not-the-real-error-message]
    Received: [SyntaxError: Unexpected token 'o', "not-valid-json" is not valid JSON]

       9 |         await expect((new Response('not-valid-json')).json())
      10 |             .rejects
    > 11 |             .toEqual(SyntaxError('not-the-real-error-message'));
         |              ^
      12 |     });
      13 | });
      14 |

      at Object.toEqual (node_modules/expect/build/index.js:218:22)
      at Object.toEqual (test.js:11:14)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
```

