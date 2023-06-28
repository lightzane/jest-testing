import ExcelJS from 'exceljs';
import { MainService } from './main';

jest.mock('exceljs');

it('should be sad', async () => {
  // @ts-expect-error
  ExcelJS.Workbook.prototype.xlsx = {
    writeFile: jest.fn().mockRejectedValue(new Error('test')),
  };

  const service = new MainService();
  const spy = jest.spyOn(service['logger'], 'error');
  await service.save();
  expect(spy).toHaveBeenCalledTimes(1);
});

it('should be happy', async () => {
  // @ts-expect-error
  ExcelJS.Workbook.prototype.xlsx = {
    writeFile: jest.fn().mockResolvedValue(''),
  };

  const service = new MainService();
  const spy = jest.spyOn(service['logger'], 'log');
  await service.save();
  expect(spy).toHaveBeenCalledTimes(1);
});
