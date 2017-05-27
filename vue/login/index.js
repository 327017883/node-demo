import login from './index.vue';

Vue.component('login', login);

new Vue({
  el: '#container'
});

// document.querySelector('.btn-default').addEventListener('tap', function(){
// 	alert('1')
// }, false)

//var db = mongoose.connect('mongodb://localhost/user');//；连接数据库


// var TestSchema = new mongoose.Schema({
//     name : { type:String },
//     password : {type: String}
// });

// var TestModel = db.model("user", TestSchema );

// var TestEntity = new TestModel({
//     name : "one",
//     password : '123456'
// });

// TestEntity.save();
// TestModel.find(function(err, doc){
// 	console.log(doc);
//});
