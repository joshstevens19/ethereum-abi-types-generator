import { Logger } from '../common/logger';
import { loggerMock } from '../common/mocks/logger.mock';

// mock any global stuff in here
Logger.error = loggerMock.error;
Logger.log = loggerMock.log;
