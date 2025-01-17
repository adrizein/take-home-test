import { Pharmacy } from "../src/pharmacy";
import {
  Drug,
  ImperishableDrug,
  ProgressiveDrug,
  HerbalTea,
  Dafalgan
} from "../src/drug";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    const pharmacy = new Pharmacy([new Drug("test", 2, 4)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new Drug("test", 1, 3)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new Drug("test", 0, 2)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new Drug("test", -1, 0)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new Drug("test", -2, 0)]);
  });

  it("should keep benefit above 0", () => {
    expect(new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 0)]
    );
  });

  it("should increase the benefit and decrease expiresIn of Herbal Tea", () => {
    const pharmacy = new Pharmacy([new HerbalTea(2, 3)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new HerbalTea(1, 4)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new HerbalTea(0, 5)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new HerbalTea(-1, 7)]);
  });

  it("should keep benefit below 50", () => {
    expect(new Pharmacy([new HerbalTea(2, 50)]).updateBenefitValue()).toEqual([
      new HerbalTea(1, 50)
    ]);
  });

  it("should not change the benefit and expiresIn of Magic Pill", () => {
    const pharmacy = new Pharmacy([new ImperishableDrug("Magic Pill", 2, 30)]);
    expect(pharmacy.updateBenefitValue()).toEqual([
      new ImperishableDrug("Magic Pill", 2, 30)
    ]);
  });

  it("should progressively increase the benefit of Fervex and then go to zero", () => {
    expect(
      new Pharmacy([new ProgressiveDrug("Fervex", 13, 2)]).updateBenefitValue()
    ).toEqual([new ProgressiveDrug("Fervex", 12, 3)]);

    expect(
      new Pharmacy([new ProgressiveDrug("Fervex", 10, 2)]).updateBenefitValue()
    ).toEqual([new ProgressiveDrug("Fervex", 9, 4)]);

    expect(
      new Pharmacy([new ProgressiveDrug("Fervex", 5, 2)]).updateBenefitValue()
    ).toEqual([new ProgressiveDrug("Fervex", 4, 5)]);

    expect(
      new Pharmacy([new ProgressiveDrug("Fervex", 1, 2)]).updateBenefitValue()
    ).toEqual([new ProgressiveDrug("Fervex", 0, 5)]);

    expect(
      new Pharmacy([new ProgressiveDrug("Fervex", 0, 2)]).updateBenefitValue()
    ).toEqual([new ProgressiveDrug("Fervex", -1, 0)]);
  });

  it("should decrease the benefit of Dafalgan twice as fast", () => {
    const pharmacy = new Pharmacy([new Dafalgan(2, 8)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new Dafalgan(1, 6)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new Dafalgan(0, 4)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new Dafalgan(-1, 0)]);
  });
});
