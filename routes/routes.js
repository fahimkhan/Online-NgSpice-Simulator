module.exports = function(express,app,fs,os,io){
	console.log("Server started!!! ");	

	var router = express.Router();

	router.get('/',function(req,res,next){
        res.render('index',{host:app.get('host'),title:'Ngspice Simulator'});
    
    });

	io.on('connection', function (socket) {
		socketID = getSocketID(socket);
		fileName = '/tmp/'+socketID+'.cir.out';
  		socket.emit('loadingPage', 'User with socket ID '+socket.id+' is Connected');
  		
  		socket.on('user', function (data) {
  			console.log('Socket ID : '+data['socketID']);
  		});

  		socket.on('netlist',function(netlistContent){
			console.log('Server : '+netlistContent);
			socket.emit('serverMessage','Recived message for client '+socketID);
			fs.writeFile(fileName, netlistContent, function (err) {
				if (err){
					return console.log(err);
				} 
  				console.log('File is stored at '+fileName);
			});
		});	
		
		socket.on('disconnect',function(){
			console.log("Client "+socket.id+" disconnected");
			fs.exists(fileName, function(exists) {
				if (exists) {
					//Deleting file
					deleteNetlistFile(fileName);
				}
			});
		});

		function getSocketID(socket){
			socketID = socket.id;
			//Removing first two char i.e '/#' from socket id
			socketID = socketID.substring(2);
			return socketID;
		}

		function deleteNetlistFile(fileName){
			console.log("Delete File "+fileName)
   			fs.unlink(fileName, function(err){
   				if (err) return console.log(err);
				console.log("success");
			});
		}

	});

	app.use('/',router);
}