<?xml version="1.0" encoding="UTF-8" ?>
<Package name="TestNaoServer" format_version="4">
    <Manifest src="manifest.xml" />
    <BehaviorDescriptions>
        <BehaviorDescription name="behavior" src="behavior_1" xar="behavior.xar" />
    </BehaviorDescriptions>
    <Dialogs />
    <Resources>
        <File name="naoWebServer" src="naoWebServer.py" />
        <File name="index" src="behavior_1/htdocs/index.html" />
        <File name="jquery-1.11.0.min" src="behavior_1/htdocs/js/jquery-1.11.0.min.js" />
        <File name="main" src="behavior_1/htdocs/js/main.js" />
        <File name="robotutils.qim1" src="behavior_1/htdocs/js/robotutils.qim1.js" />
    </Resources>
    <Topics />
    <IgnoredPaths />
</Package>
