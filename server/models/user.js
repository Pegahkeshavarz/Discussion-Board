var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  topics: [{type: Schema.Types.ObjectId, ref: "Topic"}],
  posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
  comments: [{type: Schema.Types.ObjectId, ref: "Comment" }]
}, {timestamps: true});


var TopicSchema = new mongoose.Schema({
  topic:{type:String},
  description:{type:String},
  username:{type:String},
  user_id:{type: Schema.Types.ObjectId, ref: "User"},
  category:{type:String},
  posts:[{type: Schema.Types.ObjectId, ref: "Post"}]
},{timestamps: true});

var PostSchema = new mongoose.Schema({
  username:{type:String},
  post:{type:String},
  topic_id:{type: Schema.Types.ObjectId, ref: "Topic"},
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
}, {timestamps:true});

var CommentSchema = new mongoose.Schema({
  username: {type:String},
  comment:{type:String},
  post_id:{type: Schema.Types.ObjectId, ref: "Post"}
}, {timestamps:true});
////////////////////////////////////////////////////////
//               validations                          //
////////////////////////////////////////////////////////
UserSchema.path("name").validate(function(val) {
    return val.length > 1;
}, "user name must be two letters or more.");

UserSchema.path("name").required(true, "Please add a name!");

mongoose.model('User', UserSchema);
mongoose.model('Topic', TopicSchema);
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);
