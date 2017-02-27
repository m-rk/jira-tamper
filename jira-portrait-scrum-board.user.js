// ==UserScript==
// @name         50/50 split scrum board
// @namespace    https://github.com/m-rk/jira-tamper
// @version      0.2
// @description  Increases the issue detail view to 50% of screen, tiled vertically if screen is portrait
// @author       Alan Seymour alan@alanseymour.net
// @match        https://navitasltd.atlassian.net/secure/RapidBoard*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle("#ghx-plan-group,#ghx-work{height:calc(100% - 40px)!important;display:flex}#ghx-plan-group{height:100%!important}#ghx-detail-view{width:auto!important;display:flex;flex:1}#ghx-backlog-column,#ghx-pool-column{width:auto!important;overflow:hidden;display:flex;flex:1}#ghx-pool-column+#ghx-detail-view:empty{height:100%}#ghx-rabid{height:calc(100vh - 148px)}#ghx-backlog,#ghx-detail-contents,#ghx-pool{height:100%;width:100%}#ghx-detail-head{width:calc(100% - 20px)}#ghx-classification-menu-column{display:none}@media (orientation:portrait){#ghx-plan-group,#ghx-work{flex-direction:column}#ghx-detail-contents{border-left:none;border-top:2px solid #ccc}}");
})();