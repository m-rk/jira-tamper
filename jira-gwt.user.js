// ==UserScript==
// @name         JIRA given-when-then auto-formatting
// @namespace    https://github.com/m-rk/jira-gwt
// @version      0.1
// @description  Auto-formatting for given-when-then text in JIRA task descriptions and comments
// @author       Mark Davies
// @match        https://*.atlassian.net/browse/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    
    GM_addStyle(".gwt-delim { font-size: 1.5em; margin: -0.5em 0; padding: 0 .2em; color: #2aa6ca; }");

    // replace ugly hyphen-bracket arrows with an ASCII arrow
    $(".issue-body:contains(' -> ')").each(function() {
        var html = $(this).html();
        $(this).html(html.replace(/ -&gt; /g, ' <span class="gwt-delim">&rarr;</span> ')); 
    });
})();
