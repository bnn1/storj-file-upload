cmd_Release/uplink.node := ln -f "Release/obj.target/uplink.node" "Release/uplink.node" 2>/dev/null || (rm -rf "Release/uplink.node" && cp -af "Release/obj.target/uplink.node" "Release/uplink.node")
