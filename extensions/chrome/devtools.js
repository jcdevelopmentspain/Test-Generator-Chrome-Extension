chrome.devtools.panels.create("Test Generator",
                                    "icon.png",
                                    "index.html",
                                     function (panel){
                                        panel.onShown.addListener(function(){
                                            chrome.runtime.sendMessage("attachBody");
                                        });
                                        panel.onHidden.addListener(function(){
                                            chrome.runtime.sendMessage("detachBody");
                                        });
                                    }
);
