// ==UserScript==
// @name         JIRA Lo-Fi Agile Reports
// @namespace    http://tan.gl/w/mark
// @version      0.1
// @description  Increase size of report elements to suit simpler displays
// @author       Mark D
// @match        https://navitasltd.atlassian.net/secure/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

GM_addStyle('path.work-line, path.guide-line, path.scope-line, path.scope-projection-line { stroke-width: 20px !important; }');
