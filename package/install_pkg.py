import os
import sys

import qi
import paramiko

ROBOT_URL = sys.argv[1]
PKG_FILE = sys.argv[2]

print "Uploading package."

pkg_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), PKG_FILE)

transport = paramiko.Transport((ROBOT_URL, 22))
transport.connect(username="nao", password="nao")
sftp = paramiko.SFTPClient.from_transport(transport)
sftp.put(pkg_path, PKG_FILE)

print "Connecting NAOqi session..."
app = qi.Application(url='tcp://'+ROBOT_URL+':9559')
app.start()
session = app.session

print "Installing app from file"
packagemgr = session.service("PackageManager")
packagemgr.install("/home/nao/"+PKG_FILE)

print "Delete package file"
sftp.remove(PKG_FILE)
sftp.close()
transport.close()

# Stop the NAOqi application.
app.stop()
print "Installation complete."