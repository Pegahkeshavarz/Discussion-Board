var user = require('../controllers/users.js');
module.exports= function(app){

app.post('/adduser', function(req,res){
   user.addUser(req,res);
  });

app.get('/users', function(req,res){
   user.showUsers(req,res);
  });

app.post('/newtopic', function(req,res){
   user.addTopic(req,res);
  });

app.get('/topics', function(req,res){
   user.getTopic(req,res);
  });
app.post('/topic', function(req,res){
  user.showTopic(req,res);
})
app.post('/newpost', function(req,res){
  user.newPost(req,res);
})

}
