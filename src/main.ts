import { Observable, of, throwError } from 'rxjs';

export enum Move {
  /** Electric-type move */
  THUNDER_BOLT,

  /** Steel-type move */
  IRON_TAIL,
}

export const NoEffect = (): Error => {
  return new Error(`It has NO EFFECT on Onix!`);
};

/**
 * Scenario: **Pikachu** vs **Onix**
 *
 * **Onix** is a `Rock`/`Ground` type.
 *
 * `Electric` moves or attack does not work on ground types.
 *
 * But `Steel` is a move that can cut through `Rock` types.
 */
export class Pokemon {
  wins = false;

  private attack(move: Move): void {
    if (move === Move.THUNDER_BOLT) {
      throw NoEffect();
    }

    this.wins = true;
  }

  /** Uses general method / error */
  useGeneral(move: Move): void {
    this.attack(move);
  }

  /** Uses Promise method / reject as error */
  usePromise(move: Move): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.attack(move);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /** Uses Observable method / throwError */
  useObservable(move: Move): Observable<boolean> {
    try {
      this.attack(move);
      return of(true);
    } catch (error) {
      return throwError(() => error);
    }
  }
}
