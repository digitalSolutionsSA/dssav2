let _locked = false
export const isScrollLocked = () => _locked
export const lockScroll    = () => { _locked = true  }
export const unlockScroll  = () => { _locked = false }
