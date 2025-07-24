import { Pass } from "./types";

export function extractPass<T extends string = string>(pass: Pass<T>) {
  return (typeof pass == "string") ? pass : pass.getSystemName() as T
}
