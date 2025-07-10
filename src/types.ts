export interface IStarVar<T> {
  canWrite(pass: string): boolean;
  val(): T;
  // set(val: T | ((this: void, _: T) => T), pass: string) : void;
}

export interface IGetSystemName {
  getSystemName(): string
}
export type Pass = string | IGetSystemName

export interface IUseStarVar<T> {
  get(): T
}

export interface IUseStarVarSysOk<T> extends IUseStarVar<T> {
  set(val: T | ((this: void, _: T) => T)): void
}

export type Some<T> = { value: T, ok: true }
export type None = { ok: false, error: string }
export type Result<T> = Some<T> | None

