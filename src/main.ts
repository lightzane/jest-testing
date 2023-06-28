import ExcelJS from 'exceljs';

export class Logger {
  log() {}
}

export class MainService {
  logger = new Logger();

  async save(): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    return workbook.xlsx.writeFile('test.xlsx').then(() => {
      this.logger.log();
    });
  }
}
