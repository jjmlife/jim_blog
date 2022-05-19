import { ConsoleLogger, Logger } from '@nestjs/common';

export class ReportLogger extends ConsoleLogger {
  constructor() {
    super();
  }
  logger = new Logger();

  verbose(message: string) {
    console.log('【Verbose】日志上报', message);
    this.logger.verbose(message);
    super.verbose.apply(this, arguments);
  }

  log(message: string) {
    console.log('【Log】日志上报', message);
    this.logger.log(message);
    super.log.apply(this, arguments);
  }

  debug(message: string) {
    console.log('【Debug】日志上报', message);
    this.logger.debug(message);
    super.debug.apply(this, arguments);
  }

  warn(message: string) {
    console.log('【Warn】日志上报', message);
    this.logger.warn(message);
    super.warn.apply(this, arguments);
  }

  error(message: string) {
    console.error('【Error】日志上报', message);
    this.logger.error(message);
    super.error.apply(this, arguments);
  }
}
