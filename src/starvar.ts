
export type Some<T> = { ok: true, value: T }
export type None<Err extends string = string> = { ok: false, error: Err }
export type Result<T, Err extends string = string> = Some<T> | None<Err>

export const NOT_FOUND = "not_found"
export const ALREADY_DEFINED = "already_defined"

type SetterParam<Val> = Val | ((this: void, _: Val) => Val)

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

export function extractPass<T extends string = string>(pass: Pass<T>) {
  return (typeof pass == "string") ? pass : pass.getSystemName() as T
}

class AbstractStarVar<Val, Sys extends string> implements IStarVar<Val> {

  #value: Val;
  #writeList: Set<Sys>;

  constructor(value: Val, writeList: Sys[] = []) {
    this.#value = value;
    this.#writeList = new Set(writeList);
  }

  public canWrite(pass: Pass): boolean {
    return this.#writeList.has(extractPass(pass) as Sys)
  }

  public val(): Val {
    return this.#value;
  }

  protected set(val: ((this: void, _: Val) => Val) | Val, pass: Pass<string>): void {
    if (this.canWrite(pass)) {
      this.privateSet(val);
    }
  }

  private privateSet(val: ((this: void, _: Val) => Val) | Val) {
  if (typeof val === "function") {
    const fn = val as (this: void, current: Val) => Val;
      this.#value = fn(this.#value);
    } else {
      this.#value = val;
    }
  }

}

export class StarVar<Val, Sys extends string = string> extends AbstractStarVar<Val, Sys> {

  access(pass: Pass): IReadonlyStarAccess<Val> | IWritableStarAccess<Val> {
    let base: IReadonlyStarAccess<Val> = {
      read: () => this.val()
    }
    if (this.canWrite(pass)) {
      const write = (val: Val | ((this: void, _: Val) => Val)) => this.set(val, pass)
      return { ...base, write } as IWritableStarAccess<Val>
    }
    return base
  }
}

//////////////////////////
/*
type Varname = string

export class StarVarRegistry {

  static memory: Map<Varname, StarVar<any>> = new Map()

  static register<T>(name: Varname, starvar: StarVar<T>): Result<StarVar<T>, typeof ALREADY_DEFINED> {
    if (!StarVarRegistry.has(name)) {
      StarVarRegistry.memory.set(name, starvar)
      return { ok: true, value: starvar } as Some<StarVar<T>>
    }
    return { ok: false, error: ALREADY_DEFINED } as None<typeof ALREADY_DEFINED>
  }

  static getAllByPass(pass: Pass): Map<Varname, StarVar<any>> {
    let mdp = extractPass(pass);
    let rep: Map<Varname, StarVar<any>> = new Map()
    StarVarRegistry.memory.forEach((val, name) => {
      if (val.canWrite(mdp)) {
        rep.set(name, val)
      }
    })
    return rep
  }

  static has(name: Varname): boolean {
    return StarVarRegistry.memory.has(name)
  }

  static get<T = any>(name: Varname): Result<StarVar<T>, typeof NOT_FOUND> {
    if (StarVarRegistry.has(name)) {
      return { ok: true, value: this.memory.get(name) as StarVar<T> } as Some<StarVar<T>>
    } else {
      return { ok: false, error: "not_found" } as None<typeof NOT_FOUND>
    }
  }

}

interface IStarVarPrepared<T> {
  val: T;
  pass: Pass[];
}

interface IRegisterOptions {
  [key: string]: IStarVarPrepared<any>;
}

interface IStarVarAccess {

}

interface IStarVarRegisterBuilder {
  get: { [key: string]: () => any };
  access: (pass: Pass) => {
    get: { [key: string]: () => any },
    set: { [key: string]: (old: any) => void }
  }
}

export function makeVar<T>(val: T, pass: Pass[]): IStarVarPrepared<T> {
  return { val, pass }
}

export function makeRegister(options: IRegisterOptions): IStarVarRegisterBuilder {
  return {
    get: {},
    access: (pass: Pass) => {
      return {
        get: {},
        set: {}
      }
    }
  }
}

//////

export function defineStarVar<T>(name: string, val: T, pass: string[] = []): Result<StarVar<T>, typeof ALREADY_DEFINED> {
  if (!StarVarRegistry.memory.has(name)) {
    const ultra = new StarVar(val, pass)
    StarVarRegistry.memory.set(name, ultra)
    return { ok: true, value: ultra } as Some<StarVar<T>> 
  }
  return { ok: false, error: ALREADY_DEFINED } as None<typeof ALREADY_DEFINED>
}

export function useStarVarAccess(pass: Pass) {
  let mdp = extractPass(pass)

  return {
    get: (name: string) => StarVarRegistry.get(name),
    set: () => {
      let all = StarVarRegistry.getAllByPass(mdp)
      let rep = {}
      all.forEach((val, key) => {
        rep = { ...rep, [key]: val }
      })
      return rep
    }
  }
}

export function useStarVarReadOnly<T>() {
  return {
    get: (name: string): Result<StarVar<T>, typeof NOT_FOUND> => {
      return StarVarRegistry.get<T>(name)
    }
  }
}

type optStarVarRegistry = { [var_name: string]: any }

export function createStarVarRegistry(opt: optStarVarRegistry) {
  return {}
}
////

interface IUnamedStarvar<T> {

}

export const makeStarVar = function <T>(value: T, pass: Pass[] = []): IUnamedStarvar<T> {
  return {}
}
interface StarVarAccess {

}

interface IStarVarRegistry {
  getAllByPass(pass: Pass): StarVarAccess
}

type StarVarConfig = {
  [var_name: string]: IUnamedStarvar<any>
}

export const makeStarVarRegistry = function (vars: StarVarConfig): StarVarRegistry {
  return {
    getAllByPass(pass: Pass): StarVarAccess {
      return {}
    }
  }
}
*/
