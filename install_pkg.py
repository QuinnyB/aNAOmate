import qi
import os
import paramiko

ROBOT_URL = "192.168.1.113"

print "Uploading package."
pkg_file = "TMI-0.0.3.pkg"
pkg_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), pkg_file)

transport = paramiko.Transport((ROBOT_URL, 22))
transport.connect(username="nao", password="nao")
sftp = paramiko.SFTPClient.from_transport(transport)
sftp.put(pkg_path, pkg_file)

print "Connecting NAOqi session"
app = qi.Application(url='tcp://'+ROBOT_URL+':9559')
app.start()
session = app.session

print "Installing app from file."
packagemgr = session.service("PackageManager")
packagemgr.install("/home/nao/"+pkg_file)

print "Delete package file."
sftp.remove(pkg_file)
sftp.close()
transport.close()

print "Installation complete."
app.stop()