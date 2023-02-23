# Jest Testing

Training and observing the importance of Unit Testing using Jest testing framework

## Prerequisite

- Knowledge in NodeJS
- Knowledge in Javascript/Typescript language
- Experience in `Promise` or asynchronous code in the same programming language
- Knowledge in GIT

1. Clone this repository

```
git clone https://github.com/lightzane/jest-testing
```

2. `npm install`

## Node Scripts

Keep in mind the scripts that you will use:

- `npm start` - to execute `main.ts`
- `npm test` - to execute `main.spec.ts`

`main.ts` - will contain functionalities

`main.spec.ts` - will contain our unit tests

## Getting Started

Open `src/main.ts` and `src/main.spec.ts`

### Level One

Let us start with a simple logic that will add 10 to an input

```ts
// main.ts
export function add(input: number): number {
  return input + 10;
}
```

Create a test for it

```ts
// main.spec.ts
import { add } from './main';

it('should add 10', () => {
  const result = add(5);
  expect(result).toBe(5);
});
```

> Now run `npm test` and see the result

Result:

```
 FAIL  src/main.spec.ts (5.654 s)
  ● should add 10

    expect(received).toBe(expected) // Object.is equality

    Expected: 5
    Received: 15

      3 | it('should add 10', () => {
      4 |     const result = add(5);
    > 5 |     expect(result).toBe(5);
        |                    ^
      6 | });
```

You can simply fix unit test by providing the correct expectations

```ts
expect(result).toBe(15);
```

Unit test can become your foundation on your functionalities and ensures that your code will still work even after some change.

> Say for an instance, we will update the functionality.

```ts
// main.ts
export function add(input: number): number {
  return input + 10 + 5;
}
```

And run `npm test` without updating our unit tests, result:

```
 FAIL  src/main.spec.ts (5.553 s)
  ● should add 10

    expect(received).toBe(expected) // Object.is equality

    Expected: 15
    Received: 20

      3 | it('should add 10', () => {
      4 |     const result = add(5);
    > 5 |     expect(result).toBe(15);
        |                    ^
      6 | });
```

When looking in our unit test perspective, it is correct that our functionality should add 10 to 5.

We are expecting 15 but received 20.

> Unit test can be a good reminder that our functionality has change after the code has change

We only took off with the simpliest logic that we can understand for starters.

Now we will try to level it up.

**Delete all our changes in** `main.ts` and `main.spec.ts`

### Level Two

Let us create one function `experience()` that accepts **happy** or **sad** as input.

By default, we want to return `true` if input is `happy`.

And if `life` is **sad**, we want to return `false`

```ts
type Life = 'happy' | 'sad';

export function experience(life: Life): boolean {
  if (life === 'sad') {
    return false;
  }

  return true;
}
```

Now let us write the following tests:

```ts
// main.spec.ts
import { experience } from './main';

it('should return true if life is happy', () => {
  const result = experience('happy');
  expect(result).toBe(true);
});
```

And execute `npm test`

```
 PASS  src/main.spec.ts (6.126 s)
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |      80 |       50 |     100 |      80 |
 main.ts  |      80 |       50 |     100 |      80 | 6-7
----------|---------|----------|---------|---------|-------------------

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        8.098 s
```

Open `coverage/lcov-report/index.html`

You will notice that the coverage report will highlight the lines of code that was not covered in the unit test.

Let us cover the scenario flow by adding another unit test:

```ts
// main.spec.ts
it('should return false if life is sad', () => {
  const result = experience('sad');
  expect(result).toBe(false);
});
```

Now we should have `100%` coverage after executing `npm test`

If you will notice there is `--silent` flag added in the command:

```
> jest-testing@1.0.0 test
> jest --no-cache --silent
```

The flag will just silence and will not verbose `console.log` outputs when running unit tests only.

**Let us now test our actual funcitonality**

Add the following below on our existing code:

```ts
// main.ts
function start(): void {
  console.log(experience('happy'));
  console.log(experience('sad'));
}

start();
```

Execute `npm start` and we would get the following result:

```
> jest-testing@1.0.0 start
> ts-node src/main.ts

true
false
```

Our functionality is doing as expected and sync with our unit test!

> **Next Scenario**: Same to what we did before, say for an instance we will update the functionality

Let's have the following code

```ts
// main.ts

type Life = 'happy' | 'sad';

export async function experience(life: Life): Promise<boolean> {
  new Promise<Life>((resolve) => {
    resolve(life);
  }).then((response) => {
    if (response === 'sad') {
      return false;
    }
  });

  return true;
}

async function start(): Promise<void> {
  console.log(await experience('happy'));
  console.log(await experience('sad'));
}

start();
```

Then let us adjust our unit test with our functionality and enable it to **wait** for the code to finish executing since we implemented `Promise` which is an asynchronous code.

We will just add `async` and `await`

```ts
// main.spec.ts

import { experience } from './main';

it('should return true if life is happy', async () => {
  const result = await experience('happy');
  expect(result).toBe(true);
});

it('should return false if life is sad', async () => {
  const result = await experience('sad');
  expect(result).toBe(false);
});
```

Run `npm test`

> Note that we only added **async** and **await** but we should still expect the same outputs when we run our tests

However, in the result, one unit test is failing.

```
 FAIL  src/main.spec.ts
  ● should return false if life is sad

    expect(received).toBe(expected) // Object.is equality

    Expected: false
    Received: true

       8 | it('should return false if life is sad',
async () => {
       9 |     const result = await experience('sad');
    > 10 |     expect(result).toBe(false);
         |                    ^
      11 | });

      at src/main.spec.ts:10:20
      at fulfilled (src/main.spec.ts:5:58)
```

Some people will spend time fixing the unit test code. But actually, there is really something wrong with our functionality.

Try testing the actual code by running `npm start`

We would get the output below:

```
> jest-testing@1.0.0 start
> ts-node src/main.ts

true
true
```

Notice how the result change to both `true`, but this is not what we are expecting!

Therefore, our unit tests report the correct results especially the failing one.

The mistake in our code is that we are using the `.then()` which really does not return any value.

> So the correct way on writing our functionality should be like this

```ts
// main.ts

export async function experience(life: Life): Promise<boolean> {
  const response = await new Promise<Life>((resolve) => {
    resolve(life);
  });

  if (response === 'sad') {
    return false;
  }

  return true;
}
```

Now try running `npm test` then `npm start` and see it perfectly fixed!

**You have now observed the importance of unit testing!**

## Other References

- https://github.com/lightzane/curiosity-api
- https://github.com/lightzane/curiosity-ui
- https://github.com/lightzane/curiosity-test
- https://github.com/lightzane/jest-from-scratch
