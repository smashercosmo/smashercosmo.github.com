function dataURIEncode(b, a) {
    var c = btoa(b);
    return "data:" + a + ";base64," + c
}

function generateSVG(n, b) {
    var j;
    var k = "linear";
    var h = 'x="0" y="0" width="1" height="1"';

    switch (b) {
        case "horizontal":
            j = 'x1="0%" y1="0%" x2="100%" y2="0%"';
            break;
        case "vertical":
            j = 'x1="0%" y1="0%" x2="0%" y2="100%"';
            break;
        case "diagonal":
            j = 'x1="0%" y1="0%" x2="100%" y2="100%"';
            break;
        case "diagonal-bottom":
            j = 'x1="0%" y1="100%" x2="100%" y2="0%"';
            break;
        case "radial":
            k = "radial";
            j = 'cx="50%" cy="50%" r="75%"';
            h = 'x="-50" y="-50" width="101" height="101"';
            break
    }

    var a = "ucgg-generated";
    var f = [];
    f.push('<?xml version="1.0" ?>');
    f.push('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">');
    f.push("  <" + k + 'Gradient id="grad-' + a + '" gradientUnits="userSpaceOnUse" ' + j + ">");
    for (var d = 0; d < n.length; d++) {
        var c = n[d].color.toLowerCase();
        var g = n[d].opacity;
        var e = n[d].position;
        f.push('    <stop offset="' + e + '" stop-color="' + c + '" stop-opacity="' + g + '"/>')
    }
    f.push("  </" + k + "Gradient>");
    f.push("  <rect " + h + ' fill="url(#grad-' + a + ')" />');
    f.push("</svg>");
    f = f.join("\n");
    return f
}

function generateSVGRule(a, c) {
    var b = generateSVG(a, c);
    var d = dataURIEncode(b, "image/svg+xml");
    return "url(" + d + ")"
}

generateSVGRule();