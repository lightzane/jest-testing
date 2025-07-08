# Resolving Alias Imports

When using **alias imports** in your project:

`main.ts`

```ts
import { add } from '@/utils';
```

`tsconfig.json`

```json
{
  "baseUrl": "./",
  "paths": {
    "@/*": ["src/*"]
  }
}
```

## The Error

Then, you may encounter that **Jest** cannot find module `@/utils`.

## The Solution

To solve this, we need to update **Jest Configuration**

`jest.config.ts`

```diff
+import { pathsToModuleNameMapper } from "ts-jest";
+import { compilerOptions } from "./tsconfig.json"

 export default {
   ...
- moduleNameMapper: {}
+ moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
+    prefix: "<rootDir>/",
+  }),
 }
```

## Other Typescript Error

This project setup has an expected error in `main.spec.ts`

```
Cannot find module '@/utils/add' or its corresponding type declarations.ts(2307)
```

This is expected, since we have configured `tsconfig.json` like so:

```json
{
  "exclude": ["**/*.spec.ts"]
}
```

<!-- prettier-ignore -->
> [!NOTE]
> This is only an error in Typescript.
> Since everything works fine via `npm start` and `npm test`

This is the scenario where we can apply multiple Typscript configuration.

During development, we can remove `**/*.spec.ts` in `"exclude"`.

But during the **build** stage, we should have a separate `tsconfig.json` so it will exclude building `.spec.ts` files in production.
