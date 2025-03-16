export class HTMLController {
  private static loadingBackground: HTMLElement | null = null
  private static loadingScreen: HTMLElement | null = null

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
    if (HTMLController.loadingBackground && HTMLController.loadingScreen) {
      HTMLController.loadingBackground.style.display = 'flex'
      HTMLController.loadingScreen.className = ''
      HTMLController.loadingScreen.classList.add(_class)
    }
  }

  /**
   * Hide loading spinner
   */
  static hideLoading() {
    if (HTMLController.loadingBackground) {
      HTMLController.loadingBackground.style.display = 'none'
    }
  }
}
