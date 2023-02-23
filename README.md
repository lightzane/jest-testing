# Jest Testing

Training and observing the importance of Unit Testing using Jest testing framework

# How this Project is Created

1. `npm init -y`
2. Update necessary changes in `package.json` ([see here](#packagejson))
3. Create `src/main.ts` and `src/main.spec.ts`
4. `npm i -D typescript ts-node jest ts-jest @types/jest`
5. `npx tsc --init`
6. Update necessary changes in `tsconfig.json` ([see here](#tsconfigjson))
7. `npx jest --init` ([see here](#jest-configuration))
8. Update necessary changes `jest.config.ts` ([see here](#jestconfigts))

### package.json

> Note: Observe the changes `test` script after doing `Step 7`

```json
{
  "scripts": {
    "start": "ts-node src/main.ts",
    "test": "jest --no-cache --silent",
    "test:watch": "jest --no-cache --watch"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "baseUrl": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

### Jest Configuration

When running `npx jest --init`, the command will prompt questions:

✅ Would you like to use Jest when running "test" script in "package.json" ? `>>` **yes**

✅ Would you like to use Typescript for the configuration file? `>>` **yes**

✅ Choose the test environment that will be used for testing `>>` **node**

✅ Do you want Jest to add coverage reports `>>` **yes**

✅ Which provide should be used to instrument code for coverage `>>` **v8**

✅ Automatically clear mock calls, instances, contexts and results before every test? `>>` **yes**

### jest.config.ts

Add the following `preset` and `testMatch` property in the generated config:

```ts
preset: "ts-jest",
testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
],
```

## About the devDependencies installed

| node_modules  | description                                         |
| ------------- | --------------------------------------------------- |
| `typescript`  | core node package to write `.ts` files and language |
| `jest`        | javascript testing framework                        |
| `ts-jest`     | required by Jest in order to execute `.ts` files    |
| `@types/jest` | required by Typescript compiler to understand Jest  |
| `ts-node`     | in order to execute `.ts` files                     |
