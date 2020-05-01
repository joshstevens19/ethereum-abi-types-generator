export interface ProgramOptions {
  command: string;
  subcommands: string[];
  options: { [key: string]: string };
}
