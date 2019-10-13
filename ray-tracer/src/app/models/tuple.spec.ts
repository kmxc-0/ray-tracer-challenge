import { Tuple } from "./tuple";

describe("Tuple", () => {
  test.each`
    x            | y            | z            | w            | result
    ${null}      | ${null}      | ${null}      | ${null}      | ${{ x: 0, y: 0, z: 0, w: 0, isPoint: true, isVector: false }}
    ${undefined} | ${undefined} | ${undefined} | ${undefined} | ${{ x: 0, y: 0, z: 0, w: 0, isPoint: true, isVector: false }}
    ${0}         | ${0}         | ${0}         | ${0}         | ${{ x: 0, y: 0, z: 0, w: 0, isPoint: true, isVector: false }}
    ${0}         | ${0}         | ${0}         | ${1}         | ${{ x: 0, y: 0, z: 0, w: 1, isPoint: false, isVector: true }}
    ${1}         | ${1}         | ${1}         | ${1}         | ${{ x: 1, y: 1, z: 1, w: 1, isPoint: false, isVector: true }}
    ${NaN}       | ${NaN}       | ${NaN}       | ${NaN}       | ${{ x: 0, y: 0, z: 0, w: 0, isPoint: true, isVector: false }}
    ${-1}        | ${-1}        | ${-1}        | ${0}         | ${{ x: -1, y: -1, z: -1, w: 0, isPoint: true, isVector: false }}
    ${"1"}       | ${"1"}       | ${"1"}       | ${"1"}       | ${{ x: 0, y: 0, z: 0, w: 0, isPoint: true, isVector: false }}
  `(
    "should return Tuple: $result for x: $x, y: $y, z: $z, w: $w",
    ({ x, y, z, w, result }) => {
      expect(new Tuple(x, y, z, w)).toEqual({
        x: result.x,
        y: result.y,
        z: result.z,
        w: result.w,
        isPoint: result.isPoint,
        isVector: result.isVector
      });
    }
  );

  test.each`
    w      | isPoint  | isVector
    ${0}   | ${true}  | ${false}
    ${1}   | ${false} | ${true}
    ${"1"} | ${true}  | ${false}
  `(
    "a w of $w indicates that the tuple is a point: $isPoint or a vector: $isVector",
    ({ w, isPoint, isVector }) => {
      const tuple = new Tuple(1, 1, 1, w);
      expect(tuple.isPoint).toEqual(isPoint);
      expect(tuple.isVector).toEqual(isVector);
    }
  );
});
