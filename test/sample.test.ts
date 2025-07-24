import { expect, test } from 'vitest'
import { defineStarVar } from '../src/index'

// Table de configuration pour les tests simples de valeur
const valueCases = [
  { name: "NUMBER_VALUE", value: -7 },
  { name: "BOOLEAN_VALUE", value: false },
  { name: "STRING_VALUE", value: "hello world" }
] as const;

valueCases.forEach(({ name, value }, index) => {
  test(`defineStarVar should return correct value for ${name}`, () => {
    const myvar = defineStarVar(`myVar_${index}`, value, []);
    expect(myvar.ok).toBe(true)
    if (myvar.ok) {
      expect(myvar.value.val()).toBe(value)
    }
  });
});

// Table de configuration pour les tests de canWrite
const writeAccessCases = [
  {
    name: "should allow SYS:OK",
    value: -7,
    allowed: ["SYS:OK"],
    checks: [{ sys: "SYS:OK", expected: true }]
  },
  {
    name: "should reject SYS:NO",
    value: -7,
    allowed: ["SYS:OK"],
    checks: [{ sys: "SYS:NO", expected: false }]
  },
  {
    name: "should allow SYS:ONE and SYS:TWO",
    value: -7,
    allowed: ["SYS:ONE", "SYS:TWO"],
    checks: [
      { sys: "SYS:TWO", expected: true },
      { sys: "SYS:ONE", expected: true }
    ]
  }
];

writeAccessCases.forEach(({ name, value, allowed, checks }, index) => {
  test(`defineStarVar ${name}`, () => {
    const myvar = defineStarVar(`myVar__${index}`, value, allowed);
    expect(myvar.ok).toBe(true)
    if (myvar.ok) {
      for (const { sys, expected } of checks) {
        expect(myvar.value.canWrite(sys)).toBe(expected)
      }
    }
  });
});







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
