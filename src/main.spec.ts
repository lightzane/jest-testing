import { MainService } from './main';

jest.mock('exceljs', () => ({
  Workbook: jest.fn(() => ({
    xlsx: {
      writeFile: jest.fn().mockResolvedValue('test'),
    },
  })),
}));

it('should be covered', async () => {
  const service = new MainService();
  const spy = jest.spyOn(service['logger'], 'log');
  await service.save();
  expect(spy).toHaveBeenCalledTimes(1);
});
