import { Tuple } from "./tuple";

describe("Tuple", () => {
  test.each`
    x            | y            | z            | w            | result
    ${null}      | ${null}      | ${null}      | ${null}      | ${{ x: 0, y: 0, z: 0, w: 0, isPoint: false, isVector: true }}
    ${undefined} | ${undefined} | ${undefined} | ${undefined} | ${{ x: 0, y: 0, z: 0, w: 0, isPoint: false, isVector: true }}
    ${0}         | ${0}         | ${0}         | ${0}         | ${{ x: 0, y: 0, z: 0, w: 0, isPoint: false, isVector: true }}
    ${0}         | ${0}         | ${0}         | ${1}         | ${{ x: 0, y: 0, z: 0, w: 1, isPoint: true, isVector: false }}
    ${1}         | ${1}         | ${1}         | ${1}         | ${{ x: 1, y: 1, z: 1, w: 1, isPoint: true, isVector: false }}
    ${NaN}       | ${NaN}       | ${NaN}       | ${NaN}       | ${{ x: 0, y: 0, z: 0, w: 0, isPoint: false, isVector: true }}
    ${-1}        | ${-1}        | ${-1}        | ${0}         | ${{ x: -1, y: -1, z: -1, w: 0, isPoint: false, isVector: true }}
    ${"1"}       | ${"1"}       | ${"1"}       | ${"1"}       | ${{ x: 0, y: 0, z: 0, w: 0, isPoint: false, isVector: true }}
  `(
    "should return Tuple: $result for x: $x, y: $y, z: $z, w: $w",
    ({ x, y, z, w, result }) => {
      expect(new Tuple(x, y, z, w)).toEqual(
        expect.objectContaining({
          x: result.x,
          y: result.y,
          z: result.z,
          w: result.w,
          isPoint: result.isPoint,
          isVector: result.isVector
        })
      );
    }
  );

  test.each`
    w    | isPoint  | isVector
    ${0} | ${false} | ${true}
    ${1} | ${true}  | ${false}
  `(
    "a w of $w indicates that the tuple is a point: $isPoint or a vector: $isVector",
    ({ w, isPoint, isVector }) => {
      const tuple = new Tuple(1, 1, 1, w);
      expect(tuple.isPoint).toEqual(isPoint);
      expect(tuple.isVector).toEqual(isVector);
    }
  );

  describe("equal", () => {
    it("should return that the same tuple is equal", () => {
      const tuple = new Tuple(1, 2, 3, 1);
      expect(tuple.isEqual(tuple)).toEqual(true);
    });

    it("should return that a point and vector are not equal", () => {
      const tupleAsVector = new Tuple(1, 2, 3, 1);
      const tupleAsPoint = new Tuple(1, 2, 3, 0);
      expect(tupleAsVector.isEqual(tupleAsPoint)).toEqual(false);
    });
  });

  describe("add", () => {
    test.each`
      tupleA                    | tupleB                    | sum
      ${new Tuple(3, -2, 5, 1)} | ${new Tuple(-2, 3, 1, 0)} | ${new Tuple(1, 1, 6, 1)}
    `("$tupleA + $tupleB should equal $sum", ({ tupleA, tupleB, sum }) => {
      expect(tupleA.add(tupleB)).toEqual(expect.objectContaining(sum));
    });
  });

  describe("subtract", () => {
    test.each`
      tupleA                | tupleB                | result
      ${new Tuple(3, 2, 1)} | ${new Tuple(5, 6, 7)} | ${new Tuple(-2, -4, -6)}
    `(
      "$tupleA - $tupleB should equal $result",
      ({ tupleA, tupleB, result }) => {
        expect(tupleA.subtract(tupleB)).toEqual(
          expect.objectContaining(result)
        );
      }
    );
  });

  describe("negate", () => {
    test.each`
      tuple                           | result
      ${new Tuple(0, 0, 0, 0)}        | ${new Tuple(0, 0, 0, 0)}
      ${new Tuple(1, 1, 1, 1)}        | ${new Tuple(-1, -1, -1, -1)}
      ${new Tuple(-1, -1, -1, -1)}    | ${new Tuple(1, 1, 1, 1)}
      ${new Tuple(1.1, 1.2, 1.33, 0)} | ${new Tuple(-1.1, -1.2, -1.33, 0)}
    `("-($tuple) should equal $result", ({ tuple, result }) => {
      expect(tuple.negate()).toEqual(expect.objectContaining(result));
    });
  });

  describe("multiply", () => {
    test.each`
      tuple                    | multiplier | result
      ${new Tuple(0, 0, 0, 0)} | ${0}       | ${new Tuple(0, 0, 0, 0)}
      ${new Tuple(1, 1, 1, 1)} | ${-1}      | ${new Tuple(-1, -1, -1, -1)}
      ${new Tuple(1, 1, 1, 1)} | ${4}       | ${new Tuple(4, 4, 4, 4)}
      ${new Tuple(1, 1, 1, 1)} | ${4.54}    | ${new Tuple(4.54, 4.54, 4.54, 4.54)}
      ${new Tuple(1, 1, 1, 1)} | ${0.4}     | ${new Tuple(0.4, 0.4, 0.4, 0.4)}
    `(
      "multiplying a tuple: $tuple by $multiplier should equal $result",
      ({ tuple, multiplier, result }) => {
        expect(tuple.multiply(multiplier)).toEqual(
          expect.objectContaining(result)
        );
      }
    );
  });

  describe("divide", () => {
    test.each`
      tuple                    | divisor | result
      ${new Tuple(0, 0, 0, 0)} | ${0}    | ${new Tuple(0, 0, 0, 0)}
      ${new Tuple(1, 1, 1, 1)} | ${-1}   | ${new Tuple(-1, -1, -1, -1)}
      ${new Tuple(1, 1, 1, 1)} | ${4}    | ${new Tuple(0.25, 0.25, 0.25, 0.25)}
      ${new Tuple(1, 1, 1, 1)} | ${0.4}  | ${new Tuple(2.5, 2.5, 2.5, 2.5)}
    `(
      "dividing tuple: $tuple by $divisor should equal $result",
      ({ tuple, divisor, result }) => {
        expect(tuple.divide(divisor)).toEqual(expect.objectContaining(result));
      }
    );
  });
});
