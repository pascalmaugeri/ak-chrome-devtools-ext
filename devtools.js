var PanelWindow;
var tableAll = null;
var rowIndex = 0;

// Create a connection to the background page
//var backgroundPageConnection = chrome.runtime.connect({
//    name: "devtools-page"
//});

chrome.devtools.network.onRequestFinished.addListener(
	function(har_entry) {
		var hdrs = har_entry.response.headers;
		var url = har_entry.request.url;
		var status = har_entry.response.status;
		var contentType = "-";
		var contentEncoding = "-";
		var contentLength = "-";
		var xCache = "-";
		var xRemoteCache = "-"; 
		var xAkNetwork = "Prod";
		var xTrueCacheKey = "-"

		for (var i = 0; i < hdrs.length; i++) {

			var hdr = hdrs[i];

			if (hdr.name == "X-Cache")
				xCache = hdr.value.split(' ')[0];
			if (hdr.name == "X-Cache-Remote")
				xRemoteCache = hdr.value.split(' ')[0];

			// X-True-Cache-Key
			if (hdr.name.toLowerCase() == "x-true-cache-key")
				xTrueCacheKey = hdr.value.split(' ')[0];

			// Set the network (Prod / Staging / ETN)
			if (hdr.name == "X-Akamai-Staging")
				xAkNetwork = hdr.value.split(' ')[0] + " Staging";
			if (hdr.name == "X-Akamai-Test-Network")
				xAkNetwork = hdr.value.split(' ')[0];

			// Content-type and Content-Encoding
			if (hdr.name.toLowerCase() == "content-type")
				contentType = hdr.value.split(' ')[0];
			if (hdr.name.toLowerCase() == "content-encoding")
				contentEncoding = hdr.value.split(' ')[0];

			// Content-Length
			if (hdr.name.toLowerCase() == "content-length")
				contentLength = hdr.value.split(' ')[0];

		}


		// Fill in main table
		var tr = tableAll.insertRow();

		// row index
		rowIndex++;
		var td = tr.insertCell();
		td.style.border = '0px solid black';
		td.style.foregroundColor = "black";
		td.style.backgroundColor = "lightgrey";
		td.appendChild(document.createTextNode(rowIndex));

		// Network
				var td = tr.insertCell();
				td.style.border = '0px solid black';
				td.style.foregroundColor = "black";
				td.style.backgroundColor = "lightgrey";
				td.appendChild(document.createTextNode(xAkNetwork));

		// Status Code
				var td = tr.insertCell();
				td.style.border = '0px solid black';
				td.style.foregroundColor = "black";
				td.style.backgroundColor = "lightgrey";
				td.appendChild(document.createTextNode(status));

		// Content-Type
				var td = tr.insertCell();
				td.style.border = '0px solid black';
				td.style.foregroundColor = "black";
				td.style.backgroundColor = "lightgrey";
				td.appendChild(document.createTextNode(contentType));

		// Content-Encoding
				var td = tr.insertCell();
				td.style.border = '0px solid black';
				td.style.foregroundColor = "black";
				td.style.backgroundColor = "lightgrey";
				td.appendChild(document.createTextNode(contentEncoding));

		// Content-Length
				var td = tr.insertCell();
				td.style.border = '0px solid black';
				td.style.foregroundColor = "black";
				td.style.backgroundColor = "lightgrey";
				td.appendChild(document.createTextNode(contentLength));

		// X-Cache 
				var td = tr.insertCell();
				td.style.border = '0px solid black';
				td.style.foregroundColor = "black";
				td.style.backgroundColor = "lightgrey";
				if (xCache == "TCP_MISS")
					td.style.backgroundColor = "lightyellow";
				td.appendChild(document.createTextNode(xCache));

		// X-Remote-Cache results
				var td = tr.insertCell();
				td.style.border = '0px solid black';
				td.style.foregroundColor = "black";
				td.style.backgroundColor = "lightgrey";
				if (xRemoteCache == "TCP_MISS")
					td.style.backgroundColor = "lightyellow";
				td.appendChild(document.createTextNode(xRemoteCache));


		// X-True-Cache-Key
				var td = tr.insertCell();
				td.style.border = '0px solid black';
				td.style.foregroundColor = "black";
				td.style.backgroundColor = "lightgrey";
				td.appendChild(document.createTextNode(xTrueCacheKey));

		// URL
				var td = tr.insertCell();
				td.style.border = '0px solid black';
				td.style.foregroundColor = "black";
				td.style.backgroundColor = "lightgrey";
				td.appendChild(document.createTextNode(url));

	}
);



function createTables() {

    var body = PanelWindow.document.body;

    tableAll = PanelWindow.document.createElement('table');
    tableAll.id = "keywords";

    tableAll.style.width  = '100%';
    tableAll.style.border = '0px grey';

	var tr = tableAll.insertRow();

	// Index
	var td = tr.insertCell();
	td.style.border = '0px solid black';
	td.style.color = "white";
	td.style.backgroundColor = "black";
	td.appendChild(document.createTextNode('#'));

	// Network
	var td = tr.insertCell();
	td.style.border = '0px solid black';
	td.style.color = "white";
	td.style.backgroundColor = "black";
	td.appendChild(document.createTextNode('AK Network'));

	// Status Code
	var td = tr.insertCell();
	td.style.border = '0px solid black';
	td.style.color = "white";
	td.style.backgroundColor = "black";
	td.appendChild(document.createTextNode('Status'));

	// Content-Type
	var td = tr.insertCell();
	td.style.border = '0px solid black';
	td.style.color = "white";
	td.style.backgroundColor = "black";
	td.appendChild(document.createTextNode('Content-Type'));

	// Content-Encoding
	var td = tr.insertCell();
	td.style.border = '0px solid black';
	td.style.color = "white";
	td.style.backgroundColor = "black";
	td.appendChild(document.createTextNode('Content-Encoding'));

	// Content-Length
	var td = tr.insertCell();
	td.style.border = '0px solid black';
	td.style.color = "white";
	td.style.backgroundColor = "black";
	td.appendChild(document.createTextNode('Content-Length'));

	// X-Cache
	var td = tr.insertCell();
	td.style.border = '0px solid black';
	td.style.color = "white";
	td.style.backgroundColor = "black";
	td.appendChild(document.createTextNode('X-Cache Result'));
	
	// X-Remote-Cache results
	var td = tr.insertCell();
	td.style.border = '0px solid black';
	td.style.color = "white";
	td.style.backgroundColor = "black";
	td.appendChild(document.createTextNode('X-Cache-Remote Result'));

	// X-True-Cache-Key
	var td = tr.insertCell();
	td.style.border = '0px solid black';
	td.style.color = "white";
	td.style.backgroundColor = "black";
	td.appendChild(document.createTextNode('X-True-Cache-Key'));

	// URL
	var td = tr.insertCell();
	td.style.border = '0px solid black';
	td.style.color = "white";
	td.style.backgroundColor = "black";
	td.appendChild(document.createTextNode('URL'));

    body.appendChild(tableAll);

}


function clearTables() {
	rowIndex = 0;
	tableAll.remove();

}


chrome.devtools.panels.create("Aloha", "", "panel.html",

  function(extensionPanel) {

    btnClear = extensionPanel.createStatusBarButton("trashbin.png", "clear", false);

    btnClear.onClicked.addListener(function(clicked) {
		clearTables();
		createTables();		
    });	

	extensionPanel.onShown.addListener(function(panelWindow) {
		PanelWindow = panelWindow;
		if (tableAll == null) createTables();
    });

	}
);





