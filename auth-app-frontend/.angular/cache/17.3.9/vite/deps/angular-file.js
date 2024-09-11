import {
  CommonModule
} from "./chunk-S43UIT6S.js";
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  InputFlags,
  IterableDiffers,
  NgModule,
  Output,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵlistener
} from "./chunk-3QEE4RPL.js";
import "./chunk-664N5FMB.js";
import "./chunk-JND6LT5A.js";
import "./chunk-532FTKWE.js";
import "./chunk-J4B6MK7R.js";

// node_modules/angular-file/fesm2020/angular-file.mjs
function getWindow() {
  return window;
}
function acceptType(accept, type, name) {
  if (!accept) {
    return true;
  }
  const defs = accept.split(",");
  let regx;
  let acceptRegString;
  for (let x = defs.length - 1; x >= 0; --x) {
    acceptRegString = defs[x];
    acceptRegString = acceptRegString.replace(/(^\s+|\s+$)/g, "");
    acceptRegString = acceptRegString.replace(/\*/g, ".*");
    regx = new RegExp(acceptRegString, "gi");
    if (type.search(regx) >= 0) {
      return true;
    }
    if (acceptRegString.substring(0, 1) == ".") {
      acceptRegString = "\\" + acceptRegString;
      regx = new RegExp(acceptRegString + "$", "i");
      if ((name || type).search(regx) >= 0) {
        return true;
      }
    }
  }
  return false;
}
function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
function dataUrltoBlob(dataurl, name, origSize) {
  var arr = dataurl.split(",");
  var mimeMatch = arr[0].match(/:(.*?);/);
  var mime = mimeMatch ? mimeMatch[1] : "text/plain";
  var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  var blob = new window.Blob([u8arr], {
    type: mime
  });
  blob["name"] = name;
  blob["$ngfOrigSize"] = origSize;
  return blob;
}
function applyTransform(ctx, orientation, width, height) {
  switch (orientation) {
    case 2:
      return ctx.transform(-1, 0, 0, 1, width, 0);
    case 3:
      return ctx.transform(-1, 0, 0, -1, width, height);
    case 4:
      return ctx.transform(1, 0, 0, -1, 0, height);
    case 5:
      return ctx.transform(0, 1, 1, 0, 0, 0);
    case 6:
      return ctx.transform(0, 1, -1, 0, height, 0);
    case 7:
      return ctx.transform(0, -1, -1, 0, height, width);
    case 8:
      return ctx.transform(0, -1, 1, 0, 0, width);
  }
}
function fixFileOrientationByMeta(file, result) {
  return dataUrl(file, true).then((url) => {
    var canvas = document.createElement("canvas");
    var img = document.createElement("img");
    return new Promise(function(res, rej) {
      img.onload = function() {
        try {
          canvas.width = result.orientation > 4 ? img.height : img.width;
          canvas.height = result.orientation > 4 ? img.width : img.height;
          var ctx = canvas.getContext("2d");
          applyTransform(ctx, result.orientation, img.width, img.height);
          ctx.drawImage(img, 0, 0);
          var dataUrl2 = canvas.toDataURL(file.type || "image/WebP", 0.934);
          const base = arrayBufferToBase64(result.fixedArrayBuffer);
          dataUrl2 = restoreExif(base, dataUrl2);
          var blob = dataUrltoBlob(dataUrl2, file.name);
          const newFile = blobToFile(blob, file.name);
          res(newFile);
        } catch (e) {
          rej(e);
        }
      };
      img.onerror = rej;
      img.src = url;
    });
  });
}
function applyExifRotation(file) {
  if (file.type.indexOf("image/jpeg") !== 0) {
    return Promise.resolve(file);
  }
  return readOrientation(file).then((result) => {
    if (result.orientation < 2 || result.orientation > 8) {
      return file;
    }
    return fixFileOrientationByMeta(file, result);
  });
}
function readOrientation(file) {
  return new Promise((res, rej) => {
    var reader = new FileReader();
    var slicedFile = file.slice ? file.slice(0, 64 * 1024) : file;
    reader.readAsArrayBuffer(slicedFile);
    reader.onerror = rej;
    reader.onload = function(e) {
      var result = {
        orientation: 1
      };
      var view = new DataView(this.result);
      if (view.getUint16(0, false) !== 65496)
        return res(result);
      var length = view.byteLength, offset = 2;
      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 65505) {
          if (view.getUint32(offset += 2, false) !== 1165519206)
            return res(result);
          var little = view.getUint16(offset += 6, false) === 18761;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + i * 12, little) === 274) {
              var orientation = view.getUint16(offset + i * 12 + 8, little);
              if (orientation >= 2 && orientation <= 8) {
                view.setUint16(offset + i * 12 + 8, 1, little);
                result.fixedArrayBuffer = e.target.result;
              }
              result.orientation = orientation;
              return res(result);
            }
        } else if ((marker & 65280) !== 65280)
          break;
        else
          offset += view.getUint16(offset, false);
      }
      return res(result);
    };
  });
}
function dataUrl(file, disallowObjectUrl) {
  if (!file)
    return Promise.resolve(file);
  if (disallowObjectUrl && file.$ngfDataUrl != null || !disallowObjectUrl && file.$ngfBlobUrl != null) {
    return Promise.resolve(disallowObjectUrl ? file.$ngfDataUrl : file.$ngfBlobUrl);
  }
  var p = disallowObjectUrl ? file.$$ngfDataUrlPromise : file.$$ngfBlobUrlPromise;
  if (p)
    return p;
  const win = getWindow();
  let deferred;
  if (win.FileReader && file && (!win.FileAPI || navigator.userAgent.indexOf("MSIE 8") === -1 || file.size < 2e4) && (!win.FileAPI || navigator.userAgent.indexOf("MSIE 9") === -1 || file.size < 4e6)) {
    var URL = win.URL || win.webkitURL;
    if (FileReader) {
      deferred = new Promise((res, rej) => {
        var fileReader = new FileReader();
        fileReader.onload = function(event) {
          file.$ngfDataUrl = event.target.result;
          delete file.$ngfDataUrl;
          res(event.target.result);
        };
        fileReader.onerror = function(e) {
          file.$ngfDataUrl = "";
          rej(e);
        };
        fileReader.readAsDataURL(file);
      });
    } else {
      var url;
      try {
        url = URL.createObjectURL(file);
      } catch (e) {
        return Promise.reject(e);
      }
      deferred = Promise.resolve(url);
      file.$ngfBlobUrl = url;
    }
  } else {
    file[disallowObjectUrl ? "$ngfDataUrl" : "$ngfBlobUrl"] = "";
    return Promise.reject(new Error("Browser does not support window.FileReader, window.FileReader, or window.FileAPI"));
  }
  if (disallowObjectUrl) {
    p = file.$$ngfDataUrlPromise = deferred;
  } else {
    p = file.$$ngfBlobUrlPromise = deferred;
  }
  p = p.then((x) => {
    delete file[disallowObjectUrl ? "$$ngfDataUrlPromise" : "$$ngfBlobUrlPromise"];
    return x;
  });
  return p;
}
function restoreExif(orig, resized) {
  var ExifRestorer = {
    KEY_STR: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  };
  ExifRestorer.encode64 = function(input) {
    var output = "", chr1, chr2, chr3 = "", enc1, enc2, enc3, enc4 = "", i = 0;
    do {
      chr1 = input[i++];
      chr2 = input[i++];
      chr3 = input[i++];
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + this.KEY_STR.charAt(enc1) + this.KEY_STR.charAt(enc2) + this.KEY_STR.charAt(enc3) + this.KEY_STR.charAt(enc4);
      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output;
  };
  ExifRestorer.restore = function(origFileBase64, resizedFileBase64) {
    if (origFileBase64.match("data:image/jpeg;base64,")) {
      origFileBase64 = origFileBase64.replace("data:image/jpeg;base64,", "");
    }
    var rawImage = this.decode64(origFileBase64);
    var segments = this.slice2Segments(rawImage);
    var image = this.exifManipulation(resizedFileBase64, segments);
    return "data:image/jpeg;base64," + this.encode64(image);
  };
  ExifRestorer.exifManipulation = function(resizedFileBase64, segments) {
    var exifArray = this.getExifArray(segments), newImageArray = this.insertExif(resizedFileBase64, exifArray);
    return new Uint8Array(newImageArray);
  };
  ExifRestorer.getExifArray = function(segments) {
    var seg;
    for (var x = 0; x < segments.length; x++) {
      seg = segments[x];
      if (seg[0] === 255 && seg[1] === 225) {
        return seg;
      }
    }
    return [];
  };
  ExifRestorer.insertExif = function(resizedFileBase64, exifArray) {
    var imageData = resizedFileBase64.replace("data:image/jpeg;base64,", ""), buf = this.decode64(imageData), separatePoint = buf.indexOf(255, 3), mae = buf.slice(0, separatePoint), ato = buf.slice(separatePoint), array = mae;
    array = array.concat(exifArray);
    array = array.concat(ato);
    return array;
  };
  ExifRestorer.slice2Segments = function(rawImageArray) {
    var head = 0, segments = [];
    while (1) {
      if (rawImageArray[head] === 255 && rawImageArray[head + 1] === 218) {
        break;
      }
      if (rawImageArray[head] === 255 && rawImageArray[head + 1] === 216) {
        head += 2;
      } else {
        var length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
        var endPoint = head + length + 2;
        var seg = rawImageArray.slice(head, endPoint);
        segments.push(seg);
        head = endPoint;
      }
      if (head > rawImageArray.length) {
        break;
      }
    }
    return segments;
  };
  ExifRestorer.decode64 = function(input) {
    var chr1, chr2, chr3 = "", enc1, enc2, enc3, enc4 = "", i = 0, buf = [];
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
      console.log("There were invalid base64 characters in the input text.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
      enc1 = this.KEY_STR.indexOf(input.charAt(i++));
      enc2 = this.KEY_STR.indexOf(input.charAt(i++));
      enc3 = this.KEY_STR.indexOf(input.charAt(i++));
      enc4 = this.KEY_STR.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      buf.push(chr1);
      if (enc3 !== 64) {
        buf.push(chr2);
      }
      if (enc4 !== 64) {
        buf.push(chr3);
      }
      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return buf;
  };
  return ExifRestorer.restore(orig, resized);
}
function blobToFile(theBlob, fileName) {
  var b = theBlob;
  b.lastModifiedDate = /* @__PURE__ */ new Date();
  b.name = fileName;
  return theBlob;
}
var ngfBackground = class {
  constructor(ElementRef2) {
    this.ElementRef = ElementRef2;
  }
  ngOnChanges(_changes) {
    dataUrl(this.file).then((src) => {
      const urlString = "url('" + (src || "") + "')";
      this.ElementRef.nativeElement.style.backgroundImage = urlString;
    });
  }
};
ngfBackground.ɵfac = function ngfBackground_Factory(t) {
  return new (t || ngfBackground)(ɵɵdirectiveInject(ElementRef));
};
ngfBackground.ɵdir = ɵɵdefineDirective({
  type: ngfBackground,
  selectors: [["", "ngfBackground", ""]],
  inputs: {
    file: [InputFlags.None, "ngfBackground", "file"]
  },
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ngfBackground, [{
    type: Directive,
    args: [{
      selector: "[ngfBackground]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, {
    file: [{
      type: Input,
      args: ["ngfBackground"]
    }]
  });
})();
var isFileInput = function(elm) {
  const ty = elm.getAttribute("type");
  return elm.tagName.toLowerCase() === "input" && ty && ty.toLowerCase() === "file";
};
var initialTouchStartY = 0;
var initialTouchStartX = 0;
var detectSwipe = function(evt) {
  var touches = evt.changedTouches || evt.originalEvent && evt.originalEvent.changedTouches;
  if (touches) {
    if (evt.type === "touchstart") {
      initialTouchStartX = touches[0].clientX;
      initialTouchStartY = touches[0].clientY;
      return true;
    } else {
      if (evt.type === "touchend") {
        var currentX = touches[0].clientX;
        var currentY = touches[0].clientY;
        if (Math.abs(currentX - initialTouchStartX) > 20 || Math.abs(currentY - initialTouchStartY) > 20) {
          evt.stopPropagation();
          if (evt.cancelable) {
            evt.preventDefault();
          }
          return false;
        }
      }
      return true;
    }
  }
  return false;
};
var createInvisibleFileInputWrap = function() {
  var fileElem = createFileInput();
  var label = document.createElement("label");
  label.innerHTML = "upload";
  label.style.visibility = "hidden";
  label.style.position = "absolute";
  label.style.overflow = "hidden";
  label.style.width = "0px";
  label.style.height = "0px";
  label.style.border = "none";
  label.style.margin = "0px";
  label.style.padding = "0px";
  label.setAttribute("tabindex", "-1");
  label.appendChild(fileElem);
  return label;
};
var createFileInput = function() {
  var fileElem = document.createElement("input");
  fileElem.type = "file";
  return fileElem;
};
var ngf = class {
  constructor(element) {
    this.element = element;
    this.filters = [];
    this.lastFileCount = 0;
    this.ngfFixOrientation = true;
    this.fileDropDisabled = false;
    this.selectable = false;
    this.directiveInit = new EventEmitter();
    this.lastInvalids = [];
    this.lastInvalidsChange = new EventEmitter();
    this.lastBaseUrlChange = new EventEmitter();
    this.fileChange = new EventEmitter();
    this.files = [];
    this.filesChange = new EventEmitter();
    this.fileSelectStart = new EventEmitter();
    this.initFilters();
  }
  initFilters() {
    this.filters.push({
      name: "accept",
      fn: this._acceptFilter
    });
    this.filters.push({
      name: "fileSize",
      fn: this._fileSizeFilter
    });
  }
  ngOnDestroy() {
    delete this.fileElm;
    this.destroyPasteListener();
  }
  ngOnInit() {
    const selectable = (this.selectable || this.selectable === "") && !["false", "null", "0"].includes(this.selectable);
    if (selectable) {
      this.enableSelecting();
    }
    if (this.multiple) {
      this.paramFileElm().setAttribute("multiple", this.multiple);
    }
    this.evalCapturePaste();
    setTimeout(() => {
      this.directiveInit.emit(this);
    }, 0);
  }
  ngOnChanges(changes) {
    if (changes.accept) {
      this.paramFileElm().setAttribute("accept", changes.accept.currentValue || "*");
    }
    if (changes.capturePaste) {
      this.evalCapturePaste();
    }
    if (changes.file && changes.file.previousValue && !changes.file.currentValue) {
      this.clearFileElmValue();
    }
    if (changes.files) {
      const filesWentToZero = changes.files.previousValue?.length && !changes.files.currentValue?.length;
      if (filesWentToZero) {
        this.clearFileElmValue();
      }
    }
  }
  evalCapturePaste() {
    const isActive = this.capturePaste || this.capturePaste === "" || ["false", "0", "null"].includes(this.capturePaste);
    if (isActive) {
      if (this.pasteCapturer) {
        return;
      }
      this.pasteCapturer = (e) => {
        const clip = e.clipboardData;
        if (clip && clip.files && clip.files.length) {
          this.handleFiles(clip.files);
          e.preventDefault();
        }
      };
      window.addEventListener("paste", this.pasteCapturer);
      return;
    }
    this.destroyPasteListener();
  }
  destroyPasteListener() {
    if (this.pasteCapturer) {
      window.removeEventListener("paste", this.pasteCapturer);
      delete this.pasteCapturer;
    }
  }
  paramFileElm() {
    if (this.fileElm)
      return this.fileElm;
    const isFile = isFileInput(this.element.nativeElement);
    if (isFile) {
      return this.fileElm = this.element.nativeElement;
    }
    return this.fileElm = this.createFileElm({
      change: this.changeFn.bind(this)
    });
  }
  /** Only used when host element we are attached to is NOT a fileElement */
  createFileElm({
    change
  }) {
    const label = createInvisibleFileInputWrap();
    const fileElm = label.getElementsByTagName("input")[0];
    fileElm.addEventListener("change", change);
    this.element.nativeElement.appendChild(label);
    return fileElm;
  }
  enableSelecting() {
    let elm = this.element.nativeElement;
    if (isFileInput(elm)) {
      const bindedHandler2 = (event) => this.beforeSelect(event);
      elm.addEventListener("click", bindedHandler2);
      elm.addEventListener("touchstart", bindedHandler2);
      return;
    }
    const bindedHandler = (ev) => this.clickHandler(ev);
    elm.addEventListener("click", bindedHandler);
    elm.addEventListener("touchstart", bindedHandler);
    elm.addEventListener("touchend", bindedHandler);
  }
  getValidFiles(files) {
    const rtn = [];
    for (let x = files.length - 1; x >= 0; --x) {
      if (this.isFileValid(files[x])) {
        rtn.push(files[x]);
      }
    }
    return rtn;
  }
  getInvalidFiles(files) {
    const rtn = [];
    for (let x = files.length - 1; x >= 0; --x) {
      let failReason = this.getFileFilterFailName(files[x]);
      if (failReason) {
        rtn.push({
          file: files[x],
          type: failReason
        });
      }
    }
    return rtn;
  }
  // Primary handler of files coming in
  handleFiles(files) {
    const valids = this.getValidFiles(files);
    if (files.length != valids.length) {
      this.lastInvalids = this.getInvalidFiles(files);
    } else {
      delete this.lastInvalids;
    }
    this.lastInvalidsChange.emit(this.lastInvalids);
    if (valids.length) {
      if (this.ngfFixOrientation) {
        this.applyExifRotations(valids).then((fixedFiles) => this.que(fixedFiles));
      } else {
        this.que(valids);
      }
    }
    if (this.isEmptyAfterSelection()) {
      this.element.nativeElement.value = "";
    }
  }
  que(files) {
    this.files = this.files || [];
    Array.prototype.push.apply(this.files, files);
    this.filesChange.emit(this.files);
    if (files.length) {
      this.fileChange.emit(this.file = files[0]);
      if (this.lastBaseUrlChange.observers.length) {
        dataUrl(files[0]).then((url) => this.lastBaseUrlChange.emit(url));
      }
    }
    this.lastFileCount = this.files.length;
  }
  /** called when input has files */
  changeFn(event) {
    var fileList = event.__files_ || event.target && event.target.files;
    if (!fileList)
      return;
    this.stopEvent(event);
    this.handleFiles(fileList);
  }
  clickHandler(evt) {
    const elm = this.element.nativeElement;
    if (elm.getAttribute("disabled") || this.fileDropDisabled) {
      return false;
    }
    var r = detectSwipe(evt);
    if (r !== false)
      return r;
    const fileElm = this.paramFileElm();
    fileElm.click();
    this.beforeSelect(evt);
    return false;
  }
  beforeSelect(event) {
    this.fileSelectStart.emit(event);
    if (this.files && this.lastFileCount === this.files.length)
      return;
    this.clearFileElmValue();
  }
  clearFileElmValue() {
    if (!this.fileElm)
      return;
    this.fileElm.value = null;
  }
  isEmptyAfterSelection() {
    return !!this.element.nativeElement.attributes.multiple;
  }
  stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  transferHasFiles(transfer) {
    if (!transfer.types) {
      return false;
    }
    if (transfer.types.indexOf) {
      return transfer.types.indexOf("Files") !== -1;
    } else if (transfer.types.contains) {
      return transfer.types.contains("Files");
    } else {
      return false;
    }
  }
  eventToFiles(event) {
    const transfer = eventToTransfer(event);
    if (transfer) {
      if (transfer.files && transfer.files.length) {
        return transfer.files;
      }
      if (transfer.items && transfer.items.length) {
        return transfer.items;
      }
    }
    return [];
  }
  applyExifRotations(files) {
    const mapper = (file, index) => {
      return applyExifRotation(file).then((fixedFile) => files.splice(index, 1, fixedFile));
    };
    const proms = [];
    for (let x = files.length - 1; x >= 0; --x) {
      proms[x] = mapper(files[x], x);
    }
    return Promise.all(proms).then(() => files);
  }
  onChange(event) {
    let files = this.element.nativeElement.files || this.eventToFiles(event);
    if (!files.length)
      return;
    this.stopEvent(event);
    this.handleFiles(files);
  }
  getFileFilterFailName(file) {
    for (let i = 0; i < this.filters.length; i++) {
      if (!this.filters[i].fn.call(this, file)) {
        return this.filters[i].name;
      }
    }
    return void 0;
  }
  isFileValid(file) {
    const noFilters = !this.accept && (!this.filters || !this.filters.length);
    if (noFilters) {
      return true;
    }
    return this.getFileFilterFailName(file) ? false : true;
  }
  isFilesValid(files) {
    for (let x = files.length - 1; x >= 0; --x) {
      if (!this.isFileValid(files[x])) {
        return false;
      }
    }
    return true;
  }
  _acceptFilter(item) {
    return acceptType(this.accept, item.type, item.name);
  }
  _fileSizeFilter(item) {
    return !(this.maxSize && item.size > this.maxSize);
  }
};
ngf.ɵfac = function ngf_Factory(t) {
  return new (t || ngf)(ɵɵdirectiveInject(ElementRef));
};
ngf.ɵdir = ɵɵdefineDirective({
  type: ngf,
  selectors: [["", "ngf", ""]],
  hostBindings: function ngf_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("change", function ngf_change_HostBindingHandler($event) {
        return ctx.onChange($event);
      });
    }
  },
  inputs: {
    multiple: "multiple",
    accept: "accept",
    maxSize: "maxSize",
    ngfFixOrientation: "ngfFixOrientation",
    fileDropDisabled: "fileDropDisabled",
    selectable: "selectable",
    lastInvalids: "lastInvalids",
    lastBaseUrl: "lastBaseUrl",
    file: "file",
    files: "files",
    capturePaste: "capturePaste"
  },
  outputs: {
    directiveInit: "init",
    lastInvalidsChange: "lastInvalidsChange",
    lastBaseUrlChange: "lastBaseUrlChange",
    fileChange: "fileChange",
    filesChange: "filesChange",
    fileSelectStart: "fileSelectStart"
  },
  exportAs: ["ngf"],
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ngf, [{
    type: Directive,
    args: [{
      selector: "[ngf]",
      exportAs: "ngf"
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, {
    multiple: [{
      type: Input
    }],
    accept: [{
      type: Input
    }],
    maxSize: [{
      type: Input
    }],
    ngfFixOrientation: [{
      type: Input
    }],
    fileDropDisabled: [{
      type: Input
    }],
    selectable: [{
      type: Input
    }],
    directiveInit: [{
      type: Output,
      args: ["init"]
    }],
    lastInvalids: [{
      type: Input
    }],
    lastInvalidsChange: [{
      type: Output
    }],
    lastBaseUrl: [{
      type: Input
    }],
    lastBaseUrlChange: [{
      type: Output
    }],
    file: [{
      type: Input
    }],
    fileChange: [{
      type: Output
    }],
    files: [{
      type: Input
    }],
    filesChange: [{
      type: Output
    }],
    fileSelectStart: [{
      type: Output
    }],
    capturePaste: [{
      type: Input
    }],
    onChange: [{
      type: HostListener,
      args: ["change", ["$event"]]
    }]
  });
})();
function filesToWriteableObject(files) {
  const jsonFiles = [];
  for (let x = 0; x < files.length; ++x) {
    jsonFiles.push({
      type: files[x].type,
      kind: files[x]["kind"]
    });
  }
  return jsonFiles;
}
function eventToTransfer(event) {
  if (event.dataTransfer)
    return event.dataTransfer;
  return event.originalEvent ? event.originalEvent.dataTransfer : null;
}
var ngfDrop = class extends ngf {
  constructor() {
    super(...arguments);
    this.fileOver = new EventEmitter();
    this.validDrag = false;
    this.validDragChange = new EventEmitter();
    this.invalidDrag = false;
    this.invalidDragChange = new EventEmitter();
    this.dragFilesChange = new EventEmitter();
  }
  onDrop(event) {
    if (this.fileDropDisabled) {
      this.stopEvent(event);
      return;
    }
    this.closeDrags();
    let files = this.eventToFiles(event);
    if (!files.length)
      return;
    this.stopEvent(event);
    this.handleFiles(files);
  }
  handleFiles(files) {
    this.fileOver.emit(false);
    super.handleFiles(files);
  }
  onDragOver(event) {
    if (this.fileDropDisabled) {
      this.stopEvent(event);
      return;
    }
    const transfer = eventToTransfer(event);
    let files = this.eventToFiles(event);
    let jsonFiles = filesToWriteableObject(files);
    this.dragFilesChange.emit(this.dragFiles = jsonFiles);
    if (files.length) {
      this.validDrag = this.isFilesValid(files);
    } else {
      this.validDrag = true;
    }
    this.validDragChange.emit(this.validDrag);
    this.invalidDrag = !this.validDrag;
    this.invalidDragChange.emit(this.invalidDrag);
    transfer.dropEffect = "copy";
    this.stopEvent(event);
    this.fileOver.emit(true);
  }
  closeDrags() {
    delete this.validDrag;
    this.validDragChange.emit(this.validDrag);
    this.invalidDrag = false;
    this.invalidDragChange.emit(this.invalidDrag);
    delete this.dragFiles;
    this.dragFilesChange.emit(this.dragFiles);
  }
  onDragLeave(event) {
    if (this.fileDropDisabled) {
      this.stopEvent(event);
      return;
    }
    this.closeDrags();
    if (this.element) {
      if (event.currentTarget === this.element[0]) {
        return;
      }
    }
    this.stopEvent(event);
    this.fileOver.emit(false);
  }
};
ngfDrop.ɵfac = /* @__PURE__ */ (() => {
  let ɵngfDrop_BaseFactory;
  return function ngfDrop_Factory(t) {
    return (ɵngfDrop_BaseFactory || (ɵngfDrop_BaseFactory = ɵɵgetInheritedFactory(ngfDrop)))(t || ngfDrop);
  };
})();
ngfDrop.ɵdir = ɵɵdefineDirective({
  type: ngfDrop,
  selectors: [["", "ngfDrop", ""]],
  hostBindings: function ngfDrop_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("drop", function ngfDrop_drop_HostBindingHandler($event) {
        return ctx.onDrop($event);
      })("dragover", function ngfDrop_dragover_HostBindingHandler($event) {
        return ctx.onDragOver($event);
      })("dragleave", function ngfDrop_dragleave_HostBindingHandler($event) {
        return ctx.onDragLeave($event);
      });
    }
  },
  inputs: {
    validDrag: "validDrag",
    invalidDrag: "invalidDrag",
    dragFiles: "dragFiles"
  },
  outputs: {
    fileOver: "fileOver",
    validDragChange: "validDragChange",
    invalidDragChange: "invalidDragChange",
    dragFilesChange: "dragFilesChange"
  },
  exportAs: ["ngfDrop"],
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ngfDrop, [{
    type: Directive,
    args: [{
      selector: "[ngfDrop]",
      exportAs: "ngfDrop"
    }]
  }], null, {
    fileOver: [{
      type: Output
    }],
    validDrag: [{
      type: Input
    }],
    validDragChange: [{
      type: Output
    }],
    invalidDrag: [{
      type: Input
    }],
    invalidDragChange: [{
      type: Output
    }],
    dragFiles: [{
      type: Input
    }],
    dragFilesChange: [{
      type: Output
    }],
    onDrop: [{
      type: HostListener,
      args: ["drop", ["$event"]]
    }],
    onDragOver: [{
      type: HostListener,
      args: ["dragover", ["$event"]]
    }],
    onDragLeave: [{
      type: HostListener,
      args: ["dragleave", ["$event"]]
    }]
  });
})();
var ngfSelect = class extends ngf {
  constructor() {
    super(...arguments);
    this.selectable = true;
  }
};
ngfSelect.ɵfac = /* @__PURE__ */ (() => {
  let ɵngfSelect_BaseFactory;
  return function ngfSelect_Factory(t) {
    return (ɵngfSelect_BaseFactory || (ɵngfSelect_BaseFactory = ɵɵgetInheritedFactory(ngfSelect)))(t || ngfSelect);
  };
})();
ngfSelect.ɵdir = ɵɵdefineDirective({
  type: ngfSelect,
  selectors: [["", "ngfSelect", ""]],
  inputs: {
    selectable: "selectable"
  },
  exportAs: ["ngfSelect"],
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ngfSelect, [{
    type: Directive,
    args: [{
      selector: "[ngfSelect]",
      exportAs: "ngfSelect"
    }]
  }], null, {
    selectable: [{
      type: Input
    }]
  });
})();
var ngfUploadStatus = class {
  constructor() {
    this.percent = 0;
    this.percentChange = new EventEmitter();
  }
  ngOnChanges(changes) {
    if (changes.httpEvent && changes.httpEvent.currentValue) {
      const event = changes.httpEvent.currentValue;
      if (event.loaded && event.total) {
        setTimeout(() => {
          this.percent = Math.round(100 * event.loaded / event.total);
          this.percentChange.emit(this.percent);
        }, 0);
      }
    }
  }
};
ngfUploadStatus.ɵfac = function ngfUploadStatus_Factory(t) {
  return new (t || ngfUploadStatus)();
};
ngfUploadStatus.ɵdir = ɵɵdefineDirective({
  type: ngfUploadStatus,
  selectors: [["ngfUploadStatus"]],
  inputs: {
    percent: "percent",
    httpEvent: "httpEvent"
  },
  outputs: {
    percentChange: "percentChange"
  },
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ngfUploadStatus, [{
    type: Directive,
    args: [{
      selector: "ngfUploadStatus"
    }]
  }], null, {
    percent: [{
      type: Input
    }],
    percentChange: [{
      type: Output
    }],
    httpEvent: [{
      type: Input
    }]
  });
})();
var ngfFormData = class {
  constructor(IterableDiffers2) {
    this.postName = "file";
    this.FormData = new FormData();
    this.FormDataChange = new EventEmitter();
    this.differ = IterableDiffers2.find([]).create();
  }
  ngDoCheck() {
    var changes = this.differ.diff(this.files);
    if (changes) {
      setTimeout(() => this.buildFormData(), 0);
    }
  }
  buildFormData() {
    const isArray = typeof this.files === "object" && this.files.constructor === Array;
    if (isArray) {
      this.FormData = new FormData();
      const files = this.files || [];
      files.forEach((file) => this.FormData.append(this.postName, file, this.fileName || file.name));
      this.FormDataChange.emit(this.FormData);
    } else {
      delete this.FormData;
    }
  }
};
ngfFormData.ɵfac = function ngfFormData_Factory(t) {
  return new (t || ngfFormData)(ɵɵdirectiveInject(IterableDiffers));
};
ngfFormData.ɵdir = ɵɵdefineDirective({
  type: ngfFormData,
  selectors: [["ngfFormData"]],
  inputs: {
    files: "files",
    postName: "postName",
    fileName: "fileName",
    FormData: "FormData"
  },
  outputs: {
    FormDataChange: "FormDataChange"
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ngfFormData, [{
    type: Directive,
    args: [{
      selector: "ngfFormData"
    }]
  }], function() {
    return [{
      type: IterableDiffers
    }];
  }, {
    files: [{
      type: Input
    }],
    postName: [{
      type: Input
    }],
    fileName: [{
      type: Input
    }],
    FormData: [{
      type: Input
    }],
    FormDataChange: [{
      type: Output
    }]
  });
})();
var ngfSrc = class {
  constructor(ElementRef2) {
    this.ElementRef = ElementRef2;
  }
  ngOnChanges(_changes) {
    dataUrl(this.file).then((src) => this.ElementRef.nativeElement.src = src);
  }
};
ngfSrc.ɵfac = function ngfSrc_Factory(t) {
  return new (t || ngfSrc)(ɵɵdirectiveInject(ElementRef));
};
ngfSrc.ɵdir = ɵɵdefineDirective({
  type: ngfSrc,
  selectors: [["", "ngfSrc", ""]],
  inputs: {
    file: [InputFlags.None, "ngfSrc", "file"]
  },
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ngfSrc, [{
    type: Directive,
    args: [{
      selector: "[ngfSrc]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, {
    file: [{
      type: Input,
      args: ["ngfSrc"]
    }]
  });
})();
var declarations = [ngfDrop, ngfSelect, ngfBackground, ngfSrc, ngfUploadStatus, ngfFormData, ngf];
var ngfModule = class {
};
ngfModule.ɵfac = function ngfModule_Factory(t) {
  return new (t || ngfModule)();
};
ngfModule.ɵmod = ɵɵdefineNgModule({
  type: ngfModule,
  declarations: [ngfDrop, ngfSelect, ngfBackground, ngfSrc, ngfUploadStatus, ngfFormData, ngf],
  imports: [
    CommonModule
    //,HttpModule
  ],
  exports: [ngfDrop, ngfSelect, ngfBackground, ngfSrc, ngfUploadStatus, ngfFormData, ngf]
});
ngfModule.ɵinj = ɵɵdefineInjector({
  imports: [
    CommonModule
    //,HttpModule
  ]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ngfModule, [{
    type: NgModule,
    args: [{
      imports: [
        CommonModule
        //,HttpModule
      ],
      declarations,
      exports: declarations
      //[HttpModule, ...declarations]
    }]
  }], null, null);
})();
export {
  ngf,
  ngfBackground,
  ngfDrop,
  ngfFormData,
  ngfModule,
  ngfSelect,
  ngfSrc,
  ngfUploadStatus
};
//# sourceMappingURL=angular-file.js.map
