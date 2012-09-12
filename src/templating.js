var EventEmitter = require('events').EventEmitter;
var events = new EventEmitter;

var dom = require('../../dom/src/dom.js');

function renderTemplate(templateObj, dataObj, mapObj, callback) {
	if (templateObj) {
		if (templateObj.html) {
			renderHtml(templateObj.html, dataObj, mapObj, callback);
			return;
		}
		events.emit('warning', [{ message: "templating.renderTemplate - templateObject has no supported content."}]);
		callback('');
	} else {
		events.emit('warning', [{message: "templating.renderTemplate - templateObject not available, template probably doesn't exist."}]);
		callback('');
	}
}

function renderHtml(html, data, mapObj, callback) {
	var doc = dom.createDocument(html);
	var className, i, l;
	for (className in mapObj) {
		if (mapObj.hasOwnProperty(className)) {
			var nodesToRender = doc.getElementsByClassName(className);
			for (i = 0, l = nodesToRender.length; i < l; i++) {
				renderNode(nodesToRender[i], data, mapObj[className]);
			}
		} // end if hasOwnProperty
	} // end for in
	callback(doc.toString());
}

function renderNode(node, data, map) {
	if (data instanceof Array) {
		renderNodeList(node, data, map);
	} else {
		renderSingleNode(node, data, map);
	}
}

function renderNodeList(node, data, map) {
	var i, l;
	var parentNode = node.parentNode;
	var nodeHtml = node.toString();
	var iteratorNode;
	for (i = 0, l = data.length; i < l; i++) {
		iteratorNode = dom.create(nodeHtml);
		dom.insertBefore(parentNode, iteratorNode, node);
		renderSingleNode(iteratorNode, data[i], map);
	}
	dom.removeChild(parentNode, node);
}

function renderSingleNode(node, data, map) {
	switch (typeof map) {
		case "string":
		case "function":
			mapDataToNodeContent(node, data, map);
			break;
		case "object":
			if (map.parts) {
				var className, renderNodes, i, l;
				for (className in map.parts) {
					if (map.parts.hasOwnProperty(className)) {
						renderNodes = node.getElementsByClassName(className);
						for (i = 0, l = renderNodes.length; i < l; i++) {
							renderSingleNode(renderNodes[i], data, map.parts[className]);
						}
					}
				}
			}
			if (map.content) {
				mapDataToNodeContent(node, data, map.content);
			}
			if (map.attributes) {
				mapDataToNodeAttributes(node, data, map.attributes);
			}
			break;
	}
}

function mapDataToNodeContent(elementNode, data, map) {
	var nodeContent = getDataValue(data, map);
	if (elementNode.ownerDocument instanceof dom.Node) {
		elementNode.childNodes = []; // TODO: improve this, use DOM API when ready
		elementNode.childNodes.push(elementNode.ownerDocument.createTextNode(nodeContent));
	} else {
		events.emit('warning', [{message: "templating.setElementContent - elementNode.ownerDocument not set."}]);
	}
}



/**
 * Private utility function for getting data values, raw or transformed;
 * if mapper is string, obtains corresponding data value;
 * if mapper is function, runs the function on data and returns the result.
 * @param data
 * @param mapper
 */
function getDataValue(data, mapper) {
	var value = "";
	switch (typeof mapper) {
		case "string":
			value = data[mapper];
			break;
		case "function":
			value = mapper(data);
			break;
	}
	if (typeof value === 'undefined') {
		return "";
	}
	return value;
}

function mapDataToNodeAttributes(elementNode, data, map) {
	var attrName, attrValue;
	for (attrName in map) {
		if (map.hasOwnProperty(attrName)) {
			attrValue = getDataValue(data, map[attrName]);
			if (attrValue !== "") {
				elementNode.setAttribute(attrName, attrValue);
			}
		} // end if hasOwnProperty
	} // end for in
}

exports.render = renderTemplate;

