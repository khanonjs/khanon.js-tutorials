export class HTMLController {
  private static loadingBackground: HTMLElement
  private static loadingScreen: HTMLElement

  /**
   * Get HTHML elements
   */
  static initialize() {
    HTMLController.loadingBackground = window.document.getElementById('loading-background')
    HTMLController.loadingScreen = window.document.getElementById('loading')
  }

  /**
   * Show loading spinner with a specific class
   */
  static showLoading(_class: string) {
    HTMLController.loadingBackground.style.display = 'flex'
    HTMLController.loadingScreen.className = ''
    HTMLController.loadingScreen.classList.add(_class)
  }

  /**
   * Hide loading spinner
   */
  static hideLoading() {
    HTMLController.loadingBackground.style.display = 'none'
  }
}
