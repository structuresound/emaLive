declare var inlets;
declare var outlets;
declare var jsarguments;

declare var max;

declare class Task {
  constructor(task: Function, context: any);
  public interval: number;
  repeat(repeats: number): void;
}