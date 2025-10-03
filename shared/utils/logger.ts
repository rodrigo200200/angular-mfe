export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  source: string;
  data?: any;
}

export class Logger {
  private static logs: LogEntry[] = [];
  private static maxLogs = 100;

  static debug(message: string, source: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, source, data);
  }

  static info(message: string, source: string, data?: any): void {
    this.log(LogLevel.INFO, message, source, data);
  }

  static warn(message: string, source: string, data?: any): void {
    this.log(LogLevel.WARN, message, source, data);
  }

  static error(message: string, source: string, data?: any): void {
    this.log(LogLevel.ERROR, message, source, data);
  }

  private static log(level: LogLevel, message: string, source: string, data?: any): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      source,
      data
    };

    this.logs.push(entry);

    // Manter apenas os últimos logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output
    const timestamp = entry.timestamp.toISOString();
    const levelText = LogLevel[level];
    const logMessage = `[${timestamp}] [${levelText}] [${source}] ${message}`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(logMessage, data);
        break;
      case LogLevel.INFO:
        console.info(logMessage, data);
        break;
      case LogLevel.WARN:
        console.warn(logMessage, data);
        break;
      case LogLevel.ERROR:
        console.error(logMessage, data);
        break;
    }

    // Armazenar no localStorage para debug
    try {
      localStorage.setItem('app-logs', JSON.stringify(this.logs.slice(-20)));
    } catch (e) {
      // Ignorar erros de localStorage
    }
  }

  static getLogs(): LogEntry[] {
    return [...this.logs];
  }

  static getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  static clearLogs(): void {
    this.logs = [];
    localStorage.removeItem('app-logs');
  }

  static exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}
