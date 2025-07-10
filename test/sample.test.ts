import { expect, test } from 'vitest'
import { defineStarVar } from '../src/index'

const NUMBER_VALUE = -7
const BOOLEAN_VALUE = false;
const STRING_VALUE = "hello world"

test("test on defineStarVar with NUMBER_VALUE", () => {
  
  const myvar = defineStarVar("myVar", NUMBER_VALUE, []);

  if (myvar.ok) {
    expect(myvar.value.val()).toBe(NUMBER_VALUE)
  }
});

test("test on defineStarVar with BOOLEAN_VALUE", () => {
  
  const myvar = defineStarVar("myVar", BOOLEAN_VALUE, []);

  if (myvar.ok) {
    expect(myvar.value.val()).toBe(BOOLEAN_VALUE)
  }
});


test("test on defineStarVar with STRING_VALUE", () => {
  
  const myvar = defineStarVar("myVar", STRING_VALUE, []);

  if (myvar.ok) {
    expect(myvar.value.val()).toBe(STRING_VALUE)
  }
});


test("test on defineStarVar with SYS:OK ", () => {
  
  const myvar = defineStarVar("myVar", NUMBER_VALUE, ["SYS:OK"]);

  if (myvar.ok) {
    expect(myvar.value.canWrite("SYS:OK")).toBe(true)
  }
});


test("test on defineStarVar with SYS:NO ", () => {
  
  const myvar = defineStarVar("myVar", NUMBER_VALUE, ["SYS:OK"]);

  if (myvar.ok) {
    expect(myvar.value.canWrite("SYS:NO")).toBe(false)
  }
});

test("test on defineStarVar with SYS:ONE & SYS:TWO ", () => {
  
  const myvar = defineStarVar("myVar", NUMBER_VALUE, ["SYS:ONE", "SYS:TWO"]);

  if (myvar.ok) {
    expect(myvar.value.canWrite("SYS:TWO")).toBe(true)
  }
});
