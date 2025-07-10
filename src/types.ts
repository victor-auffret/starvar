export interface IStarVar<T> {
  canWrite(pass: string): boolean;
  val(): T;
  // set(val: T | ((this: void, _: T) => T), pass: string) : void;
}

export interface IGetSystemName<P extends string = string> {
  getSystemName(): P & {}
}
export type Pass<P extends string = string> = P | IGetSystemName<P>

export interface IReadonlyStarAccess<T> {
  read(): T
}

export interface IWritableStarAccess<T> extends IReadonlyStarAccess<T> {
  write(val: T | ((this: void, _: T) => T)): void
}

export type Some<T> = { ok: true, value: T }
export type None<Err extends string = string> = { ok: false, error: Err }
export type Result<T, Err extends string = string> = Some<T> | None<Err>
