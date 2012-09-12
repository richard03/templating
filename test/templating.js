var templating = require('../src/templating.js');

var tagData = {
	label: "My Label"
};

var linkData = {
	label: "My Label",
	url: "http://myurl.com"
};
var linkListData = [
	{ label: "My Label 1", url: "http://myurl1.com" },
	{ label: "My Label 2", url: "http://myurl2.com" }
];
var simpleMap = {
	"test": "label"
};
var widgetMap = {
	"testWidget": {
		parts: {
			"test": {
				content: "label",
				attributes:  {
					"href": "url"
				}
			}
		}
	}
};

exports.simple = function (test) {
	var template = { html: '<span class="test">{place label here}</span>' };
	templating.render(template, linkData, simpleMap, function (resultHtml) {
		var expectedHtml = '<span class="test">My Label</span>';
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.simpleList = function (test) {
	var template = { html: '<span class="test">{place label here}</span>' };
	templating.render(template, linkListData, simpleMap, function (resultHtml) {
		var expectedHtml = '<span class="test">My Label 1</span><span class="test">My Label 2</span>';
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.simpleMapExpanded = function (test) {
	var template = { html: '<span class="test">{place label here}</span>' };
	var map = {
		"test": { content: "label" }
	};
	templating.render(template, linkData, map, function (resultHtml) {
		var expectedHtml = '<span class="test">My Label</span>';
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.simpleMapExpandedList = function (test) {
	var template = { html: '<span class="test">{place label here}</span>' };
	var map = {
		"test": { content: "label" }
	};
	templating.render(template, linkListData, map, function (resultHtml) {
		var expectedHtml = '<span class="test">My Label 1</span><span class="test">My Label 2</span>';
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.simpleInTag = function (test) {
	var template = { html: '<div><span class="test">{place label here}</span></div>' };
	templating.render(template, tagData, simpleMap, function (resultHtml) {
		var expectedHtml = '<div><span class="test">My Label</span></div>';
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.simpleListInTag = function (test) {
	var template = { html: '<ul><li class="test">{place label here}</li></ul>' };
	templating.render(template, linkListData, simpleMap, function (resultHtml) {
		var expectedHtml = '<ul><li class="test">My Label 1</li><li class="test">My Label 2</li></ul>';
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};
/*
exports.simpleTagInside = function (test) {
	var template = { html: '<div>-</div><span class="test"><span>{place label here}</span></span><div>-</div>' };
	templating.render(template, tagData, simpleMap, function (resultHtml) {
		var expectedHtml = '<div>-</div><span class="test">My Label</span><div>-</div>';
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.simpleTagListInside = function (test) {
	var template = { html: '<div>-</div><span class="test"><span>{place label here}</span></span><div>-</div>' };
	templating.render(template, linkListData, simpleMap, function (resultHtml) {
		var expectedHtml = '<div>-</div><span class="test">My Label 1</span><span class="test">My Label 2</span><div>-</div>';
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};
*/
exports.twoTags = function (test) {
	var template = { html: [
		'<div>0</div>',
		'<span class="test"><span>{place label here}</span></span>',
		'<div>1</div>',
		'<div class="test">{place label here}</div>',
		'<div>2</div>'].join('')
	};
	templating.render(template, linkData, simpleMap, function (resultHtml) {
		var expectedHtml = [
			'<div>0</div>',
			'<span class="test">My Label</span>',
			'<div>1</div>',
			'<div class="test">My Label</div>',
			'<div>2</div>'].join('');
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.twoLists = function (test) {
	var template = { html: [
		'<div>0</div>',
		'<span class="test"><span>{place label here}</span></span>',
		'<div>1</div>',
		'<div class="test">{place label here}</div>',
		'<div>2</div>'].join('')
	};
	templating.render(template, linkListData, simpleMap, function (resultHtml) {
		var expectedHtml = [
			'<div>0</div>',
			'<span class="test">My Label 1</span>',
			'<span class="test">My Label 2</span>',
			'<div>1</div>',
			'<div class="test">My Label 1</div>',
			'<div class="test">My Label 2</div>',
			'<div>2</div>'].join('');
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.twoAttributes = function (test) {
	var template = { html: '<div><a class="test" href="{place url here}">{place label here}</a></div>' };
	var data = {
		label: "My Label",
		tooltip: "Click to continue",
		url: "http://myurl.com"
	};
	var map = {
		"test": {
			content: "label",
			attributes: {
				"href": "url",
				"title": "tooltip"
			}
		}
	};
	templating.render(template, data, map, function (resultHtml) {
		var expectedHtml = '<div><a class="test" href="http://myurl.com" title="Click to continue">My Label</a></div>';
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.listTwoAttributes = function (test) {
	var template = { html: '<div><a class="test" href="{place url here}">{place label here}</a></div>' };
	var data = [
		{ label: "My Label 1", tooltip: "Click Label 1 to continue", url: "http://myurl1.com" },
		{ label: "My Label 2", tooltip: "Click Label 2 to continue", url: "http://myurl2.com" }
	];
	var map = {
		"test": {
			content: "label",
			attributes: {
				"href": "url",
				"title": "tooltip"
			}
		}
	};
	templating.render(template, data, map, function (resultHtml) {
		var expectedHtml = [
			'<div>',
				'<a class="test" href="http://myurl1.com" title="Click Label 1 to continue">My Label 1</a>',
				'<a class="test" href="http://myurl2.com" title="Click Label 2 to continue">My Label 2</a>',
			'</div>'].join('');
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.incompleteMapping = function (test) {
	var template = { html: '<a class="test" href="{place url here}">more</a>' };
	var map = {
		"test": {
			attributes: {
				"href": "url"
			}
		}
	};
	templating.render(template, linkData, map, function (resultHtml) {
		var expectedHtml = '<a class="test" href="http://myurl.com">more</a>';
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.widget = function (test) {
	var templateHtml = [
		'<div>',
			'<div class="otherWidget"><span><a class="test" href="{do not replace}">{do not replace}</a></span></div>',
			'<div class="testWidget"><span><a class="test" href="{replace with url}">{replace with label}</a></span></div>',
		'</div>'
	].join('');

	var template = { html: templateHtml };
	templating.render(template, linkData, widgetMap, function (resultHtml) {
		var expectedHtml = [
			'<div>',
				'<div class="otherWidget"><span><a class="test" href="{do not replace}">{do not replace}</a></span></div>',
				'<div class="testWidget"><span><a class="test" href="http://myurl.com">My Label</a></span></div>',
			'</div>'
		].join('');
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.widgetList = function (test) {
	var templateHtml = [
		'<div>',
			'<div class="otherWidget"><span><a class="test" href="{do not replace}">{do not replace}</a></span></div>',
			'<div class="testWidget"><span><a class="test" href="{replace with url}">{replace with label}</a></span></div>',
		'</div>'
	].join('');

	var template = { html: templateHtml };
	templating.render(template, linkListData, widgetMap, function (resultHtml) {
		var expectedHtml = [
			'<div>',
				'<div class="otherWidget"><span><a class="test" href="{do not replace}">{do not replace}</a></span></div>',
				'<div class="testWidget"><span><a class="test" href="http://myurl1.com">My Label 1</a></span></div>',
				'<div class="testWidget"><span><a class="test" href="http://myurl2.com">My Label 2</a></span></div>',
			'</div>'
		].join('');
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.simpleList = function (test) {
	var template = { html: '<span class="test">{place tag here}</span>' };
	var map = {
		"tag": "label"
	};
	templating.render(template, linkListData, simpleMap, function (resultHtml) {
		var expectedHtml = [
				'<span class="test">My Label 1</span>',
				'<span class="test">My Label 2</span>'
		].join('');
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.simpleListWithAttributes = function (test) {
	var template = { html: '<a class="test" href="{place url here}">{place tag here}</a>' };
	var map = {
		"test": {
			content: "label",
			attributes: {
				"href": "url"
			}
		}
	};
	templating.render(template, linkListData, map, function (resultHtml) {
		var expectedHtml = [
			'<a class="test" href="http://myurl1.com">My Label 1</a>',
			'<a class="test" href="http://myurl2.com">My Label 2</a>'
		].join('');
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.list = function (test) {
	var template = { html: [
		'<ul class="testList">',
			'<li class="testListItem">',
				'<a class="testLink" href="{place url here}">',
					'<span class="testLabel">{place label here}</span> - ',
					'<span class="testUrl">{place url here}</span>',
				'</a>',
			'</li>',
		'</ul>'].join('')
	};
	var data = [
		{ label: "My Label 1", url: "http://myurl1.com" },
		{ label: "My Label 2", url: "http://myurl2.com" },
		{ label: "My Label 3", url: "http://myurl3.com" }
	];
	var map = {
		"testListItem": {
			parts: {
				"testLink": { attributes: { "href": "url" } },
				"testLabel": "label",
				"testUrl": "url"
			}
		}
	};
	templating.render(template, data, map, function (resultHtml) {
		var expectedHtml = [
			'<ul class="testList">',
				'<li class="testListItem">',
					'<a class="testLink" href="http://myurl1.com">',
						'<span class="testLabel">My Label 1</span> - ',
						'<span class="testUrl">http://myurl1.com</span>',
					'</a>',
				'</li>',
				'<li class="testListItem">',
					'<a class="testLink" href="http://myurl2.com">',
						'<span class="testLabel">My Label 2</span> - ',
						'<span class="testUrl">http://myurl2.com</span>',
					'</a>',
				'</li>',
				'<li class="testListItem">',
					'<a class="testLink" href="http://myurl3.com">',
						'<span class="testLabel">My Label 3</span> - ',
						'<span class="testUrl">http://myurl3.com</span>',
					'</a>',
				'</li>',
			'</ul>'].join('');
		test.equals(resultHtml, expectedHtml);
		test.done();
	});
};

exports.inputValue = function (test) {
	var html = '<input class="emailInput" type="text" name="email" value="Email address" />';
	var data = { "email": "test@node.js" };
	var map = { "emailInput": { attributes: { "value": "email" } } };

	templating.render({html: html}, data, map, function(output) {
		test.strictEqual(output, '<input class="emailInput" type="text" name="email" value="test@node.js" />', "Replacing values in input fields shall work.");
		test.done();
	});
};

exports.article = function (test) {
	var html = [
		'<div>',
			'<h3 class="title">Nadpis</h3>',
			'<span class="excerpt">Upoutávka</span>',
			'<a class="url" href="">více</a>',
		'</div>'
	].join('');

	// raw database record
	var data = {
		_id: 123, // unused property
		title: "O myších & lidech",
		excerpt: "Vědecká studie o vzájemném soužití",
		url: "/cs/articles/o-mysich-a-lidech" // mapped property
	};

	// do mapping
	var map = {
		"title": "title",
		"excerpt": "excerpt",
		"url": { attributes: { "href": "url" } }
	};

	templating.render({html: html}, data, map, function (output) {
		var expectedHtml = [
			'<div>',
				'<h3 class="title">O myších & lidech</h3>',
				'<span class="excerpt">Vědecká studie o vzájemném soužití</span>',
				'<a class="url" href="/cs/articles/o-mysich-a-lidech">více</a>',
			'</div>'
		].join('');
		test.strictEqual(output, expectedHtml);
		test.done();
	});
};

exports.transformation = function (test) {
	var html = [
		'<div class="user">',
			'<span class="userName">{name}</span>',
			'<span class="userPhone">{phone}</span>',
			'<a class="userEmail" href="{mailto:email}">{email}</a>',
		'</div>'
	].join('');

	// raw database record
	var data = {
		_id: 123, // unused property
		firstName: "Václav",
		lastName: "Habele",
		phone: '123 456 789',
		email: "habele@email.com"
	};
	var map = {
		"userName": function (data) { return data["firstName"] + " " + data["lastName"]  },
		"userPhone": "phone",
		"userEmail": {
			content: "email",
			attributes: {
				"href": function (data) { return "mailto:" + data["email"]; }
			}
		}
	};
	templating.render({html: html}, data, map, function (output) {
		var expectedHtml = [
			'<div class="user">',
				'<span class="userName">Václav Habele</span>',
				'<span class="userPhone">123 456 789</span>',
				'<a class="userEmail" href="mailto:habele@email.com">habele@email.com</a>',
			'</div>'
		].join('');

		test.strictEqual(output, expectedHtml);
		test.done();
	});
};

exports.transformationList = function (test) {
	var html = [
		'<div class="user">',
			'<span class="userName">{name}</span>',
			'<span class="userPhone">{phone}</span>',
			'<a class="userEmail" href="{mailto:email}">{email}</a>',
		'</div>'
	].join('');

	var data = [
		{ _id: 123,  firstName: "Václav", lastName: "Habele", phone: '123 456 789', email: "habele@email.com" },
		{ _id: 124,  firstName: "Tomáš", lastName: "Marný", phone: '666 456 999', email: "tom@marny.com" }
	];
	var map = {
		"user": {
			parts: {
				"userName": function (data) { return data["firstName"] + " " + data["lastName"]  },
				"userPhone": "phone",
				"userEmail": {
					content: "email",
					attributes: {
						"href": function (data) { return "mailto:" + data["email"]; }
					}
				}
			}
		}
	};
	templating.render({html: html}, data, map, function (output) {
		var expectedHtml = [
			'<div class="user">',
				'<span class="userName">Václav Habele</span>',
				'<span class="userPhone">123 456 789</span>',
				'<a class="userEmail" href="mailto:habele@email.com">habele@email.com</a>',
			'</div>',
			'<div class="user">',
				'<span class="userName">Tomáš Marný</span>',
				'<span class="userPhone">666 456 999</span>',
				'<a class="userEmail" href="mailto:tom@marny.com">tom@marny.com</a>',
			'</div>'
		].join('');

		test.strictEqual(output, expectedHtml);
		test.done();
	});
};

exports.emptyTextArea = function (test) {
	templating.render({html: '<textarea name="myArea"></textarea>'}, {}, {}, function (output) {
		var expectedHtml = '<textarea name="myArea"></textarea>';

		test.strictEqual(output, expectedHtml, 'Textarea shall be always pair tag, else it confuses some browsers.');
		test.done();
	});
};

exports.script = function (test) {
	templating.render({html: '<script src="test"></script>'}, {}, {}, function (output) {
		var expectedHtml = '<script src="test"></script>';

		test.strictEqual(output, expectedHtml, 'Script shall be always pair tag, else it confuses some browsers.');
		test.done();
	});
};

exports.htmlComments = function (test) {
	var html = '<!-- test --><div>abc<!-- another test --></div><!-- third test -->';
	templating.render({html: html}, {}, {}, function (output) {
		test.strictEqual(output, html, 'Script shall preserve comments.');
		test.done();
	});

};

