import path from "path";
import Jimp from "jimp";
var utils = require('loader-utils');

type File = {
    size: string,
    filename: string,
    w: number,
    h: number;
}

type Size = { w: number, h: number, crop?: boolean };

type SizeList = Size[];

type Options = {
    filename: string,
    quality: number
}

function parseQuery(queryString: string): {
    [key: string]: string
} {
    var query: {
        [key: string]: any
    } = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function interpolateFilename(t: any, userPath: string, context: any, filename: string, content: any, size: string) {
    let x = userPath;
    x = x.replace("[filename]", filename);
    x = x.replace("[size]", size);

    return utils.interpolateName(t, x, { context, content });
}

function parseSize(input: string): Size {
    const regex = /(\d*)?x?(\d*)/
    const matches = input.match(regex);
    if (matches == null)
        throw new Error("Invalid size parameter");
    if (matches[2] == "") {
        return { w: parseInt(matches[1]), h: parseInt(matches[1]) };
    }
    return { w: parseInt(matches[1]), h: parseInt(matches[2]) };
}

module.exports = function (source: Buffer) {
    const context = this.rootContext;
    const filename = path.basename(this.resourcePath)
    const assetInfo = { sourceFilename: filename }
    
    const options: Options = {
        filename: "[name].[size].[contenthash].[ext]",
        quality: 80,
        ...this.getOptions()
    };

    if (this.resourceQuery != "") {
        var callback = this.async();

        const query = parseQuery(this.resourceQuery);
        const sizes: SizeList = query.sizes ? query.sizes.split(",").map(parseSize) : [{ w: 600, h: 600 }];

        const outputFilename = interpolateFilename(this, options.filename, context, filename, source, "full");

        // Add thumbnail promises
        const promises = sizes.map(size => Jimp.read(source).then(img => {
            img
                .autocrop()
                .scaleToFit(size.w, size.h, Jimp.RESIZE_BICUBIC)
                .quality(options.quality ?? 80);
            return img.getBufferAsync(Jimp.MIME_JPEG)
                .then((buffer: Buffer) => {
                    const thumbnailFilename = interpolateFilename(this, options.filename, context, filename, buffer, `${size.w}x${size.h}`);
                    this.emitFile(thumbnailFilename, buffer, null, assetInfo);
                    return { size: `${size.w}x${size.h}`, filename: `__webpack_public_path__ + "${thumbnailFilename}"`, w: img.bitmap.width, h: img.bitmap.height };
                });
        }));

        // Full size promise
        this.emitFile(outputFilename, source, null, assetInfo);
        promises.push(Jimp.read(source).then(img => ({ size: "full", filename: `__webpack_public_path__ + "${outputFilename}"`, w: img.bitmap.width, h: img.bitmap.height })));

        // Resolve and export
        Promise.all(promises).then(files => {
            callback(null, `module.exports = {
                ${files.map(file => `"${file.size}": {
                    filename: ${file.filename},
                    w: ${file.w},
                    h: ${file.h},
                }`).join(",")}
            };`);
        });
    } else {
        //var callback = this.async();
        const fullFilename = interpolateFilename(this, options.filename, context, filename, source, `full`);
        this.emitFile(fullFilename, source, null, assetInfo);
        return `module.exports = __webpack_public_path__  + "${fullFilename}";`
    }
}

module.exports.raw = true