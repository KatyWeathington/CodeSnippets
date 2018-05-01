//<script src="https://cdn.rawgit.com/eligrey/canvas-toBlob.js/f1a01896135ab378aa5c0    118eadd81da55e698d8/canvas-toBlob.js"></script>
//<script src="https://cdn.rawgit.com/eligrey/FileSaver.js/e9d941381475b5df8b7d76910    13401e171014e89/FileSaver.min.js"></script>
//<script src="https://d3js.org/d3.v5.min.js"></script>
function saveToPNG() {
        var width = d3.select('svg').attr('width');
        var height = d3.select('svg').attr('height');
        var svgString = getSVGString(d3.select('svg').node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
                saveas(dataBlob, 'SVGName.png')
        }
};

function getSVGString(svgNode) {
        svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
        var cssStyleText = getCSSStyles(svgNode);
        appendCSS(cssStyleText, svgNode);

        var serializer = new XMLSerializer();
        var svgString = serializer.serializeToString(svgNode);
        svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink=');     // Fix root xlink without namespace
        svgString = svgString.replace(/NS\d+:href/g, 'xlink:href');
        return svgString;
        function getCSSStyles(parentElement) {
                var selectorTextArr = [];

                // Add Parent element Id and Classes to the list
                selectorTextArr.push('#' + parentElement.id);
                for (var c = 0; c < parentElement.classList.length; c++)
                        if (!contains('.' + parentElement.classList[c], selectorTextArr))
                                selectorTextArr.push('.' + parentElement.classList[c]);

                // Add Children element Ids and Classes to the list
                var nodes = parentElement.getElementsByTagName("*");
                for (var i = 0; i < nodes.length; i++) {
                        var id = nodes[i].id;
                        if (!contains('#' + id, selectorTextArr))
                                selectorTextArr.push('#' + id);

                        var classes = nodes[i].classList;
                        for (var c = 0; c < classes.length; c++)
                                if (!contains('.' + classes[c], selectorTextArr))
                                        selectorTextArr.push('.' + classes[c]);
                }
                // Extract CSS Rules
                var extractedCSSText = "";
                for (var i = 0; i < document.styleSheets.length; i++) {
                        var s = document.styleSheets[i];

                        try {
                                if (!s.cssRules) continue;
                        } catch (e) {
                                if (e.name !== 'SecurityError') throw e; // for Firefox
                                continue;
                        }

                        var cssRules = s.cssRules;
                        for (var r = 0; r < cssRules.length; r++) {
                                if (contains(cssRules[r].selectorText, selectorTextArr))
                                        extractedCSSText += cssRules[r].cssText;
                        }
                }


                return extractedCSSText;

                function contains(str, arr) {
                        return arr.indexOf(str) === -1 ? false : true;
                }

        }

        function appendCSS(cssText, element) {
                var styleElement = document.createElement("style");
                styleElement.setAttribute("type", "text/css");
                styleElement.innerHTML = cssText;
                var refNode = element.hasChildNodes() ? element.children[0] : null;
                element.insertBefore(styleElement, refNode);
        }
}


function svgString2Image(svgString, width, height, format, callback) {
        var format = format ? format : 'png';
        var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));

        var canvas = document.createElement('canvas');
        var context = canvas.getContext("2d");

        canvas.width = d3.select
        canvas.height = d3.select('svg').select('svg').attr('height');

        var image = new Image();
        image.onload = function () {
                context.clearRect(0, 0, width, height);
                context.drawImage(image, 0, 0, width, height);

                canvas.toBlob(function (blob) {
                        var filesize = Math.round(blob.length / 1024) + ' KB';
                        if (callback) callback(blob, filesize);
                });

        };

        image.src = imgsrc;
};