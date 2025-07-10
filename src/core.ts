import { IGetSystemName, IReadonlyStarAccess, IStarVar, IWritableStarAccess, Pass } from "./types.js";

class AbstractStarVar<T, K extends string> implements IStarVar<T> {

  #value: T;
  #writeList: Set<K>;

  constructor(value: T, writeList: K[] = []) {
    this.#value = value;
    this.#writeList = new Set(writeList);
  }

  public canWrite(pass: Pass<string>): boolean {
    let password = typeof pass === "string" ? pass : (pass as IGetSystemName<string>).getSystemName();
    return this.#writeList.has(password as K)
  }

  public val(): T {
    return this.#value;
  }

  protected set(val: T | ((this: void, _: T) => T), pass: Pass<string>): void {
    if (this.canWrite(pass)) {
      this.privateSet(val);
    }
  }

	private privateSet(val: T | ((this: void, _: T) => T)) {
	if (typeof val === "function") {
		const fn = val as (this: void, current: T) => T;
      this.#value = fn(this.#value);
    } else {
      this.#value = val;
    }
  }

}

class StarVar<T, K extends string> extends AbstractStarVar<T, K> {

  use(pass: Pass): IReadonlyStarAccess<T> | IWritableStarAccess<T> {
    let rep: IReadonlyStarAccess<T> = {
      get: () => this.val()
    }
    if (this.canWrite(pass)) {
      const set = (val: T | ((this: void, _: T) => T)) => this.set(val, pass)
      rep = { ...rep, set } as IWritableStarAccess<T>
    }
    return rep
  }
}

export { StarVar }
