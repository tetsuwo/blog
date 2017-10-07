document.addEventListener('DOMContentLoaded', function(event) {
    var elements = document.querySelectorAll('.language-sequence');

    _.forEach(elements, function(el) {
        var diagramText = el.innerText;
        console.log(el.tagName, diagramText);
        var diagram = Diagram.parse(diagramText);

        var div = document.createElement('div');

        var parentNode = el.parentElement.parentNode;
        parentNode.replaceChild(div, el.parentElement);

        diagram.drawSVG(div, { theme: 'simple' });
    });
});
