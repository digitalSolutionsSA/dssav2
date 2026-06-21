// Set before navigating to the intro section so it knows which heading to start on
let _startIdx = 0
export const getIntroStart  = () => _startIdx
export const setIntroStart  = (idx: number) => { _startIdx = idx }
