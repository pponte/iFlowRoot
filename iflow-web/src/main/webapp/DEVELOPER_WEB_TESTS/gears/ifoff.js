// Copyright 2007, Google Inc.
//
// Redistribution and use in source and binary forms, with or without 
// modification, are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice, 
//     this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//  3. Neither the name of Google Inc. nor the names of its contributors may be
//     used to endorse or promote products derived from this software without
//     specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR 
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF 
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Change this to set the name of the managed resource store to create.
// You use the name with the createManagedStore, and removeManagedStore,
// and openManagedStore APIs. It isn't visible to the user.
var STORE_NAME = "ifoff";

// Change this to set the URL of tha manifest file, which describe which
// URLs to capture. It can be relative to the current page, or an
// absolute URL.
var MANIFEST_FILENAME = "manifest.json";

var localServer;
var manStore;
var desktop;

// Called onload to initialize local server and store variables
function init() {
  if (!window.google || !google.gears) {
    alert("You must install Gears first.");
  } else {
    localServer = google.gears.factory.create("beta.localserver");
    textOut("oki.. Gears is already installed.5");

    desktop = google.gears.factory.create('beta.desktop');
    textOut("created desktop");
    
    updateSwitcher();
    
  }
}

function isOffline() {
	return (manStore && manStore.currentVersion);
}

function updateSwitcher() {
	if (isOffline()) {
		offline();
	}
	else {
		online();
	}
}

// Create the managed resource store
function createStore() {
  if (!window.google || !google.gears) {
    alert("You must install Gears first.");
    return;
  }

  manStore = localServer.createManagedStore(STORE_NAME);
  manStore.manifestUrl = MANIFEST_FILENAME;
  manStore.checkForUpdate();

  var timerId = window.setInterval(function() {
    // When the currentVersion property has a value, all of the resources
    // listed in the manifest file for that version are captured. There is
    // an open bug to surface this state change as an event.
    if (isOffline()) {
      window.clearInterval(timerId);
      textOut("The documents are now available offline.\n" + 
              "With your browser offline, load the document at " +
              "its normal online URL to see the locally stored " +
			        "version. The version stored is: " + 
              manStore.currentVersion);
      updateSwitcher();
    } else if (manStore.updateStatus == 3) {
      textOut("Error: " + manStore.lastErrorMessage);
    }
  }, 500);  
}

// Remove the managed resource store.
function removeStore(workerCallback) {
  if (!window.google || !google.gears) {
    alert("You must install Gears first.");
    return;
  }

  localServer.removeManagedStore(STORE_NAME);
  textOut("Done. The local stores has been removed." +
          "You will now see online versions of the documents.");
  
  workerCallback();
  
  textOut("callback done");
  
  updateSwitcher();
}

function online() {
	$('go_online').setStyle('display', 'none');
	$('go_offline').setStyle('display', '');
	$('submit_offline').setStyle('display', 'none');
	$('submit_online').setStyle('display', '');	
}

function offline() {
	$('go_online').setStyle('display', '');
	$('go_offline').setStyle('display', 'none');
	$('submit_offline').setStyle('display', '');
	$('submit_online').setStyle('display', 'none');	
}

// Utility function to output some status text.
function textOut(s) {
	console.debug(s);
}
