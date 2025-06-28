export interface IStarVar<T> {
  canWrite(pass: string): boolean;
  val(): T;
  set(val: T | ((this: void, _: T) => T), pass: string) : void;
}

export interface IGetSystemName {
  getSystemName(): string
}
