export enum Fruit {
  APPLE = 'apple',
  BANANA = 'banana',
  CHERRY = 'cherry',
}

export class FruitService {
  fruitStorage: Fruit[] = [];

  /**
   * Run `setTimeout` and stores fruits in the `fruitStorage` based on the time passed.
   *
   * - 1-second lap - stores "Apple"
   * - 2-second lap - stores "Banana"
   * - 3-second lap - stores "Cherry"
   */
  plant(): void {
    setTimeout(() => {
      this.fruitStorage.push(Fruit.APPLE);
    }, 1000);

    setTimeout(() => {
      this.fruitStorage.push(Fruit.BANANA);
    }, 3000);

    setTimeout(() => {
      this.fruitStorage.push(Fruit.CHERRY);
    }, 5000);
  }
}
