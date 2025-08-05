import { expect, test } from 'vitest'
import { /*defineStarVar,*/ StarVar } from '../src/starvar'


test("StarVar test", () => {
  let v = new StarVar(5, ["sys:yes"])
  expect(v.val()).toBe(5)
})

/*
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
*/