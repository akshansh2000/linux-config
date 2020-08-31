class SynonymsCard{constructor(t,e,n,s,i,o){this.MAX_SYNONYMS_PER_ROW=4,this._renderOutsideIframe=!1,this._destroyed=!1,this._inputArea=t,this._targetBoxes=e,this._wordContext=n,this._language=s,this._motherLanguage=i,this._hasSubscription=o,this.selection={start:n.position.start,end:n.position.end||n.position.start},this._referenceArea=t,this._document=this._inputArea.ownerDocument;const a=getFrameElement(window);a&&this._inputArea===this._inputArea.ownerDocument.body&&isLTAvailable(window.parent)&&(this._referenceArea=a,this._document=this._referenceArea.ownerDocument,this._renderOutsideIframe=!0,this._onUnload=bindAndCatch(this._onUnload,this),window.addEventListener("pagehide",this._onUnload,!0)),this._domMeasurement=new DomMeasurement(this._document),this._eventListeners=[],this._loadSynonyms()}static _cacheMessages(){SynonymsCard.MESSAGES={HEADLINE:i18nManager.getMessage("synonymsCardHeadline"),LOADING:i18nManager.getMessage("synonymsCardLoading"),ERROR:i18nManager.getMessage("synonymsCardGeneralError"),NO_SYNONYMS_FOUND:i18nManager.getMessage("synonymsCardNoSynonymsAvailable"),LANGUAGE_NOT_SUPPORTED:i18nManager.getMessage("synonymsCardLanguageNotSupported")}}static _constructor(){SynonymsCard._isInitialized||(SynonymsCard._cacheMessages(),i18nManager.addEventListener(i18nManagerClass.eventNames.localeChanged,SynonymsCard._cacheMessages.bind(SynonymsCard)),SynonymsCard._isInitialized=!0)}_renderContainer(){if(this._container||this._destroyed)return;this._container=this._document.createElement(SynonymsCard.CONTAINER_ELEMENT_NAME),this._container.setAttribute("contenteditable","false"),this._container.addEventListener("click",t=>t.stopPropagation()),this._eventListeners.push(addUseCaptureEvent(document,"keydown",this._onKeyDown.bind(this)),addUseCaptureEvent(this._container,"mousedown",t=>{t.stopImmediatePropagation(),t.target&&!t.target.closest(".lt-synonymscard__synonym-title, .lt-card__headline")&&t.preventDefault()}),addUseCaptureEvent(this._container,"mouseup",t=>t.stopImmediatePropagation()),addUseCaptureEvent(this._container,"pointerdown",t=>t.stopImmediatePropagation()),addUseCaptureEvent(this._container,"pointerup",t=>t.stopImmediatePropagation())),this._innerContainer=this._document.createElement("lt-div"),this._innerContainer.classList.add("lt-card__container"),this._innerContainer.classList.add("notranslate");const t=this._document.createElement("lt-span");t.className="lt-card__close-button",this._eventListeners.push(addUseCaptureEvent(t,"click",this._onCloseClicked.bind(this))),this._innerContainer.appendChild(t),this._renderContent(this._innerContainer),this._container.appendChild(this._innerContainer),("BODY"===this._referenceArea.nodeName?this._document.documentElement:this._document.body).appendChild(this._container),this._position()}_position(){if(!this._innerContainer)return;const t=Object.assign({},this._targetBoxes.sort((t,e)=>t.width>e.width?-1:1)[0]);if(!t)return;this._domMeasurement.clearCache();const e=this._domMeasurement.getDocumentVisibleBox(),n=this._domMeasurement.getBorderBox(this._innerContainer);if(this._renderOutsideIframe){let e=document.createElement("lt-span");e.style.position="absolute",e.style.left=t.left+"px",e.style.top=t.top+"px",document.documentElement.appendChild(e);const n=e.getBoundingClientRect();e.remove(),e=null;const s=new DomMeasurement(this._document).getContentBox(this._referenceArea);t.left=s.left+n.left,t.top=s.top+n.top,t.bottom=s.top+n.top+t.height,t.right=s.left+n.left+t.width}let s=Math.min(t.left,e.width-n.width),i=t.bottom+5;i+n.height>e.bottom&&(i=Math.max(e.top,t.top-n.height-5)),this._innerContainer.style.left=s+"px",this._innerContainer.style.top=i+"px"}_setMessage(t){if(this._content){const e=this._document.createElement("lt-div");e.classList.add("lt-synonymscard__message"),e.textContent=t,this._content.innerHTML="",this._content.appendChild(e)}}_loadSynonyms(){if(-1===config.SUPPORTED_SYNONYM_LANGUAGES.indexOf(this._language))return this._renderContainer(),void this._setMessage(SynonymsCard.MESSAGES.LANGUAGE_NOT_SUPPORTED);const t=Date.now(),e=window.setTimeout(this._renderContainer.bind(this),400);EnvironmentAdapter.loadSynonyms(this._wordContext,this._language,this._motherLanguage).then(n=>{window.clearTimeout(e);const s=Date.now()-t;return wait(Math.max(0,400-s),n)}).then(t=>{this._destroyed||(this._renderContainer(),this._renderSynonyms(t))}).catch(t=>{this._destroyed||(window.clearTimeout(e),this._renderContainer(),this._setMessage(SynonymsCard.MESSAGES.ERROR),Tracker.trackEvent("Other-Error","synonym_card:load_failed",t&&t.message))})}_renderContent(t){const e=this._document.createElement("lt-div");e.classList.add("lt-card__headline"),e.textContent=SynonymsCard.MESSAGES.HEADLINE,t.appendChild(e);const n=this._document.createElement("lt-span");n.classList.add("lt-card__beta-sign"),n.textContent="Beta",e.appendChild(n),this._content=this._document.createElement("lt-div"),this._content.classList.add("lt-synonymscard__content"),this._setMessage(SynonymsCard.MESSAGES.LOADING),t.appendChild(this._content);const s=this._document.createElement("lt-div");s.classList.add("lt-card__footer"),t.appendChild(s);const i=this._document.createElement("lt-div");i.classList.add("lt-card__logo"),s.appendChild(i),this._eventListeners.push(addUseCaptureEvent(i,"click",this._onLogoClicked.bind(this)));const o=this._document.createElement("lt-div");o.classList.add("lt-card__badge-container"),s.appendChild(o);const a=this._document.createElement("lt-div");a.classList.add("lt-card__name"),a.textContent="LanguageTool",o.appendChild(a);const d=this._document.createElement("lt-div");this._hasSubscription?(d.classList.add("lt-card__badge--premium"),d.textContent="Premium"):(d.classList.add("lt-card__badge--basic"),d.textContent="Basic"),o.appendChild(d),this._eventListeners.push(addUseCaptureEvent(d,"click",this._onBadgeClicked.bind(this)))}_renderSynonyms(t){if(!this._content)return;const e=t.synonymSets;if(e.length){if(this._content.innerHTML="",e.forEach(t=>{const e=this._document.createElement("lt-div");e.classList.add("lt-synonymscard__row");const n=this._document.createElement("lt-div");if(n.classList.add("lt-synonymscard__synonym-title"),n.textContent=t.title,e.appendChild(n),t.synonyms.forEach(t=>{const n=this._document.createElement("lt-div");n.classList.add("lt-synonymscard__synonym"),n.textContent=t.word,this._eventListeners.push(addUseCaptureEvent(n,"click",this._onSynonymClick.bind(this,t.word))),t.hints.forEach(t=>{const e=this._document.createElement("lt-span");e.classList.add("lt-card__hint"),e.textContent=t,n.appendChild(e)}),e.appendChild(n)}),t.synonyms.length>this.MAX_SYNONYMS_PER_ROW){e.classList.add("lt-synonymscard__row__limited");const t=this._document.createElement("lt-div");t.classList.add("lt-synonymscard__row__expand"),t.textContent="…",this._eventListeners.push(addUseCaptureEvent(t,"click",this._onShowMoreClick.bind(this))),e.appendChild(t)}this._content.appendChild(e)}),"de"!==this._language&&this._content.lastElementChild){const e=this._document.createElement("lt-div");e.classList.add("lt-synonymscard__info-text"),e.innerHTML="Source: ";const n=this._document.createElement("lt-span");n.textContent=t.dataSource.sourceName,e.appendChild(n),this._eventListeners.push(addUseCaptureEvent(n,"click",e=>{e.stopImmediatePropagation(),window.open(t.dataSource.sourceUrl,"_blank")})),this._content.lastElementChild.appendChild(e)}this._position()}else this._setMessage(SynonymsCard.MESSAGES.NO_SYNONYMS_FOUND)}_onSynonymClick(t,e){e.stopImmediatePropagation();const n={synonymsCard:this,synonym:t,word:this._wordContext.word.trim(),selection:this.selection};dispatchCustomEvent(document,SynonymsCard.eventNames.synonymSelected,n)}_onShowMoreClick(t){if(!(t.target instanceof HTMLElement&&this._content))return;const e=t.target.closest(".lt-synonymscard__row");e&&(e.classList.add("lt-synonymscard__row--expanded"),this._position())}_onBadgeClicked(t){t.stopImmediatePropagation();const e={synonymsCard:this};dispatchCustomEvent(document,SynonymsCard.eventNames.badgeClicked,e)}_onLogoClicked(t){t.stopImmediatePropagation();const e={synonymsCard:this};dispatchCustomEvent(document,SynonymsCard.eventNames.logoClicked,e)}_onCloseClicked(t){t.stopImmediatePropagation(),this.destroy()}_onKeyDown(t){"Escape"===t.key&&(this.destroy(),t.stopImmediatePropagation())}_onUnload(){this.destroy()}destroy(){this._destroyed=!0,this._container&&(this._container.remove(),this._container=null);const t={synonymsCard:this,word:this._wordContext.word.trim()};dispatchCustomEvent(document,SynonymsCard.eventNames.destroyed,t),window.removeEventListener("pagehide",this._onUnload,!0),this._eventListeners.forEach(t=>{t.destroy()}),this._eventListeners=[]}}SynonymsCard.CONTAINER_ELEMENT_NAME="lt-card",SynonymsCard.eventNames={synonymSelected:"lt-synonymsCard.synonymSelected",badgeClicked:"lt-synonymsCard.badgeClicked",logoClicked:"lt-synonymsCard.logoClicked",destroyed:"lt-synonymsCard.destroyed"},SynonymsCard._isInitialized=!1,SynonymsCard._constructor();