export interface IProgramOptions {
  command: string;
  subcommands: string[];
  options: { [key: string]: string };
}
