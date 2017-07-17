// ==UserScript==
// @name         JIRA Sprintboad quick info
// @namespace    https://github.com/m-rk/jira-tamper
// @version      0.4
// @description  Adds SP and Release Version to sprint board
// @author       Alan Seymour https://github.com/alan-seymour
// @match        https://navitasltd.atlassian.net/secure/RapidBoard.jspa?rapidView=1*
// @grant        none
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @run-at       document-start
// ==/UserScript==
var tickets = [];

function loadExtraInfo(node) {
    tickets.push($(node).find('div').first().data('issue-key'));
    if (tickets.length == $('.ghx-swimlane').length) {
        //found all tickets
        fetchIssues(tickets);
        tickets = [];
    }
}

function fetchIssues(issues) {
    var filteredIssues = issues.filter((e) => { return e != '' && e != undefined && e != null; });
    var issueString = filteredIssues.join(', ');
    $.get('https://navitasltd.atlassian.net/rest/api/2/search/', {"jql": "issue in ("+issueString+")"}, function(data){displayData(data);});
}

function displayData(data) {
    // clear old info
    $('.jira-tamper-sbi').remove();
    
    // display new info
    data.issues.forEach(function(issue){renderIssueDetails(issue);});
}

function renderIssueDetails(issue) {
    if(issue.fields.fixVersions.length > 0) {
        $('.ghx-swimlane-header[data-issue-key="' + issue.key + '"]').find('.ghx-info').append('<span class="jira-tamper-sbi aui-label ghx-label-version ghx-label ghx-label-double" style="margin-left: 5px;">'+issue.fields.fixVersions[0].name+'</span>');
    }
    $('.ghx-swimlane-header[data-issue-key="' + issue.key + '"]').find('.ghx-heading').prepend('<span class="jira-tamper-sbi aui-badge ghx-statistic-badge" style="margin-right:5px;">'+issue.fields.customfield_10004+'</span>');
}

waitForKeyElements('.ghx-swimlane', loadExtraInfo, false);

/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.

    Usage example:

        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );

        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (jNode) {
            jNode.text ("This comment changed by waitForKeyElements().");
        }

    IMPORTANT: This function requires your script to have loaded jQuery.
*/
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}
