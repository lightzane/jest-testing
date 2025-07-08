import { main } from './main';
import * as addModule from '@/utils/add';

describe('main', () => {
  it('should pass correct numbers and call add()', () => {
    const addSpy = jest.spyOn(addModule, 'add');

    main();

    expect(addSpy).toHaveBeenCalledWith(1, 2, 3, 4, 5);
  });
});
