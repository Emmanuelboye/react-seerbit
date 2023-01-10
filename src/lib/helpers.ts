export const loadScript = function(
  scriptUrl: string = '',
  scriptId: string = '',
  callback: Function | null = null,
  error: Function | null = null
) {
  const exists = document.getElementById(scriptId)

  if (!exists) {
    const script: any = document.createElement('script')
    script.src = scriptUrl
    script.id = scriptId
    script.async = true
    document.head.appendChild(script)
    if (script.readyState) {
      script.onreadystatechange = () => {
        if (
          script.readyState === 'loaded' ||
          script.readyState === 'complete'
        ) {
          script.onreadystatechange = null
          if (callback) callback(null)
        }
      }
    } else {
      script.onload = () => {
        if (callback) callback(null)
      }
      script.onerror = function() {
        if (error) error('Error loading ' + this.src)
      }
    }
  } else {
    if (callback) callback(null)
  }
}
// module.exports = {loadScript}
