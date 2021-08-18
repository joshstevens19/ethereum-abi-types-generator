import fs from 'fs-extra';
import path from 'path';
import { Logger } from '../../common/logger';
import AbiGenerator from './abi-generator';
import TypeScriptHelpers from './common/helpers';
import { Provider } from './enums/provider';

interface AbiFilePathContext {
  path: string;
  contractName?: string | undefined;
}

export class HardhatFactory {
  /**
   * Generate all hardhat contract typings
   */
  public async generate(): Promise<string | undefined> {
    const contracts = TypeScriptHelpers.buildExecutingPath(
      './artifacts/contracts'
    );
    if (!TypeScriptHelpers.isDirectory(contracts)) {
      throw new Error(
        'can not find the artifacts > contracts directory please make sure you run this command on the route of the project and have compiled your smart contracts'
      );
    }

    const abiFilesPaths = await this.buildAbiFilesPathContext(contracts);
    if (abiFilesPaths.length === 0) {
      Logger.log(
        'No contracts found in artifacts > contracts please make sure you have compiled your smart contracts'
      );
      return undefined;
    }

    const saveTypingsFolder = TypeScriptHelpers.buildExecutingPath(
      './ethereum-abi-types'
    );

    if (!fs.existsSync(saveTypingsFolder)) {
      fs.mkdirSync(saveTypingsFolder);
    }

    for (let i = 0; i < abiFilesPaths.length; i++) {
      const generateResponse = new AbiGenerator({
        provider: Provider.ethers_v5,
        abiFileLocation: abiFilesPaths[i].path,
        outputPathDirectory: saveTypingsFolder,
        name: abiFilesPaths[i].contractName,
      }).generate();

      Logger.log(
        `successfully created typings for abi file ${generateResponse.abiJsonFileLocation} saved in ${generateResponse.outputLocation}`
      );
    }

    return saveTypingsFolder;
  }

  /**
   * Build abi files path context
   * @param directoryPath The directory path
   * @param abiFiles The abi files
   */
  private async buildAbiFilesPathContext(
    directoryPath: string,
    abiFiles: AbiFilePathContext[] = []
  ): Promise<AbiFilePathContext[]> {
    const folder = await fs.promises.readdir(directoryPath);
    for (let i = 0; i < folder.length; i++) {
      const item = folder[i];
      const itemPath = path.join(directoryPath, item);
      //   console.log(item, itemPath);
      if (TypeScriptHelpers.isDirectory(itemPath)) {
        await this.buildAbiFilesPathContext(itemPath, abiFiles);
      } else {
        if (item.includes('.json')) {
          try {
            const metadata = JSON.parse(fs.readFileSync(itemPath, 'utf8'));
            if (metadata.abi && Array.isArray(metadata.abi)) {
              abiFiles.push({
                path: itemPath,
                contractName: metadata.contractName,
              });
            }
          } catch (error) {
            // mute it
          }
        }
      }
    }

    return abiFiles;
  }
}
