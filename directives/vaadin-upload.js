var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Polymer = window.Polymer;
var VaadinUpload = (function () {
    function VaadinUpload(el) {
        this._initialValueSet = false;
        this.filesChange = new core_1.EventEmitter(false);
        if (!Polymer || !Polymer.isInstance(el.nativeElement)) {
            console.error("vaadin-upload has not been imported yet, please remember to import vaadin-upload.html in your main HTML page.");
            return;
        }
        this._element = el.nativeElement;
        if (!Polymer.Settings.useShadow) {
            this._element.async(this._observeMutations.bind(this));
        }
    }
    VaadinUpload.prototype.fileschanged = function () {
        if (!this._initialValueSet) {
            this._initialValueSet = true;
            return;
        }
        this.filesChange.emit(this._element.files);
    };
    VaadinUpload.prototype._observeMutations = function () {
        var _this = this;
        var lightDom = Polymer.dom(this._element);
        var observerConfig = { childList: true, subtree: true };
        // Move all the misplaced nodes to light dom
        [].slice.call(this._element.childNodes, 0).forEach(function (child) {
            if (_this._isLightDomChild(child)) {
                lightDom.appendChild(child);
            }
        });
        // Add a mutation observer for further additions / removals
        var observer = new MutationObserver(function (mutations) {
            observer.disconnect();
            mutations.forEach(function (mutation) {
                [].forEach.call(mutation.addedNodes, function (added) {
                    if (_this._isLightDomChild(added) && added.parentElement === _this._element) {
                        lightDom.appendChild(added);
                    }
                });
                [].forEach.call(mutation.removedNodes, function (removed) {
                    if (lightDom.children.indexOf(removed) > -1) {
                        lightDom.removeChild(removed);
                    }
                });
            });
            setTimeout(function () {
                observer.observe(_this._element, observerConfig);
            }, 0);
        });
        observer.observe(this._element, observerConfig);
    };
    VaadinUpload.prototype._isLightDomChild = function (node) {
        return !node.tagName || !node.classList.contains('vaadin-upload');
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], VaadinUpload.prototype, "filesChange");
    Object.defineProperty(VaadinUpload.prototype, "fileschanged",
        __decorate([
            core_1.HostListener('files-changed'), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], VaadinUpload.prototype, "fileschanged", Object.getOwnPropertyDescriptor(VaadinUpload.prototype, "fileschanged")));
    VaadinUpload = __decorate([
        core_1.Directive({
            selector: 'vaadin-upload'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], VaadinUpload);
    return VaadinUpload;
})();
exports.VaadinUpload = VaadinUpload;
//# sourceMappingURL=vaadin-upload.js.map