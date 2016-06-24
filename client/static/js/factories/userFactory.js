myApp.factory('userFactory', function($http){

  ////////////////////////////////////////////////////////
  //                USER                                 //
  ////////////////////////////////////////////////////////
  var users=[];
  var factory = {};
  var username ='';
  var posts = [];

  factory.getUsers = function(callback){
     $http.get('/users').success(function(output){
       users= output;
       callback(users);
     });
  }

  factory.addUser = function(user, callback){
    //console.log(user);
    $http.post('/adduser', user).success(function(result){
      users.push(result);
      callback(users);
    });
  }

  ////////////////////////////////////////////////////////
  //                   dashboard                        //
  ////////////////////////////////////////////////////////
  var categories = [{name:'Ruby on Rails'}, {name: 'MySQl'}, {name:'UX' }, {name:'Web Development' }];
  var topics =[];
  var topic = [];
  factory.getCategory = function(callback){
     callback(categories);
  }

  factory.addTopic = function(newtopic,callback){
    $http.post('/newtopic', newtopic).success(function(result){
      topics.push(result);
      console.log("successfull");
      callback(topics)
    })
  }

  factory.getTopic = function(callback){
    $http.get('/topics').success(function(output){
      topics = output;
      callback(topics);
    })
  }

factory.showTopic = function(data, callback){

  $http.post('/topic', data).success(function(output){
    //console.log(output);
    topic = output;
    callback(topic);
    // console.log(topic);
  })
}

factory.getCurrentTopic = function(callback){
  callback(topic);
}

factory.post = function(data, callback){
  $http.post('/newpost', data).success(function(output){
    callback(output);
   console.log('///////////post successfull//////////');
 });
}

factory.comment = function(data){
  $http.post('/newcomment', data).success(function(output){
    console.log('///////////comment successfull//////////');
  });
}

  return factory;
})
