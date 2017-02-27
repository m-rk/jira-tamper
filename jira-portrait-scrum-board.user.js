// ==UserScript==
// @name         Horizontal Split Scrum Board
// @namespace    https://github.com/m-rk/jira-tamper
// @version      0.1
// @description  Move the issue detail view to bottom of page when viewed in portrait mode
// @author       Alan Seymour alan@alanseymour.net
// @match        https://navitasltd.atlassian.net/secure/RapidBoard*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle("@media (orientation:portrait){#ghx-plan-group,#ghx-work{height:calc(100% - 40px)!important;display:flex;flex-direction:column}#ghx-plan-group{height:100%!important}#ghx-detail-view{width:auto!important;display:flex}#ghx-backlog-column,#ghx-pool-column{width:auto!important;overflow:hidden;display:flex}#ghx-pool-column+#ghx-detail-view:empty{height:100%}#ghx-rabid{height:calc(100vh - 148px)}#ghx-backlog,#ghx-detail-contents,#ghx-pool{height:100%;width:100%}#ghx-detail-contents{border-left:none;border-top:2px solid #ccc}#ghx-detail-head{width:calc(100% - 20px)}#ghx-classification-menu-column{display:none}}");
})();