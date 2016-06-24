var mongoose = require('mongoose');
var User = mongoose.model("User");
var Topic = mongoose.model("Topic");
var Post = mongoose.model("Post");


module.exports = (function(){
  return {
    addUser: function(req,res){
      var user = new User(req.body);
      user.save(function(err){
        if(err){
          console.log('save userd server controller errors:', user.errors);
          res.json({title: "you have errors", errors: user.errors});
        } else {
        //  console.log("user added: ", user);
          User.findOne({_id:user._id}, function(err, newuser){
            if(err){
              console.log("something went wrong");
            } else {
              res.json(newuser);
            }
          })
        }
      })
    },

    showUsers: function(req,res){
      User.find({}, function(err,result){
        if(err){
          console.log("error in mongo was found: ", err);
        } else {
          console.log(result);
          res.json(result);
        }
      })
    },

    addTopic: function(req,res){
      //console.log(req.body);
      var topic = new Topic(req.body);
      topic.save(function(err){
        if(err){
          console.log('save topic server controller errors:', topic.errors);
          res.json({title: "you have errors", errors: topic.errors});
        } else {
          console.log("topic added: ", topic);
        }
      });
    },

    getTopic:function(req,res){
      Topic.find({}, function(err,result){
        if(err){
          console.log("error in mongo was found: ", err);
        } else {
          console.log(result);
          res.json(result.reverse());
        }
      })
    },
    showTopic: function(req,res){

      Topic.findOne({_id: req.body._id}).populate("posts").exec(function(err, result){
        if(err){
          console.log("something went wrong");
        } else {
          console.log('/////////////');
          console.log(result);
          console.log('/////////////');
          res.json(result);
        }
      })
    },
    newPost: function(req,res){
      console.log(req.body);
      Topic.findOne({_id: req.body.topic_id})
            .populate('posts')
            .exec(function(err, topic){
        console.log(topic);

      var post = new Post({username: req.body.username, post:req.body.post, topic_id: topic._id});
      topic.posts.push(post);
      post.save(function(err){
        if(err){
          console.log('save topic server controller errors:', post.errors);
          res.json({title: "you have errors", errors: post.errors});
        } else {
          topic.save();
          console.log("post added: ", post);
          console.log("topic is", topic);
          res.json(topic);
        }
      });
    });
    }











  }
})();
