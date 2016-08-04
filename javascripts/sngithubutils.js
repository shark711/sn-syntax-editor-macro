var syntax_editor_macros = {
    callback: function(xml, elementId) {
        var tableHeader = "<table>\n	<tr>\n		<th>Keyword</th>\n		<th>Description</th>\n		<th>Output</th>\n	</tr>\n";
        var tableRowTemplate = "	<tr>\n		<td>$name</td>\n		<td>$comments</td>\n		<td><pre><code class=\"javascript\">$text</code></pre></td>\n	</tr>\n"
        var tableFooter = "</table>";
        var tableContent = "";
        var xmlDoc = xml.responseXML;

        var syntax_editor_macros = xmlDoc.getElementsByTagName("syntax_editor_macro");
        for (var i = 0; i < syntax_editor_macros.length; i++) {
            var syntax_editor_macro = syntax_editor_macros[i];
            var tableRow = tableRowTemplate;
            tableRow = tableRow
                .replace("$name", syntax_editor_macro.getElementsByTagName("name")[0].firstChild.nodeValue)
                .replace("$text", syntax_editor_macro.getElementsByTagName("text")[0].firstChild.nodeValue);

            if (syntax_editor_macro.getElementsByTagName("comments")[0].firstChild != null) {
                tableRow = tableRow
                    .replace("$comments", syntax_editor_macro.getElementsByTagName("comments")[0].firstChild.nodeValue)
            } else {
                tableRow = tableRow.replace("$comments", "");
            }

            tableContent += tableRow;
        }
        document.getElementById(elementId).innerHTML = tableHeader + tableContent + tableFooter;
        hljs.initHighlightingOnLoad();
    },

    generateHtmlTableFromXML: function(elementId, xmlFile) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                syntax_editor_macros.callback(xhttp, elementId);
            }
        };
        xhttp.open("GET", xmlFile, true);
        xhttp.send();
    }
};
