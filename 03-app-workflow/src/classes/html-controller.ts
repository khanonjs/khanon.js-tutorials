export class HTMLController {
  private static loadingBackground: HTMLElement
  private static loadingScreen: HTMLElement

  static initialize() {
    HTMLController.loadingBackground = window.document.getElementById('loading-background')
    HTMLController.loadingScreen = window.document.getElementById('loading')
  }

  static showLoading(loader: string) {
    HTMLController.loadingBackground.style.display = 'flex'
    HTMLController.loadingScreen.className = ''
    HTMLController.loadingScreen.classList.add(loader)
  }

  static hideLoading() {
    HTMLController.loadingBackground.style.display = 'none'
  }
}
