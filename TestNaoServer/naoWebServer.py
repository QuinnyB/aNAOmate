import urllib
import mimetypes
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            filePath = self.htdocsPath + "/index.html"

            path = urllib.unquote(urllib.unquote(self.path))
            path = path.split("?")[0]

            fileHndl = open(filePath, "r")
            mimeType = mimetypes.guess_type(filePath)[0]

            self.send_response(200)
            self.send_header("Content-type", mimeType)
            self.end_headers()

            fileText = fileHndl.read()
            self.wfile.write(fileText)

        except IOError:
            self.send_error(404, 'File Not Found: %s' % self.path)

        def do_POST(self):
            self.send_error(500, 'Internal Error')

        def address_string(self):
            host, port = self.client_address[:2]
            return host

class Server(HTTPServer):
    def serve_forever(self, log, path):
        self.RequestHandlerClass.htdocsPath = path
        self.RequestHandlerClass.log = log
        HTTPServer.serve_forever(self)

class MyClass(GeneratedClass):
    def __init__(self):
        GeneratedClass.__init__(self)

    def onLoad(self):
        pass

    def onUnload(self):
        self.running = 0
        try:  
            self.httpServer.shutdown()
            self.httpServer.socket.close()
        except:
            pass

    def onInput_onStart(self, p):
        self.frameMgr = ALProxy("ALFrameManager")
        self.htdocsPath =  self.frameMgr.getBehaviorPath(self.behaviorId) + "/htdocs"
        self.httpServer = Server('', 8080, Handler)
        self.httpServer.allow_reuse_address = True
        self.httpServer.serve_forever(self.log, self.htdocsPath)
