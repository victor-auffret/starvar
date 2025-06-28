import { IGetSystemName, IStarVar } from "./types.js";

class AbstractStarVar<T, K extends string> implements IStarVar<T> {

  #value: T;
  #writeList: K[] = [];

  constructor(value: T, writeList: K[] = []) {
    this.#value = value;
    this.#writeList = writeList;
  }

  public canWrite(pass: string): boolean {
    return this.#writeList.includes(pass as K)
  }

  public val(): T {
    return this.#value;
  }

  public set(val: T | ((this: void, _: T) => T), pass: string | IGetSystemName): void {
    let password = typeof pass === "string" ? pass : (pass as IGetSystemName).getSystemName();
    if (this.canWrite(password)) {
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

}

export { StarVar }
