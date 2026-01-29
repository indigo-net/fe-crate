type PrintType = 'log' | 'warn' | 'error';

interface ILog<T extends unknown> {
  message: string;
  data?: T;
  location?: string;
}

class DeveloperConsole {
  private static print<T>(type: PrintType, log: ILog<T>) {
    if (import.meta.env.DEV) {
      console[type]({
        message: log.message,
        location: log.location ?? '-',
        data: log.data ?? '-',
      });
    }
  }

  static log<T>(log: ILog<T>) {
    this.print('log', log);
  }
  static warn<T>(log: ILog<T>) {
    this.print('warn', log);
  }
  static error<T>(log: ILog<T>) {
    this.print('error', log);
  }
}

export default DeveloperConsole;
