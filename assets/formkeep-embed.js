//This is unused right now and added just in case it's needed.

(function loadPym() {
    if (!window.pym) {
      console.warn('You need to include pym for formkeep-embed to work');
      return;
    }
  
    const formkeepUrl = document.querySelector('#formkeep-embed').dataset.formkeepUrl;
    window.pymParent = new pym.Parent('formkeep-embed', formkeepUrl);
  
    trackeEmbedUsage(formkeepUrl);
  })();
  
  function trackeEmbedUsage(formkeepUrl) {
    const currentScript = document.currentScript || Array.from(document.scripts).pop();
  
    if (currentScript && !currentScript.src.includes("fastly.net")) {
      return;
    }
  
    if (!window.formkeepDeprecationLogged) {
      console.group("FormKeep Embed Script Deprecation Notice");
      console.warn("As of September 2024, https://formkeep-production-herokuapp-com.global.ssl.fastly.net/formkeep-embed.js is deprecated. Use the new location to avoid disruption of your embedded form: https://cdn.formkeep.com/formkeep-embed.js");
      console.groupEnd();
      window.formkeepDeprecationLogged = true;
    }
  }
  
  window.addEventListener('message', function (event) {
    var embedTarget = document.querySelector('#formkeep-embed');
  
    switch (event.data) {
      case 'formkeep-embed:submitting':
        var event = new Event(event.data);
        embedTarget.dispatchEvent(event);
        break;
      case 'formkeep-embed:submitted':
        var event = new Event(event.data);
        embedTarget.dispatchEvent(event);
        break;
    }
  }, false);