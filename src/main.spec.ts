import { Move, NoEffect, Pokemon } from './main';

describe('Pokemon battle as Pikachu vs Onix', () => {
  let pikachu: Pokemon;

  beforeEach(() => {
    pikachu = new Pokemon();
  });

  // * ========================================================================
  // *      General
  // * ========================================================================
  describe('--General--', () => {
    it('should not throw NoEffect error when using Iron Tail', () => {
      expect(() => {
        pikachu.useGeneral(Move.IRON_TAIL);
      }).not.toThrowError(NoEffect());
    });

    it('should throw NoEffect error when using Thunder Bolt', () => {
      expect(() => {
        pikachu.useGeneral(Move.THUNDER_BOLT);
      }).toThrowError(NoEffect());
    });
  });

  // * ========================================================================
  // *      Promise
  // * ========================================================================
  describe('--Promise--', () => {
    it('should not throw NoEffect error when using Iron Tail', (done) => {
      pikachu
        .usePromise(Move.IRON_TAIL)
        .then(() => done())
        .catch((error) => done(`${error.message}`)); // Note: We expected a general "Error" class, so we know it has ".message" prop
    });

    it('should throw NoEffect error when using Thunder Bolt', (done) => {
      pikachu
        .usePromise(Move.THUNDER_BOLT)
        .then(() => {
          done('It did not threw NoEffect error where it was expected to.');
        })
        .catch(() => done());
    });
  });

  // * ========================================================================
  // *      Observable
  // * ========================================================================
  describe('--Observable--', () => {
    it('should not throw NoEffect error when using Iron Tail', (done) => {
      pikachu.useObservable(Move.IRON_TAIL).subscribe({
        next: () => done(),
        error: (error) => done(`${error.message}`), // Note: We expected a general "Error" class, so we know it has ".message" prop
      });
    });

    it('should throw NoEffect error when using Thunder Bolt', (done) => {
      pikachu.useObservable(Move.THUNDER_BOLT).subscribe({
        next: () => done('It did not threw an error: NoEffect'),
        error: () => done(),
      });
    });
  });
});
