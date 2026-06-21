// When navigating back TO the hero from below, start fully zoomed out
let _startZoomed = false
export const getHeroStartZoomed = () => _startZoomed
export const setHeroStartZoomed = (v: boolean) => { _startZoomed = v }
