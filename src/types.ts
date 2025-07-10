export interface IStarVar<T> {
  canWrite(pass: string): boolean;
  val(): T;
  // set(val: T | ((this: void, _: T) => T), pass: string) : void;
}

export interface IGetSystemName<P extends string> {
  getSystemName(): P & {}
}
export type Pass<P extends string = string> = P | IGetSystemName<P>

export interface IReadonlyStarAccess<T> {
  get(): T
}

export interface IWritableStarAccess<T> extends IReadonlyStarAccess<T> {
  set(val: T | ((this: void, _: T) => T)): void
}

export type Some<T> = { value: T, ok: true }
export type None = { ok: false, error: string }
export type Result<T> = Some<T> | None

