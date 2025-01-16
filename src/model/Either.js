export const Left   = x => f => g => f (x);
export const Right  = x => f => g => g (x);
export const either = e => f => g => e (f) (g);