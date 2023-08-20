import { FruitService, Fruit } from './main';

describe('SampleService', () => {
  let service: FruitService;

  beforeEach(() => {
    service = new FruitService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('plan()', () => {
    let fruitStorage: Fruit[];

    beforeEach(() => {
      jest.useFakeTimers();
      fruitStorage = service.fruitStorage;
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should only store an Apple', () => {
      service.plant();

      jest.advanceTimersByTime(1000); // 1 second

      expect(fruitStorage.length).toEqual(1);
      expect(fruitStorage).toContain(Fruit.APPLE);
      expect(fruitStorage).not.toContain(Fruit.BANANA);
    });

    it('should store Apple and Banana', () => {
      service.plant();

      jest.advanceTimersByTime(3000); // 3 second

      expect(fruitStorage.length).toEqual(2);
      expect(fruitStorage).toContain(Fruit.APPLE);
      expect(fruitStorage).toContain(Fruit.BANANA);
      expect(fruitStorage).not.toContain(Fruit.CHERRY);
    });

    it('should store Apple, Banana and Cherry', () => {
      service.plant();

      jest.advanceTimersByTime(5000); // 5 second

      expect(fruitStorage.length).toEqual(3);
      expect(fruitStorage).toContain(Fruit.APPLE);
      expect(fruitStorage).toContain(Fruit.BANANA);
      expect(fruitStorage).toContain(Fruit.CHERRY);
    });
  });
});
