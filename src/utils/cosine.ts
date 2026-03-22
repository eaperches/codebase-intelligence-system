/**
 * a dot b = mag(a)*mag(b)*cos(delta) = (Ax*Bx + Ay*By + Az*Bz)
 * -> cos(delta) = (a dot b) / (mag(a) * mag(b))
 * -> projection of A onto B = (A⋅B) / mag(B)
 * -> projection of B onto A = (A⋅B) / mag(A)
 *
 * if cos(delta) = 1, both vectors are the same orientation
 * if cos(delta) = 0, both vectors are orthogonal
 */
export function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  return dot / (magA * magB);
}
