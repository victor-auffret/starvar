import { extractPass } from "./helper";
import { IReadonlyStarAccess, IStarVar, IWritableStarAccess, Pass } from "./types";

class AbstractStarVar<T, K extends string> implements IStarVar<T> {

  #value: T;
  #writeList: Set<K>;

  constructor(value: T, writeList: K[] = []) {
    this.#value = value;
    this.#writeList = new Set(writeList);
  }

  public canWrite(pass: Pass): boolean {
    return this.#writeList.has(extractPass(pass) as K)
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

class StarVar<T, K extends string = string> extends AbstractStarVar<T, K> {

  access(pass: Pass): IReadonlyStarAccess<T> | IWritableStarAccess<T> {
    let base: IReadonlyStarAccess<T> = {
      read: () => this.val()
    }
    if (this.canWrite(pass)) {
      const write = (val: T | ((this: void, _: T) => T)) => this.set(val, pass)
      return { ...base, write } as IWritableStarAccess<T>
    }
    return base
  }
}

export { StarVar }
