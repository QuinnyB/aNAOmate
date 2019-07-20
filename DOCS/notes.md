
# Ping the Robot

 ~/work/aNAOmate   gitignore ●  ping 192.168.1.105
PING 192.168.1.105 (192.168.1.105): 56 data bytes
64 bytes from 192.168.1.105: icmp_seq=0 ttl=64 time=26.121 ms
64 bytes from 192.168.1.105: icmp_seq=1 ttl=64 time=10.177 ms
^C
--- 192.168.1.105 ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 10.177/18.149/26.121/7.972 ms

# Generate SSH Key

ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/korymathewson/.ssh/id_rsa): /Users/korymathewson/.ssh/id_rsa_nao
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/korymathewson/.ssh/id_rsa_nao.
Your public key has been saved in /Users/korymathewson/.ssh/id_rsa_nao.pub.
The key fingerprint is:
SHA256:OS5SwjNmevnLk4ojaa5PPj7Im9h02Kvqo/+Y1Q/bcqo korymathewson@Korys-MacBook-Air.local
The key's randomart image is:
+---[RSA 2048]----+
|                 |
|                 |
|                 |
|   .     .       |
|    B . S        |
|   * B . .       |
|.o= B +..        |
|=O=B =+*.        |
|@@&*Eo**o        |
+----[SHA256]-----+

# Copy SSH Keys to Robot

ssh-copy-id nao@192.168.1.105
The authenticity of host '192.168.1.105 (192.168.1.105)' can't be established.
ECDSA key fingerprint is SHA256:jvuhWWabkVxzO7EowM0FNQsAxeyNaKIHxAf8bgiyajI.
Are you sure you want to continue connecting (yes/no)? yes
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 3 key(s) remain to be installed -- if you are prompted now it is to install the new keys
Password:

Number of key(s) added:        3

Now try logging into the machine, with:   "ssh 'nao@192.168.1.105'"
and check to make sure that only the key(s) you wanted were added.

# SSH into Robot

ssh nao@192.168.1.105
Gojie [0] ~ $ ls
angles.bin   couples.bin  expo.bin  rayons.bin  remotes
classes.bin  diagnosis    naoqi     recordings
Gojie [0] ~ $

# Default Behaviour

A default behavior is a behavior which is automatically played at NAO startup.
https://www.cs.cmu.edu/~cga/nao/doc/reference-documentation/software/choregraphe/panels/behavior_manager_panel.html

Name a behavior .default to set it automatically as default behavior.

# Switch to SuperUser

Gojie [0] ~ $ su
Password:
root@Gojie [0] nao #
root@Gojie [0] nao #
root@Gojie [0] nao #

http://doc.aldebaran.com/2-1/dev/tools/opennao.html#opennao-user-account

# Debugging on the robot

http://doc.aldebaran.com/2-5/dev/tools/investigate-on-nao.html

# Running automatically at naoqi startup

stop and start naoqi
http://fileadmin.cs.lth.se/robot/nao/doc/dev/tools/naoqi.html

nao restart
nao stop

## Autoload on robot

root@Gojie [0] nao # cat /home/nao/naoqi/preferences/autoload.ini
# autoload.ini
#
# Use this file to list the cross-compiled modules that you wish to load.
# You must specify the full path to the module, python module or program.

[user]
#the/full/path/to/your/liblibraryname.so  # load liblibraryname.so

[python]
#the/full/path/to/your/python_module.py   # load python_module.py

[program]
#the/full/path/to/your/program            # load program

Launch naoqi with debug mode: `naoqi --debug`

# NAO boot script

root@Gojie [err 127] nao # cat /etc/init.d/naoqi
#!/sbin/runscript
##
## Author(s):
##  - Cedric GESTES <gestes@aldebaran-robotics.com>
##  - Samuel MARTIN <smartin@aldebaran-robotics.com>
##
## Copyright (C) 2010 - 2012 Aldebaran Robotics
##

# Check NAOqi status on the robot

root@Gojie [0] nao # nao status
 * status: started
root@Gojie [0] nao #



# Running Python code on the robot¶
Here we will try to have the script found in the Reacting to events tutorial running automatically at NAOqi startup.

Upload the script on the robot, for instance to `/home/nao/reacting_to_events.py`, then edit the `/home/nao/naoqi/preferences/autoload.ini` file to have:

[python]
/home/nao/reacting_to_events.py
Note that the –pip and –pport option are automatically set by NAOqi while it runs the script.

# Running a Server works

root@Gojie [0] htdocs # python server.py
serving at port 8000
Korys-Air.med.ualberta.ca - - [17/Sep/2009 01:34:05] "GET / HTTP/1.1" 200 -
Korys-Air.med.ualberta.ca - - [17/Sep/2009 01:34:06] code 404, message File not found
Korys-Air.med.ualberta.ca - - [17/Sep/2009 01:34:06] "GET /favicon.ico HTTP/1.1" 404 -
Korys-Air.med.ualberta.ca - - [17/Sep/2009 01:34:07] "GET / HTTP/1.1" 200 -
Korys-Air.med.ualberta.ca - - [17/Sep/2009 01:34:09] "GET / HTTP/1.1" 200 -
DESKTOP-0AIKBK4.med.ualberta.ca - - [17/Sep/2009 01:34:14] "GET / HTTP/1.1" 200 -
DESKTOP-0AIKBK4.med.ualberta.ca - - [17/Sep/2009 01:34:15] code 404, message File not found
DESKTOP-0AIKBK4.med.ualberta.ca - - [17/Sep/2009 01:34:15] "GET /favicon.ico HTTP/1.1" 404 -
^CTraceback (most recent call last):
  File "server.py", line 11, in <module>
    httpd.serve_forever()
  File "/usr/lib/python2.7/SocketServer.py", line 225, in serve_forever
    r, w, e = select.select([self], [], [], poll_interval)
KeyboardInterrupt


python /home/nao/usrdata/htdocs/server.py

Debug mode (disable life):
    naoqi --disable-life -d

Verbose mode:
naoqi --disable-life -v


# Testing
https://github.com/pepperhacking/studiotoolkit/

Additional details:
https://www.cs.utexas.edu/~pstone/Courses/393Rfall13/resources/nao.html#care

Apps are located here:
home/nao/.local/share/PackageManager/apps


# Getting Toward a Final Version

robot-jumpstart build a boilerplate project (https://github.com/aldebaran/robot-jumpstarter)
This makes a pml file to open in Choreograph
Open in Choreograph, and File -> Build Application package
Upload application package to robot (scp TMI-0.0.1.pkg nao@192.168.1.113:/home/nao)
Install application package (https://stackoverflow.com/questions/46095593/how-to-install-packages-with-python-scripts)
Then navigate to the app http://192.168.1.113/apps/TMI/

