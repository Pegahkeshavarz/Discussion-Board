myApp.controller('userController', function ($scope, userFactory, $location, $localStorage,
    $sessionStorage) {
  $scope.users = [];
  $scope.categories=[];

  var duplicated_name = false;
  var required = false;


  userFactory.getUsers(function(data){
    $scope.users = data;
    $scope.username = $localStorage.username;
    $scope.Category = userFactory.Category;
    //console.log($scope.Category);
  });

  $scope.addUser = function(){
    $localStorage.username = $scope.new_user.name;
     //userFactory.usernme = $scope.new_user.name;
    if(!$scope.new_user){
      required = true;
      $scope.error = "This field is required.";
      console.log("$scope.error:", $scope.error);
    } else {
    for(var i in $scope.users) {
            if($scope.new_user.name === $scope.users[i].name) {
                duplicate_found = true;
                $scope.error = "There is already a user with that name.";
                console.log("$scope.error:", $scope.error);
            }
      }
    }
      if(!duplicated_name && !required){
       userFactory.addUser($scope.new_user, function (errors) {
           $scope.errors = errors;

           userFactory.username = $scope.new_user.name;
           userFactory.getUsers(function(data){
             $scope.users = data;
           });
        })
    }
    $scope.new_user = {};
    $location.url('/dashboard');
  }



  ////////////////////////////////////////////////////////
  //                dashboard                           //
  ////////////////////////////////////////////////////////

$scope.topics =[];
$scope.currentTopic = [];

  userFactory.getCategory(function(data){
    $scope.categories = data;
  });

  userFactory.getTopic(function(data){
    $scope.topics = data;
    //console.log($scope.topics);
  })

  $scope.addTopic = function(){
    $scope.new_topic.username = $scope.username;
    userFactory.addTopic($scope.new_topic);
    userFactory.getTopic(function(data){
      $scope.topics = data;
    })
    $scope.new_topic = {};
  }

 $scope.showTopic = function(data){
   userFactory.showTopic(data, function(){
     console.log("showTopic topic -------------");
      console.log(data);
      console.log("showTopic topic -------------");
     $location.url('/topic/' + data._id);
   });
 }

 userFactory.getCurrentTopic(function(data){
   $scope.currentTopic = data;
  //  console.log($scope.currentTopic);
 })

 $scope.post = function(data){
   $scope.new_post.topic_id = data;
   $scope.new_post.username = $localStorage.username;
   userFactory.post($scope.new_post, function(newdata){
     $scope.currentTopic = newdata;
     console.log("post ----------------");
     console.log(newdata);
     console.log("post ----------------");
    //  console.log($scope.currentTopic);
   });
   $scope.new_post={};
 }

 $scope.comment = function(data){
   $scope.new_comment.post_id = data;
   $scope.new_comment.username = $localStorage.username;
   userFactory.comment($scope.new_comment);
   userFactory.getCurrentTopic(function(data){
     $scope.currentTopic = data;
   })
   $scope.new_comment = {};
 }



});
