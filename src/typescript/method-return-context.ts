export interface MethodPayableReturnContext {
  send(options: SendOptions): Promise<any>;
  send(
    options: SendOptions,
    callback: (error: Error, result: any) => void
  ): Promise<any>;
  estimateGas(options: EstimateGasOptions): Promise<any>;
  estimateGas(
    options: EstimateGasOptions,
    callback: (error: Error, result: any) => void
  ): Promise<any>;
  encodeABI(): string;
}
export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(
    options: CallOptions,
    callback: (error: Error, result: TCallReturn) => void
  ): Promise<TCallReturn>;
}

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value: number | string; // | BN;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string; // | BN;
  gas?: number;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}
